'use client';

import React from 'react';
import Link from 'next/link';

interface ContentUpgradeProps {
    title: string;
    description: string;
    buttonText: string;
    href: string;
    icon?: string;
}

export default function ContentUpgrade({
    title = "Free Resource",
    description = "Download the cheat sheet for this article.",
    buttonText = "Access Now",
    href = "#",
    icon = "🎁"
}: ContentUpgradeProps) {
    return (
        <div className="my-8 p-6 rounded-xl border border-yellow-500/30 bg-yellow-500/5 relative overflow-hidden group">
            {/* Background Glow Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none md:block hidden"></div>

            <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                {/* Icon Side */}
                <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-yellow-500/20 rounded-full text-3xl shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                    {icon}
                </div>

                {/* Text Side */}
                <div className="flex-grow text-center md:text-left">
                    <h3 className="text-xl font-bold text-white mb-2">
                        {title}
                    </h3>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4 md:mb-0">
                        {description}
                    </p>
                </div>

                {/* Button Side */}
                <div className="flex-shrink-0">
                    <Link
                        href={href}
                        className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-black transition-all duration-200 bg-yellow-400 rounded-lg hover:bg-yellow-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(250,204,21,0.5)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 focus:ring-offset-slate-900"
                    >
                        {buttonText} &rarr;
                    </Link>
                </div>
            </div>

            {/* Dashed Border Visual Cue */}
            <div className="absolute inset-0 border-2 border-dashed border-yellow-500/20 rounded-xl pointer-events-none"></div>
        </div>
    );
}
