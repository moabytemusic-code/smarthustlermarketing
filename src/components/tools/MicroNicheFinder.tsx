'use client';

import React, { useState } from 'react';
import { Loader2, ArrowRight } from 'lucide-react';
import MicroNicheFinderModal from './MicroNicheFinderModal';
// CSS is imported in the parent page, but good to ensure availability
import '../../app/tools/micro-niche-finder/styles.css';

export default function MicroNicheFinder() {
    const [keyword, setKeyword] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [targetKeyword, setTargetKeyword] = useState('');

    const handleAnalyze = (e: React.FormEvent) => {
        e.preventDefault();
        if (!keyword.trim()) return;

        setTargetKeyword(keyword);
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="interactive-demo">
                <form onSubmit={handleAnalyze} className="search-container">
                    <input
                        type="text"
                        id="niche-input"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="e.g. 'Vegan dog treats' or 'Notion templates for students'"
                    />
                    <button
                        type="submit"
                        disabled={isAnalyzing}
                        className="btn-primary glow-effect"
                        id="analyze-btn"
                    >
                        {isAnalyzing ? <Loader2 className="animate-spin" size={16} /> : 'Analyze Idea'}
                        {!isAnalyzing && <span style={{ marginLeft: '8px' }}>→</span>}
                    </button>
                </form>

                {/* Status Indicator */}
                <div className="demo-status">
                    <span className="dot"></span> AI Engine Ready
                </div>
            </div>

            <MicroNicheFinderModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                keyword={targetKeyword}
            />
        </>
    );
}
