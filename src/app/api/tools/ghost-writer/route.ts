
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
        // 1. Get Accounts
        // Correct Endpoint: /api/v1/workspaces/{id}/accounts
        const accUrl = `${CS_API_URL}/workspaces/${WORKSPACE_ID}/accounts`;

        console.log(`[GhostWriter] Fetching accounts from: ${accUrl}`);

        const accResponse = await fetch(accUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': CS_TOKEN // Must use Header, not query param
            }
        });

        const accText = await accResponse.text();

        if (!accResponse.ok) {
            console.error(`[GhostWriter] CS Accounts Error (${accResponse.status}):`, accText);
            return NextResponse.json({ error: `ContentStudio Error: ${accResponse.statusText} - ${accText.substring(0, 100)}` }, { status: accResponse.status });
        }

        let accData;
        try {
            accData = JSON.parse(accText);
        } catch (e) {
            console.error("[GhostWriter] Failed to parse CS Accounts JSON:", accText);
            return NextResponse.json({ error: "ContentStudio returned invalid JSON for accounts." }, { status: 502 });
        }

        const accountsList = Array.isArray(accData) ? accData : (accData.data || []);

        // Filter accounts (Basic logic)
        const availableAccounts = accountsList.filter((acc: any) => {
            // Note: ContentStudio JSON uses `platform` key (e.g. "twitter", "linkedin")
            const accPlatform = (acc.platform || '').toLowerCase();

            if (platform === 'twitter' && accPlatform === 'twitter') return true;
            if (platform === 'linkedin' && accPlatform === 'linkedin') return true;
            return false;
        });

        if (availableAccounts.length === 0) {
            console.warn(`[GhostWriter] No ${platform} accounts found in:`, accountsList.map((a: any) => a.platform));
            return NextResponse.json({ error: `No connected ${platform} accounts found in ContentStudio.` }, { status: 400 });
        }

        // Use the first match
        const selectedAccountIds = [availableAccounts[0]._id || availableAccounts[0].id];

        // 2. Post to Composer
        // Endpoint: /api/v1/posts/compose -> /api/v1/workspaces/{workspaceId}/posts/compose or similar.
        // Based on search: https://api.contentstudio.io/api/v1/workspaces/{workspace_id}/posts

        const payload = {
            message: content,
            social_accounts: selectedAccountIds, // API likely uses social_accounts, not accounts
            status: 1 // 1 = Planned/Scheduled, 2 = Published
        };

        const postUrl = `${CS_API_URL}/workspaces/${WORKSPACE_ID}/posts/compose`;
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
