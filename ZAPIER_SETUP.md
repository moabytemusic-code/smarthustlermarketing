# 📝 Medium Syndication Setup (RSS to Zapier)

**Important:** You are using **Buffer** for your social media (Twitter/LinkedIn). Buffer **cannot** post to Medium.
Therefore, we use **Zapier** *only* for this one specific task: Auto-posting your blog to Medium to build SEO backlinks.

---

## ✅ Prerequisites
1.  **Zapier Account** (Free plan is sufficient).
2.  **Medium Account**.

---

## 🛠 Step 1: The Trigger (RSS)
1.  **Create a New Zap**.
2.  **Trigger App:** "RSS by Zapier".
3.  **Event:** "New Item in Feed".
4.  **Feed URL:** `https://smarthustlermarketing.com/rss.xml`
5.  **Test Trigger:** Ensure it finds your latest post.

---

## � Step 2: The Action (Medium)
*This automatically syndicates your post while protecting your SEO ranking.*

1.  **Add Action Step:** Search for "**Medium**".
2.  **Event:** "Create Story".
3.  **Account:** Connect your Medium account.
4.  **Set Up Action:**
    *   **Title:** Select `{{Title}}` from the RSS trigger.
    *   **Content Format:** `HTML`.
    *   **Content:**
        ```html
        <h1>{{Title}}</h1>
        <p>{{Description}}</p>
        <br>
        <p>Read the full article originally published here: <a href="{{Link}}">{{Title}}</a></p>
        ```
    *   **Canonical URL (CRITICAL):** Select `{{Link}}` from RSS.
        *   *Why?* This tells Google your website is the original source.
    *   **Tags:** Type "Marketing", "Side Hustle", "Business".
    *   **Publish Status:** `Draft` (Recommended so you can review formatting before publishing).

---

## � Summary
*   **Buffer**: Handles Twitter & LinkedIn (See [BUFFER_SETUP.md](./BUFFER_SETUP.md)).
*   **Zapier**: Handles Medium (This instruction).

