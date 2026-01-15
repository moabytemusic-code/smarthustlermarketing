import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Navbar from '../../../components/Navbar';
import { Metadata } from 'next';
import { getRecommendedEngine, getEngineUrl, ENGINE_DETAILS, DEFAULT_ENGINE_CTA } from '../../../data/engineMapping';
// ... other imports

// ... inside Post component
// Engine CTA Logic
const recommendedEngineId = getRecommendedEngine(slug);
const engineData = recommendedEngineId ? ENGINE_DETAILS[recommendedEngineId] : null;

// Construct URLs
const primaryUrl = recommendedEngineId ? getEngineUrl(recommendedEngineId, `blog_footer_${slug}`, 'blog_footer') : null;
const browseUrl = getEngineUrl(null, `blog_footer_fallback`, 'blog_footer');

// ... inside return (Engine CTA Block)
{/* Engine CTA Block */ }
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
            </article >
        </main >
    );
}
