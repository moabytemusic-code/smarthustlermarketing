'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from '../../../components/Navbar';
import Link from 'next/link';

// NOTE: In a real app, this data would come from getStaticProps/getStaticPaths
// But for this rapid implementation, we'll map the slugs manually or fetch via API in a real server component.
// Since we are using client component, we will simulate fetching or passing data.
// Wait, typically for markdown content in Next.js App Router, we should use a Server Component.
// Let's refactor this to be a Server Component that reads the file.

export default function GiftLoading() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#fff' }}>
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                Loading Gift...
            </div>
        </div>
    )
}
