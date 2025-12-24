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
            icon: '🚀',
            features: ['Launch Checklist', '3 Funnel Templates', 'Niche List']
        },
        {
            id: 2,
            name: 'Email Mastery Course',
            price: 99,
            description: 'Learn how to build a list that buys. Includes 50+ copy-paste email swipe files.',
            icon: '📧',
            features: ['50+ Swipes', 'Automation Workflows', 'Segmentation Guide']
        },
        {
            id: 3,
            name: 'AI Content System',
            price: 37,
            description: 'Automate your content creation with our custom AI prompts and workflows.',
            icon: '🤖',
            features: ['100+ Prompts', 'Video Script Gen', 'SEO Blog Writer']
        },
        {
            id: 4,
            name: 'SEO Power Pack',
            price: 149,
            description: 'Rank higher with our proven backlinking strategies and on-page optimization guide.',
            icon: '🔍',
            features: ['Backlink Strategy', 'On-Page Checklist', 'Site Audit Tool']
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
        <main style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#fff' }}>
            <Navbar />

            <div className="container" style={{ padding: '8rem 0' }}>
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 6rem' }}>
                    <div className="badge" style={{ marginBottom: '1.5rem', justifyContent: 'center' }}>
                        <div className="dot">
                            <div className="dot-ping"></div>
                        </div>
                        Premium Training & Tools
                    </div>
                    <h1 className="title-main" style={{ fontSize: '3.5rem' }}>Digital <span className="gradient-text">Shop</span></h1>
                    <p className="subtitle" style={{ margin: '0 auto' }}>
                        Invest in your hustle. These are the exact systems we use to generate 6-figures.
                    </p>
                </div>

                <div className="resource-grid">
                    {products.map(product => (
                        <div key={product.id} className="card-premium">
                            <div className="card-icon" style={{ marginBottom: '1.5rem' }}>
                                {product.icon}
                            </div>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 700 }}>{product.name}</h2>
                            <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: '1.6' }}>{product.description}</p>

                            {/* Feature List */}
                            <ul style={{ marginBottom: '2rem', padding: 0, listStyle: 'none' }}>
                                {product.features.map((feature, idx) => (
                                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
                                        <span style={{ color: 'var(--primary)' }}>✓</span> {feature}
                                    </li>
                                ))}
                            </ul>

                            <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#fff' }}>${product.price}</span>
                                <button
                                    className="btn-premium"
                                    onClick={() => handleCheckout(product.id)}
                                    disabled={loading === product.id}
                                    style={{
                                        opacity: loading === product.id ? 0.7 : 1,
                                        padding: '0.75rem 1.5rem',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    {loading === product.id ? 'Processing...' : 'Buy Now'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust Section */}
                <div style={{ marginTop: '6rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '4rem' }}>
                    <p style={{ color: '#64748b', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Trusted Secure Payment via Stripe</p>
                </div>
            </div>
        </main>
    );
}
