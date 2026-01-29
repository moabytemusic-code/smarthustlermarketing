"use client";

import { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import { ArrowRight, Twitter, Linkedin, Copy, Send, Loader2 } from 'lucide-react';

// Sub-component to fetch options
function BlogOptions() {
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/blog-posts')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setPosts(data);
            })
            .catch(err => console.error("Failed to fetch posts", err));
    }, []);

    return (
        <>
            {posts.map(post => (
                <option key={post.slug} value={JSON.stringify(post)}>
                    {post.date} - {post.title.substring(0, 50)}...
                </option>
            ))}
        </>
    );
}

export default function GhostWriter() {
    const [inputText, setInputText] = useState('');
    const [selectedSlug, setSelectedSlug] = useState(''); // Track slug
    const [imageUrl, setImageUrl] = useState(''); // New Image State
    const [isGenerating, setIsGenerating] = useState(false);
    const [isScheduling, setIsScheduling] = useState(false); // New State
    const [outputs, setOutputs] = useState<{ twitter: string; linkedin: string } | null>(null);

    const handleGenerate = async () => {
        if (!inputText.trim()) return;
        setIsGenerating(true);

        try {
            const response = await fetch('/api/tools/ghost-writer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'generate',
                    text: inputText,
                    slug: selectedSlug // Pass the slug
                })
            });

            const data = await response.json();

            if (data.error) {
                alert('Error: ' + data.error);
            } else {
                setOutputs({
                    twitter: data.twitter,
                    linkedin: data.linkedin
                });
            }
        } catch (err: any) {
            alert('Failed to generate: ' + err.message);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSchedule = async (platform: 'twitter' | 'linkedin') => {
        if (!outputs) return;
        const content = platform === 'twitter' ? outputs.twitter : outputs.linkedin;

        if (!confirm(`Are you sure you want to schedule this to ${platform} (via ContentStudio)?`)) return;

        setIsScheduling(true);

        try {
            const response = await fetch('/api/tools/ghost-writer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'schedule',
                    platform: platform,
                    content: content,
                    imageUrl: imageUrl // Pass the image URL
                })
            });

            const data = await response.json();

            if (data.error) {
                alert('Schedule Error: ' + data.error);
            } else {
                alert('✅ Successfully Sent to ContentStudio!');
            }

        } catch (err: any) {
            alert('Failed to schedule: ' + err.message);
        } finally {
            setIsScheduling(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#fff' }}>
            <Navbar />

            <div className="container" style={{ padding: '8rem 0' }}>
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
                    <div className="badge" style={{ marginBottom: '1.5rem', justifyContent: 'center' }}>
                        <div className="dot">
                            <div className="dot-ping"></div>
                        </div>
                        Content Repurposing Engine
                    </div>
                    <h1 className="title-main" style={{ fontSize: '3rem' }}>The <span className="gradient-text">Ghost Writer</span></h1>
                    <p className="subtitle" style={{ margin: '0 auto' }}>
                        Turn one boring thought into a viral Thread and a LinkedIn thought-leader post. instantly.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>

                    {/* Input Section */}
                    <div className="card-premium">
                        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '1.5rem' }}>✍️</span> Input Source
                        </h3>
                        <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.5rem' }}>
                            Paste text manually OR select a recent blog post.
                        </p>

                        <div style={{ marginBottom: '1rem' }}>
                            <select
                                onChange={(e) => {
                                    if (e.target.value) {
                                        // Fetch post content
                                        const post = JSON.parse(e.target.value);
                                        // Strip frontmatter/extra newlines slightly for clean input
                                        setInputText(post.content.slice(0, 5000)); // Limit size
                                        setSelectedSlug(post.slug);
                                    } else {
                                        setSelectedSlug('');
                                    }
                                }}
                                style={{
                                    width: '100%',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: '#fff',
                                    padding: '0.5rem',
                                    borderRadius: '0.5rem'
                                }}
                            >
                                <option value="">-- Select a Published Post --</option>
                                {/* We need to fetch this list on mount using a simplified useEffect */}
                                <BlogOptions />
                            </select>
                        </div>

                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="e.g. I realized today that most people fail at dropshipping because they pick bad products..."
                            style={{
                                width: '100%',
                                minHeight: '300px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '0.5rem',
                                padding: '1rem',
                                color: '#fff',
                                fontSize: '1rem',
                                lineHeight: '1.6',
                                resize: 'vertical',
                                marginBottom: '1rem'
                            }}
                        />

                        {/* Image Attachment Input */}
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                🖼️ Attachment Image URL (Optional)
                            </label>
                            <input
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="https://..."
                                style={{
                                    width: '100%',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: '#fff',
                                    padding: '0.5rem',
                                    borderRadius: '0.5rem'
                                }}
                            />
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating || !inputText}
                            className="btn-premium"
                            style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="animate-spin w-5 h-5 mr-2" /> Rewriting...
                                </>
                            ) : (
                                <>
                                    Generate Content <ArrowRight className="w-5 h-5 ml-2" />
                                </>
                            )}
                        </button>
                    </div>

                    {/* Output Section */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {/* Twitter Output */}
                        <div className="card-premium" style={{ borderColor: 'rgba(56, 189, 248, 0.2)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8' }}>
                                    <Twitter size={20} />
                                    <span style={{ fontWeight: 'bold' }}>Twitter Thread</span>
                                </div>
                                {outputs && (
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button onClick={() => handleSchedule('twitter')} disabled={isScheduling} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#38bdf8' }} title="Schedule to Twitter">
                                            <Send size={18} />
                                        </button>
                                        <button onClick={() => copyToClipboard(outputs.twitter)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }} title="Copy">
                                            <Copy size={18} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {outputs ? (
                                <div style={{ whiteSpace: 'pre-wrap', color: '#cbd5e1', fontSize: '0.95rem' }}>
                                    {outputs.twitter}
                                </div>
                            ) : (
                                <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', fontStyle: 'italic' }}>
                                    Waiting for input...
                                </div>
                            )}
                        </div>

                        {/* LinkedIn Output */}
                        <div className="card-premium" style={{ borderColor: 'rgba(10, 102, 194, 0.2)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0a66c2' }}>
                                    <Linkedin size={20} />
                                    <span style={{ fontWeight: 'bold' }}>LinkedIn Post</span>
                                </div>
                                {outputs && (
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button onClick={() => handleSchedule('linkedin')} disabled={isScheduling} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0a66c2' }} title="Schedule to LinkedIn">
                                            <Send size={18} />
                                        </button>
                                        <button onClick={() => copyToClipboard(outputs.linkedin)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }} title="Copy">
                                            <Copy size={18} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {outputs ? (
                                <div style={{ whiteSpace: 'pre-wrap', color: '#cbd5e1', fontSize: '0.95rem' }}>
                                    {outputs.linkedin}
                                </div>
                            ) : (
                                <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', fontStyle: 'italic' }}>
                                    Waiting for input...
                                </div>
                            )}
                        </div>

                        {/* Footer Info */}
                        {outputs && (
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>
                                    Connected to: kendavismarketing <br />
                                    <span style={{ opacity: 0.6 }}>Click the Send Icon <Send size={12} className="inline" /> to schedule.</span>
                                </p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </main>
    );
}
