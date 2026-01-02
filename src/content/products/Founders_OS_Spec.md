# Notion Build Spec: Founder's Operating System (v2.0)

**Role:** The Central Nervous System for an Active Asset Business.
**Design Philosophy:** "High Signal, Low Noise." The dashboard should only show what needs attention *today*.

---

## 1. The Dashboard (Home Page)
**Layout:** 3-Column Top, 2-Column Wide Bottom.

### Top Section (The Cockpit)
*   **Column 1: Navigation Sidebar (Synced Block)**
    *   Links to: *Inbox, Projects, Areas, CRM, Content, Finances.*
*   **Column 2: "Quick Add" Buttons (Notion Buttons)**
    *   `[+ New Task]` -> Adds to *Task DB* (Status: Not Started).
    *   `[+ New Content Idea]` -> Adds to *Content DB* (Status: Idea).
    *   `[+ New Lead]` -> Adds to *CRM DB*.
*   **Column 3: Vital Signs (Simple Callouts)**
    *   *Current MRR:* (Manual or API integrated text).
    *   *Active Projects:* (Linked view count).

### Middle Section (Action Zone)
*   **Widget:** **Priorities (Kanban View)**
    *   *Source:* Tasks Database.
    *   *Filter:* `Status` is not "Done", `Date` is "Today" OR "Overdue".
    *   *Group By:* `Urgency`.
*   **Widget:** **Weekly Agenda (Calendar List View)**
    *   *Source:* Calendar Master.
    *   *Filter:* Date is within "This Week".

### Bottom Section (Pipeline Visibility)
*   **Toggle 1:** **Active Projects (Gallery View)**
    *   Shows progress bars and deadlines.
*   **Toggle 2:** **Content Queue (Board View)**
    *   Grouped by Status (Drafting, Editing, Scheduled).

---

## 2. Core Databases & Properties

### A. Projects DB (The Goals)
*   **Name:** Project Name.
*   **Status:** Select (Planned, In Progress, On Hold, Completed).
*   **Timeline:** Date Range.
*   **Priority:** Select (High, Medium, Low).
*   **Progress:** Rollup (Related Tasks -> Percent Checked).
*   **Area:** Select (Marketing, Product, Admin, Sales).
*   **Relation:** Links to *Tasks DB*.

### B. Tasks DB (The Actions)
*   **Name:** Action Item.
*   **Status:** Status (To Do, In Progress, Review, Done).
*   **Due Date:** Date.
*   **Do Date:** Date (When you actually do the work).
*   **Relation:** Links to *Projects DB*.
*   **Context:** Multi-Select (Deep Work, Quick Win, Admin, Call).

### C. Content Calendar DB (The Media Machine)
*   **Headline:** Title.
*   **Channel:** Multi-Select (Newsletter, YouTube, Twitter/X, LinkedIn).
*   **Status:** Status (Idea, Outline, Draft, Edit, Scheduled, Published).
*   **Publish Date:** Date.
*   **URL:** URL.
*   **Asset Link:** Files & Media (Uploads).
*   **Relation:** Links to *Projects DB* (e.g., promotional campaigns).

### D. Smart CRM (The Network)
*   **Name:** Contact Name.
*   **Type:** Select (Lead, Client, Partner, Influence).
*   **Last Contacted:** Date.
*   **Next Touchpoint:** Date.
*   **Value:** Number (Potential Deal Size).
*   **Status:** Select (New, Contacted, Proposal, Closed-Won, Closed-Lost).

---

## 3. The "Golden Thread" Relations
*How the system talks to itself.*

*   **Projects <-> Tasks (Parent-Child)**
    *   *Logic:* A Project is a "Container." A Task is an "Item."
    *   *Property:* In *Tasks DB*, create a Relation property named `Parent Project`. Select *Projects DB*.
    *   *Automation:* When viewing a Project page, create a template that automatically filters a Linked View of *Tasks* to `Parent Project = [Current Page]`. This allows you to manage tasks *inside* the project view.

*   **Projects <-> Content**
    *   *Logic:* Launching a course (Project) requires emails and tweets (Content).
    *   *Property:* In *Content DB*, create a Relation property named `Campaign`. Select *Projects DB*.

---

## 4. Build Sequence Checklist
1.  [ ] Create the 4 Master Databases first as full pages.
2.  [ ] Add the Properties definitions to each.
3.  [ ] Link the Relations (Projects to Tasks is critical).
4.  [ ] Create the "Dashboard" empty page.
5.  [ ] Use `/linked view` to pull the databases into the Dashboard layout.
6.  [ ] Set Filters on the Dashboard views (e.g., "Only show Incomplete Tasks").
7.  [ ] Create "New Project" template with the embedded Task view.
