const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const BREVO_API_KEY = process.env.BREVO_API_KEY;

if (!BREVO_API_KEY) {
    console.error('❌ Error: BREVO_API_KEY is missing in .env.local');
    process.exit(1);
}

async function detailedAudit() {
    console.log('🕵️‍♂️ Detailed Audit - Grouping by Sender & Tag...');

    let hasMore = true;
    let offset = 0;
    const limit = 50;

    const groups = {};

    while (hasMore) {
        const response = await fetch(`https://api.brevo.com/v3/emailCampaigns?limit=${limit}&offset=${offset}`, {
            method: 'GET',
            headers: { 'api-key': BREVO_API_KEY }
        });

        const data = await response.json();

        if (!data.campaigns || data.campaigns.length === 0) {
            hasMore = false;
            break;
        }

        for (const c of data.campaigns) {
            const key = `${c.sender.name} <${c.sender.email}> [Tag: ${c.tag || 'NONE'}]`;

            if (!groups[key]) {
                groups[key] = {
                    count: 0,
                    exampleId: c.id,
                    exampleName: c.name
                };
            }
            groups[key].count++;
        }

        if (data.campaigns.length < limit) hasMore = false;
        else offset += limit;
    }

    console.log('\n📊 Campaign Groups Found:');
    for (const [key, info] of Object.entries(groups)) {
        console.log(`\nGroup: ${key}`);
        console.log(`  Count: ${info.count}`);
        console.log(`  Example: [${info.exampleId}] ${info.exampleName}`);
    }
}

detailedAudit();
