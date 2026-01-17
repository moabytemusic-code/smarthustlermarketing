const fs = require('fs');
const path = require('path');

// Paths to SmartHustler data
const PRODUCTS_PATH = path.join(__dirname, '../src/content/products.json');
const ENGINE_MAPPING_PATH = path.join(__dirname, '../src/data/engineMapping.ts');
const POSTS_DIR = path.join(__dirname, '../src/content/posts');

// Output path for Reddit Fox (using absolute path to be safe)
const OUTPUT_PATH = '/Users/kd5000/Documents/Reddit Fox/src/knowledge_base.json';

function parseEngineMapping() {
    const content = fs.readFileSync(ENGINE_MAPPING_PATH, 'utf8');

    const detailsMatch = content.match(/export const ENGINE_DETAILS: Record<string, EngineDetail> = ({[\s\S]*?});/);
    const fallbacksMatch = content.match(/export const TOPIC_FALLBACKS: Record<string, EngineId> = ({[\s\S]*?});/);

    if (!detailsMatch || !fallbacksMatch) {
        console.error('Failed to parse engineMapping.ts');
        return [];
    }

    const detailsRaw = detailsMatch[1];
    const fallbacksRaw = fallbacksMatch[1];

    const engineInfo = [];

    const fallbackLines = fallbacksRaw.split('\n');
    const keywordMap = {};
    fallbackLines.forEach(line => {
        const match = line.match(/"(.*?)"\s*:\s*"(.*?)"/);
        if (match) {
            keywordMap[match[2]] = keywordMap[match[2]] || [];
            keywordMap[match[2]].push(match[1]);
        }
    });

    const detailBlocks = detailsRaw.split('},').map(b => b.trim());
    detailBlocks.forEach(block => {
        const idMatch = block.match(/"(.*?)"\s*:/);
        const titleMatch = block.match(/title:\s*"(.*?)"/);
        const descMatch = block.match(/description:\s*"(.*?)"/);

        if (idMatch && titleMatch && descMatch) {
            const id = idMatch[1];
            engineInfo.push({
                type: 'engine',
                id: id,
                title: titleMatch[1],
                description: descMatch[1],
                keywords: keywordMap[id] || [],
                url: `https://smarthustlermarketing.com/go/${id}`
            });
        }
    });

    return engineInfo;
}

function parseBlogPosts() {
    const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
    const posts = [];

    files.forEach(file => {
        const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
        const titleMatch = content.match(/title: "(.*?)"/);
        const excerptMatch = content.match(/excerpt: "(.*?)"/);
        const tagsMatch = content.match(/tags: \[(.*?)\]/);
        const slug = file.replace('.md', '');

        if (titleMatch) {
            posts.push({
                type: 'blog',
                id: slug,
                title: titleMatch[1],
                description: excerptMatch ? excerptMatch[1] : `Read our guide about ${titleMatch[1]}`,
                keywords: tagsMatch ? tagsMatch[1].split(',').map(t => t.replace(/"/g, '').trim()) : [],
                url: `https://smarthustlermarketing.com/blog/${slug}`
            });
        }
    });

    return posts;
}

function runExport() {
    console.log('🚀 Exporting SmartHustler Knowledge to Reddit Fox (Stealth Edition)...');

    // 1. Load Products (Lower priority for stealth)
    const products = JSON.parse(fs.readFileSync(PRODUCTS_PATH, 'utf8'));
    const productData = products.map(p => ({
        type: 'product',
        id: p.id,
        title: p.title,
        description: p.description,
        keywords: p.features || [],
        url: `https://smarthustlermarketing.com/shop`
    }));

    // 2. Load Engines
    const engineData = parseEngineMapping();

    // 3. Load Blog Posts (Highest priority for stealth)
    const blogData = parseBlogPosts();

    // Combine - Blog posts first so select_solution hits them first
    const fullKnowledge = [...blogData, ...engineData, ...productData];

    // 3. Write to Reddit Fox
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(fullKnowledge, null, 4));

    console.log(`✅ Success! Exported ${fullKnowledge.length} solutions to Reddit Fox.`);
    console.log(`📖 Blogs: ${blogData.length} | Engines: ${engineData.length} | Products: ${productData.length}`);
    console.log(`📁 Location: ${OUTPUT_PATH}`);
}

runExport();
