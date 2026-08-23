# Build Church Tech in a Morning

**A half-day workshop kit that takes church members brand-new to AI from zero to
deployed websites and apps — no programming background required, no budget required.**

## Why this exists

Churches run on volunteers, spreadsheets, and WhatsApp groups. The website is outdated,
the serving roster is chased by hand every week, and the hall gets double-booked.
Professional software exists for all of this — but it costs money, needs maintenance,
and rarely fits how a particular church actually works.

AI coding assistants change who can build. The person who coordinates the altar servers,
or manages the church office, can now *describe* what they need and watch working
software appear — then deploy it to the internet before lunch. Not by learning to code,
but by learning to **direct**: to describe clearly, check carefully, and iterate.

This repository packages everything needed to run that awakening as a single morning:
a facilitator's runbook, verbose step-by-step Word tutorials written for complete
beginners, three working reference apps, and a pre-work checklist. It was designed
around a real workshop for 10–15 participants on their own laptops.

> The goal is not the apps. The goal is the moment a volunteer sees their own live URL
> and realizes: *I built this — imagine what else our church could have.*

## The philosophy

- **Free forever, or clearly marked.** opencode + free-tier AI models (opencode Zen /
  OpenRouter) + Vercel Hobby + Resend free tier + Supabase free tier. Where free tiers
  have limits (Vercel cron = once daily, Resend sandbox = your own email), the tutorials
  teach around them honestly rather than pretending.
- **Stewardship over cleverness.** Parish-owned accounts so apps survive volunteer
  turnover. Dummy data in AI prompts, real data only in deployed apps. Safeguarding
  first where children are involved.
- **Everyone ships.** Lab design guarantees every participant deploys something real
  within the first hour — momentum beats completeness.
- **Maintenance belongs to normal humans.** The roster is a JSON file editable in the
  GitHub web interface; deploys happen automatically. No developer required after the day.

## Who it serves

| Persona | Their win |
|---|---|
| Pastor / decision-maker | Sees what's possible; sets governance (privacy, accounts, safeguarding) |
| Parish secretary | Rebuilds the church website herself |
| Ministry / roster coordinator | Never chases availability in WhatsApp again |
| Tech-curious young adult | Becomes the named maintainer; takes on the booking app |

## The morning

| Time | Segment |
|---|---|
| 0:00 | Live demo of three finished apps (the hook) |
| 0:15 | Setup party — accounts, installs (pre-done at home via checklist) |
| 0:45 | Lab 0 · first win: prompt → page → live URL |
| 1:30 | Lab 1 · redo the church website |
| 2:30 | Lab 2 · serving-team email reminders (on-demand + daily cron) |
| 3:20 | Lab 3 · facility booking speedrun (take-home tutorial) |
| 3:50 | Governance, next steps, community |

## What's in the repository

| Path | What it is |
|---|---|
| `tutorials/*.docx` | **The deliverables** — verbose Word tutorials, ready to print/share |
| `tutorials/src/*.md` | Markdown sources (edit these, regenerate the .docx) |
| `checklist/prework-checklist.docx` | One-pager sent to participants one week before |
| `examples/website` | Demo 1: static church website (plain HTML/CSS, zero build) |
| `examples/reminder-app` | Demo 2: serving-schedule email reminders (Next.js + Resend + cron) |
| `examples/facility-booking` | Demo 3: room booking requests + office approval (Next.js + Supabase) |
| `tools/gen_docx.py` | Regenerates .docx from the markdown sources |

Tutorial map: **T00** facilitator runbook · **T01** setup guide · **T02** first-win lab ·
**T03** website redo · **T04** reminder app · **T05** facility booking (take-home) ·
**Appendix** prompting primer, glossary, troubleshooting, model-rotation survival guide.

## Running your own workshop

1. Read `tutorials/T00-facilitator-runbook.docx` fully — preparation timeline, helper
   briefing, failure playbook, follow-up cadence.
2. Send `checklist/prework-checklist.docx` one week ahead; recruit ~1 helper per 6 participants.
3. Re-check free-model availability (`opencode` → `/models`) days before — free models
   rotate; T01 documents the backup path.
4. Insert your own screenshots where tutorials show `[SCREENSHOT: ...]` placeholders.

All three example apps deploy free: the website via drag-and-drop at vercel.com/new;
the two Next.js apps via GitHub import (env vars documented in each app's README).

## For developers

Regenerate Word docs after editing any markdown source:

```powershell
uv run --with python-docx python tools/gen_docx.py tutorials/src/T04-reminder-app.md tutorials/T04-reminder-app.docx
```

Verified status: all examples pass `npm install && npm run build` on Node v24; the
reminder app is smoke-tested end-to-end (correct Asia/Kuala_Lumpur date computation,
demo-mode sending); all eight .docx validated programmatically.

## Adapting this

Everything here is written to be stolen: rename the church, swap the use cases, translate
the tutorials, shorten it to two hours. If you run a version of this workshop for your
community, you are using it correctly. Materials are offered freely for church and
community use.
