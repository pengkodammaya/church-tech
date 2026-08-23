---
title: "T04 — Serving-Team Reminder App"
subtitle: "Schedule data + automatic email + a daily alarm clock · the coordinator's favourite tool"
---

# What you are building

A small website with three jobs:

1. **Show** the serving schedule on one clean page.
2. **Send** email reminders for tomorrow's schedule — either by pressing a button, or automatically once a day.
3. **Stay simple**: the schedule lives in one editable file (`roster.json`), not a database.

```
data/roster.json ──▶ the app reads tomorrow's entries
                          │
             button press │ or daily cron knock
                          ▼
                   Resend emails each person their role
```

## Four concepts, two minutes total

| Concept | Plain words |
|---|---|
| API route | A private door behind your website that programs can knock on (`/api/send`) |
| Cron job | An alarm clock; when it rings, it knocks on an API route for you |
| Environment variable | A secret (like an email password) stored by Vercel, never written into the site itself |
| Demo mode | No key configured? The app reports what it *would* send instead of sending |

> Safety rule, twice for emphasis: use **dummy names and emails** while building.
> Real contact details of congregation members never go into AI conversations — only
> into the finished, deployed file.

# Step 1 — Scaffold the app

```powershell
mkdir reminder-app
cd reminder-app
opencode
```

Prompt:

```
Create a minimal Next.js app in JavaScript (not TypeScript) in this folder,
using the App Router. It will be a serving-schedule reminder app.
For now just make it build and show a heading "Serving Schedule".
Then run the dev server so I can check it at localhost:3000.
```

opencode creates files, installs packages, starts the dev server. Open
`http://localhost:3000` and confirm the heading.

[SCREENSHOT: bare Next.js page showing Serving Schedule heading]

# Step 2 — The schedule file

```
Create a folder data with a file roster.json containing:
a timezone field set to Asia/Kuala_Lumpur, and 6 sample entries spread over
the next week. Each entry has: date (YYYY-MM-DD), service, time (24h),
role, name, email. Use obviously fake names like Alex Sample.
Roles to use: Usher, Welcome Desk, AV/Media, Kids Ministry, Refreshments.
```

Open `data/roster.json` and read it. This is *your* file now — the whole point is that
a normal person can edit it without touching any other part of the app.

# Step 3 — The dashboard page

```
Replace the home page with a dashboard that:
- shows today's date and the timezone-aware date for tomorrow
- lists all upcoming entries sorted by date and time, grouped nicely in a table
- highlights tomorrow's entries in a separate panel at the top
Compute "tomorrow" using the roster timezone with Intl.DateTimeFormat,
NOT server time, because hosting clocks run in UTC.
Style it cleanly: white cards on light background, blue headings, orange accent.
```

Refresh `localhost:3000`. You should see your sample people, with tomorrow's panel on top.

> Why the fuss about timezones? Vercel's daily alarm fires sometime within a chosen
> hour in **UTC**. So the app must decide "what day is it in MY country" itself.
> This one prompt line saves you the classic 3am-emails bug.

[SCREENSHOT: dashboard showing tomorrow panel and upcoming table]

# Step 4 — Email sending (Resend)

## 4.1 Get your key

1. Sign up at `https://resend.com` (free tier: about 100 emails/day).
2. Dashboard → **API Keys** → Create API Key → copy it.

> Sandbox rule: until you verify a domain, Resend only delivers to **the email address
> you signed up with**. Perfect for class — nobody gets spammed. Production churches add
> their domain later (Domains → Add domain → paste DNS records).

3. In PowerShell (stop the dev server first with Ctrl+C), create your local secrets file:

```powershell
Copy-Item .env.example .env.local   # if opencode made one; else ask it to
```

or simply tell opencode: "create .env.local with RESEND_API_KEY= and REMINDER_FROM_EMAIL=
placeholders". Then paste your real key into `.env.local`. It is git-ignored — double-check
with opencode that `.env.local` is listed in `.gitignore`.

## 4.2 Teach the app to send

```
Add a lib/email.js that uses the resend npm package. One function:
given tomorrow's entries, group them per person (one email per person even with
two roles), and send a friendly HTML email titled with the gathering name and date,
listing role and time in a small table. If RESEND_API_KEY is missing, do NOT error:
return mode "demo" listing who WOULD be emailed.
```

