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

const EMAILS_PATH = path.join(__dirname, '../src/content/campaigns/emails.json');
const emails = JSON.parse(fs.readFileSync(EMAILS_PATH, 'utf8'));

// Helper function to format date for Brevo (ISO string)
const getScheduledDate = (daysFromNow) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    date.setHours(9, 0, 0, 0); // Schedule for 9:00 AM
    return date.toISOString();
};

async function createCampaign(email, index) {
    const scheduledAt = getScheduledDate(email.day);

    console.log(`Creating campaign for Day ${email.day}: "${email.subject}" (Scheduled: ${scheduledAt})`);

    try {
        const response = await fetch('https://api.brevo.com/v3/emailCampaigns', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': BREVO_API_KEY,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                tag: 'smarthustler',
                sender: { name: 'Smart Hustler Marketing', email: 'ken@smarthustlermarketing.com' }, // Default sender, user should update if needed
                name: `[Day ${email.day}] ${email.subject}`,
                subject: email.subject,
                htmlContent: email.content,
                recipients: { listIds: [51] }, // Sending to List 51 (User specified)
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
    console.log(`Found ${emails.length} emails to schedule...`);

    // Process sequentially to avoid rate limits
    for (let i = 0; i < emails.length; i++) {
        await createCampaign(emails[i], i);
        // Small delay to be safe
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('🎉 All emails processed!');
}

run();
