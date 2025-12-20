import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid var(--glass-border)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
                <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                    SmartHustler
                </Link>

                <div style={{ display: 'flex', gap: '2rem' }}>
                    <Link href="/blog">Blog</Link>
                    <Link href="/resources">Resources</Link>
                    <Link href="/shop">Shop</Link>
                    <Link href="/about">About</Link>
                </div>

                <Link href="/contact" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                    Get Started
                </Link>
            </div>
        </nav>
    );
}
