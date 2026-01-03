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
    const handleBuy = () => {
        // In a real app, this would redirect to a Stripe Checkout Session
        // window.location.href = product.paymentLink;

        alert(`🚀 Initiating Checkout for: ${product.title}\n\nPrice: $${product.price}\n\n(Payment Gateway integration pending Stripe Keys)`);
    };

    return (
        <button
            onClick={handleBuy}
            className={className || "btn-premium"}
            style={{ cursor: 'pointer', ...style }}
        >
            {children || (
                <>
                    Buy Now <ShoppingCart size={16} style={{ marginLeft: '8px' }} />
                </>
            )}
        </button>
    );
}
