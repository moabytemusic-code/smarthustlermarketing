import Navbar from '../components/Navbar';
import Link from 'next/link';
import NewsletterForm from '../components/NewsletterForm';

export default function Home() {
    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#fff' }}>
            <Navbar />

            {/* Hero Section */}
            <section style={{ position: 'relative', overflow: 'hidden' }}>
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>

                <div className="container">
                    <div className="hero-grid">
                        <div className="hero-content">
                            <div className="badge">
                                <div className="dot">
                                    <div className="dot-ping"></div>
                                </div>
                                The Future of Affiliate Marketing is Here
                            </div>

                            <h1 className="title-main">
                                Dominate the <br />
                                <span className="gradient-text">Digital Market</span>
                            </h1>

                            <p className="subtitle">
                                Unlock high-performance tools, battle-tested tactics, and expert-led training
                                for the modern entrepreneur. Stop chasing trends—start building assets.
                            </p>

                            <div className="btn-group">
                                <Link href="/shop" className="btn-premium">
                                    Explore Products
                                </Link>
                                <Link href="/blog" className="btn-outline">
                                    Read the Guides
                                </Link>
                            </div>

                            <div className="stats-row">
                                <div className="stat-item">
                                    <h4>10k+</h4>
                                    <p>Members</p>
                                </div>
                                <div className="stat-item">
                                    <h4>500+</h4>
                                    <p>Campaigns</p>
                                </div>
                                <div className="stat-item">
                                    <h4>99%</h4>
                                    <p>Success Rate</p>
                                </div>
                            </div>
                        </div>

                        <div className="hero-visual">
                            <div className="image-container" style={{ position: 'relative', animation: 'float 6s ease-in-out infinite' }}>
                                <div style={{
                                    position: 'absolute',
                                    inset: -20,
                                    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)',
                                    filter: 'blur(40px)',
                                    zIndex: 0
                                }}></div>
                                <img
                                    src="/hero-vibrant.png"
                                    alt="Smart Hustler Dashboard"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        position: 'relative',
                                        zIndex: 10,
                                        borderRadius: '1rem',
                                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium Resources Section */}
            <section style={{ padding: '8rem 0', backgroundColor: '#0b1120' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Premium Resources</h2>
                        <p style={{ fontSize: '1.125rem', color: '#94a3b8' }}>Everything you need to launch, scale, and automate your digital income streams.</p>
                    </div>

                    <div className="resource-grid">
                        {/* Product 1 */}
                        <div className="card-premium">
                            <div className="card-icon">🚀</div>
                            <h3>Affiliate Jumpstart Kit</h3>
                            <p>The ultimate launchpad. Includes battle-tested templates, secret niche lists, and a 48-hour launch sequence.</p>
                            <div className="card-footer">
                                <span className="price">$49</span>
                                <Link href="/shop" className="btn-outline btn-sm">Buy Now</Link>
                            </div>
                        </div>

                        {/* Product 2 */}
                        <div className="card-premium">
                            <div className="card-icon">📧</div>
                            <h3>Email Mastery Course</h3>
                            <p>Transform your list into a profit machine. High-conversion swipe files and behavioral automation workflows.</p>
                            <div className="card-footer">
                                <span className="price">$99</span>
                                <Link href="/shop" className="btn-outline btn-sm">Buy Now</Link>
                            </div>
                        </div>

                        {/* Product 3 */}
                        <div className="card-premium">
                            <div className="card-icon">🤖</div>
                            <h3>AI Content System</h3>
                            <p>Stop writing, start engineering. Leverage custom AI frameworks to crank out viral content at scale.</p>
                            <div className="card-footer">
                                <span className="price">$37</span>
                                <Link href="/shop" className="btn-outline btn-sm">Buy Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA / Newsletter Section */}
            <section style={{ padding: '8rem 0' }}>
                <div className="container">
                    <div className="cta-box">
                        <div className="blob blob-1" style={{ top: '-10rem', right: '-10rem', left: 'auto' }}></div>
                        <div className="blob blob-2" style={{ bottom: '-10rem', left: '-10rem' }}></div>

                        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                            <h2 className="cta-title">Join the <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>Inner Circle</span></h2>
                            <p className="cta-subtitle">
                                Get early access to my latest case studies, free tool updates,
                                and the algorithms the gurus don&apos;t want you to find.
                            </p>

                            <div style={{ maxWidth: '450px', margin: '0 auto' }}>
                                <NewsletterForm />
                            </div>

                            <p style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#64748b' }}>
                                Join over 10,000+ hustlers. Zero spam, just pure signal.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <footer style={{ padding: '4rem 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'center', color: '#64748b' }}>
                <div className="container">
                    <p style={{ marginBottom: '1.5rem' }}>&copy; {new Date().getFullYear()} Smart Hustler Marketing. All rights reserved.</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '0.875rem' }}>
                        <Link href="/privacy" style={{ color: 'inherit' }}>Privacy Policy</Link>
                        <Link href="/terms" style={{ color: 'inherit' }}>Terms of Service</Link>
                        <Link href="/contact" style={{ color: 'inherit' }}>Contact</Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}
