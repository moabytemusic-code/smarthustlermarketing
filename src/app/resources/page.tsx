import { promises as fs } from 'fs';
import path from 'path';
import Navbar from '../../components/Navbar';
import ResourceDirectory from '../../components/ResourceDirectory';
import Image from 'next/image';
import SignalEngineCard from '../../components/SignalEngineCard';
import { ENGINE_DETAILS, getEngineUrl } from '../../data/engineMapping';
import { ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Resources & Toolkit | Smart Hustler Marketing Stack',
    description: 'The software, services, and secret weapons behind our 6-figure automated business. Explore our curated toolbox and diagnostics.',
    alternates: {
        canonical: 'https://smarthustlermarketing.com/resources',
    }
};

async function getOffers() {
    const filePath = path.join(process.cwd(), 'src/content/campaigns/affiliate_offers.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export default async function Resources() {
    const offers = await getOffers();

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#fff' }}>
            <Navbar />

            <div className="container" style={{ padding: '8rem 0 4rem' }}>
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
                    <div className="badge" style={{ marginBottom: '1.5rem', justifyContent: 'center' }}>
                        <div className="dot">
                            <div className="dot-ping"></div>
                        </div>
                        Curated Toolbox
                    </div>
                    <h1 className="title-main" style={{ fontSize: '3.5rem' }}>The <span className="gradient-text">Stack</span></h1>
                    <p className="subtitle" style={{ margin: '0 auto' }}>
                        The software, services, and secret weapons behind our 6-figure automated business.
                    </p>
                </div>

                {/* Signal Engines Highlight */}
                <div style={{ marginBottom: '8rem' }}>
                    <h2 className="section-title" style={{ marginBottom: '1rem', textAlign: 'center' }}>Diagnostics & Fixes</h2>
                    <p style={{ textAlign: 'center', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 3rem' }}>
                        Before you scale, fix the leaks. Use these engines to repair suspended accounts and tracking issues.
                    </p>
                    <div className="resource-grid">
                        {['fbadban', 'gbpsuspend', 'emailspam', 'trackingfix'].map(id => {
                            const details = ENGINE_DETAILS[id] || { title: id, description: "Launch this engine." };
                            return (
                                <SignalEngineCard
                                    key={id}
                                    engineId={id}
                                    title={details.title}
                                    description={details.description}
                                    placement="resources_highlight"
                                    campaign="resources_page"
                                />
                            );
                        })}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <a href={getEngineUrl(null, 'resources_highlight_browse', 'resources_page')} target="_blank" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                            View all Diagnostic Engines <ArrowRight size={16} />
                        </a>
                    </div>
                </div>

                {/* Amazon Section */}
                <div style={{ marginBottom: '8rem' }}>
                    <h2 className="section-title" style={{ marginBottom: '1rem' }}>Amazon Must-Reads</h2>
                    <p style={{ textAlign: 'center', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 4rem' }}>
                        Books that shaped our mindset and strategy.
                    </p>
                    <div className="resource-grid" style={{ marginTop: 0 }}>
                        {[
                            {
                                title: "Smart Hustler Guide to Affiliate AI Tools",
                                author: "Smart Hustler Marketing",
                                description: "Turn AI Tools Into Your 24/7 Sales Team. Uncover the exact systems that let modern marketers automate traffic, conversions, and commissions.",
                                price: "$11.99",
                                link: "https://a.co/d/8XuAzjM",
                                image: "/books/affiliate-ai-tools.jpg"
                            },
                            {
                                title: "Smart Hustler Guide to Prompt Engineering",
                                author: "Smart Hustler Marketing",
                                description: "Unlock the Hidden Skill That Powers the AI Revolution. Learn how to write prompts that get powerful results from tools like ChatGPT, Midjourney, and Claude.",
                                price: "$11.99",
                                link: "https://a.co/d/evLEF2W",
                                image: "/books/prompt-engineering.jpg"
                            },
                            {
                                title: "Smart Hustler Guide to ChatGPT for Beginners",
                                author: "Smart Hustler Marketing",
                                description: "Discover how to turn ChatGPT into your personal business partner. Learn to write content, build products, and automate workflows.",
                                price: "$11.99",
                                link: "https://a.co/d/1jeSELw",
                                image: "/books/chatgpt-guide.jpg"
                            }
                        ].map((book, i) => (
                            <div key={i} className="card-premium">
                                <div style={{
                                    position: 'relative',
                                    height: '400px',
                                    width: '100%',
                                    marginBottom: '1.5rem',
                                    borderRadius: '0.75rem',
                                    overflow: 'hidden',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}>
                                    <Image
                                        src={book.image}
                                        alt={book.title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', lineHeight: '1.4' }}>{book.title}</h3>
                                <p style={{ color: 'var(--primary)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{book.author}</p>
                                <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.5rem', flexGrow: 1 }}>{book.description}</p>
                                <a
                                    href={book.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-premium btn-sm"
                                    style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}
                                >
                                    Buy on Amazon {book.price}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Interactive Directory */}
                <div style={{ paddingTop: '4rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <h2 className="section-title" style={{ marginBottom: '2rem' }}>Digital Toolkit</h2>
                    <ResourceDirectory offers={offers} />
                </div>
            </div>
        </main>
    );
}
