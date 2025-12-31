const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const BREVO_API_KEY = process.env.BREVO_API_KEY;

if (!BREVO_API_KEY) {
    console.error('❌ Error: BREVO_API_KEY is missing in .env.local');
    process.exit(1);
}

async function tagCampaigns() {
    console.log('🏷️  Starting Campaign Tagging Process...');

    let hasMore = true;
    let offset = 0;
    const limit = 50;

    let updatedCount = 0;

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
            let newTag = null;

            // Rule 1: Storytime with Ms. Erica -> 'storytime'
            if (c.sender.email === 'info@storytimewithmserica.com' && c.tag !== 'storytime') {
                newTag = 'storytime';
            }

            // Rule 2: Smart Hustler leftovers -> 'smarthustler'
            // We only tag if currently untagged to avoid overriding special tags like 'reengagement_launch'
            else if (c.sender.email === 'ken@smarthustlermarketing.com' && (!c.tag || c.tag === '')) {
                newTag = 'smarthustler';
            }

            if (newTag) {
                console.log(`✏️  Updating [${c.id}] "${c.name}" -> ${newTag}...`);

                // Note: The endpoint to update a campaign often varies by status (draft vs scheduled).
                // Brevo V3 usually allows updating settings for Draft/Suspended.
                // If Scheduled, we might need to suspend first, but let's try direct update first.

                const updateResp = await fetch(`https://api.brevo.com/v3/emailCampaigns/${c.id}`, {
                    method: 'PUT',
                    headers: {
                        'api-key': BREVO_API_KEY,
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ tag: newTag })
                });

                if (updateResp.ok || updateResp.status === 204) {
                    console.log('   ✅ Success');
                    updatedCount++;
                } else {
                    const err = await updateResp.json();
                    console.log(`   ❌ Failed: ${JSON.stringify(err)}`);

                    // If failed because it's scheduled/queued, we might skip or warn.
                    // Usually you can't edit a scheduled campaign without suspending.
                }
            }
        }

        if (data.campaigns.length < limit) hasMore = false;
        else offset += limit;
    }

    console.log(`\n🎉 Done! Updated tags for ${updatedCount} campaigns.`);
}

tagCampaigns();
