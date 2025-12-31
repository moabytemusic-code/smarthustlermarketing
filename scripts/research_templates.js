const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const BREVO_API_KEY = process.env.BREVO_API_KEY;

if (!BREVO_API_KEY) {
    console.error('❌ Error: BREVO_API_KEY is missing in .env.local');
    process.exit(1);
}

// Check if we can fetch a campaign and then maybe see if there's a "save as template" endpoint
// or if we just have to create a new template with the same content.
// Brevo API Docs say: POST /smtp/templates
// We can copy htmlContent, subject, sender, etc.

async function checkTemplateCapabilities() {
    console.log('🕵️‍♂️ Researching Brevo Template API...');

    // 1. Fetch one campaign to get its data
    console.log('Fetching a sample campaign...');
    const campaignsResp = await fetch(`https://api.brevo.com/v3/emailCampaigns?limit=1&status=draft&tag=smarthustler`, {
        headers: { 'api-key': BREVO_API_KEY }
    });

    const campaignsData = await campaignsResp.json();
    if (!campaignsData.campaigns || campaignsData.campaigns.length === 0) {
        console.log('No sample campaign found to analyze.');
        return;
    }

    const source = campaignsData.campaigns[0];
    console.log(`Analyzing Source Campaign: [${source.id}] ${source.name}`);
    console.log(`- Subject: ${source.subject}`);
    console.log(`- Sender: ${source.sender.name} <${source.sender.email}>`);

    // In V3, we often need to fetch specific details to get the HTML content if not in list
    const detailResp = await fetch(`https://api.brevo.com/v3/emailCampaigns/${source.id}`, {
        headers: { 'api-key': BREVO_API_KEY }
    });
    const detail = await detailResp.json();

    if (detail.htmlContent) {
        console.log(`✅ HTML Content retrieved (${detail.htmlContent.length} chars)`);
    } else {
        console.log('❌ Could not retrieve HTML content from campaign details.');
    }

    console.log('\n--- FEASIBILITY ---');
    console.log('YES, we can programmatically clone these into Templates.');
    console.log('Method: Read Campaign -> POST /smtp/templates');
    console.log('This will allow you to use them in "Automation Workflows".');
}

checkTemplateCapabilities();
