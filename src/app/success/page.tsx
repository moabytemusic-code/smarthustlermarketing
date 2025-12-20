import Navbar from '../../components/Navbar';
import Link from 'next/link';

export default function Success() {
    return (
        <main>
            <Navbar />
            <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
                <div className="glass" style={{ display: 'inline-block', padding: '4rem', borderRadius: '1rem' }}>
                    <span style={{ fontSize: '5rem', display: 'block', marginBottom: '1rem' }}>🎉</span>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>Payment Successful!</h1>
                    <p style={{ color: '#94a3b8', fontSize: '1.25rem', marginBottom: '2rem' }}>
                        Thank you for your purchase. You will receive an email confirmation shortly.
                    </p>
                    <Link href="/shop" className="btn btn-primary">
                        Back to Shop
                    </Link>
                </div>
            </div>
        </main>
    );
}
