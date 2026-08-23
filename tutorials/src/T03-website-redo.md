---
title: "T03 — Redo the Church Website"
subtitle: "From placeholder to a real site your church can be proud of"
---

# Before you prompt: gather your content

Websites fail on content, not code. Spend ten minutes collecting:

| Content | Example |
|---|---|
| Church full name | Grace Community Church |
| One-sentence welcome | "A family of ordinary people following Jesus together." |
| Service/gathering times | Sunday 10:00am · Youth Friday 8pm · Prayer Wednesday 8pm |
| Address + contact | 123 Jalan Harmoni… · hello@… · +60 12-345 6789 |
| 3 things to highlight | Kids ministry, warm welcome, practical teaching |
| A verse for the homepage | Matthew 11:28 |
| Photos (optional today) | 2–5 good photos; phone shots are fine |

> Rule of thumb: if you would not say it to a visitor at the door, do not put it on
> the homepage. Warm, plain, specific.

# Step 1 — Fresh folder, fresh conversation

```powershell
mkdir church-website
cd church-website
opencode
```

# Step 2 — The master prompt

Paste a prompt filled with YOUR content, not the example's:

```
Build a static website for my church using only HTML and CSS files
(index.html, about.html, contact.html, styles.css). No frameworks.

Church: [NAME]. Welcome line: "[YOUR ONE-LINER]".
Gatherings: [LIST TIMES AND NAMES].
Contact: [ADDRESS / EMAIL / PHONE].
Homepage sections: hero with welcome line and two buttons (Plan Your Visit,
About Us); "What to expect" as three cards; gathering-times table; verse box.
About page: our story (2 paragraphs I will paste later — leave clear TODO markers),
what we believe (three cards), mission checklist.
Contact page: details plus a simple form (does not need to send yet).
Design: modern, clean, generous spacing, deep blue + warm orange accents,
large readable text, fully responsive for phones.
```

opencode will create four files. Preview locally (double-click `index.html`), then iterate:

# Step 3 — The refinement round

Look at it like a first-time visitor would, page by page, then prompt fixes:

- "The hero feels cramped; more breathing room and a slightly bigger headline."
- "Add a photo placeholder section above the footer; I will drop real photos in later."
- "On phones the menu should collapse into a hamburger button."
- "Make the gathering-times table easier to scan: bold times."

Keep each prompt about one concern. Small prompts, frequent looks.

[SCREENSHOT: mobile view via browser DevTools device toolbar]

Check mobile properly: press `F12` in your browser, click the little phone icon
(device toolbar), choose iPhone/Pixel preset, and re-inspect every page. Half your
visitors are on phones; this check is non-negotiable.

# Step 4 — Replace placeholders with real content

Two ways; use both freely:

**By prompting:** "Change the About page story to this: …" (paste your paragraphs).

**By hand:** open any file in Notepad/VS Code and edit text directly — HTML is readable.
If you break something, tell opencode what broke; it fixes files it did not write too.

Photos: put image files in an `images` folder, then: "Use images/welcome.jpg as the
hero background with a dark overlay so white text stays readable."

> Only use photos you have rights to (yours, or free-stock sites like unsplash.com).
> Get permission before publishing photos of identifiable people, especially children.

# Step 5 — Deploy for real

This time deploy from GitHub so future updates are one click:

1. Create an empty repository: `https://github.com/new` → name `church-website` → Private is fine → **Create**.
2. Copy the repository URL shown (like `https://github.com/yourname/church-website.git`).
3. In your opencode session (still inside `church-website`):

```
Initialise a git repository here, commit all files, add remote origin [PASTE URL],
and push to main. If authentication opens in a browser, wait for me to approve it.
```

A GitHub login window may pop up — authorise it. opencode handles every git command;
you never need to memorise them.

4. Go to `https://vercel.com/new`, press **Import Git Repository**, pick `church-website`,
   accept defaults, press **Deploy**.
5. Wait ~30 seconds. Your permanent URL appears. Every future `git push` now updates
   the live site automatically — no redeploy clicking ever again.

[SCREENSHOT: vercel project overview showing production deployment]

# Step 6 — Cutover plan when replacing an old site

If your church already has a website:

1. Build new alongside old; share the vercel.app URL internally for feedback first.
2. Buy/keep your domain (e.g. `yourchurch.org`, roughly USD 10/year at Cloudflare or similar).
3. In Vercel: Project → Settings → Domains → add your domain; Vercel shows exactly which DNS records to set at your registrar. DNS changes take up to a day.
4. Keep the old site reachable until the domain points correctly, then archive it (never delete history mid-cutover).

Ask a helper to sit with you for the DNS step — it is fiddly-but-easy with company.

# Homework

- Fill every TODO marker with real copy.
- Add your real photos.
- Show three members and one leader; note what confuses them; fix that.
- Optional stretch prompts: "add a give/thanking page", "add a Google Maps embed on the contact page", "add basic SEO title and description tags per page".

You now run a real website. Next: **T04** teaches the reminder app — same conversation
skill, now with email and automation.
