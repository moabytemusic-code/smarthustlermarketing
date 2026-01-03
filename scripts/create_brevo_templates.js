require('dotenv').config({ path: '.env.local' });
const Brevo = require('@getbrevo/brevo');

const templates = [
    {
        name: "Delivery: The Passive Trap",
        subject: "📕 Delivery: The Passive Trap",
        htmlContent: `
            <h1>Here is your copy of The Passive Trap</h1>
            <p>Hey {{ contact.FIRSTNAME }},</p>
            <p>You’ve taken the first step out of the trap.</p>
            <p>Most people spend their whole lives trying to build "passive income" and end up building a low-paying job they can't quit. This book explains why—and gives you the mathematics of <strong>Active Assets</strong>.</p>
            <p style="text-align: center; margin: 30px 0;">
                <a href="https://smarthustlermarketing.com/lead-magnets/THE%20PASSIVE%20TRAP.pdf" style="background-color: #fbbf24; color: #000; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Download The Passive Trap</a>
            </p>
            <p><strong>One Request:</strong><br>Read Chapter 1 tonight. It will change how you look at every "opportunity" on your feed.</p>
            <p>Build Assets,<br>The Smart Hustler Team</p>
        `
    },
    {
        name: "Delivery: Owned Assets",
        subject: "🏰 Delivery: Owned Assets",
        htmlContent: `
            <h1>Stop Building on Rented Land</h1>
            <p>Hey {{ contact.FIRSTNAME }},</p>
            <p>The algorithm is not your friend. It is your landlord. And the rent goes up every day.</p>
            <p>This guide is your blueprint for moving out. It details exactly how to shift your audience from "rented" platforms to "owned" assets where <em>you</em> control the distribution.</p>
            <p style="text-align: center; margin: 30px 0;">
                <a href="https://smarthustlermarketing.com/lead-magnets/OWNED%20ASSETS.pdf" style="background-color: #fbbf24; color: #000; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Download Owned Assets PDF</a>
            </p>
            <p>It's time to be an owner.</p>
            <p>The Smart Hustler Team</p>
        `
    },
    {
        name: "Delivery: Anti-Passive Manifesto",
        subject: "⚡ Delivery: The Manifesto",
        htmlContent: `
            <h1>Do The Work Once</h1>
            <p>Hey {{ contact.FIRSTNAME }},</p>
            <p>Welcome to the few who understand that "Easy" is expensive.</p>
            <p>You downloaded <strong>The Anti-Passive Manifesto</strong> because you suspect that the "get rich quick" culture is nonsense. You are right. This manifesto is your tactical guide to doing the <em>hard</em> work upfront so you can reap the rewards forever.</p>
            <p style="text-align: center; margin: 30px 0;">
                <a href="https://smarthustlermarketing.com/lead-magnets/THE%20ANTI-PASSIVE%20MANIFESTO.pdf" style="background-color: #fbbf24; color: #000; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Download The Manifesto</a>
            </p>
            <p>Read it. Print it. Execute it.</p>
            <p>The Smart Hustler Team</p>
        `
    },
    {
        name: "Delivery: Leverage Over Luck",
        subject: "⚙️ Delivery: Leverage Over Luck",
        htmlContent: `
            <h1>Stop Gambling. Start Engineering.</h1>
            <p>Hey {{ contact.FIRSTNAME }},</p>
            <p>Viral hits are luck. Systems are leverage.</p>
            <p>You can't bank on luck, but you can bank on leverage. This guide breaks down the "Leverage Triangle" (Code, Content, Capital) and shows you how to decouple your time from your money.</p>
            <p style="text-align: center; margin: 30px 0;">
                <a href="https://smarthustlermarketing.com/lead-magnets/LEVERAGE%20OVER%20LUCK.pdf" style="background-color: #fbbf24; color: #000; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Download Leverage Over Luck</a>
            </p>
            <p>Stop rolling the dice.</p>
            <p>The Smart Hustler Team</p>
        `
    },
    {
        name: "Delivery: The Equity Engine",
        subject: "📈 Delivery: The Equity Engine",
        htmlContent: `
            <h1>Build To Sell</h1>
            <p>Hey {{ contact.FIRSTNAME }},</p>
            <p>This is the most advanced guide in our library.</p>
            <p>It teaches you the difference between "Profit" (what you keep this month) and "Equity" (what you sell for later). If you don't know your Exit Number, you don't have a business; you have a hustle.</p>
            <p style="text-align: center; margin: 30px 0;">
                <a href="https://smarthustlermarketing.com/lead-magnets/THE%20EQUITY%20ENGINE.pdf" style="background-color: #fbbf24; color: #000; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Download The Equity Engine</a>
            </p>
            <p>Read the section on "Valuation Multipliers" twice.</p>
            <p>The Smart Hustler Team</p>
        `
    }
];

async function createTemplates() {
    const apiInstance = new Brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

    console.log("🚀 Starting Template Creation Process...");

    for (const t of templates) {
        const smtpTemplate = new Brevo.CreateSmtpTemplate();
        smtpTemplate.templateName = t.name;
        smtpTemplate.subject = t.subject;
        smtpTemplate.sender = { "name": "Smart Hustler", "email": "ken@smarthustlermarketing.com" };
        smtpTemplate.toField = "{{ contact.EMAIL }}";
        smtpTemplate.isActive = true;
        smtpTemplate.htmlContent = t.htmlContent;

        try {
            const data = await apiInstance.createSmtpTemplate(smtpTemplate);
            console.log(`✅ Created Template: "${t.name}" -> ID: ${data.id}`);
        } catch (error) {
            console.error(`❌ Failed to create "${t.name}":`);
            if (error.response && error.response.body) {
                console.error(JSON.stringify(error.response.body, null, 2));
            } else {
                console.error(error.message);
            }
        }
    }
}

createTemplates();
