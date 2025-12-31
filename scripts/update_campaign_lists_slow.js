const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const NEW_LISTS = [42, 39, 38, 33, 31, 29, 27];

// Very slow sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url, options, retries = 5) { // Increased retries
    for (let i = 0; i < retries; i++) {
        const response = await fetch(url, options);

        if (response.status === 429) {
            const waitTime = (i + 1) * 5000; // 5s, 10s, 15s, 20s, 25s
            console.log(`⏳ Rate Limited (429). Waiting ${waitTime / 1000}s...`);
            await sleep(waitTime);
            continue;
        }

        return response;
    }
    throw new Error('Max retries reached');
}

async function updateCampaignListsSlow() {
    console.log('🐌 Updating Recipient Lists (Slow & Steady Mode)...');

    // Initial cool-down
    await sleep(2000);

    let hasMore = true;
    let offset = 0;
    const limit = 50;
    let updatedCount = 0;

    while (hasMore) {
        try {
            const response = await fetchWithRetry(`https://api.brevo.com/v3/emailCampaigns?limit=${limit}&offset=${offset}`, {
                method: 'GET',
                headers: { 'api-key': BREVO_API_KEY }
            });

            if (!response.ok) {
                console.error(`❌ API Error: ${response.status}`);
                break;
            }

            const data = await response.json();
            if (!data.campaigns || data.campaigns.length === 0) {
                hasMore = false;
                break;
            }

            for (const c of data.campaigns) {
                if (c.tag === 'smarthustler' || c.sender.email === 'ken@smarthustlermarketing.com') {

                    let currentLists = c.recipients?.lists || [];
                    const mergedLists = [...new Set([...currentLists, ...NEW_LISTS])];

                    const isDifferent = mergedLists.length !== currentLists.length ||
                        !NEW_LISTS.every(id => currentLists.includes(id));

                    if (isDifferent) {
                        process.stdout.write(`Updates needed for [${c.id}]... `);

                        if (c.status === 'scheduled' || c.status === 'queued') {
                            console.log('⚠️  Skipped (Active)');
                        } else {
                            // Update
                            await sleep(500); // 0.5s pre-delay
                            const updateResp = await fetchWithRetry(`https://api.brevo.com/v3/emailCampaigns/${c.id}`, {
                                method: 'PUT',
                                headers: {
                                    'api-key': BREVO_API_KEY,
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify({ recipients: { listIds: mergedLists } })
                            });

                            if (updateResp.ok || updateResp.status === 204) {
                                console.log('✅ Updated');
                                updatedCount++;
                                await sleep(1000); // 1s post-delay
                            } else {
                                console.log(`❌ ${updateResp.status}`);
                            }
                        }
                    }
                }
            }

            if (data.campaigns.length < limit) hasMore = false;
            else offset += limit;

        } catch (err) {
            console.error('❌ Error in loop:', err.message);
            await sleep(10000); // Big wait on error
        }
    }

    console.log(`\n🎉 Done! Updated ${updatedCount} campaigns.`);
}

updateCampaignListsSlow();
