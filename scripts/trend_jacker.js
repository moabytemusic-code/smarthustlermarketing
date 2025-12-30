const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load env safely (local dev vs CI/CD)
if (!process.env.PERPLEXITY_API_KEY) {
    // Only try loading .env files if the key isn't already here
    dotenv.config({ path: '.env.local' });
    if (!process.env.PERPLEXITY_API_KEY) {
        dotenv.config({ path: path.join(__dirname, '../.env') });
    }
}

// IMPORTANT: Requires 'rss-parser' to read feeds
// If not installed, it needs: npm install rss-parser
const Parser = require('rss-parser');
const parser = new Parser();

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const API_URL = 'https://api.perplexity.ai/chat/completions';

if (!PERPLEXITY_API_KEY) {
    console.error('❌ Error: PERPLEXITY_API_KEY is not found in environment.');
    console.error('   -> If Local: Check .env file.');
    console.error('   -> If GitHub Action: Check Repository Secrets.');
    process.exit(1);
}

// 1. Define Feed Sources (Derived from your CSV + Standard RSS Feeds)
// Note: Many sites in CSV don't have public direct RSS. We will use the known reliable ones.
const FEEDS = [
    { name: "Search Engine Journal", url: "https://www.searchenginejournal.com/feed/" },
    { name: "Marketing Dive", url: "https://www.marketingdive.com/feeds/news/" },
    { name: "MarTech", url: "https://martech.org/feed/" },
    { name: "Moz Blog", url: "https://moz.com/feeds/blog.rss" },
    { name: "Social Media Examiner", url: "https://www.socialmediaexaminer.com/feed/" },
    { name: "Reddit | Affiliate Marketing", url: "https://www.reddit.com/r/Affiliatemarketing/new/.rss" },
    { name: "TechCrunch | AI", url: "https://techcrunch.com/category/artificial-intelligence/feed/" }
];

// 2. Define our "Product Mapping" logic
// We scan for keywords in the article title/snippet -> recommend our tool.
const PRODUCT_MATCHES = [
    {
        keywords: ['niche', 'market', 'competition', 'sub-niche', 'keyword', 'seo'],
        tool: 'Micro Niche Finder',
        link: 'https://smarthustlermarketing.com/tools/micro-niche-finder',
        cta: "Stop guessing which niches work. Use our Micro Niche Finder AI to validate profitable markets in seconds."
    },
    {
        keywords: ['finance', 'money', 'goal', 'retire', 'budget', 'salary', 'income'],
        tool: 'Freedom Calculator',
        link: 'https://smarthustlermarketing.com/tools/freedom-calculator',
        cta: "Dreaming is free, but freedom costs a specific number. Calculate your exact Freedom Number here."
    },
    {
        keywords: ['content', 'viral', 'hook', 'writing', 'copy', 'headline'],
        tool: 'Headline Generator',
        link: 'https://smarthustlermarketing.com/tools', // Point to hub for now
        cta: "Writer's block is expensive. Generate 50 viral hooks in under 30 seconds."
    }
];

// Helper to determine product match
function findProductMatch(title, snippet) {
    const text = (title + " " + snippet).toLowerCase();
    for (const match of PRODUCT_MATCHES) {
        if (match.keywords.some(k => text.includes(k))) {
            return match;
        }
    }
    // Default fallback
    return PRODUCT_MATCHES[0];
}

