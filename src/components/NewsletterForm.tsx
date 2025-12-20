'use client';

export default function NewsletterForm() {
    return (
        <form style={{ display: 'flex', gap: '1rem' }} onSubmit={(e) => e.preventDefault()}>
            <input
                type="email"
                placeholder="Enter your email"
                style={{
                    flex: 1,
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--glass-border)',
                    background: 'var(--glass-bg)',
                    color: '#fff'
                }}
            />
            <button className="btn btn-primary" type="submit">Subscribe</button>
        </form>
    );
}
