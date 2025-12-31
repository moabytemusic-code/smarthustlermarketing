const dotenv = require('dotenv');
const path = require('path');

// Try loading from .env.local first, then .env
dotenv.config({ path: '.env.local' });
if (!process.env.OPENAI_API_KEY) {
    dotenv.config({ path: path.join(__dirname, '../.env') });
}

console.log('🔑 Key Check:');
console.log(`OPENAI_API_KEY: ${process.env.OPENAI_API_KEY ? '✅ Found' : '❌ MISSING'}`);
console.log(`PERPLEXITY_API_KEY: ${process.env.PERPLEXITY_API_KEY ? '✅ Found' : '❌ MISSING'}`);
console.log(`UNSPLASH_ACCESS_KEY: ${process.env.UNSPLASH_ACCESS_KEY ? '✅ Found' : '❌ MISSING'}`);
