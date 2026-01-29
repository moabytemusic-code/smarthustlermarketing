import Navbar from '../../components/Navbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | Smart Hustler Marketing',
    description: 'Terms of Service and Refund Policy for Smart Hustler Marketing.',
};

export default function TermsOfService() {
    return (
        <main>
            <Navbar />
            <article className="container" style={{ padding: '8rem 0 4rem', maxWidth: '800px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Terms of Service</h1>

                <div className="glass" style={{ padding: '2.5rem', borderRadius: '1rem', color: '#e2e8f0', lineHeight: '1.8' }}>
                    <p style={{ marginBottom: '1.5rem' }}>Last Updated: January 21, 2026</p>

                    <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>1. Agreement to Terms</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        By accessing or using the Smart Hustler Marketing website, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use this website or our services.
                    </p>

                    <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem', textTransform: 'uppercase' }}>2. Action-Based Refund Policy</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        At Smart Hustler Marketing, we invest deeply in the success of our students and expect the same commitment from you. Because our digital products provide immediate, irrevocable access to proprietary intellectual property, <strong>we do not offer "no-questions-asked" refunds.</strong>
                    </p>

                    <p style={{ marginBottom: '1rem' }}><strong>Strict 14-Day Action-Based Guarantee:</strong><br />
                        To be eligible for a refund, you must submit a request to support@smarthustlermarketing.com within 14 days of purchase. Your request MUST include proof of work, specifically:</p>
                    <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
                        <li>Completion of all relevant course worksheets.</li>
                        <li>Evidence of at least one implemented strategy (e.g., a published landing page, live offer, or conducted market research).</li>
                    </ul>

                    <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>3. Earnings Disclaimer</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        We do not guarantee, imply, or predict that you will earn any money using our strategies, tools, or ideas. Your results depend entirely on your own work ethic, background, experience, and the market economy.
                    </p>

                    <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>4. Intellectual Property</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        All content, including tools, text, graphics, and logos, is the property of Smart Hustler Marketing and is protected by copyright and other intellectual property laws.
                    </p>

                    <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>5. Limitation of Liability</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Smart Hustler Marketing shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of or inability to use the service.
                    </p>
                </div>

                <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                    <a href="/" className="btn" style={{ border: '1px solid #334155', color: '#94a3b8', padding: '0.75rem 2rem' }}>
                        ← Back to Home
                    </a>
                </div>
            </article>
        </main>
    );
}
