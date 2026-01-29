
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
    try {
        const postsDirectory = path.join(process.cwd(), 'src/content/posts');
        const filenames = fs.readdirSync(postsDirectory);

        const posts = filenames
            .filter(file => file.endsWith('.md'))
            .map(filename => {
                const filePath = path.join(postsDirectory, filename);
                const fileContents = fs.readFileSync(filePath, 'utf8');
                const { data, content } = matter(fileContents);

                return {
                    slug: filename.replace('.md', ''),
                    title: data.title,
                    date: data.date,
                    content: content
                };
            })
            // Sort by Date Descending
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            // Limit to top 20 to avoid payload size issues
            .slice(0, 20);

        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to Fetch Posts' }, { status: 500 });
    }
}
