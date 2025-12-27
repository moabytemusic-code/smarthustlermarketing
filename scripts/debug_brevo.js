const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const BREVO_API_KEY = process.env.BREVO_API_KEY;

if (!BREVO_API_KEY) {
    console.error('❌ Error: BREVO_API_KEY is missing in .env.local');
    process.exit(1);
}

async function reportAndNuke() {
    console.log('🕵️‍♂️ Fetching ALL campaigns for analysis...');

    let hasMore = true;
    let offset = 0;
    const limit = 50;

    const stats = {
        scheduled: 0,
        queued: 0,
        suspended: 0,
        draft: 0,
        sent: 0,
        archive: 0,
        total: 0
    };

    const toAction = [];

    while (hasMore) {
        try {
            const response = await fetch(`https://api.brevo.com/v3/emailCampaigns?limit=${limit}&offset=${offset}`, {
                method: 'GET',
                headers: { 'api-key': BREVO_API_KEY }
            });

            const data = await response.json();

            if (!data.campaigns || data.campaigns.length === 0) {
                hasMore = false;
                break;
            }

            data.campaigns.forEach(c => {
                stats.total++;
                if (stats[c.status] !== undefined) stats[c.status]++;
                else stats[c.status] = 1;

                // Identify targets
                if (c.tag === 'smarthustler' || (c.name.includes('[Day') && c.sender.email === 'ken@smarthustlermarketing.com')) {
                    if (['scheduled', 'queued'].includes(c.status)) {
                        toAction.push(c);
                    }
                }
            });

            if (data.campaigns.length < limit) hasMore = false;
            else offset += limit;

        } catch (error) {
            console.error(error);
            hasMore = false;
        }
    }

    console.log('📊 Campaign Status Report:');
    console.log(JSON.stringify(stats, null, 2));

    console.log(`🎯 Identified ${toAction.length} 'scheduled' or 'queued' Smart Hustler campaigns to Suspend/Delete.`);

    if (toAction.length > 0) {
        console.log('⚡️ Executing Suspend Order...');
        for (const c of toAction) {
            process.stdout.write(`Suspending [${c.id}] ${c.status}... `);
            const suspendResp = await fetch(`https://api.brevo.com/v3/emailCampaigns/${c.id}/status`, {
                method: 'PUT',
                headers: {
                    'api-key': BREVO_API_KEY,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ status: 'suspended' })
            });
            if (suspendResp.ok || suspendResp.status === 204) console.log('✅');
            else console.log(`❌ ${suspendResp.status}`);
        }
    }
}

reportAndNuke();
