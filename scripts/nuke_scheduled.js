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
    console.log('🕵️‍♂️ Fetching campaigns to free up quota...');

    let offset = 0;
    const limit = 50;
    let deletedCount = 0;

    while (true) {
        try {
            // Fetch campaigns
            console.log(`\n🔄 Fetching batch (Limit: ${limit}, Offset: ${offset})...`);
            const response = await fetch(`https://api.brevo.com/v3/emailCampaigns?limit=${limit}&offset=0`, {
                method: 'GET',
                headers: { 'api-key': BREVO_API_KEY }
            });

            if (!response.ok) {
                if (response.status === 429) {
                    console.log('⏳ Rate limit hit (429). Pausing for 10 seconds...');
                    await sleep(10000);
                    continue;
                }
                console.log(`❌ API Error: ${response.status} ${response.statusText}`);
                const text = await response.text();
                console.log(`Body: ${text}`);
                break;
            }

            const data = await response.json();

            if (!data.campaigns || data.campaigns.length === 0) {
                console.log('✅ No more campaigns found.');
                break;
            }

            // Filter Smart Hustler campaigns that are taking up quota
            const toDelete = data.campaigns.filter(c => {
                const isSmartHustler = (c.tag === 'smarthustler') ||
                    (c.name.includes('[Day') && (c.name.includes('Smart Hustler') || c.sender.email === 'ken@smarthustlermarketing.com'));

                // We need to delete scheduled, queued, and suspended ones to free quota
                const isLive = ['scheduled', 'queued', 'suspended', 'draft'].includes(c.status);
                return isSmartHustler && isLive;
            });

            if (toDelete.length === 0) {
                console.log('✅ No matching Smart Hustler campaigns in this batch.');
                // If we found campaigns but none matched, we might need to paginate?
                // But since we are deleting, the offset might be tricky.
                // If we didn't delete anything, we should probably increase offset to look further.
                if (data.campaigns.length < limit) break; // End of list
                offset += limit;
                continue;
            }

            console.log(`🗑️  Found ${toDelete.length} campaigns to clean up in this batch.`);

            for (const campaign of toDelete) {
                process.stdout.write(`cleaning [${campaign.id}] (${campaign.status})... `);

                // 1. If Scheduled/Queued, we must SUSPEND to stop sending
                if (['scheduled', 'queued'].includes(campaign.status)) {
                    const suspendResp = await fetch(`https://api.brevo.com/v3/emailCampaigns/${campaign.id}/status`, {
                        method: 'PUT',
                        headers: { 'api-key': BREVO_API_KEY, 'content-type': 'application/json' },
                        body: JSON.stringify({ status: 'suspended' })
                    });

                    if (suspendResp.status === 204) {
                        process.stdout.write('(Suspended) -> ');
                        await sleep(500); // Wait for Brevo to process state change
                    }
                }

                // 3. Delete
                const delResp = await fetch(`https://api.brevo.com/v3/emailCampaigns/${campaign.id}`, {
                    method: 'DELETE',
                    headers: { 'api-key': BREVO_API_KEY }
                });

                if (delResp.ok || delResp.status === 204) {
                    console.log('✅ Deleted');
                    deletedCount++;
                } else {
                    let errText = 'Unknown Error';
                    try {
                        errText = await delResp.text();
                    } catch (e) { }
                    console.log(`❌ Failed: ${delResp.status} ${errText}`);
                }

                await sleep(250); // Rate limit protection
            }

            // If we deleted items, reset offset to 0 to re-check from top
            if (deletedCount > 0) offset = 0;

        } catch (error) {
            console.error('❌ Error during cleanup batch:', error.message);
            await sleep(2000); // Pause on error
        }
    }

    console.log(`\n✨ Cleanup complete! Freed ${deletedCount} slots.`);
}

nukeScheduledCampaigns();
