
import React from 'react';
import { Activity, ArrowRight } from 'lucide-react';
import { getEngineUrl } from '../data/engineMapping';

interface SignalEngineCardProps {
    engineId: string;
    title: string;
    description: string;
    placement: string;
    campaign?: string; // Allow overriding campaign
    className?: string; // Allow custom styling extensions
}

const SignalEngineCard: React.FC<SignalEngineCardProps> = ({
    engineId,
    title,
    description,
    placement,
    campaign = 'system',
    className
}) => {
    // Construct the tracking URL using helper
    const targetUrl = getEngineUrl(engineId, placement, campaign);

    return (
        <div className={`card-premium ${className || ''}`} style={{ borderColor: 'rgba(59, 130, 246, 0.3)', display: 'flex', flexDirection: 'column' }}>
            <div className="card-icon" style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
                <Activity size={32} color="#3b82f6" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{title}</h3>
            <p style={{ color: '#94a3b8', marginBottom: '1.5rem', flexGrow: 1 }}>{description}</p>
            <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <a
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '0.5rem' }}
                >
                    Launch Engine <ArrowRight size={16} />
                </a>
            </div>
        </div>
    );
};

export default SignalEngineCard;
