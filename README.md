# Build Church Tech in a Morning

A half-day workshop that takes church members brand-new to AI from zero to deployed
websites and apps — using opencode with free AI models and free hosting.

## What is in this repository

| Path | What it is |
|---|---|
| `tutorials/*.docx` | **The deliverables** — verbose Word tutorials, ready to print/share |
| `tutorials/src/*.md` | Markdown sources for the tutorials (edit these, then regenerate) |
| `checklist/prework-checklist.docx` | One-pager sent to participants one week before |
| `examples/website` | Demo 1: static church website (HTML/CSS, zero build) |
| `examples/reminder-app` | Demo 2: serving-schedule email reminders (Next.js + Resend + cron) |
| `examples/facility-booking` | Demo 3: room booking requests + office approval (Next.js + Supabase) |
| `tools/gen_docx.py` | Regenerates .docx from the markdown sources |

## Tutorial map

| Doc | Audience | Used |
|---|---|---|
| T00 Facilitator runbook | You + helpers | before the day |
| T01 Setup guide | everyone | pre-work at home |
| T02 First-win lab | everyone | 0:45 lab |
| T03 Website redo | everyone (Maria persona) | 1:30 lab |
| T04 Reminder app | guided build (John persona) | 2:30 lab + homework |
| T05 Facility booking | speedrun + take-home (Wei Ming persona) | 3:20 lab |
| Appendix | everyone | reference after the day |

## Regenerating the Word documents

After editing any `tutorials/src/*.md` or `checklist/*.md`:

```powershell
uv run --with python-docx python tools/gen_docx.py tutorials/src/T04-reminder-app.md tutorials/T04-reminder-app.docx
```

The generator supports headings, tables, code blocks, bullets, numbered steps,
checkboxes, blockquote notes, `[SCREENSHOT: ...]` placeholders, cover page, auto-TOC
(Word prompts to update fields on open — choose Yes), and page-number footers.

## Verified status

- All three example apps: `npm install` + `npm run build` pass on Node v24.
- Reminder app smoke-tested end-to-end: correct Asia/Kuala_Lumpur "tomorrow" computed,
  three recipients found, demo-mode JSON reported without sending.
- All eight .docx files open cleanly (validated programmatically).

## Before you facilitate

1. Read T00 fully; rehearse the 3:20 booking speedrun twice.
2. Re-check free-model availability (`opencode` → `/models`) a few days prior and update T01's model names if rotated.
3. Send `checklist/prework-checklist.docx` one week ahead.
4. Insert your own screenshots where tutorials show `[SCREENSHOT: ...]` placeholders.
