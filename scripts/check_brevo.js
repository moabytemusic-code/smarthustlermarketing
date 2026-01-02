require('dotenv').config({ path: '.env.local' });
const Brevo = require('@getbrevo/brevo');

async function checkAttribute() {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
        console.error("❌ BREVO_API_KEY not found in .env.local");
        return;
    }

    const apiInstance = new Brevo.ContactsApi();
    apiInstance.setApiKey(Brevo.ContactsApiApiKeys.apiKey, apiKey);

    try {
        const data = await apiInstance.getAttributes();
        console.log("DEBUG: Keys in response:", Object.keys(data));

        // Handling SDK response wrapper
        const attributes = data.attributes || data.body?.attributes;

        if (!attributes) {
            console.log("DEBUG: Full Response:", JSON.stringify(data, null, 2));
            return;
        }

        const target = "SOURCE_TAG";
        const found = attributes.find(attr => attr.name === target);

        if (found) {
            console.log(`✅ Attribute '${target}' FOUND.`);
            console.log(`   Category: ${found.category}`);
            console.log(`   Type: ${found.type}`);
        } else {
            console.log(`❌ Attribute '${target}' NOT FOUND.`);
            console.log("   Available Attributes: " + attributes.map(a => a.name).join(", "));
        }

    } catch (error) {
        console.error("❌ API Error:", error.message);
    }
}

checkAttribute();
