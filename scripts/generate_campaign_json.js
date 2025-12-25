const fs = require('fs');
const path = require('path');

// INPUT and OUTPUT paths
const MARKDOWN_PLAN = path.join(__dirname, '../src/content/campaigns/EMAIL_CAMPAIGN_100.md'); // Adjusted name
const OUTPUT_FILE = path.join(__dirname, '../src/content/campaigns/emails.json');

function parseMarkdown() {
    const content = fs.readFileSync(MARKDOWN_PLAN, 'utf8');
    const emails = [];

    // Split by Days (Assuming structure like ### Day X: Subject)
    // We'll look specifically for the "Content Samples" logic if the full list isn't fully expanded in text.
    // BUT, the goal is likely to expand the "Master List" into actual email JSON objects.

    // Since the Markdown file currently has a "Master List" (bullet points) and "Content Samples" (full text),
    // we need to perform a HYBRID generation.
    // 1. We read the "Sequence Master List" to get the Topic + Gift.
    // 2. We use AI (simulated here with templates) to generate the body if it doesn't exist.
    // 3. IF a specific "Content Sample" exists (like Day 1, 3, 4), we use that exact text.

    // FOR THIS SCRIPT: We will do a robust regex parse of the "Sequence Master List" to generate the structure.

    // Regex to find "Day X (Type): Topic + Gift: Name"
    // Example: *   **Day 2 (Give):** The Niche Myth + **Gift: The "Micro-Niche Finder" Worksheet**
    const listRegex = /\*\s+\*\*Day\s+(\d+)\s+\((Give|Ask)\):\*\*\s+(.+?)(?:\n|$)/g;

    // Dictionary to store manually written content samples
    const manualSamples = extractManualSamples(content);

    let match;
    while ((match = listRegex.exec(content)) !== null) {
        const day = parseInt(match[1]);
        const type = match[2];
        const rawLine = match[3];

        // Parse Topic vs Gift
        let subject = "";
        let giftName = "";
        let giftLink = "";

        // Check for Gift Link in next line (based on MD format)
        // We look ahead in the content string for the *Asset:* line
        const lookAhead = content.substring(match.index + match[0].length, match.index + match[0].length + 200);
        const assetMatch = lookAhead.match(/\*Asset:\*\s+\[(.*?)\]\((.*?)\)/);

        if (assetMatch) {
            giftName = assetMatch[1];
            giftLink = assetMatch[2];
        }

        // Clean subject from raw line (remove "+ Gift: ...")
        subject = rawLine.split('+')[0].trim();
        if (type === 'Ask') {
            // Example: **[Offer]** Bluehost ...
            subject = rawLine.replace('\*\*[Offer]\*\*', '').trim(); // Remove marker
        }

        // Determine Body Content
        let body = "";
        if (manualSamples[day]) {
            // Use the manually written sample if available
            subject = manualSamples[day].subject;
            body = manualSamples[day].body;
        } else {
            // Generate Template Content
            if (type === 'Give') {
                body = generateGiveTemplate(subject, giftName, giftLink);
            } else {
                body = generateAskTemplate(subject);
            }
        }

        emails.push({
            day: day,
            type: type,
            subject: subject,
            content: formatHtml(body),
            gift_link: giftLink
        });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(emails, null, 2));
    console.log(`🎉 Generated ${emails.length} emails into emails.json`);
}

function extractManualSamples(content) {
    const samples = {};
    const sampleSection = content.split('## Content Samples')[1];
    if (!sampleSection) return samples;

    // Simple parser for "### Day X: ... \n **Subject:** ... \n **Body:** ..."
    const dayBlocks = sampleSection.split('### Day ');
    dayBlocks.forEach(block => {
        const dayMatch = block.match(/^(\d+):/);
        if (dayMatch) {
            const day = parseInt(dayMatch[1]);
            const subjectMatch = block.match(/\*\*Subject:\*\*\s*(.+)/);
            const bodyMatch = block.match(/\*\*Body:\*\*((.|\n)*?)(?=---|$)/);

            if (subjectMatch && bodyMatch) {
                samples[day] = {
                    subject: subjectMatch[1].trim(),
                    body: bodyMatch[1].trim()
                };
            }
        }
    });
    return samples;
}

function generateGiveTemplate(topic, giftName, giftLink) {
    return `
    <p>Hey [Name],</p>
    <p>Today I want to talk about <strong>${topic}</strong>.</p>
    <p>Most beginners get this wrong. They overcomplicate it.</p>
    <p>To help you speed this up, I created a free resource for you.</p>
    <p><strong>Gift: ${giftName || 'Special Resource'}</strong></p>
    <p>👉 <a href="${giftLink || '#'}" style="font-weight:bold; color:#2563eb;">Access the ${giftName || 'Gift'} Here</a></p>
    <p>Use this to audit your current strategy.</p>
    <p>Talk soon,</p>
    <p>-[Your Name]</p>
    `;
}

function generateAskTemplate(topic) {
    // Note: The specific Offer details will be injected by the schedule_brevo.js script
    // using the [INSERT_LINK] placeholders if we had them here, but for now we use a generic placeholder.
    return `
    <p>Hey [Name],</p>
    <p>We've covered a lot of ground recently regarding <strong>${topic}</strong>.</p>
    <p>The biggest bottleneck I see people hit is usually the <strong>Tech Stack</strong>.</p>
    <p>If you use the wrong tools, you work 10x harder for 10x less result.</p>
    <p>That is why I highly recommend checking out our focused tool of the week.</p>
    <p>It's the specific software I used to scale past $10k/mo.</p>
    <p>👉 <a href="#" style="font-weight:bold; color:#2563eb;">Check out the recommendation here</a></p>
    <p>Don't let tech hold you back.</p>
    <p>-[Your Name]</p>
    `;
}

function formatHtml(text) {
    // If text already has HTML tags, return as is.
    if (text.includes('<p>')) return text;
    // Otherwise, wrap lines in <p>
    return text.split('\n').filter(line => line.trim() !== '').map(line => `<p>${line.trim()}</p>`).join('');
}

parseMarkdown();
