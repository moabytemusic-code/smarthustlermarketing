const https = require('https');

const GHL_TOKEN = 'pit-f18ff20a-96b9-4d9e-bc3c-d15485c9727d';
const LOCATION_ID = 'HZTXtGaIT5YxJdFfY9w4';

// Use Account #1 (Fresh Account)

const headers = {
    'Authorization': `Bearer ${GHL_TOKEN}`,
    'Version': '2021-07-28',
    'Content-Type': 'application/json'
};

const customFields = [
    {
        name: 'Freedom Number (Daily)',
        dataType: 'NUMERICAL', // Changed from MONETARY (buggy)
        placeholder: '300.00'
    },
    {
        name: 'Freedom Number (Yearly)',
        dataType: 'NUMERICAL',
        placeholder: '100000.00'
    },
    {
        name: 'Niche Finder Result',
        dataType: 'TEXT', // Already created successfully
        placeholder: 'Dog Walking App'
    },
    {
        name: 'Tool Usage Count',
        dataType: 'NUMERICAL', // Already created successfully
        placeholder: '0'
    }
];

async function setupGHL() {
    console.log('🏗️ Setting up Custom Fields in GoHighLevel...');

    for (const field of customFields) {
        process.stdout.write(`Creating field: ${field.name}... `);

        try {
            const response = await fetch(`https://services.leadconnectorhq.com/locations/${LOCATION_ID}/customFields`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(field)
            });

            if (response.ok) {
                const data = await response.json();
                console.log(`✅ Success! ID: ${data.id}`);
            } else {
                // If 409, it exists
                const err = await response.json();
                console.log(`⚠️ ${err.message || response.statusText}`);
            }
        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
        }
    }

    console.log('\n✨ GHL Setup Complete. Your CRM is ready to receive Tool Data.');
}

setupGHL();
