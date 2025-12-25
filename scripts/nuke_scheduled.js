const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const BREVO_API_KEY = process.env.BREVO_API_KEY;

if (!BREVO_API_KEY) {
    console.error('❌ Error: BREVO_API_KEY is missing in .env.local');
    process.exit(1);
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function nukeScheduledCampaigns() {
    console.log('🕵️‍♂️ Fetching campaigns (limit 50 per batch) with rate limiting...');

    let hasMore = true;
    let offset = 0;
    const limit = 50;

    while (hasMore) {
        try {
            // Fetch batch
            const response = await fetch(`https://api.brevo.com/v3/emailCampaigns?limit=${limit}&offset=${offset}`, {
                method: 'GET',
                headers: { 'api-key': BREVO_API_KEY }
            });

            if (response.status === 429) {
                console.log('⏳ Rate limit hit (429). Waiting 10 seconds...');
                await sleep(10000);
                continue; // Retry same request
            }

            if (!response.ok) {
                const text = await response.text();
                console.error(`❌ API Error (${response.status}): ${text}`);
                hasMore = false;
                break;
            }

            const data = await response.json();

            if (!data.campaigns || data.campaigns.length === 0) {
                console.log('✅ No more campaigns found.');
                hasMore = false;
                break;
            }

            console.log(`📉 Batch: Found ${data.campaigns.length} campaigns.`);

            // Filter
            const toDelete = data.campaigns.filter(c => {
                const isSmartHustler = (c.tag === 'smarthustler') ||
                    (c.name.includes('[Day') && (c.name.includes('Smart Hustler') || c.sender.email === 'ken@smarthustlermarketing.com'));

                const isLive = c.status === 'scheduled' || c.status === 'queued' || c.status === 'draft' || c.status === 'suspended';

                return isSmartHustler && isLive;
            });

            if (toDelete.length > 0) {
                console.log(`🗑️ Deleting ${toDelete.length} campaigns in this batch...`);
                for (const campaign of toDelete) {
                    process.stdout.write(`Pruning [${campaign.id}] (${campaign.status})... `);

                    // 1. Suspend if needed
                    if (campaign.status === 'scheduled' || campaign.status === 'queued') {
                        const suspendResp = await fetch(`https://api.brevo.com/v3/emailCampaigns/${campaign.id}/status`, {
                            method: 'PUT',
                            headers: {
                                'api-key': BREVO_API_KEY,
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify({ status: 'suspended' })
                        });
                        if (suspendResp.status === 429) {
                            console.log('⏳ (Rate Limit on Suspend) Waiting 5s...');
                            await sleep(5000);
                            // Retry suspend? simplistic script... assume it failed and try delete or loop will catch it next time.
                        }
                    }

                    await sleep(200); // Be gentle

                    // 2. Delete
                    const delResp = await fetch(`https://api.brevo.com/v3/emailCampaigns/${campaign.id}`, {
                        method: 'DELETE',
                        headers: { 'api-key': BREVO_API_KEY }
                    });

                    if (delResp.ok) {
                        console.log('✅ Deleted');
                    } else if (delResp.status === 429) {
                        console.log('⏳ (Rate Limit on Delete) Waiting 5s...');
                        await sleep(5000);
                    } else {
                        const err = await delResp.text(); // Use text in case json fails
                        console.log(`❌ Failed: ${err}`);
                    }

                    await sleep(300); // Be gentle
                }
            } else {
                console.log('No deletable campaigns in this batch.');
            }

            if (data.campaigns.length < limit) {
                hasMore = false;
            } else {
                if (toDelete.length > 0) {
                    offset = 0;
                    console.log('♻️ Re-fetching page 0 since items were deleted...');
                } else {
                    offset += limit;
                    console.log(`👉 Moving to next page (Offset: ${offset})...`);
                }
            }

            await sleep(1000); // Wait 1s between batches

        } catch (error) {
            console.error('❌ Error during cleanup:', error.message);
            hasMore = false;
        }
    }

    console.log('\n✨ Cleanup complete!');
}

nukeScheduledCampaigns();
