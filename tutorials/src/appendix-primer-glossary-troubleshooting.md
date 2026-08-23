---
title: "Appendix — Prompting Primer, Glossary, Troubleshooting"
subtitle: "Reference material for after the workshop"
---

# Part 1 — How to talk to the AI (prompting primer)

## The mental model

opencode is a capable assistant sitting at your laptop. It can read your files, write
new ones, run commands — but it cannot read your mind. Everything you would tell a
capable new volunteer, you tell it.

## The five habits

1. **Say who it is for.** "a page for elderly members, big text" beats "a nice page".
2. **One concern per prompt.** Fix the colours first, then the layout, then content.
   Combined mega-prompts produce mushy results.
3. **Point, do not describe from memory.** "the third card on the about page" or paste
   the exact error text verbatim.
4. **Look after every change.** Refresh the browser. Small course corrections beat
   giant rewrites.
5. **It is allowed to disagree.** If a suggestion is unwise, say why: "that needs a paid
   API; find a free approach instead." You are the steward of budget, data and taste.

## Reusable prompt shapes

| Situation | Prompt shape |
|---|---|
| Start anything | Create a minimal [kind of app] in [folder], using [plain HTML / Next.js JavaScript]. Show me it running. |
| Change look | Make [element] more/less [quality]. Keep everything else unchanged. |
| Something broke | [Paste error]. Find the cause, fix it minimally, explain what was wrong in one sentence. |
| Do not understand | Explain what [file/concept] does in plain language, as if I am not a programmer. |
| Before risky steps | Before doing that, list exactly which files you will change. |

> When stuck for ten minutes on the same problem: start fresh. New folder, new
> conversation, re-explain with what you have meanwhile learned. Sunk cost is real.

# Part 2 — Glossary

| Term | Meaning |
|---|---|
| Agent (coding) | A tool where the AI reads/writes files and runs commands itself, asking permission |
| API route | A URL on your site meant for programs, not people (`/api/send`) |
| Cron | A scheduled task; an alarm clock that triggers a URL |
| Deploy | Copying your finished app to hosting so the world can use it |
| DNS | The internet's address book connecting your domain name to servers |
| Environment variable | A secret stored by your host (API keys), referenced by name |
| Git / GitHub | Version history / website storing repositories |
| JSON | Text format for structured data; braces and quotes; machines love it |
| LLM | Large language model — the AI brain behind tools like opencode |
| Model | A specific brain (they differ in skill/speed/cost); names rotate often |
| Repository ("repo") | One project's folder + history on GitHub |
| Serverless function | Your code that runs only when its URL is called, then disappears |
| Sandbox | Provider test mode with limits (e.g., email only to yourself) |

# Part 3 — Troubleshooting A–Z

**Browser shows old version after changes** → hard refresh `Ctrl+Shift+R`.

**`ECONNRESET` / network errors during npm install** → venue Wi-Fi; hotspot fallback.

**Emails never arrive** → check spam; sandbox delivers only to your Resend signup address;
verify `RESEND_API_KEY` spelling in Vercel env vars; check Vercel function logs.

**Free model vanished or refuses** → `/models`, pick another free-tagged model; free lists
rotate monthly. This is normal, not something you broke.

**Git push asks for credentials endlessly** → use the browser popup fully; or create a
Personal Access Token at github.com/settings/tokens and paste when asked for password.

**Port already in use** → another dev server running; close other terminals, or ask
opencode to switch ports.

**Vercel build fails** → copy the error from deploy logs into opencode: fix-minimally loop.

**404 on live site though local worked** → case-sensitive filenames! `Home.jsx` ≠ `home.jsx`.

**Everything is broken and fear sets in** → git is your undo button:
"show me how to see recent changes and restore the last working commit".

# Part 4 — When the free model rotates (survival guide)

1. Run `/models`; choose any entry tagged free; continue mid-project if needed.
2. Keep both Zen and OpenRouter keys connected (T01) — two taps to switch.
3. OpenRouter's ~50 requests/day cap resets daily; pair up on labs to stretch it.
4. For serious ongoing projects, a small top-up (USD 5–10) buys enormous headroom;
   churches typically spend less per year than one printer cartridge.

# Part 5 — Data care quick rules

1. Dummy data while building; real data only in the deployed app.
2. Collect minimum: name, role/team, contact. Nothing more without reason.
3. Parish-owned accounts; passwords in the church password manager.
4. Children's data: leader approval first, always.
5. Leavers removed promptly from rosters and admin access.

# Where to go next

- Rebuild any T02–T05 app alone from scratch — fastest consolidation there is.
- Monthly clinic: bring your half-built thing; leave with it further along.
- Ideas shelf: bulletin translator, RSVP + QR check-in, prayer wall, attendance tracker,
  sermon-notes page. Same skills, same pattern, new prompts.
