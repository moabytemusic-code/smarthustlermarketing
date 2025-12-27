const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const BREVO_API_KEY = process.env.BREVO_API_KEY;

if (!BREVO_API_KEY) {
    console.error('❌ Error: BREVO_API_KEY is missing in .env.local');
    process.exit(1);
}

async function testQuota() {
    console.log('🧪 Testing Brevo Campaign Quota...');

    const testCampaign = {
        name: `[TEST] Quota Check ${Date.now()}`,
        subject: "Quota Test",
        sender: { name: "Ken", email: "ken@smarthustlermarketing.com" },
        type: "classic",
        htmlContent: "<html><body><p>Test</p></body></html>",
        recipients: { listIds: [51] }, // Using valid list ID 51 
        // We will schedule it for tomorrow
        scheduledAt: new Date(Date.now() + 86400000).toISOString()
    };

    try {
        const response = await fetch('https://api.brevo.com/v3/emailCampaigns', {
            method: 'POST',
            headers: {
                'api-key': BREVO_API_KEY,
                'content-type': 'application/json'
            },
            body: JSON.stringify(testCampaign)
        });

        const data = await response.json();

        if (response.ok) {
            console.log(`✅ SUCCESS! Campaign created. ID: ${data.id}`);
            console.log('🎉 This means "Suspended" campaigns do NOT consume your scheduled quota.');

            // Clean up: Delete the test campaign
            console.log('🧹 Cleaning up test campaign...');
            const del = await fetch(`https://api.brevo.com/v3/emailCampaigns/${data.id}`, {
                method: 'DELETE',
                headers: { 'api-key': BREVO_API_KEY }
            });
            if (del.ok) console.log('✅ Test campaign deleted.');

        } else {
            console.log(`❌ FAILURE. Quota likely full.`);
            console.log(`Error: ${JSON.stringify(data)}`);

            // If the error is quota, we confirm we MUST delete suspended campaigns.
        }

    } catch (error) {
        console.error('Test failed with network error:', error);
    }
}

testQuota();
