'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function BookModal({ product }: { product: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    source: product.id,
                    productTitle: product.title
                }),
            });

            if (!res.ok) throw new Error('Subscription failed');

            setStatus('success');
        } catch (error) {
            console.error(error);
            setStatus('idle'); // Allow retrying, or handle error state
            alert('Something went wrong. Please try again.');
        }
    };

    if (status === 'success') {
        return (
            <div style={{ textAlign: 'center' }}>
                <div className="btn-premium" style={{ background: '#10b981', borderColor: '#10b981', cursor: 'default', marginBottom: '1rem', width: '100%', justifyContent: 'center' }}>
                    Welcome to the Inner Circle! 🚀
                </div>
                <p style={{ marginBottom: '1rem', color: '#cbd5e1' }}>Check your inbox, or start reading continuously:</p>
                <a
                    href="/lead-magnets/The_Passive_Trap_Chapter_1.md"
                    target="_blank"
                    className="btn-outline"
                    style={{ width: '100%', justifyContent: 'center', display: 'flex' }}
                >
                    Download Chapter 1 Now &rarr;
                </a>
            </div>
        );
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="btn-premium"
                style={{ width: '100%', justifyContent: 'center' }}
            >
                {product.action}
            </button>

            {isOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.8)',
                    zIndex: 9999,
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem'
                }}>
                    <div className="glass" style={{
                        width: '100%',
                        maxWidth: '500px',
                        padding: '2rem',
                        borderRadius: '1rem',
                        position: 'relative',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                        >
                            <X size={24} />
                        </button>

                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Read Chapter 1 Free</h3>
                        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
                            Join the Smart Hustler list to get the first chapter of <strong>{product.title}</strong> delivered instantly.
                        </p>

                        <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input
                                type="email"
                                placeholder="Enter your best email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    padding: '1rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'rgba(0,0,0,0.3)',
                                    color: '#fff',
                                    width: '100%'
                                }}
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="btn-premium"
                                style={{ justifyContent: 'center' }}
                            >
                                {status === 'loading' ? 'Sending...' : 'Send Me The Chapter'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
