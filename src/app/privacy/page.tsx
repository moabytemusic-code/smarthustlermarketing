import Navbar from '../../components/Navbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | Smart Hustler Marketing',
    description: 'Privacy Policy and Data Protection guidelines for Smart Hustler Marketing.',
};

export default function PrivacyPolicy() {
    return (
        <main>
            <Navbar />
            <article className="container" style={{ padding: '8rem 0 4rem', maxWidth: '800px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Privacy Policy</h1>

                <div className="glass" style={{ padding: '2.5rem', borderRadius: '1rem', color: '#e2e8f0', lineHeight: '1.8' }}>
                    <p style={{ marginBottom: '1.5rem' }}>Last Updated: January 21, 2026</p>

                    <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>1. Introduction</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        At Smart Hustler Marketing, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                    </p>

                    <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>2. Data We Collect</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                    </p>
                    <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
                        <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                        <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
                        <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, etc.</li>
                        <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>3. How We Use Your Data</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to provide the services you requested, to manage your account, and to send you information about our products and services.
                    </p>

                    <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>4. Data Security</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
                    </p>

                    <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>5. Contact Us</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        If you have any questions about this privacy policy or our privacy practices, please contact us at support@smarthustlermarketing.com.
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
