import type { Metadata } from 'next';
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
            <body suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}
