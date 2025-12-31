const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const BREVO_API_KEY = process.env.BREVO_API_KEY;

if (!BREVO_API_KEY) {
    console.error('❌ Error: BREVO_API_KEY is missing in .env.local');
    process.exit(1);
}

// CONFIGURATION
const DRY_RUN = false; // Set to false to actually create templates
const TAG_FILTER = 'smarthustler';
const TEMPLATE_PREFIX = '[TEMPLATE] ';
const OVERWRITE = true; // Update existing templates instead of skipping

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url, options, retries = 5) {
    for (let i = 0; i < retries; i++) {
        const response = await fetch(url, options);
        if (response.status === 429) {
            const waitTime = (i + 1) * 5000;
            console.log(`⏳ Rate limit. Pausing ${waitTime / 1000}s...`);
            await sleep(waitTime);
            continue;
        }
        return response;
    }
    throw new Error('Max retries reached');
}

async function convertToTemplates() {
    console.log(`🏭 Starting Campaign -> Template Conversion`);
    console.log(`   Mode: ${DRY_RUN ? '🔍 DRY RUN' : '⚡️ LIVE EXECUTION'}`);
    console.log('-----------------------------------');

    // 1. Fetch Existing Templates (to check for duplicates)
    console.log('📥 Fetching existing templates to avoid duplicates...');
    const existingTemplates = new Map();
    let tOffset = 0;
    let tHasMore = true;

    while (tHasMore) {
        try {
            const tResp = await fetchWithRetry(`https://api.brevo.com/v3/smtp/templates?limit=100&offset=${tOffset}`, {
                method: 'GET',
                headers: { 'api-key': BREVO_API_KEY }
            });
            const tData = await tResp.json();
            if (tData.templates) {
                tData.templates.forEach(t => existingTemplates.set(t.name, t.id));
            }
            if (!tData.templates || tData.count < 100) tHasMore = false;
            else tOffset += 100;
        } catch (e) {
            console.error('Error fetching templates:', e);
            break;
        }
    }
    console.log(`   Found ${existingTemplates.size} existing templates.`);

    // 2. Fetch Source Campaigns
    console.log('\n📥 Fetching source campaigns...');
    let allCampaigns = [];
    let cOffset = 0;
    let cHasMore = true;

    while (cHasMore) {
        try {
            const cResp = await fetchWithRetry(`https://api.brevo.com/v3/emailCampaigns?limit=50&offset=${cOffset}&tag=${TAG_FILTER}`, {
                method: 'GET',
                headers: { 'api-key': BREVO_API_KEY }
            });
            const cData = await cResp.json();

            if (cData.campaigns) {
                allCampaigns = allCampaigns.concat(cData.campaigns);
            }

            if (!cData.campaigns || cData.campaigns.length < 50) cHasMore = false;
            else cOffset += 50;
        } catch (e) {
            console.error('Error fetching campaigns:', e);
            break;
        }
    }

    // Filter for Smart Hustler sequence ([Day X])
    const dayRegex = /\[Day (\d+)\]/;
    const campaignMap = new Map();

    allCampaigns.forEach(c => {
        const match = c.name.match(dayRegex);
        if (match && match[1]) {
            const num = parseInt(match[1]);
            const existing = campaignMap.get(num);

            // Keep the one with the higher ID
            if (!existing || c.id > existing.id) {
                campaignMap.set(num, c);
            }
        }
    });

    // Convert map to sorted array
    const sequence = Array.from(campaignMap.values()).sort((a, b) => {
        const numA = parseInt(a.name.match(dayRegex)[1]);
        const numB = parseInt(b.name.match(dayRegex)[1]);
        return numA - numB;
    });

    console.log(`✅ Identified ${sequence.length} campaigns to convert.`);
    console.log('-----------------------------------');

    // 3. Convert
    let successCount = 0;
    let skippedCount = 0;

    for (const c of sequence) {
        const newName = `${TEMPLATE_PREFIX}${c.name}`;

        process.stdout.write(`Processing [${c.id}] -> "${newName.substring(0, 40)}..." `);

        if (existingTemplates.has(newName)) {
            existingId = existingTemplates.get(newName);
            if (!OVERWRITE) {
                console.log('⏭️  Skipped (Already exists)');
                skippedCount++;
                continue;
            }
            console.log(`🔄 Updating template [${existingId}]...`);
        }

        if (DRY_RUN) {
            console.log('✅ (Dry Run)');
            continue; // Skip the heavy detail fetch in dry run to save API calls
        }

        // Fetch full details to get HTML content
        await sleep(200); // Rate limit buffer

        try {
            const detailResp = await fetchWithRetry(`https://api.brevo.com/v3/emailCampaigns/${c.id}`, {
                method: 'GET',
                headers: { 'api-key': BREVO_API_KEY }
            });
            const detail = await detailResp.json();

            if (!detail.htmlContent) {
                console.log('❌ Failed (No HTML Content)');
                continue;
            }

            // Create Template Payload
            // Fix: Explicitly format sender to avoid "Only one of Sender ID or Sender Email" error
            const payload = {
                templateName: newName,
                subject: detail.subject,
                sender: {
                    name: detail.sender.name,
                    email: detail.sender.email
                },
                htmlContent: detail.htmlContent,
                isActive: true,
                tag: 'smarthustler_automation' // special tag for templates
            };

            if (existingId) {
                // UPDATE (PUT)
                const updateResp = await fetchWithRetry(`https://api.brevo.com/v3/smtp/templates/${existingId}`, {
                    method: 'PUT',
                    headers: {
                        'api-key': BREVO_API_KEY,
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (updateResp.ok || updateResp.status === 204) {
                    console.log('✅ Updated');
                    successCount++;
                } else {
                    const err = await updateResp.json();
                    console.log(`❌ Failed Update: ${JSON.stringify(err)}`);
                }

            } else {
                // CREATE (POST)
                const createResp = await fetchWithRetry(`https://api.brevo.com/v3/smtp/templates`, {
                    method: 'POST',
                    headers: {
                        'api-key': BREVO_API_KEY,
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (createResp.ok || createResp.status === 201) {
                    const data = await createResp.json();
                    console.log(`✅ Created (ID: ${data.id})`);
                    successCount++;
                    existingTemplates.set(newName, data.id);
                } else {
                    const err = await createResp.json();
                    console.log(`❌ Failed Create: ${JSON.stringify(err)}`);
                }
            }

        } catch (e) {
            console.log(`❌ Error: ${e.message}`);
        }
    }

    console.log('\n🎉 Conversion Complete');
    console.log(`   Created: ${successCount}`);
    console.log(`   Skipped: ${skippedCount}`);
}

convertToTemplates();
