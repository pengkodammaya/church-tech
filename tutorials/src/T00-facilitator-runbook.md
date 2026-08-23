---
title: "T00 — Facilitator Runbook"
subtitle: "Build Church Tech in a Morning · half-day AI workshop for complete beginners"
---

# About this runbook

This document is for **you, the facilitator**. It contains the full run sheet, the
live-demo script, helper briefings, a failure playbook, and follow-up actions. The
participant-facing materials are separate documents (T01–T05 plus the pre-work
checklist). Read this runbook fully at least three days before the workshop.

## Workshop identity

| Item | Value |
|---|---|
| Title | Build Church Tech in a Morning |
| Audience | 10–15 church members, brand new to AI tools, bringing their own Windows laptops |
| Duration | 4 hours including one 15-minute break |
| Promise | Every participant leaves with a live website they built and deployed themselves |
| Stretch | A working reminder app and an understanding of how to build anything else |

## Learning outcomes

By the end of the morning, every participant can:

1. Explain in one sentence what an AI coding agent does ("it writes and runs the code for me").
2. Install and use opencode with a free AI model.
3. Deploy a website to a public URL on Vercel.
4. Describe how the reminder app works (schedule data + email + daily automation).
5. Know where to continue learning after today.

# Preparation timeline

## Four weeks out

- Confirm venue, date, Wi-Fi capacity (15+ devices), power strips, projector with HDMI.
- Recruit 2 helpers for 10 participants (ratio 1:5–1:8). Helpers should complete T01 themselves beforehand — they are your first-line troubleshooters.
- Send the invitation. Set the expectation in the invite: "bring a laptop, we will build and deploy a real website in the first hour."
- Collect registrations with two questions: laptop operating system, and whether they can install software on it (company/locked machines are a known blocker).

## One week out

- Send the **pre-work checklist** (see `checklist/prework-checklist.docx`) with a firm deadline of "before you arrive". Participants who arrive unprepared lose 45 minutes; protect them from that.
- Walk through T01 yourself on a clean machine or user account. Time it. Fix anything stale.
- Re-test the free-model situation: run `opencode`, press `/models`, confirm at least one model tagged free works end-to-end (create files, run commands). Free models rotate; if yours vanished, update T01's model name and note the backup.
- Prepare your demo machine: completed copies of all three example apps (`examples/` folder), logged into Vercel and GitHub, Resend key set up in demo mode.

## Day before

- Test venue Wi-Fi: connect a laptop, run `npm --version` in a terminal, load vercel.com, github.com, opencode.ai. If there is a captive portal or proxy, plan for phone-hotspot fallback.
- Charge laptop, pack HDMI adapter, print 3 copies of the run sheet for helpers.
- Stage the room: seats in pairs (pair-programming for stuck moments), projector tested.

# Run sheet with speaker notes

## 0:00–0:15 — Welcome and the hook

**Goal:** make them *want* it before you teach anything technical.

Open with the demo, not with slides. Show these three things live, in under 10 minutes:

1. **The finished website** (`examples/website`). Open it from your Vercel URL on your phone AND the projector so they see it is real and mobile-friendly. Say: "This took 20 minutes and costs nothing per month."
2. **The reminder dashboard** (`examples/reminder-app`). Press the send button, then show the email arriving in your inbox. Let the suspense sit for five seconds while it loads. Say: "Every Friday evening, this emails everyone serving on Sunday — automatically. No more chasing people in WhatsApp groups."
3. **The booking page** (`examples/facility-booking`). Request a slot, switch to admin, approve it. Say: "No more paper forms and double-booked halls."

Then the one-slide framing:

> Today is not about becoming a programmer. Today is about learning to *direct* an AI assistant that programs for you. You describe what the church needs. It types the code. You check, you decide, you deploy.

Set expectations honestly: some things will fail today (that is normal even for professionals); helpers are here; nobody leaves without a deployed website.

## 0:15–0:45 — Setup party (T01)

**Goal:** everyone reaches a working `opencode` prompt with a free model answering.

This is the highest-risk segment. Participants work through Tutorial T01. Helpers circulate continuously. Announce every few minutes which step *most* people should be at, so laggards self-calibrate.

Facilitator moves: at 0:30, take stock by show of hands — "Who has opencode installed? Who has a model responding?" Dispatch helpers to raised hands. If someone is fundamentally blocked (admin rights, broken Node), pair them with a neighbour: two people, one laptop, both still learn. Never let anyone sit alone stuck for more than five minutes.

