'use client';

import { useState } from 'react';
import Navbar from '../../../components/Navbar';
import { ArrowLeft, Megaphone, Loader2, Copy, Check, ShoppingBag, Mail, Instagram } from 'lucide-react';
import Link from 'next/link';

export default function CampaignArchitect() {
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState('');
    const [result, setResult] = useState<any>(null);
    const [copied, setCopied] = useState<string | null>(null);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setLoading(true);
        setResult(null);

        try {
            const response = await fetch('/api/agents/campaign-architect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });

            if (!response.ok) throw new Error('Generation failed');

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error(error);
            alert('Failed to generate campaign. Please check the URL and try again.');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <main className="min-h-screen bg-[#0A0A0A] text-white selection:bg-purple-500/30">
            <Navbar />

            {/* Background Gradients */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-pink-500/5 blur-[120px]" />
            </div>

            <div className="relative z-10 container mx-auto px-6" style={{ paddingTop: '180px', paddingBottom: '5rem' }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Text */}
                    <div className="max-w-xl sticky top-40">
                        <Link href="/tools/agents" className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-8">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Agents
                        </Link>

                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-800 mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                            </span>
                            <span className="text-xs font-bold text-purple-400 tracking-wider">AI AGENT ACTIVE</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                            Hire A Top <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Marketing Team.</span>
                        </h1>

                        <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                            Stop staring at a blank page.
                            <br /><br />
                            Paste any product URL. In <strong>10 seconds</strong>, this Agent reads the page, understands the psychology, and writes your entire campaign:
                        </p>

                        <ul className="space-y-3 mb-8 text-slate-300">
                            <li className="flex items-center gap-2"><Check className="text-purple-500" size={18} /> 3 High-Converting FB Ad Hooks</li>
                            <li className="flex items-center gap-2"><Check className="text-purple-500" size={18} /> Full Email Nurture Sequence</li>
                            <li className="flex items-center gap-2"><Check className="text-purple-500" size={18} /> Viral Social Media Captions</li>
                        </ul>

                        <div className="flex items-center gap-4 text-sm text-slate-500">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-[#0A0A0A]"></div>
                                <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-[#0A0A0A]"></div>
                                <div className="w-8 h-8 rounded-full bg-slate-600 border-2 border-[#0A0A0A]"></div>
                            </div>
                            <span>Powered by GPT-4o</span>
                        </div>
                    </div>

                    {/* Right Column: The Tool */}
                    <div className="w-full space-y-8">
                        {/* Input Section */}
                        <div className="p-8 rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-sm shadow-2xl">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
                                    <Megaphone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-white">Campaign Architect</h3>
                                    <p className="text-slate-400 text-sm">Enter Product URL</p>
                                </div>
                            </div>

                            <form onSubmit={handleGenerate} className="flex gap-4 flex-col">
                                <input
                                    type="url"
                                    required
                                    placeholder="https://your-store.com/products/amazing-gadget"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500 transition-colors"
                                />
                                <button
                                    type="submit"
                                    disabled={loading || !url}
                                    className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-8 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing 10,000 Datapoints...
                                        </>
                                    ) : (
                                        <>
                                            Generate Full Campaign <Megaphone className="w-5 h-5 ml-2" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Results Section */}
                        {result && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

                                {/* 1. Facebook Ads */}
                                <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-900/40 backdrop-blur-md">
                                    <div className="bg-white/5 p-4 border-b border-white/10 flex items-center gap-2">
                                        <ShoppingBag className="w-5 h-5 text-blue-400" />
                                        <h2 className="font-bold text-lg">Facebook Ad Hooks</h2>
                                    </div>
                                    <div className="p-6 grid gap-4">
                                        {result.ads.map((ad: any, i: number) => (
                                            <div key={i} className="bg-slate-900 p-4 rounded-xl border border-white/5">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{ad.type} Hook</span>
                                                    <button onClick={() => copyToClipboard(ad.content, `ad-${i}`)} className="text-slate-500 hover:text-white">
                                                        {copied === `ad-${i}` ? <Check size={16} /> : <Copy size={16} />}
                                                    </button>
                                                </div>
                                                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{ad.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 2. Email Sequence */}
                                <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-900/40 backdrop-blur-md">
                                    <div className="bg-white/5 p-4 border-b border-white/10 flex items-center gap-2">
                                        <Mail className="w-5 h-5 text-green-400" />
                                        <h2 className="font-bold text-lg">Email Sequence</h2>
                                    </div>
                                    <div className="p-6 grid gap-4">
                                        {result.emails.map((email: any, i: number) => (
                                            <div key={i} className="bg-slate-900 p-4 rounded-xl border border-white/5">
                                                <div className="flex justify-between items-start mb-3">
                                                    <span className="text-xs font-bold text-green-400 uppercase tracking-wider">Email {i + 1}: {email.subject}</span>
                                                    <button onClick={() => copyToClipboard(email.body, `email-${i}`)} className="text-slate-500 hover:text-white">
                                                        {copied === `email-${i}` ? <Check size={16} /> : <Copy size={16} />}
                                                    </button>
                                                </div>
                                                <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-mono bg-black/30 p-4 rounded-lg">
                                                    {email.body}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 3. Instagram Captions */}
                                <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-900/40 backdrop-blur-md">
                                    <div className="bg-white/5 p-4 border-b border-white/10 flex items-center gap-2">
                                        <Instagram className="w-5 h-5 text-pink-400" />
                                        <h2 className="font-bold text-lg">Social Captions</h2>
                                    </div>
                                    <div className="p-6 grid gap-4">
                                        {result.captions.map((caption: string, i: number) => (
                                            <div key={i} className="bg-slate-900 p-4 rounded-xl border border-white/5 flex gap-4">
                                                <div className="flex-1">
                                                    <p className="text-slate-300 text-sm leading-relaxed">{caption}</p>
                                                </div>
                                                <button onClick={() => copyToClipboard(caption, `cap-${i}`)} className="text-slate-500 hover:text-white h-fit">
                                                    {copied === `cap-${i}` ? <Check size={16} /> : <Copy size={16} />}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}
