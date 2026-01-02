import { promises as fs } from 'fs';
import path from 'path';
import Navbar from '../../components/Navbar';
import BookModal from '../../components/BookModal';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Library | Smart Hustler Marketing',
    description: 'Essential reading for the anti-passive entrepreneur. Build assets, not jobs.',
};

async function getProducts() {
    const filePath = path.join(process.cwd(), 'src/content/products.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export default async function Library() {
    const allProducts = await getProducts();
    const books = allProducts.filter((p: any) => p.category === 'Books');

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#fff' }}>
            <Navbar />

            <div className="container" style={{ padding: '8rem 0' }}>
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 6rem' }}>
                    <div className="badge" style={{ marginBottom: '1.5rem', justifyContent: 'center' }}>
                        Library
                    </div>
                    <h1 className="title-main" style={{ fontSize: '3.5rem' }}>The <span className="gradient-text">Archives</span></h1>
                    <p className="subtitle" style={{ margin: '0 auto' }}>
                        Foundational knowledge for building equity.
                    </p>
                </div>

                <div className="resource-grid">
                    {books.map((book: any) => (
                        <div key={book.id} className="card-premium" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ marginBottom: '1.5rem', height: '300px', background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                                {/* Real Book Cover */}
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    style={{
                                        height: '100%',
                                        width: 'auto',
                                        objectFit: 'contain',
                                        transition: 'transform 0.3s ease'
                                    }}
                                    className="hover:scale-105"
                                />
                            </div>

                            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>{book.title}</h2>
                            <p style={{ color: 'var(--primary)', fontSize: '0.9rem', marginBottom: '1rem' }}>{book.subtitle}</p>
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.6', flexGrow: 1 }}>
                                {book.description}
                            </p>

                            <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
                                {book.action === 'Read Chapter 1 Free' ? (
                                    <BookModal product={book} />
                                ) : (
                                    <button className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                                        Buy Now ${book.price}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
