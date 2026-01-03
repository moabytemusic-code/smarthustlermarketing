# Stripe Live Launch Guide

Your application is currently in **Test Mode**. To start accepting real money, follow these steps:

## 1. Stripe Dashboard Steps
1.  Log in to your [Stripe Dashboard](https://dashboard.stripe.com/).
2.  Switch the toggle from **"Test Mode"** to **"Live Mode"** (top right corner).
3.  Go to **Products** and recreate your two bundles in Live Mode (data does not copy over automatically):
    *   **Standard Bundle:** Price $25.
    *   **Reseller Bundle:** Price $50.
4.  Copy the new **Price ID** for each (e.g., `price_LiveXYZ...`).

## 2. API Keys
1.  Go to **Developers** > **API Keys**.
2.  Copy your **Publishable Key** (starts with `pk_live_...`).
3.  Copy your **Secret Key** (starts with `sk_live_...`).

## 3. Configuration Steps
You need to update your environment variables.

### If running on Vercel (Production):
1.  Go to your Vercel Project > **Settings** > **Environment Variables**.
2.  Add/Update these variables:
    *   `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: (Your `pk_live_...`)
    *   `STRIPE_SECRET_KEY`: (Your `sk_live_...`)
    *   `NEXT_PUBLIC_STRIPE_PRICE_ID_STANDARD`: (Your new `price_Live...` for Standard)
    *   `NEXT_PUBLIC_STRIPE_PRICE_ID_RESELLER`: (Your new `price_Live...` for Reseller)
3.  **Redeploy** to make changes effective.

### If running Locally (for final testing):
1.  Open `.env.local`.
2.  Replace the Test keys with Live keys.
3.  Restart the server (`npm run dev`).
