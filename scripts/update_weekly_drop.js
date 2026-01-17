const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

// Paths
const WEEKLY_JSON_PATH = path.join(__dirname, '../src/content/weekly_drop.json');
const PRODUCTS_JSON_PATH = path.join(__dirname, '../src/content/products.json');
const OFFERS_JSON_PATH = path.join(__dirname, '../src/content/campaigns/affiliate_offers.json');

async function updateWeeklyDrop() {
    console.log('🔄 Starting Weekly Drop Rotation...');

    // 1. Read existing data
    const currentDrop = JSON.parse(fs.readFileSync(WEEKLY_JSON_PATH, 'utf8'));
    const allProducts = JSON.parse(fs.readFileSync(PRODUCTS_JSON_PATH, 'utf8'));
    const allOffers = JSON.parse(fs.readFileSync(OFFERS_JSON_PATH, 'utf8'));

    // 2. Increment Week Number
    const nextWeekNumber = currentDrop.weekNumber + 1;

    // 3. Get AI-generated theme via Perplexity
    let nextTheme = "The Income Automation Protocol";
    if (PERPLEXITY_API_KEY) {
        try {
            console.log('🤖 Asking AI for a fresh marketing theme...');
            const response = await fetch('https://api.perplexity.ai/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'sonar-pro',
                    messages: [
                        { role: 'system', content: 'You are a high-level marketing strategist.' },
                        { role: 'user', content: `Generate a compelling, high-authority name for a weekly "Profit Pack" bundle of marketing tools. Current week theme was "${currentDrop.theme}". Give me one headline like "The [Keyword] [Noun]" (e.g. The SEO Authority Protocol). Only return the string.` }
                    ]
                })
            });
            const data = await response.json();
            nextTheme = data.choices[0].message.content.trim().replace(/"/g, '');
        } catch (error) {
            console.error('⚠️ AI Theme generation failed, using fallback.');
        }
    }

    // 4. Rotate Gifts (Randomly pick 4 different from current)
    const currentGiftIds = currentDrop.gifts.map(g => g.id);
    const availableGifts = allProducts.filter(p => !currentGiftIds.includes(p.id) && p.downloadUrl);

    // Shuffle and pick 4
    const selectedGifts = availableGifts
        .sort(() => 0.5 - Math.random())
        .slice(0, 4)
        .map(p => ({
            id: p.id,
            title: p.title,
            description: p.subtitle || p.description.substring(0, 60) + '...',
            type: p.type,
            size: p.type === 'Book' ? 'PDF' : 'Module',
            downloadUrl: p.downloadUrl.startsWith('/') ? p.downloadUrl : `/products_pdf/${p.title.replace(/\s+/g, '_')}.pdf`
        }));

    // 5. Rotate Affiliate Offers (Randomly pick 2)
    const selectedOffers = allOffers
        .filter(o => o.affiliate_link && o.name !== 'Smart Hustler Books')
        .sort(() => 0.5 - Math.random())
        .slice(0, 2)
        .map(o => ({
            id: o.name.toLowerCase().replace(/\s+/g, '-'),
            title: o.name,
            description: o.description,
            cta: "Access Now",
            link: o.affiliate_link,
            badge: o.commission.includes('50%') ? "High Commission" : undefined
        }));

    // 6. Save new data
    const newData = {
        weekNumber: nextWeekNumber,
        theme: nextTheme,
        dropDate: new Date().toISOString().split('T')[0],
        gifts: selectedGifts.length === 4 ? selectedGifts : currentDrop.gifts, // Guard against empty
        affiliateOffers: selectedOffers
    };

    fs.writeFileSync(WEEKLY_JSON_PATH, JSON.stringify(newData, null, 4));

    console.log(`✅ Weekly Drop Updated: Week #${nextWeekNumber}`);
    console.log(`📡 New Theme: ${nextTheme}`);
}

updateWeeklyDrop();
