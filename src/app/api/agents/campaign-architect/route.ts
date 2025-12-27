import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import * as cheerio from 'cheerio';

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'nodejs'; // Required for cheerio/heavy lifting

// Helper: Scrape URL to get context
async function scrapeProduct(url: string) {
    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
            }
        });
        const html = await res.text();
        const $ = cheerio.load(html);

        // Remove script/style tags to clean text
        $('script').remove();
        $('style').remove();
        $('nav').remove();
        $('footer').remove();

        // Get key metadata
        const title = $('title').text().trim();
        const description = $('meta[name="description"]').attr('content') || '';

        // Get main content (h1, h2, p)
        let bodyText = '';
        $('h1, h2, h3, p, li').each((_, el) => {
            const text = $(el).text().trim();
            if (text.length > 20) bodyText += text + '\n';
        });

        // Truncate to avoid token limits (approx 3000 chars)
        return `Title: ${title}\nDescription: ${description}\nContent: ${bodyText.substring(0, 3000)}`;

    } catch (error) {
        console.error('Scraping failed:', error);
        return null;
    }
}

export async function POST(req: Request) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // 1. Get Context
        let context = await scrapeProduct(url);
        if (!context) {
            // Fallback if scraping fails: assume URL is the product name/description for now
            context = `Product URL: ${url}. (Scraping failed, please infer product from URL structure)`;
        }

        // 2. Prompt OpenAI
        const prompt = `
        You are a world-class Direct Response Copywriter (Dan Kennedy style).
        Analyze the following product data:
        ${context}

        YOUR TASK:
        Generate a "Launch Campaign Kit" for this product. Return ONLY valid JSON in the specific format below.

        FORMAT REQUIRMENTS:
        {
            "ads": [
                { "type": "Pain/Agitate/Solution", "content": "..." },
                { "type": "Story/Testimonial", "content": "..." },
                { "type": "Us vs Them", "content": "..." }
            ],
            "emails": [
                { "subject": "...", "body": "..." },
                { "subject": "...", "body": "..." },
                { "subject": "...", "body": "..." }
            ],
            "captions": [
                "...",
                "...",
                "..."
            ]
        }

        TONE:
        - Persuasive, high-energy, but professional.
        - Focus on BENEFITS, not features.
        - Use short paragraphs and punchy sentences.
        `;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o", // Use high-quality model for copywriting
            messages: [
                { role: "system", content: "You are a marketing AI agent. Output strictly valid JSON." },
                { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" }
        });

        const content = completion.choices[0].message.content;

        if (!content) throw new Error("No content generated");

        const data = JSON.parse(content);

        return NextResponse.json(data);

    } catch (error: any) {
        console.error('Agent Error:', error);
        return NextResponse.json({ error: error.message || 'Analysis failed' }, { status: 500 });
    }
}
