import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe safely to avoid build-time errors if the key is missing
const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY)
    : null;

export async function POST(req: NextRequest) {
    if (!stripe) {
        console.error('Stripe Secret Key is missing');
        return NextResponse.json({ error: 'Server misconfiguration: No Stripe Key' }, { status: 500 });
    }

    try {
        const body = await req.json();
        const { product } = body;

        if (!product) {
            return NextResponse.json({ error: 'Product is required' }, { status: 400 });
        }

        const { name, price, description } = product;

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: name,
                            description: description,
                        },
                        unit_amount: Math.round(price * 100), // Stripe expects amounts in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}&productId=${product.id}`,
            cancel_url: `${req.headers.get('origin')}/cancel`,
            metadata: {
                productName: name,
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (err: any) {
        console.error('Stripe Checkout Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
