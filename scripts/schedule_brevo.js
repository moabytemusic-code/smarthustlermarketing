const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const BREVO_API_KEY = process.env.BREVO_API_KEY;

if (!BREVO_API_KEY) {
    console.error('❌ Error: BREVO_API_KEY is missing in .env.local');
    process.exit(1);
}

const EMAILS_PATH = path.join(__dirname, '../src/content/campaigns/emails.json');
const emails = JSON.parse(fs.readFileSync(EMAILS_PATH, 'utf8'));

const OFFERS_PATH = path.join(__dirname, '../src/content/campaigns/affiliate_offers.json');
let offers = [];
try {
    offers = JSON.parse(fs.readFileSync(OFFERS_PATH, 'utf8'));
} catch (error) {
    console.warn('⚠️ Warning: Could not load affiliate_offers.json. Skipping link injection.');
}

// Helper function to format date for Brevo (ISO string)
// OFFSET: We start 4 days from now to allow the 3-day Re-engagement campaign to finish first.
// Helper to find the next business day (Mon-Fri)
// OFFSET: We start 4 days from now to allow the 3-day Re-engagement campaign to finish first.
const CAMPAIGN_START_OFFSET = 4;
let currentDate = new Date();
currentDate.setDate(currentDate.getDate() + CAMPAIGN_START_OFFSET);

const getNextBusinessDay = () => {
    // Increment by 1 day first
    currentDate.setDate(currentDate.getDate() + 1);

    // If Sat (6) or Sun (0), keep adding days until Mon (1)
    while (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // Create a copy to return properly
    const date = new Date(currentDate);
    date.setHours(9, 0, 0, 0); // Schedule for 9:00 AM
    return date.toISOString();
};

// Helper to delete old campaigns to avoid duplicates
async function deleteOldCampaigns() {
    console.log('🧹 Cleaning up old "smarthustler" campaigns...');
    try {
        const response = await fetch(`https://api.brevo.com/v3/emailCampaigns?status=scheduled&limit=50&sort=desc`, {
            method: 'GET',
            headers: { 'api-key': BREVO_API_KEY }
        });

        const data = await response.json();

        if (data.campaigns) {
            const toDelete = data.campaigns.filter(c => c.tag === 'smarthustler');
            console.log(`Found ${toDelete.length} old campaigns to delete.`);

            for (const campaign of toDelete) {
                await fetch(`https://api.brevo.com/v3/emailCampaigns/${campaign.id}`, {
                    method: 'DELETE',
                    headers: { 'api-key': BREVO_API_KEY }
                });
                process.stdout.write('.');
            }
            console.log('\nCleaned up.');
        }
    } catch (error) {
        console.error('Warning: Could not clean up old campaigns:', error.message);
    }
}

function processEmailContent(emailContent, offerIndex) {
    let processedContent = emailContent;

    // 1. Replace Placeholders
    offers.forEach(offer => {
        // Create a placeholder from the name, e.g., [INSERT_BREVO_LINK]
        const placeholder = `[INSERT_${offer.name.toUpperCase().replace(/[^A-Z0-9]/g, '_')}_LINK]`;
        if (processedContent.includes(placeholder)) {
            processedContent = processedContent.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), offer.affiliate_link);
        }
    });

    // 2. Add Featured Resource (Round Robin)
    const featuredOffer = offers[offerIndex % offers.length];
    if (featuredOffer) {
        const featuredBlock = `
            <div style="margin-top: 30px; padding: 20px; background-color: #f8fafc; border-left: 4px solid #fbbf24; border-radius: 4px;">
                <h3 style="margin-top: 0; color: #1e293b; font-size: 18px;">💡 Tool of the Week: ${featuredOffer.name}</h3>
                <p style="color: #475569; font-size: 14px;">${featuredOffer.description}</p>
                <a href="${featuredOffer.affiliate_link}" style="display: inline-block; margin-top: 10px; color: #2563eb; font-weight: bold; text-decoration: none;">Check it out &rarr;</a>
            </div>
        `;
        processedContent += featuredBlock;
    }

    return processedContent;
}

async function createCampaign(email, index) {
    // Get next business day from the global cursor
    const scheduledAt = getNextBusinessDay();

    // Inject links and featured product
    const enhancedContent = processEmailContent(email.content, index);

    // HTML Template with Logo
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
        <div style="text-align: center; padding: 20px; background-color: #0f172a;">
            <img src="https://smarthustlermarketing.com/logo.png" alt="Smart Hustler Marketing" style="max-height: 80px; width: auto;">
        </div>
        <div style="padding: 20px; background-color: #ffffff;">
            ${enhancedContent}
        </div>
        <div style="text-align: center; padding: 20px; color: #666; font-size: 12px; border-top: 1px solid #eee;">
            <p>© ${new Date().getFullYear()} Smart Hustler Marketing. All rights reserved.</p>
            <p>You received this email because you signed up on our website.</p>
            <a href="{{ mirror }}" style="color: #666;">View in browser</a> | <a href="{{ unsubscribe }}" style="color: #666;">Unsubscribe</a>
        </div>
    </body>
    </html>
    `;

    console.log(`Creating campaign for Day ${email.day}: "${email.subject}" (Scheduled: ${scheduledAt})`);

    try {
        const response = await fetch('https://api.brevo.com/v3/emailCampaigns', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': BREVO_API_KEY,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                tag: 'smarthustler',
                sender: { name: 'Smart Hustler Marketing', email: 'ken@smarthustlermarketing.com' },
                name: `[Day ${email.day}] ${email.subject}`,
                subject: email.subject,
                htmlContent: htmlContent,
                recipients: { listIds: [51] }, // Updated to List ID 51
                scheduledAt: scheduledAt
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(JSON.stringify(error));
        }

        const data = await response.json();
        console.log(`✅ Success! Campaign ID: ${data.id}`);
    } catch (error) {
        console.error(`❌ Failed to create campaign:`, error.message);
    }
}

async function run() {
    await deleteOldCampaigns(); // Clean up first
    console.log(`Found ${emails.length} emails to schedule...`);

    // Process sequentially to avoid rate limits
    for (let i = 0; i < emails.length; i++) {
        await createCampaign(emails[i], i);
        // Small delay to be safe
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('🎉 All emails processed!');
}

run();
