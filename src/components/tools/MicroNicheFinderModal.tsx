'use client';

import React, { useState } from 'react';
import { Loader2, X } from 'lucide-react';
import '../../app/tools/micro-niche-finder/styles.css'; // Ensure CSS is loaded

interface MicroNicheFinderModalProps {
    isOpen: boolean;
    onClose: () => void;
    keyword: string;
}

export default function MicroNicheFinderModal({ isOpen, onClose, keyword }: MicroNicheFinderModalProps) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    source: 'micro-niche-finder',
                    productTitle: keyword
                })
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setTimeout(() => {
                    onClose();
                    setStatus('idle');
                    setEmail('');
                    // Redirect to Thank You page
                    window.location.href = '/tools/micro-niche-finder/thank-you';
                }, 1500);
            } else {
                console.error('API Error:', data);
                setStatus('error');
                setTimeout(() => setStatus('idle'), 2000);
            }

        } catch (error) {
            console.error('Network Error:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 2000);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="close-modal"
                >
                    &times;
                </button>

                <div className="modal-header">
                    <h2>Unlock Your Report</h2>
                    <p>
                        Enter your email to save the analysis for <span className="highlight">{keyword}</span> and get your Profit Score.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="email"
                            required
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
                        className="btn-primary full-width"
                        style={{ justifyContent: 'center' }}
                    >
                        {status === 'loading' ? (
                            <>
                                <Loader2 className="animate-spin" size={16} style={{ marginRight: '8px' }} /> Validating...
                            </>
                        ) : status === 'success' ? (
                            'Success! Redirecting...'
                        ) : status === 'error' ? (
                            'Error. Try Again.'
                        ) : (
                            'Reveal Data'
                        )}
                    </button>

                    <p className="disclaimer">
                        No spam. Unsubscribe anytime.
                    </p>
                </form>
            </div>
        </div>
    );
}
