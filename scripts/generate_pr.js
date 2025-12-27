require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const POSTS_DIR = path.join(__dirname, '../src/content/posts');
const PR_OUTPUT_DIR = path.join(__dirname, '../src/content/press_releases');

// Ensure output directory exists
if (!fs.existsSync(PR_OUTPUT_DIR)) {
    fs.mkdirSync(PR_OUTPUT_DIR, { recursive: true });
}

// Helper: Get Latest Post
function getLatestPost() {
    const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));

    if (files.length === 0) return null;

    // Sort by creation time (simulated by checking file stats, though name might be better if dated)
    const sortedFiles = files.map(fileName => {
        const filePath = path.join(POSTS_DIR, fileName);
        const stats = fs.statSync(filePath);
        return { fileName, mtime: stats.mtime, content: fs.readFileSync(filePath, 'utf-8') };
    }).sort((a, b) => b.mtime - a.mtime);

    return sortedFiles[0];
}

async function generatePressRelease() {
    console.log('📰 Scanning for latest blog post...');
    const post = getLatestPost();

    if (!post) {
        console.error('❌ No blog posts found.');
        return;
    }

    console.log(`✅ Found latest post: ${post.fileName}`);
    console.log('🤖 Generating AP-Style Press Release...');

    const prompt = `
    You are a professional Public Relations specialist.
    Turn the following blog post content into a formal, AP-Style Press Release.
    
    BLOG CONTENT:
    ${post.content.substring(0, 3000)}... (truncated)

    REQUIREMENTS:
    1.  **Headline:** Catchy, formal, newsworthy. (UPPERCASE)
    2.  **Dateline:** CITY, State (Date) —
    3.  **Body:** Written in third-person. Quotes from "Ken Davis, Founder of Smart Hustler".
    4.  **Boilerplate:** About Smart Hustler Marketing (Modern tools for solopreneurs).
    5.  **Media Contact:** Name: Ken Davis, Email: ken@smarthustlermarketing.com, Website: smarthustlermarketing.com.
    6.  **Tone:** Professional, objective, yet exciting.

    OUTPUT FORMAT:
    Markdown.
    `;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a PR expert." },
                { role: "user", content: prompt }
            ]
        });

        const prContent = completion.choices[0].message.content;
        const prFileName = `PR_${post.fileName}`;
        const prPath = path.join(PR_OUTPUT_DIR, prFileName);

        fs.writeFileSync(prPath, prContent);

        console.log(`🎉 Press Release generated successfully!`);
        console.log(`📍 Saved to: ${prPath}`);

    } catch (error) {
        console.error('❌ Failed to generate PR:', error);
    }
}

generatePressRelease();
