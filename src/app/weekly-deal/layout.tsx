import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'The Friday Drop | Limited Time Bundle Deals',
    description: 'Get $250+ worth of premium digital assets for just $25. New bundle drops every week at Smart Hustler Marketing.',
    alternates: {
        canonical: 'https://smarthustlermarketing.com/weekly-deal',
    }
};

export default function WeeklyDealLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
