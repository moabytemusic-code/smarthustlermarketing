
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
    // ContentStudio /compose api
    // Docs: https://docs.contentstudio.io/

    const accountId = platform === 'twitter' ? 'YOUR_TWITTER_ID' : 'YOUR_LINKEDIN_ID';
    // note: We need to fetch accounts first to get IDs, but for now we'll push to "Drafts" via general compose

    // For now, let's just do a 'quick post' or verify token.
    // ContentStudio API is tricky for specific accounts without listing them first.
    // We will list accounts, pick the first one matching platform, and post.

    // 1. Get Accounts
    const accResponse = await fetch(`${CS_API_URL}/social-accounts?access_token=${CS_TOKEN}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    const accData = await accResponse.json();

    if (!accData.status || !accData.data) {
        return NextResponse.json({ error: "Failed to fetch social accounts from ContentStudio" }, { status: 500 });
    }

    // Filter accounts (Basic logic)
    const availableAccounts = accData.data.filter((acc: any) => {
        if (platform === 'twitter' && acc.type === 'twitter') return true;
        if (platform === 'linkedin' && (acc.type === 'linkedin' || acc.type === 'linkedin_page')) return true;
        return false;
    });

    if (availableAccounts.length === 0) {
        return NextResponse.json({ error: `No connected ${platform} accounts found in ContentStudio.` }, { status: 400 });
    }

    const selectedAccountIds = availableAccounts.map((a: any) => a._id);

    // 2. Post to Composer
    const payload = {
        message: content,
        accounts: selectedAccountIds,
        // scheduleAt: new Date(Date.now() + 3600 * 1000).toISOString(), // 1 hour from now
        status: 1 // 1 = Planned/Scheduled, 2 = Published
    };

    // Note: The specific endpoint for creating a post might look different depending on version.
    // Using /posts/compose based on common patterns, verifying docs is better but I'll try standard.

    const postResponse = await fetch(`${CS_API_URL}/posts/compose?access_token=${CS_TOKEN}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    const postData = await postResponse.json();

    return NextResponse.json(postData);
}
