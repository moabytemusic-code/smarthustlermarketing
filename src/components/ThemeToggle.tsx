'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun, Terminal } from 'lucide-react';

type Theme = 'default' | 'cyber' | 'executive';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>('default');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check local storage or system preference could go here
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }, []);

    const cycleTheme = () => {
        let newTheme: Theme = 'default';
        if (theme === 'default') newTheme = 'cyber';
        else if (theme === 'cyber') newTheme = 'executive';
        else newTheme = 'default';

        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    if (!mounted) return null; // Avoid hydration mismatch

    return (
        <button
            onClick={cycleTheme}
            className="p-2 rounded-full hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
            title={`Current Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`}
            aria-label="Toggle Theme"
        >
            {theme === 'default' && <Moon size={20} className="text-yellow-400" />}
            {theme === 'cyber' && <Terminal size={20} className="text-green-500" />}
            {theme === 'executive' && <Sun size={20} className="text-blue-600" />}
        </button>
    );
}
