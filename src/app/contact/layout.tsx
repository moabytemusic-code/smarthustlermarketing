import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | Smart Hustler Marketing',
    description: 'Get in touch with the Smart Hustler Marketing team for support, partnerships, or inquiries.',
    alternates: {
        canonical: 'https://smarthustlermarketing.com/contact',
    }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
