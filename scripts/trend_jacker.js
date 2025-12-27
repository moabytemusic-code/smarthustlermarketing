const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load env
dotenv.config({ path: '.env.local' });

// IMPORTANT: Requires 'rss-parser' to read feeds
// If not installed, it needs: npm install rss-parser
const Parser = require('rss-parser');
const parser = new Parser();

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

// 3. AI Generation (Simulated for this script 1.0, but ready for OpenAI hook)
// In a real automated run, we would send the 'item.contentSnippet' to OpenAI API.
// For now, we will template it intelligently.
function generatePostContent(item, match) {
    const date = new Date().toISOString().split('T')[0];
    const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // Check if we already have this post to avoid dupes
    const filename = `${slug}.md`;
    if (fs.existsSync(path.join(__dirname, '../src/content/posts', filename))) {
        return null;
    }

    const markdown = `---
title: "Reaction: ${item.title.replace(/"/g, "'")}"
date: "${date}"
category: "Analysis"
excerpt: "New intel from ${item.creator || 'the industry'}: ${item.contentSnippet ? item.contentSnippet.substring(0, 100) : '...'}..."
author: "Smart Hustler AI"
original_source: "${item.link}"
---

### 🚨 Breaking News in Marketing

**Source:** [${item.title}](${item.link})

${item.contentSnippet || "A major update just dropped in the marketing world that affects how we build automated businesses."}

---

### 🧠 The Smart Hustler Take

This news confirms what we've been saying: **Agility is everything.**

While big corporations are stuck in meetings discussing this update, you can pivot effectively immediately.

**Why this matters for you:**
1.  **Speed**: The market rewards those who act first.
2.  **Automation**: If this is a manual task, automate it. If it's an algorithm change, adapt your system.
3.  **Leverage**: Use tools to bypass the learning curve.

---

### 🛠 Action Plan

Don't just read the news. Use it.

**${match.cta}**

[**🚀 Launch the ${match.tool}**](${match.link})

---
*This is an automated curation of top marketing signals. Always verify original sources.*
`;

    return { filename, markdown, slug };
}

async function runTrendJacker() {
    console.log('🕵️‍♂️ Trend Jacker: Scanning Agency Feeds...');

    let createdCount = 0;

    for (const feed of FEEDS) {
        try {
            console.log(`📡 Checking: ${feed.name}...`);
            const feedData = await parser.parseURL(feed.url);

            // Only look at top 2 items to avoid spamming
            const topItems = feedData.items.slice(0, 2);

            for (const item of topItems) {
                // Determine if it matches our niche (Filter Logic)
                const keywords = ['marketing', 'ai', 'seo', 'hustle', 'money', 'business', 'tech', 'google', 'update'];
                const text = (item.title + " " + (item.contentSnippet || "")).toLowerCase();

                const isRelevant = keywords.some(k => text.includes(k));

                if (isRelevant) {
                    const product = findProductMatch(item.title, item.contentSnippet);
                    const post = generatePostContent(item, product);

                    if (post) {
                        const filePath = path.join(__dirname, '../src/content/posts', post.filename);
                        fs.writeFileSync(filePath, post.markdown);
                        console.log(`✅ Created Post: ${post.filename}`);
                        createdCount++;
                    } else {
                        // console.log(`⏩ Skipped (Duplicate): ${item.title.substring(0,20)}...`);
                    }
                }
            }

        } catch (error) {
            console.warn(`⚠️ Failed to fetch ${feed.name}: ${error.code || error.message}`);
        }
    }

    console.log(`\n🎉 Trend Jacker Run Complete. Created ${createdCount} new posts.`);
}

runTrendJacker();