## 0:45–1:30 — Lab 0: first win (T02)

**Goal:** every participant deploys a page to a real URL.

Demo each phase first on the projector, then release them to do it: prompt → preview → refine → drag-folder-to-Vercel → live URL. At 1:20 ask everyone to open their URL on their phone and hold it up — the "phone wave" moment. Photograph it; churches love this for the announcement slide.

## 1:30–2:15 — Lab 1: redo the church website (T03)

Maria-persona home turf. They rebuild using real-ish church content, iterate design by prompting, check mobile view, redeploy. Fast finishers add extra pages or a photo gallery section. Close the lab by showing 3 participant sites on the projector (ask permission first).

## 2:15–2:30 — Break

Keep it to 15 minutes strictly. Play upbeat music; the room energy drop after a break is real.

## 2:30–3:20 — Lab 2: reminder app (T04)

John-persona territory. This lab is guided-build: you drive the big screen, they mirror on their laptops step by step. Concepts to land explicitly (two minutes each, no more):

- An API route = a private mailbox behind your website that automation can knock on.
- A cron job = an alarm clock that knocks on that mailbox once a day.
- Environment variables = secrets stored by the hosting company, never typed into the website itself.
- Demo mode = the app tells you what it *would* email, so we never spam real people during class.

Everyone uses dummy names throughout. Say the safety rule out loud twice this session: **"Never paste real contact details of congregation members into an AI tool."**

Not everyone will finish. That is fine and pre-planned: finishing is T04 homework; the tutorial is written for solo completion.

## 3:20–3:50 — Lab 3: facility booking speedrun (T05)

You build it live from blank folder to booking request in ~12 minutes (script below), narrating prompts. Fast finishers follow along on their laptops; others watch and ask questions. Then hand out T05 as the take-home tutorial.

Speedrun script: create folder → scaffold prompt → rooms/slots prompt → Supabase mention → schema.sql into Supabase SQL editor (pre-opened tab) → env vars → book a slot → approve in admin. Rehearse this speedrun twice before the day; it must be smooth.

## 3:50–4:00 — Governance and sending them out

Three minutes on stewardship (this lands well with pastors and admins alike):

- **Accounts belong to the church.** Use a parish email address (e.g. `tech@yourchurch.org`) for GitHub/Vercel/Resend so apps survive volunteer turnover. Record passwords in the church password manager.
- **Data care.** Dummy data in AI prompts; real rosters only in the deployed app. Comply with personal-data law basics: collect minimum, protect access, delete when asked.
- **Safeguarding.** Anything involving children's data gets leader approval first. Always.

Then next steps: WhatsApp/follow-up group, monthly build-clinic (same room, first Saturday), and assigning one maintainer per app built today. End on time. Ending late is remembered longer than ending early.

# Failure playbook

Print this table for helpers.

| Symptom | Likely cause | Fix |
|---|---|---|
| `npm : command not found` / not recognized | Node not installed or terminal opened before install | Restart terminal; if still missing, reinstall Node LTS from nodejs.org |
| `npm install` hangs or ECONN errors | Venue Wi-Fi blocking registry | Switch to phone hotspot; retry |
| `opencode` command not found after install | PATH not refreshed | Open a NEW terminal window; if still failing, `npm i -g opencode-ai` again and read output |
| Model responds slowly or times out | Free-tier congestion | Wait 30s, resend; or switch model via `/models` to another free-tagged model |
| Rate limit error (429) on OpenRouter | 50 requests/day free cap | Switch to Zen free model; if exhausted, pair up with a neighbour for remaining labs |
| Vercel deploy fails on Next.js app | Usually a typo introduced by hand-editing | Ask opencode: "the deploy failed with this error: …" and paste error |
| Resend email not received | Sandbox mode sends only to your own account email | Send to the address you signed up with; production needs a verified domain |
| Cron did not fire | Hobby crons fire within the hour, UTC-only | Check Vercel logs; verify `CRON_SECRET` set; test manually with the button |
| Laptop cannot install software | Locked-down machine | Pair programming; or browser-only participation for Labs 0–1 |

# Post-workshop follow-up

- Same evening: post the photo of the phone-wave, links to everyone's sites, and the tutorials in the group chat.
- Week 1: check-in message; troubleshoot homework stragglers.
- Week 4: first monthly clinic. Agenda: show-and-tell, then co-working.
- Ongoing: maintain a simple register — which app, who maintains it, parish email account used, where credentials live.
