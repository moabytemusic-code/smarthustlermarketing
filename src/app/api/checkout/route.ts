import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function POST(request: Request) {
    try {
        const { product } = await request.json();

        // 1. Create a Checkout Session
        let line_items;

        if (product.priceId) {
            // Use existing Stripe Price ID
            line_items = [
                {
                    price: product.priceId,
                    quantity: 1,
                },
            ];
        } else {
            // Create Price on the fly
            line_items = [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: product.title,
                            description: product.description,
                            images: product.image ? [`https://www.smarthustlermarketing.com${product.image}`] : [],
                        },
                        unit_amount: Math.round(product.price * 100), // Convert to cents
                    },
                    quantity: 1,
                },
            ];
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.headers.get('origin')}/weekly-deal`, // Changed default cancel to weekly-deal since that's where we are
            metadata: {
                productId: product.id,
                productType: product.type
            }
        });

        // 2. Return the URL
        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('Stripe Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
