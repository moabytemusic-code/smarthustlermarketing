
// Map blog post slugs to relevant Signal Engine IDs (subdomains)
// Format: "blog-post-slug": "engine-id"
// Example: "how-to-fix-facebook-ads": "fbadban"

export const ENGINE_MAPPING: Record<string, string> = {
    // Examples (replace with actual blog slugs when ready)
    "facebook-ad-account-disabled-2025": "fbadban",
    "amazon-seller-suspension-guide": "amazonsuspend",
    "google-business-profile-suspended": "gbpsuspend",
    "email-deliverability-guide": "emailspam",
    "wordpress-hacked-fix": "sitehacked",
};

// Fallback config for the generic CTA
export const DEFAULT_ENGINE_CTA = {
    title: "Not sure what needs fixing?",
    description: "Run a full diagnostic scan to identify hidden risks in your accounts.",
    label: "Browse Diagnostics",
    url: "https://www.signalengines.com/engines"
};

export const ENGINE_DETAILS: Record<string, { title: string; description: string; url: string }> = {
    "fbadban": {
        title: "Facebook Ad Account Disabled?",
        description: "Recover your ad account and assets with this specialist engine.",
        url: "https://facebook.smarthustlermarketing.com?utm_source=smarthustler"
    },
    "amazonsuspend": {
        title: "Amazon Seller Suspended?",
        description: "Generate professional appeal letters for Seller Central.",
        url: "https://amazon.smarthustlermarketing.com?utm_source=smarthustler"
    },
    "gbpsuspend": {
        title: "Google Business Profile Suspended?",
        description: "Restore your local listing on Maps instantly.",
        url: "https://google.smarthustlermarketing.com?utm_source=smarthustler"
    },
    "emailspam": {
        title: "Emails Going to Spam?",
        description: "Check your spam score and fix deliverability issues.",
        url: "https://email.smarthustlermarketing.com?utm_source=smarthustler"
    },
    "sitehacked": {
        title: "WordPress Site Hacked?",
        description: "Clean malware and secure your site against future attacks.",
        url: "https://hacked.smarthustlermarketing.com?utm_source=smarthustler"
    },
    "trackingfix": {
        title: "Broken Pixel or Tracking?",
        description: "Debug Facebook Pixels and CAPI events to stop burning ad spend.",
        url: "https://tracking.smarthustlermarketing.com?utm_source=smarthustler"
    },
    "compliancealert": {
        title: "Missing Legal Pages?",
        description: "Scan your site for GDPR/CCPA compliance gaps.",
        url: "https://compliance.smarthustlermarketing.com?utm_source=smarthustler"
    },
    "adbleed": {
        title: "Wasted Ad Spend Auditor",
        description: "Identify underperforming ads and bleeding budget instantly.",
        url: "https://ads.smarthustlermarketing.com?utm_source=smarthustler"
    }
};
