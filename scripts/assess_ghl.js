const https = require('https');

// Token 2
const GHL_TOKEN = 'pit-a66fe231-001b-4468-9f05-21621693c184';
const LOCATION_ID = 'DawGQBsPRNLbG4WtJ9Ir';

async function assessGHL() {
    console.log(`🕵️‍♂️ Connecting to GoHighLevel (Location: ${LOCATION_ID})...`);

    const headers = {
        'Authorization': `Bearer ${GHL_TOKEN}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json'
    };

    try {
        console.log('--- Checking Workflows ---');
        const wfResp = await fetch(`https://services.leadconnectorhq.com/workflows/?locationId=${LOCATION_ID}`, { headers });

        if (wfResp.ok) {
            const wfData = await wfResp.json();
            console.log(`✅ Connection Successful!`);
            console.log(`📊 Found ${wfData.workflows?.length || 0} Workflows.`);
            if (wfData.workflows && wfData.workflows.length > 0) {
                console.log('Samples:', wfData.workflows.slice(0, 3).map(w => w.name));
            }
        } else {
            console.log(`⚠️ Workflow Access Error: ${wfResp.status}`);
            console.log(await wfResp.text());
        }

        console.log('\n--- Checking Contacts ---');
        const contactsResp = await fetch(`https://services.leadconnectorhq.com/contacts/?locationId=${LOCATION_ID}&limit=1`, { headers });
        if (contactsResp.ok) {
            const cData = await contactsResp.json();
            console.log(`👥 Total Contacts: ${cData.meta?.total || 'Unknown'}`);
        } else {
            console.log(`⚠️ Contact Access Error: ${contactsResp.status}`);
        }

    } catch (error) {
        console.error('❌ Connection Failed:', error);
    }
}

assessGHL();
