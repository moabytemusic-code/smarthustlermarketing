# 📜 Smart Hustler Automation Scripts

This table documents every automation script in your arsenal, what it does, and when to run it.

| Script Name | Function | When to Run | Status |
| :--- | :--- | :--- | :--- |
| **Automation & Content** | | | |
| `trend_jacker.js` | Scrapes RSS feeds, finds relevant news, and uses AI to write new blog posts. | Daily / Weekly | ✅ Active |
| `generate_pr.js` | Reads your latest blog post and rewrites it into an AP-Style Press Release. | After posting a major article | ✅ Active |
| `generate_rss.js` | Scans all blog posts and builds the `rss.xml` feed for syndication. | Runs automatically on `npm run build` | ✅ Active |
| | | | |
| **Email Marketing (Brevo)** | | | |
| `schedule_brevo.js` | Reads `emails.json` and creates draft campaigns in Brevo for the 100-day sequence. | When updating email sequence | ✅ Active |
| `nuke_scheduled.js` | **DANGER:** Deletes ALL scheduled campaigns in Brevo. Used to reset the account. | Only when creating a fresh start | ⚠️ Dangerous |
| `nuke_ghosts.js` | Targeted cleanup: Deletes empty campaigns (0 recipients) that clutter the dashboard. | If dashboard gets messy | ✅ Active |
| `debug_brevo.js` | Checks your Brevo account status, quota, and recent errors. | If emails aren't sending | ✅ Active |
| `test_quota.js` | Sends a single test email to check if Brevo has lifted the daily sending limit. | If stuck in "Draft" mode | ✅ Active |
| | | | |
| **CRM (GoHighLevel)** | | | |
| `setup_ghl_crm.js` | Creates the Custom Fields (Product Interest, LTV, etc.) in your GHL account. | One-time setup | ✅ Done |
| `export_ghl_sheet.js` | Generates a CSV "Cheat Sheet" of all emails to help you manually paste them into GHL workflows. | If migrating to GHL | ✅ Active |
| `assess_ghl.js` | Diagnostic tool to check if your GHL API token is valid and connected to the right location. | If GHL isn't working | ✅ Active |
| | | | |
| **Legacy / Helpers** | | | |
| `generate_campaign_json.js`| Old helper to generate the initial `emails.json` file. | Rarely needed (file exists) | 💤 Dormant |
| `content_scheduler.js` | Precursor to `schedule_brevo.js`. | Deprecated (Use `schedule_brevo.js`) | ❌ Legacy |
| `launch_reengagement.js` | Specialized script for a specific "Re-engagement" campaign. | Only for specific blasts | 💤 Dormant |

## 🚀 Quick Command Reference

**1. Create Content:**
```bash
node scripts/trend_jacker.js  # Writes new blog posts
node scripts/generate_pr.js   # Creating a Press Release
```

**2. Deploy Website (Updates RSS):**
```bash
npm run build
```

**3. Manage Emails:**
```bash
node scripts/schedule_brevo.js
```
