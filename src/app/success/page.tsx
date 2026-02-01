import Navbar from '../../components/Navbar';
import Link from 'next/link';

export default async function Success(props: {
    searchParams: Promise<{ productId?: string; session_id?: string }>;
}) {
    const searchParams = await props.searchParams;
    const productMap: Record<string, { name: string; file: string }> = {
        '1': { name: 'Affiliate Jumpstart Kit', file: '/products_pdf/Affiliate_Jumpstart_Kit.pdf' },
        '2': { name: 'Email Mastery Course', file: '/products_pdf/Email_Mastery_Course.pdf' },
        '3': { name: 'AI Content System', file: '/products_pdf/AI_Content_System.pdf' },
        '4': { name: 'SEO Power Pack', file: '/products_pdf/SEO_Power_Pack.pdf' },
        'prod-micro-niche-finder': { name: 'Micro Niche Finder AI', file: '/products_pdf/Micro_Niche_Finder.pdf' },
        'weekly-bundle-standard': { name: 'The Friday Drop (Standard Bundle)', file: '/Weekly_Deal_Bundle.zip' },
        'weekly-bundle-reseller': { name: 'The Friday Drop (Reseller Bundle)', file: '/Weekly_Deal_Bundle.zip' }
    };

    const productId = searchParams.productId;
    const product = productId ? productMap[productId] : null;

    console.log('Success Page Debug:');
    console.log('searchParams:', searchParams);
    console.log('productId:', productId);
    console.log('product:', product);

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#fff' }}>
            <Navbar />
            <div className="container" style={{ padding: '8rem 0', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                <div className="glass" style={{ padding: '4rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="badge" style={{ marginBottom: '2rem', justifyContent: 'center' }}>
                        <div className="dot">
                            <div className="dot-ping"></div>
                        </div>
                        Payment Successful
                    </div>

                    <h1 className="title-main" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
                        You're In! <span className="gradient-text">Welcome.</span>
                    </h1>

                    <p style={{ color: '#94a3b8', fontSize: '1.25rem', marginBottom: '3rem', lineHeight: '1.6' }}>
                        Thank you for your investment. You’ve just taken a massive step toward automating your income.
                    </p>

                    {product ? (
                        <div className="card-premium" style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{product.name}</h2>
                            <p style={{ color: '#cbd5e1', marginBottom: '2rem' }}>Your product is ready for immediate download.</p>
                            <a
                                href={product.file}
                                download
                                className="btn-premium"
                                style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}
                            >
                                📥 Download Now
                            </a>
                        </div>
                    ) : (
                        <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem' }}>
                            <p>Check your email for your receipt and product access.</p>
                        </div>
                    )}

                    <div style={{ marginTop: '4rem' }}>
                        <Link href="/shop" className="btn-outline">
                            &larr; Return to Shop
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
