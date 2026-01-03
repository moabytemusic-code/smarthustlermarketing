import { promises as fs } from 'fs';
import path from 'path';
import Navbar from '../../components/Navbar';
import { ArrowRight, Star } from 'lucide-react';
import { Metadata } from 'next';
import BuyButton from '../../components/BuyButton';

export const metadata: Metadata = {
    title: 'Shop | Smart Hustler Marketing',
    description: 'Premium templates, courses, and systems for the active asset builder.',
    keywords: ['Asset Building', 'Business Systems', 'Notion Templates for Business', 'Scale Consulting']
};

async function getProducts() {
    const filePath = path.join(process.cwd(), 'src/content/products.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export default async function Shop() {
    const allProducts = await getProducts();

    // Filter Categories
    const featured = allProducts.find((p: any) => p.title === 'The "Active Asset" Blueprint');
    const bundle = allProducts.find((p: any) => p.type === 'Bundle');
    const products = allProducts.filter((p: any) => p.category === 'Products' && p.type !== 'Bundle' && p.title !== 'The "Active Asset" Blueprint');

    // Group by Type for the grid
    const training = products.filter((p: any) => p.type === 'Training');
    const systems = products.filter((p: any) => p.type === 'Systems');
    const tools = products.filter((p: any) => p.type === 'Tool'); // Added Tools

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#fff' }}>
            <Navbar />

            <div className="container" style={{ padding: '2rem 0 8rem' }}>

                {/* Header */}
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 6rem' }}>
                    <div className="badge" style={{ marginBottom: '1.5rem', justifyContent: 'center' }}>
                        Premium Systems
                    </div>
                    <h1 className="title-main" style={{ fontSize: '3.5rem' }}>Digital <span className="gradient-text">Shop</span></h1>
                    <p className="subtitle" style={{ margin: '0 auto' }}>
                        Invest in your hustle. These are the exact systems we use to generate 6-figures.
                    </p>
                </div>

                {/* Featured Section */}
                {featured && (
                    <div style={{ marginBottom: '8rem' }}>
                        <div className="glass" style={{ padding: '3rem', borderRadius: '1.5rem', border: '1px solid var(--primary)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--primary)', color: '#000', padding: '0.5rem 1.5rem', fontWeight: 'bold', borderBottomLeftRadius: '1rem' }}>
                                Best Seller
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
                                <div>
                                    <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>{featured.title}</h2>
                                    <p style={{ fontSize: '1.25rem', color: '#cbd5e1', marginBottom: '2rem' }}>{featured.description}</p>
                                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                                        {featured.features.map((f: string, i: number) => (
                                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                                                <span style={{ color: 'var(--primary)' }}>✓</span> {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                        <span style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>${featured.price}</span>
                                        <BuyButton product={featured}>
                                            Get Instant Access <ArrowRight size={20} />
                                        </BuyButton>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    {featured.image ? (
                                        <img
                                            src={featured.image}
                                            alt={featured.title}
                                            style={{
                                                width: '100%',
                                                maxWidth: '500px',
                                                height: 'auto',
                                                borderRadius: '1rem',
                                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                                                border: '1px solid rgba(255,255,255,0.1)'
                                            }}
                                        />
                                    ) : (
                                        <div style={{ width: '100%', maxWidth: '400px', height: '300px', background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                                            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💎</div>
                                            <div style={{ fontWeight: 'bold' }}>Active Asset Blueprint</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Grid */}
                <h2 className="section-title" style={{ marginBottom: '3rem' }}>Training, Systems & Tools</h2>
                <div className="resource-grid" style={{ marginBottom: '8rem' }}>
                    {[...tools, ...systems, ...training].map((product: any) => (
                        <div key={product.id} className="card-premium">
                            {product.image && (
                                <div style={{ marginBottom: '1.5rem', borderRadius: '0.5rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <img src={product.image} alt={product.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                </div>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--primary)', border: '1px solid var(--primary)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                                    {product.type}
                                </span>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 700 }}>{product.title}</h3>
                            <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: '1.6' }}>{product.description}</p>

                            <ul style={{ marginBottom: '2rem', padding: 0, listStyle: 'none' }}>
                                {product.features?.map((feature: string, idx: number) => (
                                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
                                        <span style={{ color: 'var(--primary)' }}>✓</span> {feature}
                                    </li>
                                ))}
                            </ul>

                            <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>${product.price}</span>
                                <BuyButton product={product} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bundle Section */}
                {bundle && (
                    <div style={{ background: 'linear-gradient(to right, #2e1065, #0f172a)', borderRadius: '1.5rem', padding: '4rem', textAlign: 'center', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>{bundle.title}</h2>
                        <p style={{ fontSize: '1.25rem', color: '#cbd5e1', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                            {bundle.description}
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                            {bundle.features.map((item: string, i: number) => (
                                <div key={i} style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem 2rem', borderRadius: '0.5rem', backdropFilter: 'blur(5px)' }}>
                                    {item}
                                </div>
                            ))}
                        </div>

                        <BuyButton product={bundle} className="btn-premium" style={{ background: '#a855f7', fontSize: '1.2rem', padding: '1rem 3rem' }}>
                            Get The Empire Bundle - ${bundle.price}
                        </BuyButton>
                    </div>
                )}

                {/* Trust Section */}
                <div style={{ marginTop: '6rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '4rem' }}>
                    <p style={{ color: '#64748b', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Trusted Secure Payment via Stripe</p>
                </div>

            </div>
        </main>
    );
}
