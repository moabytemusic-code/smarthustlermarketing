
// Canonical Signal Engine IDs - DO NOT MODIFY
export type EngineId =
    | 'accountrecovery'
    | 'adbleed'
    | 'amazonsuspend'
    | 'chargebackalert'
    | 'compliancealert'
    | 'domainblock'
    | 'emailspam'
    | 'fbadban'
    | 'fbpagerestricted'
    | 'gbpsuspend'
    | 'merchantsuspend'
    | 'reviewrepair'
    | 'sitehacked'
    | 'trackingfix'
    | 'tiktok-idea-batch'
    | 'emailwarmup';

export interface EngineDetail {
    title: string;
    description: string;
}

export const ENGINE_DETAILS: Record<string, EngineDetail> = {
    "tiktok-idea-batch": {
        title: "TikTok Content Dried Up?",
        description: "Generate 10 viral video concepts tailored to your niche instantly."
    },
    "emailwarmup": {
        title: "Emails Landing in Spam?",
        description: "Check your sender reputation and warmup status."
    },
    "accountrecovery": {
        title: "Account Locked?",
        description: "Recover access to your locked social or ad accounts fast."
    },
    "adbleed": {
        title: "Ad Budget Bleeding?",
        description: "Identify underperforming ads and wasted spend instantly."
    },
    "amazonsuspend": {
        title: "Amazon Seller Suspended?",
        description: "Generate professional appeal letters for Seller Central."
    },
    "chargebackalert": {
        title: "Too Many Chargebacks?",
        description: "Get alerts and dispute templates to save your merchant account."
    },
    "compliancealert": {
        title: "Missing Legal Pages?",
        description: "Scan your site for GDPR/CCPA compliance gaps."
    },
    "domainblock": {
        title: "Domain Blacklisted?",
        description: "Check if your domain is blocked by major ISPs or platforms."
    },
    "emailspam": {
        title: "Emails Going to Spam?",
        description: "Check your spam score and fix deliverability issues."
    },
    "fbadban": {
        title: "Facebook Ad Account Disabled?",
        description: "Diagnose policy violations and generate an appeal."
    },
    "fbpagerestricted": {
        title: "Facebook Page Restricted?",
        description: "Restore your page publishing rights and ad access."
    },
    "gbpsuspend": {
        title: "Google Business Profile Suspended?",
        description: "Restore your local listing on Maps instantly."
    },
    "merchantsuspend": {
        title: "Merchant Center Suspended?",
        description: "Fix products disapproval and account warning issues."
    },
    "reviewrepair": {
        title: "Negative Reviews?",
        description: "Generate professional responses to repair your reputation."
    },
    "sitehacked": {
        title: "WordPress Site Hacked?",
        description: "Clean malware and secure your site against future attacks."
    },
    "trackingfix": {
        title: "Broken Price/Tracking?",
        description: "Debug Facebook Pixels and CAPI events."
    }
};

// Map blog post slugs to relevant Signal Engine IDs
// Format: "blog-post-slug": "engine-id"
export const ENGINE_MAPPING: Record<string, EngineId> = {
    "tiktok-marketing-guide": "tiktok-idea-batch",
    "email-warmup-guide": "emailwarmup",
    "facebook-account-locked": "fbadban", // Fallback to fbadban implies general FB issue logic if accurate recovery not available or mapped
    "facebook-page-restricted": "fbpagerestricted",
    "facebook-ad-account": "fbadban",
    "google-business-suspended": "gbpsuspend",
    "amazon-seller-suspended": "amazonsuspend",
    "merchant-center-suspended": "merchantsuspend",
    "email-spam": "emailspam",
    "domain-blacklist": "domainblock",
    "tracking-pixel": "trackingfix",
    "site-hacked": "sitehacked",
    "negative-review": "reviewrepair",
    "compliance": "compliancealert",
    "chargeback": "chargebackalert",
    // Add real blog slugs here
    "facebook-ad-account-disabled-2025": "fbadban",
    "amazon-seller-suspension-guide": "amazonsuspend",
    "google-business-profile-suspended": "gbpsuspend",
    "email-deliverability-guide": "emailspam", // emailspam or emailwarmup? Let's use spam for now, or maybe warmup if specific.
    "wordpress-hacked-fix": "sitehacked",
};

// Topic Cluster Fallbacks
// Used if no exact slug match contains these keywords
export const TOPIC_FALLBACKS: Record<string, EngineId> = {
    "tiktok": "tiktok-idea-batch",
    "viral": "tiktok-idea-batch",
    "content": "tiktok-idea-batch",
    "warmup": "emailwarmup",
    "reputation": "emailwarmup", // Overlap with reviewrepair? Context matters. Review usually reputation. Email reputation -> warmup.
    // "reputation": "reviewrepair", // Keep existing for reviews
    "facebook": "fbadban",
    "meta": "fbadban",
    "google": "gbpsuspend",
    "amazon": "amazonsuspend",
    "seller": "amazonsuspend",
    "ads": "trackingfix",
    "tracking": "trackingfix",
    "pixel": "trackingfix",
    "email": "emailspam",
    "spam": "emailspam",
    "compliance": "compliancealert",
    "legal": "compliancealert",
    "security": "sitehacked",
    "hacked": "sitehacked",
    "review": "reviewrepair"
};

// Fallback config for the generic CTA
export const DEFAULT_ENGINE_CTA = {
    title: "Not sure what needs fixing?",
    description: "Run a full diagnostic scan to identify hidden risks in your accounts.",
    label: "Browse All Engines",
    url: "https://www.signalengines.com/engines" // Base URL, UTMs added dynamically
};

/**
 * Generates a consistent Signal Engines URL with UTMs.
 * Uses the /go/{engineId} pattern for specific engines.
 */
export function getEngineUrl(
    engineId: string | null,
    placement: string,
    campaign: string = 'system'
): string {
    const baseUrl = engineId
        ? `https://www.signalengines.com/go/${engineId}`
        : `https://www.signalengines.com/engines`;

    const url = new URL(baseUrl);
    url.searchParams.set('utm_source', 'smarthustler');
    url.searchParams.set('utm_medium', 'referral');
    url.searchParams.set('utm_campaign', campaign);
    url.searchParams.set('utm_content', placement);

    return url.toString();
}

/**
 * Determines the best Engine ID for a given blog slug.
 * 1. Exact match in ENGINE_MAPPING
 * 2. Keyword match in TOPIC_FALLBACKS
 * 3. Returns null if no match
 */
export function getRecommendedEngine(slug: string): EngineId | null {
    // 1. Exact Match
    if (ENGINE_MAPPING[slug]) {
        return ENGINE_MAPPING[slug];
    }

    // 2. Topic Fallback
    const lowerSlug = slug.toLowerCase();
    for (const [keyword, engineId] of Object.entries(TOPIC_FALLBACKS)) {
        if (lowerSlug.includes(keyword)) {
            return engineId;
        }
    }

    return null;
}
