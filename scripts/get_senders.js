require('dotenv').config({ path: '.env.local' });
const Brevo = require('@getbrevo/brevo');

async function getSenders() {
    const apiInstance = new Brevo.AccountApi(); // Corrected API Class for Account info might be SendersApi actually, checking docs...
    // Actually Senders are under TransactionalEmailsApi or SendersApi 
    const sendersInstance = new Brevo.SendersApi();

    sendersInstance.setApiKey(Brevo.SendersApiApiKeys.apiKey, process.env.BREVO_API_KEY);

    try {
        const data = await sendersInstance.getSenders();
        console.log("✅ Authorized Senders:", JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("❌ Failed to get senders:", error.message);
    }
}

getSenders();
