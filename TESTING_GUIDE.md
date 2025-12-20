# How to Test "Smart Hustler Marketing" Live Features

Since your site is now live on Vercel, you can test the **Shop** and **Email Subscription** functionality directly in your browser.

## 1. Testing the Shop (Stripe)

The shop uses **Stripe in Test Mode**, which means you can "buy" products without spending real money.

1.  **Go to:** `https://smarthustlermarketing.com/shop` (or your Vercel URL).
2.  **Click "Buy Now"** on any product (e.g., "Affiliate Jumpstart Kit").
3.  **Checkout Instructions**:
    *   You will be redirected to a Stripe Checkout page.
    *   **Email**: Use any fake email (e.g., `test@example.com`).
    *   **Card Number**: `4242 4242 4242 4242` (This is Stripe's magic test card).
    *   **Expiration**: Any future date (e.g., `12/30`).
    *   **CVC**: Any 3 digits (e.g., `123`).
    *   **Zip Code**: Any valid zip (e.g., `90210`).
4.  **Success**: click "Pay". You should be redirected back to your site's `/success` page.

## 2. Testing Email Subscription (Brevo)

The email form on the homepage connects directly to your Brevo account.

1.  **Go to:** `https://smarthustlermarketing.com` (or your Vercel URL).
2.  **Scroll Down** to the "Join the Hustle" section.
3.  **Enter an Email**: Use a real email address you have access to (or a alias like `yourname+test1@gmail.com`).
4.  **Click "Subscribe"**.
5.  **Verify**:
    *   You should see a green "Thanks for subscribing!" message on the site.
    *   **Login to Brevo**: Go to [Brevo Dashboard](https://app.brevo.com/).
    *   **Check Contacts**: Navigate to **Contacts**. You should see the new email address added to your list (likely List ID #2).

## Troubleshooting

*   **"Payment Failed"**: Check if you added `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY` to Vercel's Environment Variables.
*   **"Failed to subscribe"**: Check if you added `BREVO_API_KEY` to Vercel's Environment Variables.
*   **Redeploy**: If you update environment variables in Vercel, you must go to the **Deployments** tab and **Redeploy** the latest commit for them to take effect.
