'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';

// --- DATABASE OF PROMPTS & TEMPLATES ---
const PRODUCTS = [
    { id: 'blueprint', name: '2026 Side Hustle Blueprint', link: 'https://smarthustler.com/blueprint' },
    { id: 'affiliate', name: 'Affiliate Jumpstart Kit', link: 'https://smarthustler.com/shop' },
    { id: 'email', name: 'Email Mastery Course', link: 'https://smarthustler.com/shop' },
    { id: 'ai', name: 'AI Content System', link: 'https://smarthustler.com/shop' },
    { id: 'seo', name: 'SEO Power Pack', link: 'https://smarthustler.com/shop' }
];

const IMAGE_PROMPTS: Record<string, string> = {
    'blueprint': 'futuristic 3d render of a glowing blue digital blueprint roll, cybernetic details, dark background, neon blue light, high tech, 8k, unreal engine 5 --ar 16:9',
    'affiliate': 'flat lay photography of a modern workspace, macbook screen showing an upward trending green revenue chart, coffee cup, moleskine notebook, golden hour lighting, highly detailed, 8k --ar 16:9',
    'email': 'minimalist 3d illustration of a golden envelope flying through a cloud of digital data, dark mode aesthetic, purple and gold lighting, premium texture, volumetric lighting --ar 16:9',
    'ai': 'cyberpunk robot hand writing on a holographic interface, glowing code, matrix rain background, neon purple and cyan, cinematic lighting, photorealistic --ar 16:9',
    'seo': '3d isometric view of a search engine ranking ladder, golden trophy at the top, data visualization style, dark background, glowing nodes, tech illustration --ar 16:9'
};

