# Facility Booking — reference implementation

Next.js (JavaScript) + Supabase app for requesting and approving church facility
bookings. Used as the reference implementation for Workshop Tutorial T05 (take-home).

## How it works

- Public page (`/`): pick a room and date, see which slots are free/taken/pending,
  submit a request (stored as `pending`).
- Office page (`/admin`): enter the admin passcode, review pending requests,
  approve or reject them.
- Conflict check: the API rejects a request if the same room/date/slot already has a
  pending or approved booking.
- All database access happens server-side in API routes using the Supabase service key.
  The service key is never exposed to the browser.

## Setup

1. Create a free project at supabase.com.
2. Open SQL Editor, paste `schema.sql`, run it.
3. Copy `.env.example` to `.env.local` and fill in:
   - `SUPABASE_URL` — Project Settings > API > Project URL
   - `SUPABASE_SERVICE_KEY` — Project Settings > API > service_role key (server-side only!)
   - `ADMIN_PASSCODE` — anything long and random, for the office page

```powershell
npm install
npm run dev
```

## Deploy

Push to GitHub, import in Vercel, add the same three environment variables.

## Known MVP limitations (documented in Tutorial T05)

- Passcode auth is deliberately simple — replace with real accounts before serious use.
- No email notifications on approve/reject yet — good stretch exercise with Resend.
- Slots are fixed 2-hour blocks defined in `lib/rooms.js`.
