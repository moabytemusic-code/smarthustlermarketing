const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const BREVO_API_KEY = process.env.BREVO_API_KEY;

if (!BREVO_API_KEY) {
    console.error('❌ Error: BREVO_API_KEY is missing in .env.local');
    process.exit(1);
}

async function checkSmartHustlerStatus() {
    console.log('🕵️‍♂️ Analyzing Smart Hustler Campaign Status...');

    let hasMore = true;
    let offset = 0;
    const limit = 50;

    const campaigns = [];
    const stats = {
        total: 0,
        byStatus: {},
        recipientLists: new Set(),
        scheduledDates: []
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

        for (const c of data.campaigns) {
            // Filter only for smarthustler related tags
            const tags = ['smarthustler', 'reengagement_launch'];
            if (tags.includes(c.tag) || c.sender.email === 'ken@smarthustlermarketing.com') {
                stats.total++;
                campaigns.push(c);

                // Status Counts
                stats.byStatus[c.status] = (stats.byStatus[c.status] || 0) + 1;

                // Recipients (Brevo returns recipients summary usually, look for lists)
                // Note: The list structure in API response might vary, usually `recipients: { lists: [id, id] }`
                if (c.recipients && c.recipients.lists) {
                    c.recipients.lists.forEach(id => stats.recipientLists.add(id));
                }

                // Scheduled Dates
                if (c.scheduledAt) {
                    stats.scheduledDates.push({
                        id: c.id,
                        name: c.name,
                        date: new Date(c.scheduledAt),
                        status: c.status
                    });
                }
            }
        }

        if (data.campaigns.length < limit) hasMore = false;
        else offset += limit;
    }

    // Sort scheduled dates
    stats.scheduledDates.sort((a, b) => a.date - b.date);

    console.log('\n📊 STATUS SUMMARY');
    console.log('-----------------');
    console.log(`Total Campaigns: ${stats.total}`);
    console.log('By Status:');
    for (const [status, count] of Object.entries(stats.byStatus)) {
        console.log(`  - ${status}: ${count}`);
    }

    console.log('\n📧 RECIPIENTS');
    console.log('-----------------');
    if (stats.recipientLists.size > 0) {
        console.log(`Targeting List IDs: ${Array.from(stats.recipientLists).join(', ')}`);
        // Note: We'd need another API call to get List Names, but IDs are a good start.
    } else {
        console.log('No specific list IDs found in campaign summaries (might be segment based or empty).');
    }

    console.log('\n🗓️ SCHEDULED LAUNCHES');
    console.log('-----------------');
    if (stats.scheduledDates.length > 0) {
        const first = stats.scheduledDates[0];
        const last = stats.scheduledDates[stats.scheduledDates.length - 1];

        console.log(`Timeline: ${first.date.toISOString().split('T')[0]} to ${last.date.toISOString().split('T')[0]}`);

        console.log('\nNext 10 Scheduled Campaigns:');
        stats.scheduledDates.slice(0, 10).forEach(s => {
            console.log(`  [${s.date.toISOString().replace('T', ' ').substring(0, 16)}] ${s.name} (${s.status})`);
        });

        if (stats.scheduledDates.length > 10) {
            console.log(`  ... and ${stats.scheduledDates.length - 10} more.`);
        }
    } else {
        console.log('No campaigns are currently scheduled with a future date.');
    }
}

checkSmartHustlerStatus();