const CONTENT_VARIANTS: Record<string, { hooks: string[], painPoints: string[], solutions: string[], closers: string[] }> = {
    'blueprint': {
        hooks: [
            "Stop building 'side hustles' that are just second jobs. 🛑",
            "If you stop working and the money stops, you don't have a business.",
            "Why 90% of side hustles will fail in 2026.",
            "The 'Gig Economy' is a trap. Build assets instead.",
            "I built a $10k/mo automated income stream. Here is the map. 👇"
        ],
        painPoints: [
            "Driving for Uber is not a hustle. It's a second job.",
            "Most people pick niches that are too crowded.",
            "You are trading time for money, which is a losing game.",
            "Tech overwhelm stops 99% of creators before they start."
        ],
        solutions: [
            "You need a system that works while you sleep.",
            "I use a simple 3-tool 'No-Code' stack to automate everything.",
            "The secret is 'Micro-Niche' discovery.",
            "My 5-step blueprint removes the guesswork."
        ],
        closers: [
            "Grab the full PDF here (free):",
            "Get the free roadmap here:",
            "Download the confidential strategy:",
            "Steal my entire playbook:"
        ]
    },
    'affiliate': {
        hooks: [
            "Most affiliate marketers fail because they pick the wrong niche.",
            "Stop selling 'Marketing Tools' to Marketers.",
            "I launched a profitable campaign in 48 hours. ⏱️",
            "The money is in the 'boring' niches.",
            "Affiliate Marketing isn't dead. You're just doing it wrong."
        ],
        painPoints: [
            "Competition in the 'Make Money Online' niche is insane.",
            "You don't need a huge audience to win.",
            "Spamming links on Twitter doesn't work anymore.",
            "Most people overcomplicate the funnel."
        ],
        solutions: [
            "Sell 'AI for Dentists' or 'Ergonomic Chairs' instead.",
            "I found 100 untapped niches ripe for the taking.",
            "You just need a Bridge Page and a Traffic Source.",
            "My 'Jumpstart Kit' gives you the exact templates I use."
        ],
        closers: [
            "Get the Jumpstart Kit:",
            "Start your campaign today:",
            "Download the niche list:",
            "Get the full kit here:"
        ]
    },
    'email': {
        hooks: [
            "Email Marketing is the only channel you own. 📧",
            "Instagram algorithm changed? You lose traffic. Email is forever.",
            "Unpopular opinion: Social Media followers are a vanity metric.",
            "One email subscriber is worth 1,000 followers.",
            "Stop building your castle on rented land."
        ],
        painPoints: [
            "Social reach is dying. Email open rates are stable.",
            "most people have no idea what to write.",
            "If you aren't building a list, you are leaving money on the table.",
            "Generic newsletters get deleted instantly."
        ],
        solutions: [
            "You need a 'Welcome Sequence' that builds trust on autopilot.",
            "I curated my top 50 high-converting swipe files.",
            "Learn to write subject lines that get 50% open rates.",
            "My Mastery Course breaks down the psychology of selling."
        ],
        closers: [
            "Master the full system:",
            "Get the templates:",
            "Start building your list:",
            "Grab the course:"
        ]
    },
    'ai': {
        hooks: [
            "ChatGPT is lazy. You need to know how to drive it. 🤖",
            "Is AI content 'cheating'? No. It's leverage.",
            "I generated 30 days of content in 5 minutes.",
            "Stop staring at a blank page.",
            "The secret to ranking in 2026 is 'Mega-Prompts'."
        ],
        painPoints: [
            "Generic prompts give you generic garbage.",
            "Most users treat AI like a slot machine.",
            "Writing 1,500 word posts manually is efficient.",
            "Consistency is the hardest part of content marketing."
        ],
        solutions: [
            "You need a 'System' for your AI.",
            "I built a library of prompts that output human-like quality.",
            "Scale your production by 10x without burnout.",
            "My AI Content System handles the heavy lifting."
        ],
        closers: [
            "Get my full prompt library:",
            "Automate your content:",
            "Grab the system:",
            "Download the prompts:"
        ]
    },
    'seo': {
        hooks: [
            "SEO isn't dead. It just got harder. 📈",
            "Stop writing content that no one reads.",
            "The days of 'keyword stuffing' are over.",
            "Free traffic is the best traffic.",
            "If you aren't on Page 1, you don't exist."
        ],
        painPoints: [
            "It's about 'Information Gain' and Authority now.",
            "Most sites fail because of technical errors.",
            "Paid ads are getting more expensive every day.",
            "Publishing without a strategy is a waste of time."
        ],
        solutions: [
            "Focus on finding keywords your competitors missed.",
            "My 10-point checklist ensures you rank.",
            "Build backlinks the 'Skyscraper' way.",
            "The SEO Power Pack creates your roadmap."
        ],
        closers: [
            "Get the full Power Pack:",
            "Rank higher today:",
            "Download the checklist:",
            "Start growing your traffic:"
        ]
    }
};

const generatePost = (product: string, platform: string, link: string) => {
    const variants = CONTENT_VARIANTS[product];
    if (!variants) return '';

    const hook = variants.hooks[Math.floor(Math.random() * variants.hooks.length)];
    const pain = variants.painPoints[Math.floor(Math.random() * variants.painPoints.length)];
    const solution = variants.solutions[Math.floor(Math.random() * variants.solutions.length)];
    const closer = variants.closers[Math.floor(Math.random() * variants.closers.length)];

    if (platform === 'twitter') {
        return `${hook}\n\n${pain}\n\n${solution}\n\n${closer} ${link}\n\n🧵 ⬇️`;
    } else if (platform === 'linkedin') {
        return `${hook}\n\n${pain}\n\n${solution}\n\nIt's time to work smarter.\n\n${closer} ${link}\n\n#${product} #Growth #Marketing`;
    } else if (platform === 'instagram') {
        return `(Visual: High contrast text overlay)\n\n${hook}\n\n${pain}\n\n✅ ${solution}\n\nLink in bio! 🔗`;
    } else {
        return `💡 ${hook}\n\n${pain}\n\n${solution}\n\n${closer} ${link}`;
    }
};

