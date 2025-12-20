'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid var(--glass-border)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/logo.png" alt="Smart Hustler" style={{ height: '50px', width: 'auto' }} />
                </Link>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <Link href="/blog">Blog</Link>
                        <Link href="/resources">Resources</Link>
                        <Link href="/shop">Shop</Link>
                        <Link href="/about">About</Link>
                    </div>

                    <Link href="/contact" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground)' }}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div style={{
                    position: 'absolute',
                    top: '80px',
                    left: 0,
                    right: 0,
                    background: 'var(--background)',
                    borderBottom: '1px solid var(--glass-border)',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    alignItems: 'center',
                    zIndex: 99
                }}>
                    <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
                    <Link href="/resources" onClick={() => setIsMobileMenuOpen(false)}>Resources</Link>
                    <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
                    <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                    <Link href="/contact" className="btn btn-primary" onClick={() => setIsMobileMenuOpen(false)}>
                        Get Started
                    </Link>
                </div>
            )}

            <style jsx>{`
                .desktop-menu {
                    display: flex;
                }
                .mobile-menu-btn {
                    display: none !important;
                }

                @media (max-width: 768px) {
                    .desktop-menu {
                        display: none !important;
                    }
                    .mobile-menu-btn {
                        display: block !important;
                    }
                }
            `}</style>
        </nav>
    );
}
