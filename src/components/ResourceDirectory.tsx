'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// Map icons to categories
const getCategoryIcon = (category: string) => {
    const map: Record<string, string> = {
        'Our SaaS Tools': '🚀',
        'Email Marketing': '📧',
        'Hosting': '☁️',
        'E-commerce': '🛍️',
        'SEO': '🔍',
        'Funnel Builder': '🏗️',
        'AI Writing': '✍️',
        'Education': '🎓',
        'PLR & Resources': '📚',
        'Traffic': '🚦',
        'Video Tools': '🎥',
        'Content': '📝',
        'AI Tools': '🤖',
        'Affiliate Marketing': '💸',
        'Social Media': '📱',
        'CRO': '📈',
        'Funnels': '🌪️',
        'Research': '🔬',
        'Advertising': '📢',
        'Design': '🎨',
        'Business': '💼',
        'Webinars': '🎙️',
        'Audio': '🎧'
    };
    return map[category] || '⚡';
};

export default function ResourceDirectory({ offers }: { offers: any[] }) {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Extract unique categories
    const categories = useMemo(() => {
        const cats = new Set(offers.map(o => o.category));
        return ['All', ...Array.from(cats).sort()];
    }, [offers]);

    // Filter products
    const filteredOffers = useMemo(() => {
        return offers.filter(offer => {
            const matchesCategory = selectedCategory === 'All' || offer.category === selectedCategory;
            const matchesSearch = offer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                offer.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [offers, selectedCategory, searchQuery]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

            {/* Controls Section */}
            <div className="glass" style={{ padding: '1.5rem', borderRadius: '1rem', position: 'sticky', top: '100px', zIndex: 40, backdropFilter: 'blur(20px)' }}>
                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search tools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'rgba(0,0,0,0.3)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '0.5rem',
                        color: '#fff',
                        marginBottom: '1.5rem',
                        fontSize: '1rem'
                    }}
                />

                {/* Category Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '2rem',
                                border: '1px solid',
                                borderColor: selectedCategory === cat ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                                background: selectedCategory === cat ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                color: selectedCategory === cat ? '#000' : '#94a3b8',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                fontWeight: selectedCategory === cat ? 600 : 400,
                                transition: 'all 0.2s'
                            }}
                        >
                            {cat === 'All' ? '🔥 All Tools' : `${getCategoryIcon(cat)} ${cat}`}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results Grid */}
            <div className="resource-grid">
                {filteredOffers.map((offer, i) => (
                    <div key={i} className="card-premium">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                            <div className="card-icon" style={{ marginBottom: 0 }}>
                                {getCategoryIcon(offer.category)}
                            </div>
                            <span className="badge" style={{ fontSize: '0.7rem' }}>{offer.category}</span>
                        </div>

                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', lineHeight: '1.4', fontWeight: 700 }}>{offer.name}</h3>

                        <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.5rem', flexGrow: 1, lineHeight: '1.6' }}>
                            {offer.description}
                        </p>

                        {(offer.affiliate_link || offer.link) && (
                            <a
                                href={offer.affiliate_link || offer.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline btn-sm"
                                style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}
                            >
                                {offer.commission === 'Free Tool' ? 'Use for Free' : 'Visit Site'} &rarr;
                            </a>
                        )}
                    </div>
                ))}
            </div>

            {filteredOffers.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
                    <p>No tools found matching your search. Try "AI" or "Traffic".</p>
                </div>
            )}
        </div>
    );
}
