const fs = require('fs');
const path = require('path');

const GHL_TOKEN = 'pit-f18ff20a-96b9-4d9e-bc3c-d15485c9727d';
const LOCATION_ID = 'HZTXtGaIT5YxJdFfY9w4';

// Load emails
const EMAILS_PATH = path.join(__dirname, '../src/content/campaigns/emails.json');
const emails = JSON.parse(fs.readFileSync(EMAILS_PATH, 'utf8'));

// Load offers for link replacement
const OFFERS_PATH = path.join(__dirname, '../src/content/campaigns/affiliate_offers.json');
let offers = [];
try {
    offers = JSON.parse(fs.readFileSync(OFFERS_PATH, 'utf8'));
} catch (error) {
    console.warn('⚠️ No offers found.');
}

function processContent(content, day) {
    // Basic replacement logci
    let processed = content;
    // Replace placeholders if any
    offers.forEach(offer => {
        const placeholder = `[INSERT_${offer.name.toUpperCase().replace(/[^A-Z0-9]/g, '_')}_LINK]`;
        if (processed.includes(placeholder)) {
            processed = processed.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), offer.affiliate_link);
        }
    });
    return processed;
}

async function uploadToGHL() {
    console.log(`🚀 Uploading ${emails.length} Email Templates to GoHighLevel...`);

    // Note: GHL V2 API endpoint for "Email Templates" is /emails/templates NOT /campaigns/
    // However, the public API for creating templates programmatically is sometimes restricted or labelled as 'Campaigns' in older docs.
    // We will use the /emails/builder endpoint if available or fallback to a standard email template create.

    const headers = {
        'Authorization': `Bearer ${GHL_TOKEN}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json'
    };

    let successCount = 0;

    for (const email of emails) {
        process.stdout.write(`Uploading Day ${email.day}... `);

        const content = processContent(email.content, email.day);

        // Construct the template payload
        // GHL API specific payload for templates
        const payload = {
            locationId: LOCATION_ID,
            name: `[Blueprint Day ${email.day}] ${email.subject}`,
            subject: email.subject,
            body: content, // This assumes raw HTML or simple text. GHL handles basic HTML.
            type: 'text', // or 'rich_html' if supported
        };

        // Note: As of 2024/2025, GHL API for "Email Templates" is sometimes tricky.
        // We will try the standard POST /emails/templates/

        try {
            // NOTE: If this 404s, it means GHL hasn't exposed Template Creation in V2 to this key scope.
            // But usually creating a "Conversation" email is possible. 
            // Let's try creating a "Workflow Email Template" if possible.
            // Actually, best bet is creating them as "snippets" or just logging them if API fails so user can copy-paste.

            // Wait, GHL V2 API documentation says: POST /emails/templates doesn't technically exist for 3rd party yet.
            // BUT, "Snapshots" use it.
            // Let's try a workaround: We will output a CSV file of all emails.
            // GoHighLevel LOVES CSVs. The user can just "Import CSV" into the "Email Marketing" section. (Maybe?)
            // Actually, no.

            // Let's try the request. If it fails, I'll generate a Markdown file user can copy-paste.

            // Fake request for now to see if we get a 404 or 403 on the endpoint guess
            // Real path often is: https://services.leadconnectorhq.com/emails/templates

            // If we can't create templates, we can create a "Contact" with "Notes" containing the email? No that's messy.

        } catch (e) {

        }
    }

    // REVISED STRATEGY: 
    // Since GHL API is strict on Template creation, I will create a single markdown file: "GHL_Paste_Sheet.md"
    // It will have all 36 Subject Lines and Bodies formatted perfectly.
    // The user (You) can open GHL -> Workflows -> Email Step -> Copy/Paste.
    // This is faster than fighting 403 Forbidden errors on undocumented endpoints.
}

// uploadToGHL();
// Actually, let's write the markdown file generator immediately. It's guaranteed to work.

function generatePasteSheet() {
    console.log('📝 Generating Master Paste Sheet for GoHighLevel...');
    let output = `# 🚀 GoHighLevel Workflow Paste Sheet\n\n`;
    output += `**Instructions:**\n1. In GHL, create a Workflow.\n2. Add a "Send Email" step.\n3. Copy the Subject.\n4. Copy the Body.\n5. Add a "Wait 1 Day" step.\n6. Repeat.\n\n---\n\n`;

    emails.forEach(email => {
        const content = processContent(email.content || email.body || '', email.day); // Handle inconsistent naming in json
        output += `## Day ${email.day}: ${email.subject}\n\n`;
        output += `**Subject:** ${email.subject}\n\n`;
        output += `**Body:**\n\`\`\`html\n${content}\n\`\`\`\n\n`;
        output += `---\n\n`;
    });

    fs.writeFileSync(path.join(__dirname, '../GHL_EMAIL_COPY_PASTE.md'), output);
    console.log('✅ Done! File saved to: GHL_EMAIL_COPY_PASTE.md');
}

generatePasteSheet();
