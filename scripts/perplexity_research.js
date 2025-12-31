const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const API_KEY = process.env.PERPLEXITY_API_KEY;
const API_URL = 'https://api.perplexity.ai/chat/completions';

if (!API_KEY) {
    console.error('Error: PERPLEXITY_API_KEY is not set in .env file.');
    process.exit(1);
}

const query = process.argv.slice(2).join(' ');

if (!query) {
    console.log('Usage: node scripts/perplexity_research.js "Your research question here"');
    process.exit(0);
}

async function research(question) {
    try {
        console.log(`\n🔍 Researching: "${question}"...\n`);

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                model: 'sonar-pro',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an advanced marketing research assistant. Provide detailed, actionable, and cited answers. Format your response in Markdown.'
                    },
                    {
                        role: 'user',
                        content: question
                    }
                ],
                temperature: 0.1,
                top_p: 0.9,
                return_citations: true,
                return_images: false
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Request failed: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        const citations = data.citations || [];

        console.log('--- RESEARCH RESULTS ---\n');
        console.log(content);

        if (citations.length > 0) {
            console.log('\n\n--- CITATIONS ---\n');
            citations.forEach((cite, index) => {
                console.log(`[${index + 1}] ${cite}`);
            });
        }

    } catch (error) {
        console.error('An error occurred during research:', error.message);
    }
}

research(query);
