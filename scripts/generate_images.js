const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const OpenAI = require('openai');

// Load environment (Try both .env.local and .env)
dotenv.config({ path: '.env.local' });
dotenv.config({ path: path.join(__dirname, '../.env') }); // Will not overwrite existing keys

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Downloads an image from a URL and saves it to a local path.
 */
async function downloadImage(url, outputPath) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(outputPath, Buffer.from(buffer));
}

/**
 * Generates a blog post hero image using DALL-E 3.
 * @param {string} title - The title of the blog post.
 * @param {string} slug - The slug for saving the file.
 * @returns {Promise<string>} - The relative path to the saved image.
 */
async function generateBlogImage(title, slug) {
    console.log(`🎨 Generating Image for: "${title}"...`);

    const imagePrompt = `
    Create a modern, high-converting blog header image for an article titled: "${title}".
    
    Style: Minimalist vector art or high-quality digital illustration. 
    Theme: Business, Marketing, Tech, "Hustle".
    Colors: Vibrant Blue (#2563eb), Dark Slate (#0f172a), and subtle Gold accents.
    NO TEXT within the image. 
    Aspect Ratio: 16:9 (Landscape).
    Quality: High definition, professional, suitable for a tech news site.
    `;

    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: imagePrompt,
            n: 1,
            size: "1024x1024", // DALL-E 3 standard, we can crop or resize if needed, but standard is fine.
            response_format: "url",
            style: "vivid"
        });

        const imageUrl = response.data[0].url;

        // Ensure directory exists
        const publicDir = path.join(__dirname, '../public/images/blog');
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
        }

        const fileName = `${slug}.png`;
        const localPath = path.join(publicDir, fileName);

        await downloadImage(imageUrl, localPath);

        const publicPath = `/images/blog/${fileName}`;
        console.log(`✅ Image Saved: ${publicPath}`);

        return publicPath;

    } catch (error) {
        console.error(`❌ Image Generation Failed: ${error.message}`);
        return null;
    }
}

// Allow standalone execution
if (require.main === module) {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.log("Usage: node scripts/generate_images.js <title> <slug>");
    } else {
        generateBlogImage(args[0], args[1]);
    }
}

module.exports = { generateBlogImage };
