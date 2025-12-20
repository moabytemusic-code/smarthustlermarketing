import Navbar from '../../components/Navbar';

export default function Resources() {
    const categories = [
        'AI Writing Tools',
        'Email Platforms',
        'Page Builders',
        'SEO Tools',
        'Hosting',
        'Design Assets'
    ];

    return (
        <main>
            <Navbar />
            <div className="container" style={{ padding: '4rem 0' }}>
                <h1 className="section-title">Curated Resources</h1>
                <p style={{ textAlign: 'center', color: '#94a3b8', maxWidth: '600px', margin: '-1rem auto 3rem' }}>
                    We've tested hundreds of tools. These are the ones we actually use to run our 6-figure businesses.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {categories.map((cat, i) => (
                        <div key={i} className="glass" style={{ padding: '2rem', borderRadius: '1rem', cursor: 'pointer', transition: 'background 0.3s' }}>
                            <h3 style={{ margin: 0 }}>{cat}</h3>
                            <p style={{ marginTop: '0.5rem', color: 'var(--primary)', fontSize: '0.9rem' }}>View Recommendations &rarr;</p>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '6rem' }}>
                    <h2 className="section-title">Amazon Must-Reads</h2>
                    <p style={{ textAlign: 'center', color: '#94a3b8', maxWidth: '600px', margin: '-1rem auto 3rem' }}>
                        Books that shaped our mindset and strategy.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
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
                            <div key={i} className="glass" style={{ padding: '1.5rem', borderRadius: '1rem', display: 'flex', flexDirection: 'column' }}>
                                <div style={{
                                    height: '280px',
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: '0.5rem',
                                    marginBottom: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#64748b',
                                    textAlign: 'center',
                                    padding: '1rem'
                                }}>
                                    [Book Cover: {book.title.split(':')[0]}]
                                </div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', lineHeight: '1.4' }}>{book.title}</h3>
                                <p style={{ color: 'var(--primary)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>{book.author}</p>
                                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem', flex: 1 }}>{book.description}</p>
                                <a
                                    href={book.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                    style={{
                                        textAlign: 'center',
                                        fontSize: '0.9rem',
                                        padding: '0.5rem 1rem',
                                        backgroundColor: '#febd69',
                                        color: '#131921',
                                        fontWeight: 'bold',
                                        border: 'none',
                                        marginTop: 'auto'
                                    }}
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
