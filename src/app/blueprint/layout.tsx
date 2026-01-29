import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'The 2026 Side Hustle Blueprint | Free Download',
    description: 'The exact 5-step roadmap we use to build $10k/month automated income streams. Download the confidential strategy guide.',
    alternates: {
        canonical: 'https://smarthustlermarketing.com/blueprint',
    }
};

export default function BlueprintLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
