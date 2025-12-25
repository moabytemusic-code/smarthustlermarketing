import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from '../../../components/Navbar';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

async function getGiftContent(slug: string) {
    const giftsDir = path.join(process.cwd(), 'src/content/gifts');
    const filePath = path.join(giftsDir, `${slug}.md`);

    try {
        if (!fs.existsSync(filePath)) {
            return null;
        }
        const content = fs.readFileSync(filePath, 'utf-8');
        return content;
    } catch (error) {
        return null;
    }
}

export default async function GiftPage({ params }: PageProps) {
    const slug = (await params).slug;
    const content = await getGiftContent(slug);

    if (!content) {
        notFound();
    }

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#fff' }}>
            <Navbar />
            <div className="container" style={{ padding: '8rem 0' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>

                    <div className="glass" style={{ padding: '3rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                            <span style={{
                                backgroundColor: 'var(--primary)',
                                color: '#000',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '1rem',
                                fontSize: '0.8rem',
                                fontWeight: 'bold'
                            }}>
                                FREE MEMBER RESOURCE
                            </span>
                        </div>

                        <article className="prose prose-invert lg:prose-xl" style={{ maxWidth: '100%' }}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {content}
                            </ReactMarkdown>
                        </article>

                        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>Want more tools like this?</p>
                            <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>
                                &larr; Back to Dashboard
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
