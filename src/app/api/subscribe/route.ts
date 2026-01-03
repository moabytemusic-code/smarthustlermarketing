import { NextResponse } from 'next/server';
import * as Brevo from '@getbrevo/brevo';

// GHL Configuration (Can be moved to .env later)
export async function POST(request: Request) {
    const { email, source, productTitle } = await request.json();

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Generate specific tags
    const specificTag = source ? `interest:${source}` : 'newsletter-general';

    // 2. Add to Brevo (Primary System)
    const apiInstance = new Brevo.ContactsApi();
    apiInstance.setApiKey(Brevo.ContactsApiApiKeys.apiKey, process.env.BREVO_API_KEY || '');

    // List Mapping
    const listMap: Record<string, number> = {
        'book-passive-trap': 52,
        'book-owned-assets': 53,
        'book-anti-passive-manifesto': 54,
        'book-leverage': 55, // Note: ID in products.json might be 'book-leverage-over-luck' or 'book-leverage' - checking logic below
        'book-leverage-over-luck': 55,
        'book-equity-engine': 56
    };

    // Determine Lists (Always add to Master 51)
    const listsToAdd = [51];
    if (source && listMap[source]) {
        listsToAdd.push(listMap[source]);
    }

    const createContact = new Brevo.CreateContact();
    createContact.email = email;
    createContact.listIds = listsToAdd;
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
