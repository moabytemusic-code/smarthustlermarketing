import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css';

export const metadata: Metadata = {
    title: 'Smart Hustler Marketing | Tools & Tactics',
    description: 'Tools, Training, and Tactics for modern affiliate marketing. Boost your digital presence.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </head>
            <body suppressHydrationWarning style={{ fontFamily: "'Outfit', sans-serif" }}>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
