const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const BREVO_API_KEY = process.env.BREVO_API_KEY;

if (!BREVO_API_KEY) {
    console.error('❌ Error: BREVO_API_KEY is missing in .env.local');
    process.exit(1);
}

async function checkStorytime() {
    console.log('🕵️‍♂️ Checking Access to "Storytime with Ms. Erica"...');

    let hasMore = true;
    let offset = 0;
    const limit = 50;

    let count = 0;
    let sample = null;

    while (hasMore) {
        // Tag 'storytime' was applied by us earlier
        const response = await fetch(`https://api.brevo.com/v3/emailCampaigns?limit=${limit}&offset=${offset}&tag=storytime`, {
            method: 'GET',
            headers: { 'api-key': BREVO_API_KEY }
        });

        const data = await response.json();

        if (!data.campaigns || data.campaigns.length === 0) {
            hasMore = false;
            break;
        }

        count += data.campaigns.length;
        if (!sample) sample = data.campaigns[0];

        if (data.campaigns.length < limit) hasMore = false;
        else offset += limit;
    }

    console.log(`✅ Access Confirmed.`);
    console.log(`   Total Campaigns: ${count}`);
    if (sample) {
        console.log(`   Sample: [${sample.id}] ${sample.name}`);
        console.log(`   Sender: ${sample.sender.name} <${sample.sender.email}>`);
    }
}

checkStorytime();
