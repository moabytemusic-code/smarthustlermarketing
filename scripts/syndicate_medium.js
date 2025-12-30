const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Constants
const MEDIUM_IMPORT_URL = 'https://medium.com/p/import';
// Path to store session cookies/data so you don't have to login every time
const USER_DATA_DIR = path.join(process.cwd(), '.puppeteer_data');

async function syndicateToMedium() {
    // Get URL from command line arg
    const targetUrl = process.argv[2];

    if (!targetUrl) {
        console.error('❌ Error: Please provide the URL to import.');
        console.error('Usage: node scripts/syndicate_medium.js <YOUR_POST_URL>');
        process.exit(1);
    }

    console.log(`🚀 Starting Medium Import for: ${targetUrl}`);

    const browser = await puppeteer.launch({
        headless: false, // Show the browser so user can see/interact
        defaultViewport: null,
        userDataDir: USER_DATA_DIR, // Persist login session
        args: [
            '--start-maximized',
            '--disable-blink-features=AutomationControlled',
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ],
        ignoreDefaultArgs: ['--enable-automation'] // Hides "Chrome is being controlled by automated test software" bar
    });

    const page = await browser.newPage();

    try {
        // 1. Go to Import Page
        console.log(`Navigating to: ${MEDIUM_IMPORT_URL}`);
        await page.goto(MEDIUM_IMPORT_URL, { waitUntil: 'networkidle2' });
        console.log(`Current Page URL: ${page.url()}`); // Debug 404s

        // 2. Check if logged in
        // We'll check for the import input field. 
        // It might differ in attributes, so we'll look for *any* text input and check its context if needed.
        const loggedInSelector = 'input';

        try {
            console.log('Waiting for login/import page to load...');
            // Wait up to 0 (infinite) if we need manual login, but we'll try a short timeout first 
            // to give a "Please log in" message if it's taking a while.
            try {
                await page.waitForSelector(loggedInSelector, { timeout: 5000 });
            } catch (e) {
                console.log('⚠️  Input field not found immediately.');
                console.log('👉 If you are at the Login screen, please Log In.');
                console.log('   The script is waiting for the Import Input field to appear...');
                await page.waitForSelector(loggedInSelector, { timeout: 0 });
            }
            console.log('✅ Import page detected!');
        } catch (e) {
            throw e;
        }

        // 3. Enter URL
        console.log('Writing URL...');
        // We want the input that is for the URL. Usually it's the only text input on the /import page.
        await page.type('input', targetUrl);

        // 4. Click Import
        console.log('Clicking Import button...');

        // Click the button using evaluate for robustness
        await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            // Look for the green button specifically or just text
            const importBtn = buttons.find(b => b.textContent.includes('Import'));
            if (importBtn) {
                importBtn.click();
            } else {
                throw new Error("Could not find Import button");
            }
        });

        // 5. Wait for Editor to load
        console.log('Waiting for Medium to create draft (this can take up to 60s)...');

        // Instead of strict navigation, wait for the URL to look like an editor URL
        // Pattern: medium.com/p/.../edit
        await page.waitForFunction(() => window.location.href.includes('/edit'), { timeout: 60000 });

        console.log('✅ Content Imported!');
        console.log('   Please review the formatting in the browser window.');
        console.log('   When ready, click "Publish" manually.');

        // Keep browser open for manual review/publishing
        // We will not close the browser automatically so the user can finish the job.
        // browser.close(); 

    } catch (error) {
        console.error('❌ An error occurred:', error);
        try {
            await page.screenshot({ path: 'debug_medium_error.png' });
            console.log('📸 Saved debug screenshot to: debug_medium_error.png');
        } catch (err) {
            console.log('Could not save screenshot.');
        }
        // await browser.close(); 
    }
}

syndicateToMedium();
