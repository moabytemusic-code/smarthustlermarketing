
import { NextResponse } from 'next/server';

export const maxDuration = 30; // Allow 30 seconds for AI

// ContentStudio Config
const CS_API_URL = 'https://api.contentstudio.io/api/v1';
const CS_TOKEN = 'cs_e7d60a07ff5d742d9c175e56c36f0a674faeac4567d0c01d3e473512db695dbb'; // In prod, use process.env
const WORKSPACE_ID = '5c6018992df1b11c356cb5c8'; // kendavismarketing

// Perplexity Config
const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

export async function POST(request: Request) {
    try {
        const { action, text, slug, platform, content } = await request.json();

        if (action === 'generate') {
            return await handleGeneration(text, slug);
        } else if (action === 'schedule') {
            return await handleScheduling(content, platform);
        } else {
            return NextResponse.json({ error: 'Invalid Action' }, { status: 400 });
        }

    } catch (error: any) {
        console.error("Ghost Writer Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

async function handleGeneration(inputText: string, slug?: string) {
    if (!process.env.PERPLEXITY_API_KEY) {
        return NextResponse.json({
            error: 'Missing PERPLEXITY_API_KEY',
            mock: true,
            twitter: "Simulation: API Key Missing. Check .env",
            linkedin: "Simulation: API Key Missing. Check .env"
        }, { status: 500 });
    }

    const ctaLink = slug ? `https://smarthustlermarketing.com/blog/${slug}` : "[Your Link Here]";

    const prompt = `
    You are an expert Ghostwriter for top tech founders.
    Repurpose the following raw text into two distinct formats:
    
    1. A Twitter/X Thread (Viral style, short sentences, hooks, ends with a recap).
       - MANDATORY: The final tweet must be a CTA pointing to: ${ctaLink}
    
    2. A LinkedIn Post (Professional, storytelling style, "Broetry" formatting).
       - MANDATORY: End with a CTA pointing to: ${ctaLink}

    Raw Text: "${inputText}"

    Output ONLY valid JSON:
    {
        "twitter": "Full thread content...",
        "linkedin": "Full post content..."
    }
    `;

    const response = await fetch(PERPLEXITY_API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'sonar-pro', // Using the smart model
            messages: [
                { role: 'system', content: 'You are a social media ghostwriter. Output valid JSON only.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.2
        })
    });

    const data = await response.json();
    let rawContent = data.choices[0].message.content;

    // Clean markdown
    rawContent = rawContent.replace(/^```json\n/, '').replace(/^```\n/, '').replace(/\n```$/, '');

    try {
        const json = JSON.parse(rawContent);
        return NextResponse.json(json);
    } catch (e) {
        return NextResponse.json({ error: "Failed to parse AI response", raw: rawContent }, { status: 500 });
    }
}

async function handleScheduling(content: string, platform: 'twitter' | 'linkedin') {
    console.log(`[GhostWriter] Scheduling to ${platform}...`);

    try {
        // 1. Get Accounts (Paginated)
        // We need to fetch all pages to find the right account.
        const allAccounts = [];
        let page = 1;
        let hasMore = true;

        console.log(`[GhostWriter] Fetching all accounts...`);

        while (hasMore) {
            const accUrl = `${CS_API_URL}/workspaces/${WORKSPACE_ID}/accounts?page=${page}`;
            const accResponse = await fetch(accUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': CS_TOKEN
                }
            });

            if (!accResponse.ok) {
                const errorText = await accResponse.text();
                // If page 1 fails, that's critical. If page 2 fails, we might still have data.
                if (page === 1) {
                    return NextResponse.json({ error: `ContentStudio Error: ${accResponse.statusText} - ${errorText.substring(0, 100)}` }, { status: accResponse.status });
                }
                console.warn(`[GhostWriter] Failed to fetch page ${page}, stopping.`);
                break;
            }

            const accData = await accResponse.json();
            const pageAccounts = Array.isArray(accData) ? accData : (accData.data || []);

            if (pageAccounts.length > 0) {
                allAccounts.push(...pageAccounts);
            }

            // Check pagination
            // API returns: "current_page":1, "last_page":2
            if (accData.last_page && accData.current_page < accData.last_page) {
                page++;
            } else {
                hasMore = false;
            }

            // Safety break
            if (page > 10) hasMore = false;
        }

        console.log(`[GhostWriter] Total accounts fetched: ${allAccounts.length}`);

        // Filter accounts
        const availableAccounts = allAccounts.filter((acc: any) => {
            const accPlatform = (acc.platform || '').toLowerCase();
            if (platform === 'twitter' && accPlatform === 'twitter') return true;
            if (platform === 'linkedin' && accPlatform === 'linkedin') return true;
            return false;
        });

        if (availableAccounts.length === 0) {
            console.warn(`[GhostWriter] No ${platform} accounts found in:`, allAccounts.map((a: any) => a.platform));
            return NextResponse.json({ error: `No connected ${platform} accounts found in ContentStudio.` }, { status: 400 });
        }

        // Use the first match
        const selectedAccountIds = [availableAccounts[0]._id || availableAccounts[0].id];

        // 2. Post to Composer
        // Endpoint: /api/v1/workspaces/{workspaceId}/posts (POST)

        // Validation Fixes: 
        // 1. content must be an array (of strings?) or objects? Usually it's text. Error says "must be an array".
        // 2. publish_type must be: 'scheduled' (not 'agenda')
        // 3. scheduled_at must be Y-m-d H:i:s

        const now = new Date();
        now.setMinutes(now.getMinutes() + 15);
        // Format: YYYY-MM-DD HH:mm:ss
        const scheduledTime = now.toISOString().replace('T', ' ').substring(0, 19);

        const payload = {
            accounts: selectedAccountIds,
            // Strategy: "Mixed Hierarchy"
            // 1. content: Array of strings (Satisfies "must be array" and "required")
            // 2. caption/text/body: Root level fields (Common in social APIs)
            content: [{
                type: 'text',
                content: content,
                text: content,
                body: content,
                message: content // Adding 'message' key as well based on extensive testing
            }],
            caption: content,
            text: content,
            body: content,

            scheduling: {
                publish_type: 'scheduled',
                scheduled_at: scheduledTime,
                timezone: "UTC"
            }
        };

        const postUrl = `${CS_API_URL}/workspaces/${WORKSPACE_ID}/posts`;
        const postResponse = await fetch(postUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': CS_TOKEN
            },
            body: JSON.stringify(payload)
        });

        const postText = await postResponse.text();

        if (!postResponse.ok) {
            console.error(`[GhostWriter] CS Post Error (${postResponse.status}):`, postText);
            return NextResponse.json({ error: `ContentStudio Post Error: ${postResponse.statusText}` }, { status: postResponse.status });
        }

        let postData;
        try {
            postData = JSON.parse(postText);
        } catch (e) {
            return NextResponse.json({ error: "ContentStudio returned invalid JSON for posting." }, { status: 502 });
        }

        return NextResponse.json(postData);

    } catch (error: any) {
        console.error("[GhostWriter] Scheduling Exception:", error);
        return NextResponse.json({ error: error.message || "Unknown Scheduling Error" }, { status: 500 });
    }
}
