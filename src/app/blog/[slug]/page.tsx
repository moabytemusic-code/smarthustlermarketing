
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Navbar from '../../../components/Navbar';
import { Metadata } from 'next';
import { getRecommendedEngine, getEngineUrl, ENGINE_DETAILS, DEFAULT_ENGINE_CTA } from '../../../data/engineMapping';
import { Activity, ArrowRight } from 'lucide-react';

interface PostProps {
    params: {
        slug: string;
    }
}

// 1. Generate Metadata for SEO
export async function generateMetadata({ params }: any): Promise<Metadata> {
    const { slug } = await params;
    const markdownWithMeta = fs.readFileSync(path.join(process.cwd(), 'src/content/posts', `${slug}.md`), 'utf-8');
    const { data: frontmatter } = matter(markdownWithMeta);

    return {
        title: `${frontmatter.title} | Smart Hustler Marketing`,
        description: frontmatter.excerpt,
        openGraph: {
            title: frontmatter.title,
            description: frontmatter.excerpt,
            type: 'article',
            authors: [frontmatter.author || 'Smart Hustler Team'],
            publishedTime: frontmatter.date,
        },
        twitter: {
            card: 'summary_large_image',
            title: frontmatter.title,
            description: frontmatter.excerpt,
        }
    };
}

// 2. Static Params for SSG
export async function generateStaticParams() {
    const files = fs.readdirSync(path.join(process.cwd(), 'src/content/posts'));

    return files.map(filename => ({
        slug: filename.replace('.md', ''),
    }));
}

// 3. The Page Component
export default async function Post({ params }: any) {
    const { slug } = await params;
    const markdownWithMeta = fs.readFileSync(path.join(process.cwd(), 'src/content/posts', `${slug}.md`), 'utf-8');
    const { data: frontmatter, content } = matter(markdownWithMeta);

    // Engine CTA Logic
    const recommendedEngineId = getRecommendedEngine(slug);
    const engineData = recommendedEngineId ? ENGINE_DETAILS[recommendedEngineId] : null;

    // Construct URLs
    const primaryUrl = recommendedEngineId ? getEngineUrl(recommendedEngineId, `blog_footer_${slug}`, 'blog_footer') : null;
    const browseUrl = getEngineUrl(null, `blog_footer_fallback`, 'blog_footer');

    return (
        <main>
            <Navbar />
            <article className="container" style={{ padding: '8rem 0 4rem', maxWidth: '800px' }}>
                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{frontmatter.category}</span>
                    <h1 style={{ fontSize: '2.5rem', margin: '0.5rem 0', lineHeight: 1.2 }}>{frontmatter.title}</h1>
                    <p style={{ color: '#94a3b8' }}>{frontmatter.date} • By {frontmatter.author}</p>
                </div>

                <div className="glass" style={{ padding: '2.5rem', borderRadius: '1rem' }}>
                    <div className="prose" style={{ color: '#e2e8f0', lineHeight: '1.8' }}>
                        <ReactMarkdown
                            components={{
                                h2: ({ node, ...props }) => <h2 style={{ fontSize: '1.8rem', marginTop: '2rem', marginBottom: '1rem', color: '#fff' }} {...props} />,
                                h3: ({ node, ...props }) => <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '0.75rem', color: 'var(--primary)' }} {...props} />,
                                p: ({ node, ...props }) => <p style={{ marginBottom: '1.25rem' }} {...props} />,
                                ul: ({ node, ...props }) => <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }} {...props} />,
                                li: ({ node, ...props }) => <li style={{ marginBottom: '0.5rem' }} {...props} />,
                                strong: ({ node, ...props }) => <strong style={{ color: '#fff' }} {...props} />,
                                a: ({ node, ...props }) => <a style={{ color: 'var(--primary)', textDecoration: 'underline', transition: 'color 0.2s' }} className="hover:text-primary-hover" {...props} />,
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                </div>

                {/* Engine CTA Block */}
                <div style={{ marginTop: '3rem', marginBottom: '3rem', padding: '2rem', background: 'rgba(30, 41, 59, 0.5)', borderRadius: '1rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                    {recommendedEngineId && engineData ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexDirection: 'column', textAlign: 'center' }}>
                            <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                                <Activity color="#3b82f6" size={32} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#fff' }}>{engineData.title}</h3>
                                <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>{engineData.description}</p>
                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                    <a href={primaryUrl!} target="_blank" className="btn-premium" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#3b82f6' }}>
                                        Run Diagnostic <ArrowRight size={18} />
                                    </a>
                                    <a href={browseUrl} target="_blank" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                        Browse all Engines
                                    </a>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ display: 'inline-flex', background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
                                <Activity color="#3b82f6" size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#fff' }}>{DEFAULT_ENGINE_CTA.title}</h3>
                            <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>{DEFAULT_ENGINE_CTA.description}</p>
                            <a href={browseUrl} target="_blank" className="btn-premium" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#3b82f6' }}>
                                {DEFAULT_ENGINE_CTA.label} <ArrowRight size={18} />
                            </a>
                        </div>
                    )}
                </div>

                <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                    <a href="/blog" className="btn" style={{ border: '1px solid #334155', color: '#94a3b8', padding: '0.75rem 2rem' }}>
                        ← Back to Insights
                    </a>
                </div>
            </article>
        </main>
    );
}
