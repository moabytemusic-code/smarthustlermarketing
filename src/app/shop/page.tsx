'use client';

import Navbar from '../../components/Navbar';
import { useState } from 'react';

export default function Shop() {
    const [loading, setLoading] = useState<number | null>(null);

    const products = [
        {
            id: 1,
            name: 'Affiliate Jumpstart Kit',
            price: 49,
            description: 'The ultimate checklist and templates to launch your first profitable campaign in 48 hours.',
            icon: '🚀'
        },
        {
            id: 2,
            name: 'Email Mastery Course',
            price: 99,
            description: 'Learn how to build a list that buys. Includes 50+ copy-paste email swipe files.',
            icon: '📧'
        },
        {
            id: 3,
            name: 'AI Content System',
            price: 37,
            description: 'Automate your content creation with our custom AI prompts and workflows.',
            icon: '🤖'
        },
        {
            id: 4,
            name: 'SEO Power Pack',
            price: 149,
            description: 'Rank higher with our proven backlinking strategies and on-page optimization guide.',
            icon: '🔍'
        }
    ];

    const handleCheckout = async (productId: number) => {
        setLoading(productId);
        const product = products.find(p => p.id === productId);

        try {
            const response = await fetch('/api/checkout_sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ product }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Something went wrong');
            }

            const { url } = await response.json();

            if (url) {
                window.location.href = url;
            } else {
                throw new Error('No checkout URL returned');
            }

        } catch (err: any) {
            console.error('Checkout error:', err);
            alert('Payment failed: ' + err.message);
        } finally {
            setLoading(null);
        }
    };

    return (
        <main>
            <Navbar />
            <div className="container" style={{ padding: '4rem 0' }}>
                <h1 className="section-title">Shop Digital Products</h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {products.map(product => (
                        <div key={product.id} className="glass" style={{ padding: '2rem', borderRadius: '1rem', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ height: '150px', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '3rem' }}>{product.icon}</span>
                            </div>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{product.name}</h2>
                            <p style={{ color: '#94a3b8', marginBottom: '1.5rem', flex: 1 }}>{product.description}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${product.price}</span>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleCheckout(product.id)}
                                    disabled={loading === product.id}
                                    style={{ opacity: loading === product.id ? 0.7 : 1 }}
                                >
                                    {loading === product.id ? 'Processing...' : 'Buy Now'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
