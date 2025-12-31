const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const BREVO_API_KEY = process.env.BREVO_API_KEY;

if (!BREVO_API_KEY) {
    console.error('❌ Error: BREVO_API_KEY is missing in .env.local');
    process.exit(1);
}

// CONFIGURATION
const START_DATE = '2025-12-30'; // Monday
const SKIP_WEEKENDS = true;
const DRY_RUN = true; // Set to false to actually apply changes
const SEND_TIME_UTC = '14:00:00.000Z'; // 9:00 AM EST approx

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url, options, retries = 5) {
    for (let i = 0; i < retries; i++) {
        const response = await fetch(url, options);
        if (response.status === 429) {
            const waitTime = (i + 1) * 3000;
            console.log(`⏳ Rate limit. Pausing ${waitTime / 1000}s...`);
            await sleep(waitTime);
            continue;
        }
        return response;
    }
    throw new Error('Max retries reached');
}

function getNextValidDate(currentDate) {
    let d = new Date(currentDate);
    // Add 1 day
    d.setDate(d.getDate() + 1);

    if (SKIP_WEEKENDS) {
        // 0 = Sunday, 6 = Saturday
        while (d.getDay() === 0 || d.getDay() === 6) {
            d.setDate(d.getDate() + 1);
        }
    }
    return d;
}

async function realignSchedule() {
    console.log(`📅 Realigning Smart Hustler Schedule`);
    console.log(`   Start Date: ${START_DATE}`);
    console.log(`   Skip Weekends: ${SKIP_WEEKENDS}`);
    console.log(`   Mode: ${DRY_RUN ? '🔍 DRY RUN (No changes)' : '⚡️ LIVE EXECUTION'}`);
    console.log('-----------------------------------');

    let allCampaigns = [];
    let hasMore = true;
    let offset = 0;
    const limit = 50;

    // 1. Fetch All
    console.log('📥 Fetching campaigns...');
    while (hasMore) {
        try {
            const response = await fetchWithRetry(`https://api.brevo.com/v3/emailCampaigns?limit=${limit}&offset=${offset}`, {
                method: 'GET',
                headers: { 'api-key': BREVO_API_KEY }
            });

            const data = await response.json();
            if (!data.campaigns || data.campaigns.length === 0) {
                hasMore = false;
                break;
            }

            allCampaigns = allCampaigns.concat(data.campaigns);
            if (data.campaigns.length < limit) hasMore = false;
            else offset += limit;
        } catch (e) {
            console.error('Fetch error:', e);
            break;
        }
    }

    // 2. Filter & Sort
    const dayRegex = /\[Day (\d+)\]/;
    const sequence = allCampaigns.filter(c => {
        return c.tag === 'smarthustler' && dayRegex.test(c.name);
    }).sort((a, b) => {
        const dayA = parseInt(a.name.match(dayRegex)[1]);
        const dayB = parseInt(b.name.match(dayRegex)[1]);
        return dayA - dayB;
    });

    console.log(`✅ Found ${sequence.length} campaigns in the "Zero to Hero" sequence.`);

    if (sequence.length === 0) {
        console.log('❌ No campaigns found with [Day X] naming pattern.');
        return;
    }

    // 3. Assign Dates
    let currentDate = new Date(START_DATE);
    // Adjust start date if it falls on a weekend and we skip weekends
    if (SKIP_WEEKENDS) {
        while (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }

    for (const c of sequence) {
        const dayNum = c.name.match(dayRegex)[1];

        // Construct ISO string
        const dateStr = currentDate.toISOString().split('T')[0];
        const fullSchedule = `${dateStr}T${SEND_TIME_UTC}`;

        console.log(`[Day ${dayNum.padEnd(3)}] ${dateStr} (${currentDate.toLocaleDateString('en-US', { weekday: 'short' })}) -> ${c.name.substring(0, 30)}...`);

        if (!DRY_RUN) {
            // Apply Update
            try {
                // Determine if we need to Unschedule (Suspend) first?
                // If it's 'scheduled', we usually change it by updating 'scheduledAt' directly OR suspending then editing.
                // Brevo V2/V3 allows updating scheduledAt for scheduled campaigns? Sometimes restricted.
                // Safest to SUSPEND if scheduled.

                if (c.status === 'scheduled' || c.status === 'queued') {
                    // console.log('   (Suspending first...)');
                    // await fetchWithRetry(`https://api.brevo.com/v3/emailCampaigns/${c.id}/status`, {
                    //     method: 'PUT',
                    //     headers: {'api-key': BREVO_API_KEY, 'content-type': 'application/json'},
                    //     body: JSON.stringify({status: 'suspended'})
                    // });

                    // Actually, let's try just updating the schedule. If it fails, we know we need to suspend.
                }

                const payload = { scheduledAt: fullSchedule };

                const update = await fetchWithRetry(`https://api.brevo.com/v3/emailCampaigns/${c.id}`, {
                    method: 'PUT',
                    headers: {
                        'api-key': BREVO_API_KEY,
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (update.ok || update.status === 204) {
                    process.stdout.write(' ✅');
                } else {
                    // If fail, try suspend then update
                    // console.log('   ⚠️  Update failed, trying suspend-first approach...');
                    const suspend = await fetchWithRetry(`https://api.brevo.com/v3/emailCampaigns/${c.id}/status`, {
                        method: 'PUT',
                        headers: { 'api-key': BREVO_API_KEY, 'content-type': 'application/json' },
                        body: JSON.stringify({ status: 'suspended' })
                    });

                    if (suspend.ok || suspend.status === 204) {
                        const retryUpdate = await fetchWithRetry(`https://api.brevo.com/v3/emailCampaigns/${c.id}`, {
                            method: 'PUT',
                            headers: { 'api-key': BREVO_API_KEY, 'content-type': 'application/json' },
                            body: JSON.stringify(payload)
                        });
                        if (retryUpdate.ok || retryUpdate.status === 204) process.stdout.write(' ✅ (Rescheduled)');
                        else process.stdout.write(' ❌');
                    } else {
                        process.stdout.write(' ❌ (Suspend failed)');
                    }
                }
                process.stdout.write('\n');

                // Rate limit niceness
                await sleep(500);

            } catch (err) {
                console.log(`   ❌ Error: ${err.message}`);
            }
        }

        // Advance Date
        currentDate = getNextValidDate(currentDate);
    }

    console.log('\n🎉 Finished.');
}

realignSchedule();
