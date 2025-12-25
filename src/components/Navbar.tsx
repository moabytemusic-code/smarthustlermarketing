'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container nav-container">
                <Link href="/" className="nav-logo">
                    <img
                        src="/logo.png"
                        alt="Smart Hustler"
                        style={{ height: '48px', width: 'auto' }}
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="nav-links">
                    <Link href="/blog">Blog</Link>

                    <Link href="/tools">Tools</Link>

                    <Link href="/shop">Shop</Link>
                    <Link href="/about">About</Link>

                    <div style={{ marginLeft: '1rem', marginRight: '0.5rem' }}>
                        <ThemeToggle />
                    </div>

                    <Link href="/contact" className="btn-outline btn-sm" style={{ padding: '0.6rem 1.25rem', backgroundColor: 'var(--foreground)', color: 'var(--background)' }}>
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                backgroundColor: '#020617',
                zIndex: 99,
                display: isMobileMenuOpen ? 'flex' : 'none',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2rem'
            }}>
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: '#fff' }}
                >
                    <X size={32} />
                </button>
                <Link href="/blog" style={{ fontSize: '1.5rem', fontWeight: 700 }} onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>

                <Link href="/tools" style={{ fontSize: '1.5rem', fontWeight: 700 }} onClick={() => setIsMobileMenuOpen(false)}>Tools</Link>

                <Link href="/shop" style={{ fontSize: '1.5rem', fontWeight: 700 }} onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
                <Link href="/about" style={{ fontSize: '1.5rem', fontWeight: 700 }} onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                <div onClick={() => setIsMobileMenuOpen(false)} style={{ transform: 'scale(1.5)' }}>
                    <ThemeToggle />
                </div>
                <Link href="/contact" className="btn-premium" onClick={() => setIsMobileMenuOpen(false)}>
                    Get Started
                </Link>
            </div>
        </nav>
    );
}
