const fs = require('fs');
const path = require('path');
const markdownpdf = require('markdown-pdf');

const productsDir = path.join(__dirname, '../public/products');
const outputDir = path.join(__dirname, '../public/products_pdf');

// Ensure output dir exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const mdFiles = fs.readdirSync(productsDir).filter(file => file.endsWith('.md'));

console.log(`Found ${mdFiles.length} markdown files to convert.`);

const convertFile = (file) => {
    return new Promise((resolve, reject) => {
        const inputFile = path.join(productsDir, file);
        const outputFile = path.join(outputDir, file.replace('.md', '.pdf'));

        console.log(`Converting ${file} -> ${path.basename(outputFile)}...`);

        markdownpdf()
            .from(inputFile)
            .to(outputFile, function () {
                console.log(`✅ Converted ${file}`);
                resolve();
            });
    });
};

async function run() {
    for (const file of mdFiles) {
        await convertFile(file);
    }
    console.log('🎉 All files converted to PDF!');
}

run();
