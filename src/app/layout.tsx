import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css';

export const metadata: Metadata = {
    metadataBase: new URL('https://smarthustlermarketing.com'),
    title: {
        default: 'Smart Hustler Marketing | Tools & Tactics',
        template: '%s | Smart Hustler Marketing'
    },
    description: 'Tools, Training, and Tactics for modern affiliate marketing. Build automated income streams with AI.',
    alternates: {
        canonical: './',
        types: {
            'application/rss+xml': '/rss.xml',
        },
    },
    openGraph: {
        title: 'Smart Hustler Marketing',
        description: 'Automated Marketing Systems for the Modern Entrepreneur.',
        url: 'https://smarthustlermarketing.com',
        siteName: 'Smart Hustler Marketing',
        locale: 'en_US',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    },
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
