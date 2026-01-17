
import Navbar from '../../components/Navbar';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

// Helper to get posts
const getPosts = () => {
    const files = fs.readdirSync(path.join(process.cwd(), 'src/content/posts'));

    const posts = files.filter(file => file.endsWith('.md')).map(filename => {
        const markdownWithMeta = fs.readFileSync(path.join(process.cwd(), 'src/content/posts', filename), 'utf-8');
        const { data: frontmatter } = matter(markdownWithMeta);

        return {
            slug: filename.replace('.md', ''),
            frontmatter
        };
    });

    return posts.sort((a, b) => {
        return new Date(b.frontmatter.date).valueOf() - new Date(a.frontmatter.date).valueOf();
    });
};

export default async function Blog() {
    const posts = getPosts();

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#fff' }}>
            <Navbar />

            <div className="container" style={{ padding: '8rem 0' }}>
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 6rem' }}>
                    <div className="badge" style={{ marginBottom: '1.5rem', justifyContent: 'center' }}>
                        <div className="dot">
                            <div className="dot-ping"></div>
                        </div>
                        Fresh from the Lab
                    </div>
                    <h1 className="title-main" style={{ fontSize: '3.5rem' }}>Latest <span className="gradient-text">Insights</span></h1>
                    <p className="subtitle" style={{ margin: '0 auto' }}>
                        Strategies, case studies, and industry shifts that impact your bottom line.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                    {posts.map((post: any) => (
                        <article key={post.slug} className="card-premium" style={{ padding: '0', overflow: 'hidden' }}>
                            <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <span className="badge" style={{ background: 'rgba(56, 189, 248, 0.1)', color: 'var(--secondary)', border: 'none' }}>
                                        {post.frontmatter.category}
                                    </span>
                                    <span style={{ color: '#64748b', fontSize: '0.875rem' }}>{post.frontmatter.date}</span>
                                </div>
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', lineHeight: '1.3', fontWeight: 700 }}>
                                    <Link href={`/blog/${post.slug}`} style={{ color: '#fff', textDecoration: 'none', transition: 'color 0.3s' }} className="hover:text-primary">
                                        {post.frontmatter.title}
                                    </Link>
                                </h2>
                                <p style={{ color: '#94a3b8', marginBottom: '1.5rem', flexGrow: 1, lineHeight: '1.6' }}>
                                    {post.frontmatter.excerpt}
                                </p>
                                <Link href={`/blog/${post.slug}`} className="btn-outline btn-sm" style={{ textAlign: 'center' }}>
                                    Read Article &rarr;
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}
