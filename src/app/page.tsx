import Navbar from '../components/Navbar';
import Link from 'next/link';
import NewsletterForm from '../components/NewsletterForm';

export default function Home() {
    return (
        <main>
            <Navbar />

            {/* Hero Section */}
            <section style={{
                position: 'relative',
                padding: '8rem 0',
                textAlign: 'center',
                overflow: 'hidden'
            }}>
                {/* Abstract background blobs */}
                <div style={{
                    position: 'absolute',
                    top: '-20%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '600px',
                    height: '600px',
                    background: 'var(--primary)',
                    filter: 'blur(150px)',
                    opacity: 0.2,
                    zIndex: -1,
                    borderRadius: '50%'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '-10%',
                    right: '10%',
                    width: '400px',
                    height: '400px',
                    background: 'var(--secondary)',
                    filter: 'blur(120px)',
                    opacity: 0.2,
                    zIndex: -1,
                    borderRadius: '50%'
                }} />

                <div className="container">
                    <h1 style={{ fontSize: '4rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem' }}>
                        Dominate the <span style={{ color: 'var(--primary)' }}>Digital Market</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
                        Tools, tactics, and training for the modern affiliate marketer.
                        Automate your income and scale your business with Smart Hustler strategies.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link href="/shop" className="btn btn-primary">
                            Explore Products
                        </Link>
                        <Link href="/blog" className="btn glass" style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: 600 }}>
                            Read the Guides
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features / Monetization Focus */}
            <section style={{ padding: '6rem 0', background: 'var(--background-alt)' }}>
                <div className="container">
                    <h2 className="section-title">Premium Resources</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                        {/* Product 1 */}
                        <div className="glass" style={{ padding: '2rem', borderRadius: '1rem', transition: 'transform 0.3s ease' }}>
                            <div style={{ height: '200px', background: 'linear-gradient(135deg, #1e1b4b, #4c1d95)', borderRadius: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '4rem' }}>🚀</span>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Affiliate Jumpstart Kit</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>The ultimate checklist and templates to launch your first profitable campaign in 48 hours.</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>$49</span>
                                <Link href="/shop" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Buy Now</Link>
                            </div>
                        </div>

                        {/* Product 2 */}
                        <div className="glass" style={{ padding: '2rem', borderRadius: '1rem' }}>
                            <div style={{ height: '200px', background: 'linear-gradient(135deg, #0f172a, #0e7490)', borderRadius: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '4rem' }}>📧</span>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Email Mastery Course</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Learn how to build a list that buys. Includes 50+ copy-paste email swipe files.</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>$99</span>
                                <Link href="/shop" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Buy Now</Link>
                            </div>
                        </div>

                        {/* Product 3 */}
                        <div className="glass" style={{ padding: '2rem', borderRadius: '1rem' }}>
                            <div style={{ height: '200px', background: 'linear-gradient(135deg, #3f1524, #be123c)', borderRadius: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '4rem' }}>🤖</span>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>AI Content System</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Automate your content creation with our custom AI prompts and workflows.</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>$37</span>
                                <Link href="/shop" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Buy Now</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Latest Content */}
            <section style={{ padding: '6rem 0' }}>
                <div className="container">
                    <h2 className="section-title">Latest Tactics</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <article className="glass" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
                            <div style={{ height: '200px', background: 'var(--card-border)' }}></div>
                            <div style={{ padding: '1.5rem' }}>
                                <span style={{ color: 'var(--secondary)', fontSize: '0.875rem', fontWeight: 600 }}>TUTORIAL</span>
                                <h3 style={{ marginTop: '0.5rem' }}>How to use AI to 10x your blog output</h3>
                                <Link href="/blog/ai-blogging" style={{ marginTop: '1rem', display: 'inline-block', color: 'var(--primary)' }}>Read More &rarr;</Link>
                            </div>
                        </article>
                        <article className="glass" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
                            <div style={{ height: '200px', background: 'var(--card-border)' }}></div>
                            <div style={{ padding: '1.5rem' }}>
                                <span style={{ color: 'var(--accent)', fontSize: '0.875rem', fontWeight: 600 }}>STRATEGY</span>
                                <h3 style={{ marginTop: '0.5rem' }}>The Secret to High-Ticket Affiliate Sales</h3>
                                <Link href="/blog/high-ticket" style={{ marginTop: '1rem', display: 'inline-block', color: 'var(--primary)' }}>Read More &rarr;</Link>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section style={{ padding: '6rem 0', background: 'linear-gradient(to bottom, var(--background), var(--background-alt))' }}>
                <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Join the Inner Circle</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Get weekly tips, free resources, and exclusive deals delivered to your inbox.</p>
                    <NewsletterForm />
                </div>
            </section>

            <footer style={{ padding: '2rem 0', borderTop: '1px solid var(--card-border)', marginTop: 'auto', textAlign: 'center', color: 'var(--text-muted)' }}>
                <p>&copy; {new Date().getFullYear()} Smart Hustler Marketing. All rights reserved.</p>
            </footer>
        </main>
    );
}
