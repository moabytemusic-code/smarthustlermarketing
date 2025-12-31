---
description: Alert user before using Perplexity API
---
# Perplexity API Usage Rule

The user has explicitly requested to be alerted whenever the Perplexity API is used, as it is a paid service.

**Protocol:**
1.  **Identify Intent:** Before executing any command that calls `scripts/perplexity_research.js` or makes a request to `api.perplexity.ai`.
2.  **Notify User:** You MUST explicitly state: "⚠️ **Cost Alert:** I am about to use the Perplexity API to research: [Topic]."
3.  **Proceed:** You generally do not need to wait for a second "yes" if the user has already approved the broad task, but you MUST provide this visibility *before* the tool call.
