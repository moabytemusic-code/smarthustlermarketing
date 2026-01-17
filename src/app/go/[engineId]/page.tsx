import { redirect } from 'next/navigation';
import { ENGINE_DETAILS, EngineId } from '../../../data/engineMapping';
import Navbar from '../../../components/Navbar';
import Link from 'next/link';

// Define known internal tool routes
const INTERNAL_TOOLS: Record<string, string> = {
    'micro-niche-finder': '/tools/micro-niche-finder',
    'freedom-calculator': '/tools/freedom-calculator',
    // Add other internal tools here as they are built
};

export default async function EngineBayPage({ params }: { params: Promise<{ engineId: string }> }) {
    const { engineId } = await params;
    const engine = ENGINE_DETAILS[engineId];

    // 1. Direct Redirect for existing internal tools
    if (INTERNAL_TOOLS[engineId]) {
        redirect(INTERNAL_TOOLS[engineId]);
    }

    // 2. Fallback: Render "Coming Soon" / Waitlist Page
    // If the engine ID is unknown, we show a generic 404-like state or a general waitlist.
    if (!engine) {
        return (
            <main style={{ minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)' }}>
                <Navbar />
                <div style={{ maxWidth: '800px', margin: '100px auto', textAlign: 'center', padding: '2rem' }}>
                    <h1>Engine Not Found</h1>
                    <p>The diagnostic engine you are looking for ({engineId}) could not be located.</p>
                    <Link href="/tools" className="btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
                        Browse All Tools
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main style={{ minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)' }}>
            <Navbar />
            <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <span style={{
                        background: 'rgba(234, 179, 8, 0.1)',
                        color: 'var(--primary)',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: '600'
                    }}>
                        COMING SOON
                    </span>
                </div>

                <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                    {engine.title}
                </h1>

                <p style={{ fontSize: '1.25rem', color: '#64748b', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                    {engine.description} <br />
                    <em style={{ fontSize: '1rem' }}>
                        We are currently fine-tuning the algorithm for this engine.
                        Join the priority access list to be notified when it goes live.
                    </em>
                </p>

                <div style={{
                    background: 'var(--card-bg)',
                    padding: '2rem',
                    borderRadius: '12px',
                    border: '1px solid var(--card-border)',
                    maxWidth: '500px',
                    margin: '0 auto'
                }}>
                    <h3 style={{ marginBottom: '1rem' }}>Get Early Access</h3>
                    <form
                        action="https://smarthustlermarketing.com/api/waitlist" // Placeholder action, should be wired to Brevo later
                        method="POST"
                        style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}
                    >
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your best email..."
                            required
                            style={{
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                background: 'var(--background)',
                                color: 'var(--foreground)',
                                fontSize: '1rem'
                            }}
                        />
                        <input type="hidden" name="engine" value={engineId} />
                        <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                            Notify Me When Live
                        </button>
                    </form>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '1rem' }}>
                        Join 2,400+ smart hustlers on the waitlist. No spam.
                    </p>
                </div>
            </div>
        </main>
    );
}
