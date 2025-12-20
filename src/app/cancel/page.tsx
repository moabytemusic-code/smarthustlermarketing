import Navbar from '../../components/Navbar';
import Link from 'next/link';

export default function Cancel() {
    return (
        <main>
            <Navbar />
            <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
                <div className="glass" style={{ display: 'inline-block', padding: '4rem', borderRadius: '1rem', border: '1px solid var(--accent)' }}>
                    <span style={{ fontSize: '5rem', display: 'block', marginBottom: '1rem' }}>❌</span>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--accent)' }}>Payment Cancelled</h1>
                    <p style={{ color: '#94a3b8', fontSize: '1.25rem', marginBottom: '2rem' }}>
                        Your payment was not processed. No charges were made.
                    </p>
                    <Link href="/shop" className="btn" style={{ background: '#333', color: '#fff' }}>
                        Try Again
                    </Link>
                </div>
            </div>
        </main>
    );
}
