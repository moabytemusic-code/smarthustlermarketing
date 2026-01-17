
// Canonical Signal Engine IDs - DO NOT MODIFY
export type EngineId =
    | 'emailwarmup'
    | 'tiktok-idea-batch'
    | 'tiktok-script-generator'
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
    | 'trackingfix';

export interface EngineDetail {
    title: string;
    description: string;
}

export const ENGINE_DETAILS: Record<string, EngineDetail> = {
    "emailwarmup": {
        title: "Email Reputation Checker",
        description: "Don't land in spam. Check your sender reputation and warmup status."
    },
    "tiktok-idea-batch": {
        title: "TikTok Viral Idea Batch",
        description: "Stuck on what to post? Generate 10 high-conversion TikTok/Reels ideas in seconds."
    },
    "tiktok-script-generator": {
        title: "TikTok Script Generator",
        description: "Generate high-retention TikTok and Reels scripts with viral hooks, body content, and call-to-actions."
    },
    "accountrecovery": {
        title: "Account Access Recovery Engine",
        description: "Find out why your account was locked and the fastest way to regain access."
    },
    "adbleed": {
        title: "Ad Spend Bleed Diagnostic Engine",
        description: "Scan your ad funnel and stop wasting money."
    },
    "amazonsuspend": {
        title: "Amazon Seller Suspension Appeal Engine",
        description: "Generate a winning Plan of Action (POA) for Amazon Seller Central."
    },
    "chargebackalert": {
        title: "Chargeback & Dispute Alert Engine",
        description: "Analyze your transaction risk factors and get a plan to reduce disputes and chargebacks."
    },
    "compliancealert": {
        title: "Compliance Alert Engine",
        description: "Scan your compliance risk and get a fix plan."
    },
    "domainblock": {
        title: "Domain Blacklist & Reputation Engine",
        description: "Emails going to spam or domain blocked? Identify the specific blacklists and get a clean-up and delisting guide immediately."
    },
    "emailspam": {
        title: "Email Deliverability Fix Engine",
        description: "Stop landing in spam. Diagnose SPF, DKIM, and reputation issues."
    },
    "fbadban": {
        title: "Facebook Ad Account Recovery Engine",
        description: "Run a quick scan to identify likely causes, get do/don’t steps, and generate an appeal template."
    },
    "fbpagerestricted": {
        title: "Facebook Page Restriction Fix",
        description: "Identify policy violations hurting your page quality and get a plan to restore publishing access."
    },
    "gbpsuspend": {
        title: "Google Business Profile Reinstatement",
        description: "Diagnostic tool for suspended Google Business Profiles. Identify the suspension reason and get a reinstatement guide."
    },
    "merchantsuspend": {
        title: "Merchant Account Suspension Fix",
        description: "Diagnose the reason for your Stripe, PayPal, or Google Merchant Center suspension and get an appeal template."
    },
    "reviewrepair": {
        title: "Google Review Repair Engine",
        description: "Scan your review damage and get step-by-step repair actions."
    },
    "sitehacked": {
        title: "Website Hack & Malware Recovery Engine",
        description: "Identify malware risk and get a cleanup plan instantly."
    },
    "trackingfix": {
        title: "Ad Tracking & Attribution Fixer",
        description: "Diagnose tracking pixel and install conversion API to recover lost ad attribution data."
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
    "script": "tiktok-script-generator",
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