export default function SocialPoster() {
    const [password, setPassword] = useState('');
    const [isUnlocked, setIsUnlocked] = useState(false);

    // Generator State
    const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0].id);
    const [selectedPlatform, setSelectedPlatform] = useState('twitter');
    const [copyStatus, setCopyStatus] = useState('Copy to Clipboard');
    const [seed, setSeed] = useState(12345); // For regenerating images
    const [generatedCopy, setGeneratedCopy] = useState('');

    // Scheduler State
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [scheduledPosts, setScheduledPosts] = useState<Array<{ id: number, platform: string, product: string, date: string, time: string }>>([]);

    // Logic to generate copy
    const updateCopy = () => {
        const product = PRODUCTS.find(p => p.id === selectedProduct);
        if (product) {
            setGeneratedCopy(generatePost(selectedProduct, selectedPlatform, product.link));
        }
    };

    // Update copy when product/platform changes
    useEffect(() => {
        updateCopy();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProduct, selectedPlatform]);

    const handleRegenerateCopy = () => {
        updateCopy();
    };

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'hustle2026') {
            setIsUnlocked(true);
        } else {
            alert('Incorrect passcode');
        }
    };

    // Construct Pollinations URL
    const currentPrompt = IMAGE_PROMPTS[selectedProduct];
    const imageLink = `https://image.pollinations.ai/prompt/${encodeURIComponent(currentPrompt)}?seed=${seed}&width=1280&height=720&nologo=true`;

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCopy);
        setCopyStatus('Copied! ✅');
        setTimeout(() => setCopyStatus('Copy to Clipboard'), 2000);
    };

    const handleRegenerateVisual = () => {
        setSeed(Math.floor(Math.random() * 999999));
    };

    const handleSchedule = () => {
        if (!date || !time) {
            alert('Please select a date and time.');
            return;
        }
        const newPost = {
            id: Date.now(),
            platform: selectedPlatform,
            product: PRODUCTS.find(p => p.id === selectedProduct)?.name || 'Unknown',
            date,
            time
        };
        setScheduledPosts([...scheduledPosts, newPost].sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime()));
        alert(`Post scheduled for ${date} at ${time}`);
        setDate('');
        setTime('');
    };

    if (!isUnlocked) {
        return (
            <main style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="glass" style={{ padding: '3rem', borderRadius: '1rem', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Private Access</h1>
                    <form onSubmit={handleUnlock}>
                        <input
                            type="password"
                            placeholder="Enter Passcode"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                marginBottom: '1rem',
                                borderRadius: '0.5rem',
                                border: '1px solid rgba(255,255,255,0.1)',
                                background: 'rgba(0,0,0,0.3)',
                                color: '#fff'
                            }}
                        />
                        <button className="btn-premium" style={{ width: '100%', justifyContent: 'center' }}>Unlock Poster</button>
                    </form>
                    <p style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.8rem' }}>Hint: hustle2026</p>
                </div>
            </main>
        );
    }

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#fff' }}>
            <Navbar />
            <div className="container" style={{ padding: '8rem 0' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className="title-main">Social Media <span className="gradient-text">Poster</span></h1>
                    <p className="subtitle">Generate high-converting copy & visuals in seconds.</p>
                </div>

                <div className="glass" style={{ padding: '2rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>

                    {/* Controls */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Select Product</label>
                            <select
                                value={selectedProduct}
                                onChange={(e) => { setSelectedProduct(e.target.value); setSeed(Math.floor(Math.random() * 999999)); }}
                                style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', background: 'rgba(0,0,0,0.3)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
                            >
                                {PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Select Platform</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {['twitter', 'linkedin', 'instagram', 'facebook'].map(platform => (
                                    <button
                                        key={platform}
                                        onClick={() => setSelectedPlatform(platform)}
                                        style={{
                                            flex: 1,
                                            padding: '1rem',
                                            borderRadius: '0.5rem',
                                            border: '1px solid',
                                            borderColor: selectedPlatform === platform ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                                            background: selectedPlatform === platform ? 'var(--primary-glow)' : 'rgba(255,255,255,0.05)',
                                            color: selectedPlatform === platform ? 'var(--primary)' : '#94a3b8',
                                            cursor: 'pointer',
                                            textTransform: 'capitalize'
                                        }}
                                    >
                                        {platform === 'twitter' ? '🐦 X / Twitter' : platform === 'linkedin' ? '💼 LinkedIn' : platform === 'instagram' ? '📸 IG / TikTok' : '📘 Facebook'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Output Area - 2 Column Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>

                        {/* Text Column */}
                        <div style={{ position: 'relative' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <label style={{ display: 'block', color: '#94a3b8' }}>Generated Content</label>
                                <button
                                    onClick={handleRegenerateCopy}
                                    style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.9rem' }}
                                >
                                    ↻ Regenerate
                                </button>
                            </div>
                            <textarea
                                value={generatedCopy}
                                readOnly
                                style={{
                                    width: '100%',
                                    height: '350px',
                                    padding: '1.5rem',
                                    borderRadius: '0.5rem',
                                    background: '#0f172a',
                                    color: '#e2e8f0',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    fontFamily: 'monospace',
                                    lineHeight: '1.6',
                                    resize: 'none'
                                }}
                            />
                            <button
                                onClick={handleCopy}
                                className="btn-premium"
                                style={{
                                    position: 'absolute',
                                    bottom: '1.5rem',
                                    right: '1.5rem',
                                    padding: '0.5rem 1.5rem',
                                    fontSize: '0.9rem'
                                }}
                            >
                                {copyStatus}
                            </button>
                        </div>

                        {/* Visual Column */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <label style={{ display: 'block', color: '#94a3b8' }}>Generated Visual</label>
                                <button
                                    onClick={handleRegenerateVisual}
                                    style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.9rem' }}
                                >
                                    ↻ Regenerate
                                </button>
                            </div>

                            <div style={{
                                width: '100%',
                                height: '350px',
                                borderRadius: '0.5rem',
                                overflow: 'hidden',
                                position: 'relative',
                                background: '#000',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={imageLink}
                                    alt="AI Generated Marketing Visual"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    padding: '0.5rem',
                                    background: 'rgba(0,0,0,0.7)',
                                    fontSize: '0.7rem',
                                    color: '#64748b',
                                    backdropFilter: 'blur(4px)'
                                }}>
                                    Prompt: {currentPrompt.substring(0, 60)}...
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Scheduler Section */}
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.05)', marginTop: '3rem' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginRight: '0.5rem' }}>🗓</span> Content Scheduler
                        </h3>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'end', marginBottom: '2rem', flexWrap: 'wrap' }}>
                            <div style={{ flex: 1, minWidth: '200px' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>Date</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.25rem', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                                />
                            </div>
                            <div style={{ flex: 1, minWidth: '200px' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>Time</label>
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.25rem', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                                />
                            </div>
                            <button
                                onClick={handleSchedule}
                                className="btn-premium"
                                style={{ padding: '0.75rem 2rem', height: '46px' }}
                            >
                                + Add to Queue
                            </button>
                        </div>

                        {scheduledPosts.length > 0 ? (
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                {scheduledPosts.map(post => (
                                    <div key={post.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.25rem', borderLeft: '3px solid var(--primary)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ background: '#0f172a', padding: '0.5rem', borderRadius: '0.25rem', fontSize: '1.2rem' }}>
                                                {post.platform === 'twitter' ? '🐦' : post.platform === 'linkedin' ? '💼' : post.platform === 'instagram' ? '📸' : '📘'}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 'bold' }}>{post.product}</div>
                                                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Scheduled for: {post.date} @ {post.time}</div>
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--primary)', background: 'rgba(var(--primary-rgb), 0.1)', padding: '0.25rem 0.5rem', borderRadius: '1rem' }}>
                                            Queued
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '0.5rem' }}>
                                Your queue is empty. Schedule the selected post above.
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}
