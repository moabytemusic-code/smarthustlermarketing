

import Navbar from '../../components/Navbar';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

// Helper to get posts
const getPosts = () => {
    const files = fs.readdirSync(path.join(process.cwd(), 'src/content/posts'));

    const posts = files.map(filename => {
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
        <main>
            <Navbar />
            <div className="container" style={{ padding: '4rem 0' }}>
                <h1 className="section-title">Latest Insights</h1>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    {posts.map((post: any) => (
                        <article key={post.slug} className="glass" style={{ padding: '2rem', borderRadius: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{post.frontmatter.category}</span>
                                <span style={{ color: '#64748b' }}>{post.frontmatter.date}</span>
                            </div>
                            <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{post.frontmatter.title}</h2>
                            <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>{post.frontmatter.excerpt}</p>
                            <Link href={`/blog/${post.slug}`} className="btn" style={{ border: '1px solid var(--primary)', color: 'var(--primary)', textDecoration: 'none', display: 'inline-block' }}>
                                Read Article
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}
