const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const POSTS_DIR = path.join(__dirname, '../src/content/posts');
const PUBLIC_DIR = path.join(__dirname, '../public');
const SITE_URL = 'https://smarthustlermarketing.com';

function generateRSS() {
    console.log('🔄 Generating RSS Feed...');

    const files = fs.readdirSync(POSTS_DIR);
    const posts = files
        .filter(file => file.endsWith('.md'))
        .map(file => {
            const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
            const { data } = matter(content);
            return {
                title: data.title,
                slug: file.replace('.md', ''),
                description: data.excerpt,
                date: new Date(data.date),
                author: data.author || 'Smart Hustler Team'
            };
        })
        .sort((a, b) => b.date - a.date);

    const rssItems = posts.map(post => `
        <item>
            <title><![CDATA[${post.title}]]></title>
            <link>${SITE_URL}/blog/${post.slug}</link>
            <guid>${SITE_URL}/blog/${post.slug}</guid>
            <pubDate>${post.date.toUTCString()}</pubDate>
            <description><![CDATA[${post.description}]]></description>
            <dc:creator><![CDATA[${post.author}]]></dc:creator>
        </item>`);

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Smart Hustler Marketing</title>
        <link>${SITE_URL}</link>
        <description>Tools, Tactics, and Automated Systems for the Modern Entrepreneur.</description>
        <language>en-us</language>
        <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
        ${rssItems.join('')}
    </channel>
</rss>`;

    fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), rssXml);
    console.log(`✅ RSS Feed generated at public/rss.xml with ${posts.length} items.`);
}

generateRSS();
