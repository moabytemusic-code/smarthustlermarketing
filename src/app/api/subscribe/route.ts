import { NextResponse } from 'next/server';
import * as Brevo from '@getbrevo/brevo';

// GHL Configuration (Can be moved to .env later)
const GHL_TOKEN = "pit-68a41766-8889-4b68-8097-d8677054238e";
const LOCATION_ID = "kXf0J5YJ3OqK5Z4k5Z4k"; // Placeholder - will be dynamically fetched or verified if needed, but for now we skip locationId in header if using User Token for lookup, or use a specific one. 
// Actually, with User Token (PIT), we often need to specify Location-Id in headers OR use a conversational endpoint. 
// Standard GHL Contact Create: POST https://services.leadconnectorhq.com/contacts/upsert
// Headers: Authorization: Bearer <TOKEN>, Version: 2021-07-28

async function syncToGHL(email: string) {
    try {
        const response = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GHL_TOKEN}`,
                'Version': '2021-07-28',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                tags: ["newsletter-subscriber", "smarthustler-website"]
                // We can add more fields here later
            })
        });

        if (!response.ok) {
            const err = await response.text();
            console.error('❌ GHL Sync Failed:', err);
        } else {
            console.log('✅ GHL Sync Success for:', email);
        }
    } catch (error) {
        console.error('❌ GHL Network Error:', error);
    }
}

export async function POST(request: Request) {
    const { email, source, productTitle } = await request.json();

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Generate specific tags
    const specificTag = source ? `interest:${source}` : 'newsletter-general';
    const allTags = ["newsletter-subscriber", "smarthustler-website", specificTag];

    // 1. GHL Sync with Tags
    async function syncToGHL(email: string, tags: string[]) {
        try {
            const response = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${GHL_TOKEN}`,
                    'Version': '2021-07-28',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    tags: tags,
                    customFields: [
                        // Example: Store the last product interest if you have a matching Custom Field ID
                        // { id: "LAST_INTEREST_ID", value: productTitle } 
                    ]
                })
            });
            if (!response.ok) console.error('❌ GHL Sync Failed:', await response.text());
        } catch (error) {
            console.error('❌ GHL Network Error:', error);
        }
    }

    // Fire & Forget GHL
    syncToGHL(email, allTags);

    // 2. Add to Brevo (Primary System)
    const apiInstance = new Brevo.ContactsApi();
    apiInstance.setApiKey(Brevo.ContactsApiApiKeys.apiKey, process.env.BREVO_API_KEY || '');

    const createContact = new Brevo.CreateContact();
    createContact.email = email;
    createContact.listIds = [51];
    createContact.updateEnabled = true;

    // Save the tag as an attribute for Automation Triggers
    createContact.attributes = {
        "SOURCE_TAG": specificTag // e.g. "interest:book-passive-trap"
    };

    try {
        await apiInstance.createContact(createContact);
        return NextResponse.json({ message: 'Success' }, { status: 200 });
    } catch (error: any) {
        console.error('Brevo Error:', error);

        if (error.response && error.response.body && error.response.body.code === 'duplicate_parameter') {
            return NextResponse.json({ message: 'You are already subscribed!' }, { status: 200 });
        }

        return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
    }
}
