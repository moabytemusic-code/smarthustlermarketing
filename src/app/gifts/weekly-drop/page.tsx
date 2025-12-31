'use client';

import Navbar from '../../../components/Navbar';
import Link from 'next/link';
import { Download, Gift, ExternalLink, Star } from 'lucide-react';

// This data would typically come from a CMS or config file
// to make it "customizable" for the user.
const WEEKLY_DATA = {
    weekNumber: 42,
    theme: "The Content Scaling Protocol",
    gifts: [
        {
            id: 1,
            title: "Viral Hook Templates",
            description: "50+ plug-and-play headlines for TikTok and Reels.",
            type: "PDF Guide",
            size: "2.4 MB"
        },
        {
            id: 2,
            title: "Email Sequence Swipe File",
            description: "7-day nurture sequence to warm up cold leads.",
            type: "Doc Template",
            size: "1.1 MB"
        },
        {
            id: 3,
            title: "Canva Carousel Kit",
            description: "10 editable carousel templates for LinkedIn.",
            type: "Canva Link",
            size: "Access Link"
        },
        {
            id: 4,
            title: "SEO Checklist 2024",
            description: "Technical audit sheet to rank higher on Google.",
            type: "Spreadsheet",
            size: "500 KB"
        }
    ],
    affiliateOffers: [
        {
            id: 1,
            title: "Jasper AI",
            description: "The AI co-pilot for enterprise marketing teams.",
            cta: "Start Free Trial",
            link: "https://jasper.ai?fpr=example", // Affiliate Link
            badge: "Top Pick"
        },
        {
            id: 2,
            title: "ConvertKit",
            description: "The creator marketing platform for newsletter growth.",
            cta: "Get 14 Days Free",
            link: "https://convertkit.com?lmref=example" // Affiliate Link
        }
    ]
};

export default function WeeklyGiftPage() {
    return (
        <main data-theme="deal" style={{ background: 'var(--background)', minHeight: '100vh' }}>
            <Navbar />


            {/* Header / Brand Area */}
            <div style={{
                background: 'linear-gradient(to bottom, var(--background-alt), transparent)',
                padding: '8rem 0 4rem',
                textAlign: 'center',
                borderBottom: '1px solid var(--card-border)'
            }}>
                <div className="container">
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'var(--card-bg)',
                        border: '1px solid var(--card-border)',
                        padding: '0.5rem 1rem',
                        borderRadius: '9999px',
                        marginBottom: '1.5rem',
                        color: 'var(--primary)',
                        fontWeight: '600',
                        fontSize: '0.875rem',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}>
                        <Gift size={16} />
                        WEEKLY DROP #{WEEKLY_DATA.weekNumber}
                    </div>

                    <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--foreground)' }}>
                        Your Weekly <span style={{ color: 'var(--secondary)' }}>Profit Pack</span>
                    </h1>
                    <p className="subtitle" style={{ margin: '0 auto', maxWidth: '600px', color: '#475569', fontWeight: '500' }}>
                        Download this week's curated digital assets and check out our partner tools to scale your business faster.
                    </p>
                </div>
            </div>

            <div className="container" style={{ padding: '6rem 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '4rem', alignItems: 'start' }}>

                    {/* Main Content: Downloads */}
                    <div>
                        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Download size={32} color="var(--primary)" />
                            Free Downloads
                        </h2>

                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {WEEKLY_DATA.gifts.map((gift) => (
                                <div key={gift.id} style={{
                                    background: 'var(--card-bg)',
                                    border: '1px solid var(--card-border)',
                                    borderRadius: '1rem',
                                    padding: '2rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                                }}>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                                            {gift.type} • {gift.size}
                                        </div>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--foreground)' }}>{gift.title}</h3>
                                        <p style={{ color: '#475569', margin: 0, fontWeight: '500' }}>{gift.description}</p>
                                    </div>
                                    <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap', color: 'var(--foreground)', borderColor: 'var(--card-border)' }}>
                                        <Download size={18} />
                                        Download
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar: Affiliate / Partner Offers */}
                    <div>
                        <div style={{
                            background: 'var(--card-bg)',
                            border: '1px solid var(--card-border)',
                            borderRadius: '1.5rem',
                            padding: '2rem',
                            position: 'sticky',
                            top: '8rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                        }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--foreground)' }}>
                                <Star size={24} fill="var(--accent)" stroke="none" />
                                Recommended Tools
                            </h2>

                            <div style={{ display: 'grid', gap: '2rem' }}>
                                {WEEKLY_DATA.affiliateOffers.map((offer) => (
                                    <div key={offer.id}>
                                        {offer.badge && (
                                            <span style={{
                                                background: 'var(--primary)',
                                                color: '#000',
                                                fontSize: '0.75rem',
                                                fontWeight: '800',
                                                padding: '0.2rem 0.5rem',
                                                borderRadius: '0.25rem',
                                                marginBottom: '0.5rem',
                                                display: 'inline-block'
                                            }}>
                                                {offer.badge}
                                            </span>
                                        )}
                                        <h4 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--foreground)' }}>{offer.title}</h4>
                                        <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.6', fontWeight: '500' }}>
                                            {offer.description}
                                        </p>
                                        <a href={offer.link} className="btn-premium" style={{
                                            width: '100%',
                                            textAlign: 'center',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            padding: '0.75rem'
                                        }}>
                                            {offer.cta}
                                            <ExternalLink size={16} />
                                        </a>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--card-border)', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                                We may earn a commission if you click these links, at no extra cost to you.
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--card-border)', textAlign: 'center', color: 'var(--text-muted)' }}>
                <div className="container">
                    <p style={{ marginBottom: '1.5rem' }}>&copy; {new Date().getFullYear()} Smart Hustler Marketing. All rights reserved.</p>
                </div>
            </footer>
        </main>
    );
}
