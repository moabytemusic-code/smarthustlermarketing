'use client';

import { useState } from 'react';

export default function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error);

            setStatus('success');
            setMessage(data.message || 'Thanks for subscribing!');
            setEmail('');
        } catch (error: any) {
            setStatus('error');
            setMessage(error.message || 'Something went wrong.');
        }
    };

    return (
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }} onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                        flex: 1,
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid var(--glass-border)',
                        background: 'var(--glass-bg)',
                        color: '#fff'
                    }}
                />
                <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? 'Joining...' : 'Subscribe'}
                </button>
            </div>
            {message && (
                <p style={{
                    color: status === 'error' ? '#ef4444' : '#10b981',
                    fontSize: '0.9rem',
                    margin: 0
                }}>
                    {message}
                </p>
            )}
        </form>
    );
}