// 3. AI Generation via Perplexity
async function generatePostWithAI(item, match) {
    const date = new Date().toISOString().split('T')[0];
    const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const filename = `${slug}.md`;

    // Check availability
    if (fs.existsSync(path.join(__dirname, '../src/content/posts', filename))) {
        return null; // Skip duplicate
    }

    console.log(`🤖 AI Writing Article for: "${item.title}"...`);
    console.log(`   (Estimated Cost: ~$0.05 | Model: sonar-pro)`);

    const prompt = `
    You are an expert marketing journalist for "Smart Hustler Marketing".
    
    Task: Write a high-quality, 1,200+ word blog post reacting to this breaking news.
    
    News Source: "${item.title}"
    Link: ${item.link}
    Snippet: ${item.contentSnippet || "No snippet provided, please research based on title."}
    
    Guidelines:
    1. **Title:** Create a patchy, viral-worthy title (do not use the original title).
    2. **Tone:** Professional but urgent and "hustle-oriented".
    3. **Structure:** 
       - Catchy Intro (Why this matters NOW).
       - The Breakdown (What happened).
       - Deep Dive Analysis (Provide unique value/insight others miss).
       - The Opportunity (How to make money from this).
       - Action Plan (3-5 concrete steps).
    4. **Value First:** The goal is to make the reader feel they *must* subscribe to get this level of alpha. Avoid generic fluff.
    5. **CTAs:**
       - **Primary:** Naturally integrate a Call to Action for our tool: "${match.tool}".
         - Copy: "${match.cta}"
         - Link: ${match.link}
       - **Secondary:** End with a reminder: "For more high-level marketing intel, join the Smart Hustler Vault."
    6. **Format:** valid Markdown. Use ## for headers.
    
    Return ONLY the markdown body. Do not include frontmatter (I will add it).
    `;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                model: 'sonar-pro',
                messages: [
                    { role: 'system', content: 'You are a senior marketing analyst.' },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.2, // Low temp for factual accuracy
                max_tokens: 3000
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        let content = data.choices[0].message.content;
        const citations = data.citations || [];

        // Clean up any potential markdown code blocks wrapped around the content
        content = content.replace(/^```markdown\n/, '').replace(/\n```$/, '');

        // Format Sources Section
        let sourcesFooter = "";
        if (citations.length > 0) {
            sourcesFooter = "\n## Sources\n\n" + citations.map((url, i) => `*   [${i + 1}] ${url}`).join('\n');
        }

        const fullFileContent = `---
title: "${item.title.replace(/"/g, "'")}"
date: "${date}"
category: "News"
excerpt: "Breaking analysis on: ${item.title}."
author: "Smart Hustler AI"
original_source: "${item.link}"
---

${content}

${sourcesFooter}

---
*This article was assisted by Smart Hustler AI research technologies.*
`;

        return { filename, markdown: fullFileContent, slug };

    } catch (e) {
        console.error(`❌ AI Generation Failed: ${e.message}`);
        return null;
    }
}

async function runTrendJacker() {
    console.log('🕵️‍♂️ Trend Jacker 2.0 (AI Powered): Scanning Agency Feeds...');

    let createdCount = 0;

    for (const feed of FEEDS) {
        try {
            console.log(`📡 Checking: ${feed.name}...`);
            const feedData = await parser.parseURL(feed.url);

            // Only look at the very first item to save costs/spam
            const topItem = feedData.items[0];

            if (!topItem) continue;

            // Determine if it matches our niche (Filter Logic)
            const keywords = ['marketing', 'ai', 'seo', 'hustle', 'money', 'business', 'tech', 'google', 'update'];
            const text = (topItem.title + " " + (topItem.contentSnippet || "")).toLowerCase();

            const isRelevant = keywords.some(k => text.includes(k));

            if (isRelevant) {
                // Check if file exists BEFORE calling AI to save money
                const slug = topItem.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                if (fs.existsSync(path.join(__dirname, '../src/content/posts', `${slug}.md`))) {
                    // console.log(`⏩ Skipped (Duplicate): ${topItem.title.substring(0,20)}...`);
                    continue;
                }

                const product = findProductMatch(topItem.title, topItem.contentSnippet);

                // Call AI
                console.log(`🎯 Match Found: ${topItem.title}`);
                const post = await generatePostWithAI(topItem, product);

                if (post) {
                    const filePath = path.join(__dirname, '../src/content/posts', post.filename);
                    fs.writeFileSync(filePath, post.markdown);
                    console.log(`✅ Created AI Post: ${post.filename}`);
                    createdCount++;

                    // Safety Brake: Only create 1 post per run to verify quality first
                    console.log('🛑 Safety Brake: Stopping after 1 generation for review.');
                    break;
                }
            }

        } catch (error) {
            console.warn(`⚠️ Failed to fetch ${feed.name}: ${error.code || error.message}`);
        }
    }

    console.log(`\n🎉 Trend Jacker Run Complete. Created ${createdCount} new posts.`);
}

runTrendJacker();
