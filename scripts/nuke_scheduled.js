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

    try {
        // Fetch campaigns
        const response = await fetch(`https://api.brevo.com/v3/emailCampaigns?limit=${limit}&offset=${offset}`, {
            method: 'GET',
            headers: { 'api-key': BREVO_API_KEY }
        });

        const data = await response.json();

        if (!data.campaigns) {
            console.log('✅ No campaigns found.');
            return;
        }

        // Filter Smart Hustler campaigns that are taking up quota
        const toDelete = data.campaigns.filter(c => {
            const isSmartHustler = (c.tag === 'smarthustler') ||
                (c.name.includes('[Day') && (c.name.includes('Smart Hustler') || c.sender.email === 'ken@smarthustlermarketing.com'));

            // We need to delete scheduled, queued, and suspended ones to free quota
            const isLive = ['scheduled', 'queued', 'suspended', 'draft'].includes(c.status);
            return isSmartHustler && isLive;
        });

        console.log(`� Found ${toDelete.length} campaigns to clean up.`);

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

            // 2. CRITICAL FIX: Update to 'draft' status if possible? 
            // Brevo API allows deleting 'draft', 'suspended', 'sent'. 
            // If delete fails on suspended, maybe we skip to just trying delete.

            // 3. Delete
            const delResp = await fetch(`https://api.brevo.com/v3/emailCampaigns/${campaign.id}`, {
                method: 'DELETE',
                headers: { 'api-key': BREVO_API_KEY }
            });

            if (delResp.ok || delResp.status === 204) {
                console.log('✅ Deleted');
                deletedCount++;
            } else {
                const err = await delResp.json();
                console.log(`❌ Failed: ${JSON.stringify(err)}`);
            }

            await sleep(200); // Rate limit protection
        }

    } catch (error) {
        console.error('❌ Error during cleanup:', error.message);
    }

    console.log(`\n✨ Cleanup complete! Freed ${deletedCount} slots.`);
}

nukeScheduledCampaigns();
