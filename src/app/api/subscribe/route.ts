import { NextResponse } from 'next/server';
import * as Brevo from '@getbrevo/brevo';

export async function POST(request: Request) {
    const { email } = await request.json();

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const apiInstance = new Brevo.ContactsApi();

    // Configure API key authorization: api-key
    apiInstance.setApiKey(Brevo.ContactsApiApiKeys.apiKey, process.env.BREVO_API_KEY || '');

    const createContact = new Brevo.CreateContact();
    createContact.email = email;
    createContact.listIds = [2]; // Default list ID, usually 2 is the first custom list, or make this configurable
    createContact.updateEnabled = true;

    try {
        await apiInstance.createContact(createContact);
        return NextResponse.json({ message: 'Success' }, { status: 200 });
    } catch (error: any) {
        console.error('Brevo Error:', error);

        // Handle case where contact already exists
        if (error.response && error.response.body && error.response.body.code === 'duplicate_parameter') {
            return NextResponse.json({ message: 'You are already subscribed!' }, { status: 200 });
        }

        return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
    }
}
