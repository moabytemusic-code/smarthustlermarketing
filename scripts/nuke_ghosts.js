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

async function nukeGhosts() {
    console.log('👻 Detecting Ghost Campaigns (Scheduled with 0 Recipients)...');

    let offset = 0;
    const limit = 50;
    let deletedCount = 0;

    try {
        // Fetch campaigns - specifically looking for Scheduled ones
        const response = await fetch(`https://api.brevo.com/v3/emailCampaigns?status=scheduled&limit=${limit}&offset=${offset}`, {
            method: 'GET',
            headers: { 'api-key': BREVO_API_KEY }
        });

        const data = await response.json();

        if (!data.campaigns) {
            console.log('✅ No scheduled campaigns found.');
            return;
        }

        console.log(`🔎 Scanning ${data.campaigns.length} scheduled campaigns...`);

        // Filter for "Ghosts"
        const ghosts = data.campaigns.filter(c => {
            // Check for smart hustler tag OR just check for 0 recipients if user is sure
            const isSmartHustler = (c.tag === 'smarthustler') || (c.name.includes('Smart Hustler'));

            // Brevo API doesn't always return recipient count in the list view, 
            // but we can infer it if it was recently created and has issues.
            // User said "No recipients".
            // Let's rely on the list view data if available, or fetch detail.
            // Actually, the safest bet for "duplicates created today" is checking creation date + name.

            const createdAt = new Date(c.createdAt);
            const isToday = (Date.now() - createdAt.getTime()) < (24 * 60 * 60 * 1000); // Created in last 24h

            // User said "With no recipients". 
            // In the list response, 'recipients' object might be simplified.
            const hasNoLists = !c.recipients || !c.recipients.lists || c.recipients.lists.length === 0;

            return isSmartHustler && isToday && hasNoLists;
        });

        if (ghosts.length === 0) {
            console.log("✅ No 'Ghost' campaigns (Created Today + No Lists) found via API criteria.");
            console.log("Listing all smart hustler campaigns found for manual check:");
            data.campaigns.filter(c => c.tag === 'smarthustler').forEach(c => {
                console.log(`- [${c.id}] ${c.name} (Lists: ${c.recipients?.lists?.length || 0})`);
            });
            return;
        }

        console.log(`📉 Found ${ghosts.length} GHOST campaigns to nuke.`);

        for (const campaign of ghosts) {
            process.stdout.write(`👻 Busting [${campaign.id}] "${campaign.name}"... `);

            // 1. Suspend first (Required for scheduled)
            const suspendResp = await fetch(`https://api.brevo.com/v3/emailCampaigns/${campaign.id}/status`, {
                method: 'PUT',
                headers: { 'api-key': BREVO_API_KEY, 'content-type': 'application/json' },
                body: JSON.stringify({ status: 'suspended' })
            });

            if (suspendResp.ok || suspendResp.status === 204) {
                await sleep(500); // Wait for propagation
            }

            // 2. Delete
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

            await sleep(200);
        }

    } catch (error) {
        console.error('❌ Error during cleanup:', error.message);
    }

    console.log(`\n✨ Ghostbusting complete! Deleted ${deletedCount} campaigns.`);
}

nukeGhosts();
