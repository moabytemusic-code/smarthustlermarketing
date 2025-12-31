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

    // 0. Import Image Generator
    const { generateBlogImage } = require('./generate_images');

    // ... (rest of imports)

    // ... (inside generatePostWithAI function)

    console.log(`🤖 AI Writing Article for: "${item.title}"...`);
    console.log(`   (Estimated Cost: ~$0.05 | Model: sonar-pro)`);

    // Generate Image in parallel or sequence? Sequence is safer for now.
    let imagePath = "";
    if (process.env.OPENAI_API_KEY) {
        try {
            imagePath = await generateBlogImage(item.title, slug);
        } catch (err) {
            console.error(`⚠️ Image generation failed: ${err.message}`);
        }
    } else {
        console.log('⚠️ Skipping Image Generation (No OPENAI_API_KEY found).');
    }

    const prompt = `
    Analyze the following news story and create a high-performance blog post for a business/entrepreneurial audience.
    
    News Source: "${item.title}"
    Link: ${item.link}
    Snippet: ${item.contentSnippet || "No snippet provided."}
    
    You must output your response in valid JSON format.
    
    JSON Structure:
    {
       "seo_title": "A viral, click-worthy title (under 60 chars) that includes keywords",
       "meta_description": "A compelling summary (under 160 chars) that encourages clicks",
       "tags": ["tag1", "tag2", "tag3"],
       "markdown_content": "# [The Article Title]\n\n..."
    }

    Article Structure (inside markdown_content):
    ## The Situation
    [Synthesize the news clearly]
    
    ## The Breakdown
    [Deep dive into stats, details, and implications]
    
    ## Why This Matters
    [Impact on business owners/marketers]
    
    ## Action Plan
    [3-5 concrete steps to take]
    
    ## Toolkit Recommendation
    [Mention how tools like ${match.tool} could help. Context: ${match.cta}]
    
    Tone: Professional, authoritative, insightful.
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
                    { role: 'system', content: 'You are an expert SEO content strategist. You only output valid JSON.' },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.2,
                max_tokens: 3000
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        let rawContent = data.choices[0].message.content;

        // Clean markdown code blocks if present
        rawContent = rawContent.replace(/^```json\n/, '').replace(/^```\n/, '').replace(/\n```$/, '');

        let parsedData;
        try {
            parsedData = JSON.parse(rawContent);
        } catch (e) {
            console.error("Failed to parse JSON from AI. Fallback to raw text.");
            // Fallback if AI fails JSON constraint
            parsedData = {
                seo_title: item.title,
                meta_description: `Analysis of ${item.title}`,
                tags: ['news', 'business'],
                markdown_content: rawContent
            };
        }

        const citations = data.citations || [];

        // Format Sources Section
        let sourcesFooter = "";
        if (citations.length > 0) {
            sourcesFooter = "\n## Sources\n\n" + citations.map((url, i) => `*   [${i + 1}] ${url}`).join('\n');
        }

        const fullFileContent = `---
title: "${parsedData.seo_title.replace(/"/g, "'")}"
date: "${date}"
category: "News"
tags: [${parsedData.tags.map(t => `"${t}"`).join(', ')}]
image: "${imagePath || '/images/blog/default.jpg'}"
excerpt: "${parsedData.meta_description.replace(/"/g, "'")}"
author: "Smart Hustler AI"
original_source: "${item.link}"
---

${parsedData.markdown_content}

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