Restart the dev server (`npm run dev`). Test by asking opencode to call the function
for tomorrow's entries — watch the terminal report demo mode.

# Step 5 — The on-demand button (API route + UI)

```
Create POST route app/api/send/route.js that loads the roster, finds tomorrow's
entries in roster timezone, sends via lib/email.js, returns JSON summary.
Then put a big button on the dashboard labelled "Send tomorrow's reminders now"
that calls /api/send and shows the JSON result below the button.
```

Press it. With no key: a JSON summary saying demo. Put your real Resend key in
`.env.local`, restart, press again — then check YOUR OWN signup inbox (sandbox rule).
Seeing that first real email land is reliably the best moment of the workshop.

[SCREENSHOT: JSON result showing sent status + received email]

> Sending to teammates' real addresses fails silently-ish in sandbox mode. That is
> Resend protecting strangers from us. Domain verification flips it after the workshop.

# Step 6 — The daily alarm (cron)

```
Create GET route app/api/cron/route.js running the same logic as /api/send,
but protected: if process.env.CRON_SECRET exists, require header
Authorization: Bearer <secret>, else return 401 Unauthorized.
Create vercel.json scheduling /api/cron at "0 10 * * *" with a comment-free config.
```

Why 10:00? Cron runs in UTC. Malaysia is UTC+8, so 10:00 UTC ≈ 6pm local — evening
before, prime WhatsApp-checking hour. (Vercel Hobby may fire anywhere within that hour;
the app's own timezone logic makes that harmless.)

Vercel automatically attaches your `CRON_SECRET` as that Bearer header once the
variable exists. Nobody else can ring your doorbell.

# Step 7 — Local test without waiting a day

You will not wait 24 hours to learn whether the alarm works:

1. Ask opencode: "how do I call /api/cron locally with curl including the secret?" and follow its answer, or temporarily test `/api/send` which shares logic.
2. Confirm the response JSON lists the right people.

The button tests the logic; the cron only adds *when*. Logic proven + schedule configured = working system.

# Step 8 — Deploy

Same flow as T03:

1. New repo at `github.com/new` named `reminder-app`; copy URL.
2. Tell opencode: "git init, commit all, push to [URL] on main."
3. `vercel.com/new` → Import → Deploy. First deploy takes a minute (it builds Next.js).
4. Before testing production: Project → Settings → **Environment Variables**, add:
   - `RESEND_API_KEY` — your real key
   - `REMINDER_FROM_EMAIL` — leave unset for sandbox (default sender), or your domain address later
   - `CRON_SECRET` — any long random string (opencode can generate one)
5. Redeploy (Deployments tab → Redeploy) so new variables take effect.
6. Visit your live URL, press the button, receive your email.
7. Vercel project → **Cron Jobs** tab: your job listed with next-run time. Logs confirm each fire.

[SCREENSHOT: Vercel environment variables screen]

# Step 9 — Handover: weekly operation for a normal human

The magic trick for coordinators: **edit the roster on the GitHub website, no tools needed**:

1. Open your repo on github.com → `data/roster.json` → pencil icon ✏️.
2. Type the new week's lines (copy an existing line's shape exactly — commas matter).
3. Commit changes → Vercel redeploys automatically ~30 seconds later. Done.

That is the whole maintenance story: one file, edited in a browser, deployed by robots.

# Privacy and stewardship checklist

- [ ] Roster contains only what recipients already know: name, role, date. Nothing sensitive.
- [ ] Recipients can reply to reach a human; mention the coordinator in the email footer.
- [ ] Accounts registered under parish-owned email where possible.
- [ ] Remove leavers promptly; the schedule is personal data under privacy law basics.

# Stretch goals (after the workshop)

- **Availability replies**: link in email → tiny form → responses appended to a Google Sheet.
- **Telegram version**: same logic, free bot messages instead of email.
- **WhatsApp**: possible but needs a paid provider or Meta business verification — a documented upgrade path, not a weekend task.
- **Two crons**: one at midday for same-week summary digest.

Next take-home: **T05 — facility booking**.
