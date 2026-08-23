# Server Reminder App — reference implementation

Next.js (JavaScript) app that reminds serving teams by email about their schedule.
Used as the reference implementation for Workshop Tutorial T04.

## How it works

- `data/roster.json` — the schedule. Edit this file to add or change who serves when.
- `/api/send` — on-demand: called by the "Send tomorrow's reminders now" button on the dashboard.
- `/api/cron` — automated: triggered once per day by Vercel Cron (`vercel.json`,
  scheduled at 10:00 UTC ≈ 6pm Malaysia time). Protected with `CRON_SECRET`.
- `lib/schedule.js` — computes "tomorrow" in the roster's timezone (Vercel cron is UTC-only).
- `lib/email.js` — sends via Resend. Without `RESEND_API_KEY` it runs in demo mode
  and reports what it *would* send.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | for live email | Resend API key |
| `REMINDER_FROM_EMAIL` | optional | From address; defaults to Resend's sandbox sender |
| `CRON_SECRET` | recommended | Protects `/api/cron`; set in Vercel, used automatically by Vercel Cron |

## Run locally

```powershell
npm install
npm run dev
```

Open http://localhost:3000 and press the button. In demo mode you'll see exactly
what would be emailed.

## Deploy

Push to GitHub, import in Vercel, add environment variables, done. The cron in
`vercel.json` deploys automatically. Note: Vercel Hobby plan runs crons once per day,
firing at some point within that hour (UTC) — which is why date logic lives in app code.
