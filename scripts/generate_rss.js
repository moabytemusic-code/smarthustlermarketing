const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '../src/content/posts');
const PUBLIC_DIR = path.join(__dirname, '../public');
const SITE_URL = 'https://smarthustlermarketing.com';

function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return null;

    const frontmatterBlock = match[1];
    const metadata = {};

    frontmatterBlock.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
            let value = valueParts.join(':').trim();
            // Remove quotes if present
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            metadata[key.trim()] = value;
        }
    });

    return metadata;
}

function generateRSS() {
    console.log('📡 Generating RSS Feed...');

    if (!fs.existsSync(POSTS_DIR)) {
        console.error('❌ Posts directory not found!');
        return;
    }

    const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));

    let itemsXML = '';

    files.forEach(file => {
        const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
        const metadata = parseFrontmatter(content);

        if (!metadata || !metadata.title) return;

        const slug = file.replace('.md', '');
        const link = `${SITE_URL}/posts/${slug}`;
        const pubDate = new Date(metadata.date).toUTCString();

        itemsXML += `
        <item>
            <title><![CDATA[${metadata.title}]]></title>
            <link>${link}</link>
            <guid>${link}</guid>
            <pubDate>${pubDate}</pubDate>
            <description><![CDATA[${metadata.excerpt || ''}]]></description>
            <dc:creator><![CDATA[${metadata.author || 'Smart Hustler Team'}]]></dc:creator>
        </item>`;
    });

    const rssXML = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Smart Hustler Marketing</title>
        <link>${SITE_URL}</link>
        <description>Tools, Tactics, and Automated Systems for the Modern Entrepreneur.</description>
        <language>en-us</language>
        <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
        ${itemsXML}
    </channel>
</rss>`;

    fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), rssXML);
    console.log(`✅ RSS Feed generated at: ${path.join(PUBLIC_DIR, 'rss.xml')}`);
    console.log(`📊 Added ${files.length} posts to feed.`);
}

generateRSS();
