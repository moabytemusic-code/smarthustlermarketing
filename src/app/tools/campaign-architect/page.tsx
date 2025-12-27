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

            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">

                    <div className="mb-8">
                        <Link href="/tools/agents" className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-6">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Agents
                        </Link>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
                                <Megaphone size={24} />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold">Campaign Architect</h1>
                        </div>
                        <p className="text-slate-400 max-w-2xl">
                            Enter a product URL (Shopify, Amazon, Etsy). Our Agent will scan the product and generate a complete "Launch Kit" including FB Ads, Emails, and Social Posts.
                        </p>
                    </div>

                    {/* Input Section */}
                    <div className="p-8 rounded-2xl bg-slate-900/50 border border-white/5 mb-12 backdrop-blur-sm">
                        <form onSubmit={handleGenerate} className="flex gap-4 flex-col md:flex-row">
                            <input
                                type="url"
                                required
                                placeholder="https://your-store.com/products/amazing-gadget"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={loading || !url}
                                className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[180px]"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing...
                                    </>
                                ) : (
                                    <>
                                        Generate Kit <Megaphone className="w-5 h-5 ml-2" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Results Section */}
                    {result && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

                            {/* 1. Facebook Ads */}
                            <div className="rounded-2xl border border-white/10 overflow-hidden">
                                <div className="bg-white/5 p-4 border-b border-white/10 flex items-center gap-2">
                                    <ShoppingBag className="w-5 h-5 text-blue-400" />
                                    <h2 className="font-bold text-lg">Facebook Ad Hooks</h2>
                                </div>
                                <div className="p-6 grid gap-4 bg-black/20">
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
                            <div className="rounded-2xl border border-white/10 overflow-hidden">
                                <div className="bg-white/5 p-4 border-b border-white/10 flex items-center gap-2">
                                    <Mail className="w-5 h-5 text-green-400" />
                                    <h2 className="font-bold text-lg">Email Sequence</h2>
                                </div>
                                <div className="p-6 grid gap-4 bg-black/20">
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
                            <div className="rounded-2xl border border-white/10 overflow-hidden">
                                <div className="bg-white/5 p-4 border-b border-white/10 flex items-center gap-2">
                                    <Instagram className="w-5 h-5 text-pink-400" />
                                    <h2 className="font-bold text-lg">Social Captions</h2>
                                </div>
                                <div className="p-6 grid gap-4 bg-black/20">
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
            </section>
        </main>
    );
}
