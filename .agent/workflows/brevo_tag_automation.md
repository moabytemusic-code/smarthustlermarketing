---
description: How to create a tag-based workflow in Brevo
---

# Creating a Tag-Based Automation in Brevo

This workflow explains how to send specific emails (like "The Passive Trap" Chapter 1) when a user is tagged with a specific interest (e.g., `interest:book-passive-trap`).

## Prerequisites
1.  **Determine your Tag:** Ensure you know the tag your code is sending (e.g., `interest:book-passive-trap`).
2.  **Create your Email Template:** You need the email ready to send before building the workflow.

## Step-by-Step Guide

1.  **Log in to Brevo** and go to the **Automations** tab.
2.  **Create a New Workflow:**
    *   Click "Create a workflow".
    *   Choose "Custom workflow".
    *   Name it: `Deliver: Passive Trap Chapter 1`.

3.  **Add an Entry Point ( The Trigger):**
    *   Click "Add an entry point".
    *   Select **"Contact details"** -> **"Contact matches a filter"**.
    *   *Note: Brevo "Tags" are often stored as text attributes or you might be using Lists. If you are syncing tags to a specific attribute (e.g. `TAGS`), setup the filter:*
    *   Filter: `Active_Tags` (or whatever your custom field is) **contains** `book-passive-trap`.
    *   *Alternative (Easier):* If the API adds them to a specific list, use **"Contact is added to a list"**.
    *   *API Note:* Our current code adds them to List 51. If you want tag-specific triggering in Brevo without custom attributes, the easiest way is to modify the API to add to *different* lists based on the product.

    **Recommendation for Brevo (Tag Method):**
    *   In Brevo, "Tags" usually apply to transactional emails or campaigns, not contact properties by default.
    *   **BETTER METHOD:** Create a Custom Contact Attribute called `LAST_INTEREST`.
    *   The API should update this attribute.
    *   Brevo Trigger: "Contact attribute changes" -> `LAST_INTEREST` equals `book-passive-trap`.

4.  **Add the Action (Send Email):**
    *   Click the "+" sign below the trigger.
    *   Select **"Send an email"**.
    *   Choose your template: "Passive Trap Delivery".
    *   Click OK.

5.  **Activate:**
    *   Click "Activate" in the top right corner.

## Refining the API for Brevo
To make this easier in Brevo, let's update your API to save the interest as an **Attribute** rather than just a generic tag. This makes the trigger "Attribute Change" very reliable.

**Update your `route.ts` (Conceptual):**
```typescript
const createContact = new Brevo.CreateContact();
createContact.attributes = {
  "LAST_INTEREST": source // e.g., 'book-passive-trap'
};
```
