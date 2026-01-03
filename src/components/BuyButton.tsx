'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface BuyButtonProps {
    product: any;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export default function BuyButton({ product, className, style, children }: BuyButtonProps) {
    const [loading, setLoading] = React.useState(false);

    const handleBuy = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ product }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                alert('Checkout Error: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            console.error(error);
            alert('Failed to initiate checkout.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleBuy}
            disabled={loading}
            className={className || "btn-premium"}
            style={{ cursor: 'pointer', opacity: loading ? 0.7 : 1, ...style }}
        >
            {loading ? 'Processing...' : (children || (
                <>
                    Buy Now <ShoppingCart size={16} style={{ marginLeft: '8px' }} />
                </>
            ))}
        </button>
    );
}
