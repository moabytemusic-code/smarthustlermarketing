const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');

// The collection of CTAs to rotate through
const CTAs = [
    `
---
### 🚀 Ready to Stop Trading Time for Money?
Most entrepreneurs build a job, not a business. Learn the mathematics of **Active Assets** and how to build equity that pays you forever.

[**Download "The Passive Trap" for FREE here →**](/library)
`,
    `
---
### 🏰 Own Your Audience, Don't Rent It.
Social media algorithms change. Your email list is forever. Learn how to shift your audience from rented platforms to owned assets.

[**Get the "Owned Assets" Blueprint for FREE →**](/library)
`,
    `
---
### ⚙️ Luck isn't a Strategy. Leverage Is.
Stop hoping for a viral hit. Start engineering systems that work while you sleep. Code, Content, and Capital are the new leverage.

[**Download "Leverage Over Luck" now →**](/library)
`
];

function injectCTAs() {
    console.log("🚀 Starting CTA Injection...");
    const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));

    files.forEach((file, index) => {
        const filePath = path.join(POSTS_DIR, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Check if CTA already exists to avoid duplicates
        if (content.includes("### 🚀 Ready to Stop") || content.includes("### 🏰 Own Your Audience") || content.includes("### ⚙️ Luck isn't")) {
            console.log(`⚠️ CTA already exists in: ${file}`);
            return;
        }

        // Pick a CTA based on index (Rotation)
        const selectedCTA = CTAs[index % CTAs.length];

        // Append CTA
        const newContent = content + "\n" + selectedCTA;
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`✅ Injected CTA into: ${file}`);
    });

    console.log("🏁 All done!");
}

injectCTAs();
