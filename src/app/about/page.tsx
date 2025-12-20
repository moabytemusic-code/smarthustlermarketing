import Navbar from '../../components/Navbar';

export default function About() {
    return (
        <main>
            <Navbar />
            <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
                <h1 className="section-title">About Smart Hustler</h1>
                <div className="glass" style={{ padding: '2rem', borderRadius: '1rem' }}>
                    <p style={{ marginBottom: '1rem' }}>
                        Smart Hustler Marketing was founded with a single mission: to help digital entrepreneurs cut through the noise and build sustainable, profitable businesses.
                    </p>
                    <p style={{ marginBottom: '1rem' }}>
                        We don't believe in "get rich quick" schemes. We believe in systems, data, and leverage. Whether it's using AI to scale content or setting up automated email funnels, our strategies are designed to free up your time while increasing your revenue.
                    </p>
                    <p>
                        Join thousands of other marketers who are leveling up their game with our tools and training.
                    </p>
                </div>
            </div>
        </main>
    );
}
