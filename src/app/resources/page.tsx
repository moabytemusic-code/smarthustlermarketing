import { promises as fs } from 'fs';
import path from 'path';
import Navbar from '../../components/Navbar';
import ResourceDirectory from '../../components/ResourceDirectory';

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

                {/* Interactive Directory */}
                <ResourceDirectory offers={offers} />

                {/* Amazon Section */}
                <div style={{ marginTop: '8rem', paddingTop: '4rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <h2 className="section-title" style={{ marginBottom: '1rem' }}>Amazon Must-Reads</h2>
                    <p style={{ textAlign: 'center', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 4rem' }}>
                        Books that shaped our mindset and strategy.
                    </p>
                    <div className="resource-grid" style={{ marginTop: 0 }}>
                        {[
                            {
                                title: "AI Side Hustle: 5 Simple Online Businesses You Can Start This Weekend",
                                author: "Smart Hustler Marketing",
                                description: "Leverage the power of Artificial Intelligence to launch profitable revenue streams without a steep learning curve.",
                                price: "$14.99",
                                link: "https://www.amazon.com/s?k=AI+Side+Hustle+5+Simple+Online+Businesses+You+Can+Start+This+Weekend"
                            },
                            {
                                title: "Affiliate Marketing Jumpstart: Zero to Commission in 7 Days",
                                author: "Smart Hustler Marketing",
                                description: "The step-by-step blueprint to making your first online dollar. Validated strategies for the modern affiliate.",
                                price: "$9.99",
                                link: "https://www.amazon.com/s?k=Affiliate+Marketing+Jumpstart+Zero+to+Commission+in+7+Days"
                            }
                        ].map((book, i) => (
                            <div key={i} className="card-premium">
                                <div style={{
                                    height: '200px',
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: '0.75rem',
                                    marginBottom: '1.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#64748b',
                                    textAlign: 'center',
                                    padding: '1rem',
                                    border: '1px solid rgba(255,255,255,0.05)'
                                }}>
                                    📚 {book.title.slice(0, 20)}...
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
            </div>
        </main>
    );
}
