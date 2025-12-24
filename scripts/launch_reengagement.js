const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const BREVO_API_KEY = process.env.BREVO_API_KEY;

if (!BREVO_API_KEY) {
    console.error('❌ Error: BREVO_API_KEY is missing in .env.local');
    process.exit(1);
}

// LOAD THE LAUNCH SEQUENCE
const EMAILS_PATH = path.join(__dirname, '../src/content/campaigns/reengagement_launch.json');
const emails = JSON.parse(fs.readFileSync(EMAILS_PATH, 'utf8'));

// Helper function to format date for Brevo (ISO string)
const getScheduledDate = (daysFromNow) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow + 1); // Start Tomorrow
    date.setHours(10, 0, 0, 0); // Schedule for 10:00 AM
    return date.toISOString();
};

async function createCampaign(email, index) {
    const scheduledAt = getScheduledDate(email.day);

    // HTML Template with Logo
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
        <div style="text-align: center; padding: 20px; background-color: #0f172a;">
            <img src="https://smarthustlermarketing.com/logo.png" alt="Smart Hustler Marketing" style="max-height: 80px; width: auto;">
        </div>
        <div style="padding: 20px; background-color: #ffffff;">
            ${email.content}
        </div>
        <div style="text-align: center; padding: 20px; color: #666; font-size: 12px; border-top: 1px solid #eee;">
            <p>© ${new Date().getFullYear()} Smart Hustler Marketing. All rights reserved.</p>
            <p>You received this email because you are part of the Smart Hustler community.</p>
            <a href="{{ mirror }}" style="color: #666;">View in browser</a> | <a href="{{ unsubscribe }}" style="color: #666;">Unsubscribe</a>
        </div>
    </body>
    </html>
    `;

    console.log(`Creating launch campaign for Day ${email.day}: "${email.subject}" (Scheduled: ${scheduledAt})`);

    try {
        const response = await fetch('https://api.brevo.com/v3/emailCampaigns', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': BREVO_API_KEY,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                tag: 'reengagement_launch',
                sender: { name: 'Smart Hustler Marketing', email: 'ken@smarthustlermarketing.com' },
                name: `[LAUNCH] ${email.subject}`,
                subject: email.subject,
                htmlContent: htmlContent,
                recipients: { listIds: [51] }, // Targeted at your existing list
                scheduledAt: scheduledAt
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(JSON.stringify(error));
        }

        const data = await response.json();
        console.log(`✅ Success! Campaign ID: ${data.id}`);
    } catch (error) {
        console.error(`❌ Failed to create campaign:`, error.message);
    }
}

async function run() {
    console.log(`🚀 Preparing to launch ${emails.length} re-engagement emails to list...`);

    // Process sequentially
    for (let i = 0; i < emails.length; i++) {
        await createCampaign(emails[i], i);
        // Small delay
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('🎉 Launch sequence scheduled!');
}

run();
