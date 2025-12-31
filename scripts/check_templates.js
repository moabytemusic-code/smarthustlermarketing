const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const BREVO_API_KEY = process.env.BREVO_API_KEY;

if (!BREVO_API_KEY) {
    console.error('❌ Error: BREVO_API_KEY is missing in .env.local');
    process.exit(1);
}

async function listTemplates() {
    console.log('📋 Listing Brevo SMTP Templates...');

    let offset = 0;
    const limit = 50;
    let hasMore = true;
    const templates = [];

    while (hasMore) {
        const response = await fetch(`https://api.brevo.com/v3/smtp/templates?limit=${limit}&offset=${offset}`, {
            headers: { 'api-key': BREVO_API_KEY }
        });

        const data = await response.json();

        if (data.templates) {
            templates.push(...data.templates);
        }

        if (!data.templates || data.count < limit) {
            hasMore = false;
        } else {
            offset += limit;
        }
    }

    console.log(`Found ${templates.length} total templates.\n`);

    // Filter for Smart Hustler related ones
    const smartHustlerTemplates = templates.filter(t =>
        t.name.includes('Smart Hustler') ||
        t.name.includes('[Day') ||
        (t.tag && t.tag.includes('smarthustler'))
    );

    console.log(`🔍 Smart Hustler Templates (${smartHustlerTemplates.length}):`);
    smartHustlerTemplates.forEach(t => {
        console.log(`  [${t.id}] ${t.name} (Status: ${t.isActive ? 'Active' : 'Inactive'})`);
    });

}

listTemplates();
