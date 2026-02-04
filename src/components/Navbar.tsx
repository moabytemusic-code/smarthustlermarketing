'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { getEngineUrl } from '../data/engineMapping';

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

    // Helper for nav links
    const signalEnginesUrl = getEngineUrl(null, 'top_nav', 'top_nav');

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
                    <Link href="/resources">Resources</Link>
                    <Link href="/library">Library</Link>
                    <Link href="/tools">The OS</Link>

                    <Link href="/shop">Shop</Link>
                    <Link href="/about">About</Link>
                    <Link href="/tools/micro-niche-finder">Niche-Finder-Tool</Link>
                    <a href={signalEnginesUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', fontWeight: 'bold' }}>Run a Scan</a>

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
                <Link href="/resources" style={{ fontSize: '1.5rem', fontWeight: 700 }} onClick={() => setIsMobileMenuOpen(false)}>Resources</Link>
                <Link href="/library" style={{ fontSize: '1.5rem', fontWeight: 700 }} onClick={() => setIsMobileMenuOpen(false)}>Library</Link>
                <Link href="/tools" style={{ fontSize: '1.5rem', fontWeight: 700 }} onClick={() => setIsMobileMenuOpen(false)}>The OS</Link>

                <Link href="/shop" style={{ fontSize: '1.5rem', fontWeight: 700 }} onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
                <Link href="/about" style={{ fontSize: '1.5rem', fontWeight: 700 }} onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                <Link href="/tools/micro-niche-finder" style={{ fontSize: '1.5rem', fontWeight: 700 }} onClick={() => setIsMobileMenuOpen(false)}>Niche-Finder-Tool</Link>
                <a href={signalEnginesUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.5rem', fontWeight: 700, color: '#60a5fa' }} onClick={() => setIsMobileMenuOpen(false)}>Run a Scan</a>
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
