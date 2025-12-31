const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const BREVO_API_KEY = process.env.BREVO_API_KEY;

if (!BREVO_API_KEY) {
    console.error('❌ Error: BREVO_API_KEY is missing in .env.local');
    process.exit(1);
}

async function checkStatus() {
    console.log('🕵️‍♂️ Checking Brevo Account Status...');

    try {
        // 1. Check Account Details
        console.log('Fetching account details...');
        const accountResp = await fetch('https://api.brevo.com/v3/account', {
            method: 'GET',
            headers: { 'api-key': BREVO_API_KEY }
        });
        const accountData = await accountResp.json();

        if (!accountResp.ok) {
            console.error('❌ Failed to fetch account details:', accountData);
        } else {
            console.log('✅ Account Info:');
            console.log(`   - Email: ${accountData.email}`);
            console.log(`   - Plan: ${accountData.plan ? accountData.plan.type : 'Unknown'}`);
            if (accountData.marketingAutomation) {
                console.log(`   - Marketing Automation Enabled: ${accountData.marketingAutomation.enabled}`);
            }
        }

        // 2. Check Campaign Stats
        console.log('\nFetching ALL campaigns for analysis...');

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
            running: 0,
            total: 0
        };

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

            data.campaigns.forEach(c => {
                stats.total++;
                if (stats[c.status] !== undefined) stats[c.status]++;
                else stats[c.status] = 1;
            });

            if (data.campaigns.length < limit) hasMore = false;
            else offset += limit;
        }

        console.log('📊 Campaign Status Totals:');
        console.log(JSON.stringify(stats, null, 2));

    } catch (error) {
        console.error('❌ Unexpected Error:', error);
    }
}

checkStatus();
