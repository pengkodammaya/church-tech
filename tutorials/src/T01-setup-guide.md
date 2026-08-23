---
title: "T01 — Setup Guide"
subtitle: "Accounts and tools you need before the workshop · do this at home"
---

# What you are installing, and why

Four things, none of which cost money:

| Thing | What it is | Analogy |
|---|---|---|
| Node.js | A runner for JavaScript programs on your laptop | The kitchen |
| opencode | An AI assistant that lives in your terminal and writes/edits code for you | The chef |
| Free AI model (via opencode Zen or OpenRouter) | The "brain" that does the thinking | The recipe knowledge |
| Accounts: GitHub + Vercel (+ Resend later) | Where code is stored, where websites are hosted, where emails are sent from | The dining room and address |

You will type commands into **PowerShell** — the black/blue text window on Windows.
To open it: press Start, type `powershell`, press Enter.

> Tip: copy-paste every command exactly as written. Typing errors in commands are the
> number one cause of setup frustration.

# Step 1 — Create your accounts

Do these in your browser. If your church has a tech/team email address, use it — apps
should outlive any one volunteer. Otherwise use your own email; you can share access later.

## 1.1 GitHub account (stores your code)

1. Go to `https://github.com/signup`.
2. Sign up with your email. Choose a username you will not be embarrassed by — it appears in your website addresses.
3. Verify your email when the message arrives.

## 1.2 Vercel account (hosts your websites)

1. Go to `https://vercel.com/signup`.
2. Choose **Continue with GitHub** and authorise. This lets Vercel read repositories you ask it to deploy.
3. On the plan question choose **Hobby** (free). It is intended for personal, non-commercial projects — right for church use.

## 1.3 AI model keys

You will set up **two** ways to get a free model. The first is the main one; the second is the backup.

**Primary — OpenCode Zen (built into opencode):**

1. Go to `https://opencode.ai/auth` and create an account with your email.
2. Copy the API key shown (a long string starting with something like `sk-...`). Keep this tab open; you will paste it in Step 3.
3. No credit card is needed. Models tagged "free" rotate over time — that is normal.

**Backup — OpenRouter:**

1. Go to `https://openrouter.ai` and sign up (email or Google).
2. Go to Keys page: `https://openrouter.ai/settings/keys`, press **Create Key**, name it `workshop`, copy it, store it somewhere safe.
3. Note the free limits: about 50 requests per day per account (20 per minute). Enough for today's labs if you also have Zen working. You do NOT need to add money.

[SCREENSHOT: OpenRouter API keys page showing a created key named workshop]

# Step 2 — Install Node.js

1. Go to `https://nodejs.org` and download the **LTS** version for Windows.
2. Run the installer. Accept defaults all the way through. Nothing here needs changing.
3. Close any open PowerShell windows (important — they only pick up new software on startup), then open a fresh PowerShell and run:

```powershell
node --version
npm --version
```

Expected output (numbers may be newer):

```
v22.x.x
10.x.x
```

If you see version numbers, continue. If PowerShell says "not recognized", restart the computer and try again; still failing? Ask a helper at the workshop.

# Step 3 — Install opencode

In PowerShell:

```powershell
npm install -g opencode-ai
```

Wait for it to finish (one or two minutes), then verify:

```powershell
opencode --version
```

Expected output: a version number like `x.y.z`.

## Connect your primary model key

Still in PowerShell:

```powershell
opencode auth login
```

1. A list of providers appears. Select **OpenCode** (this is Zen).
2. Paste the API key you copied from `opencode.ai/auth` and press Enter. Pasting shows nothing — that is normal; just press Enter again.

Then connect the backup too:

```powershell
opencode auth login
```

This time select **OpenRouter** from the list and paste your OpenRouter key.

[SCREENSHOT: opencode auth list showing both providers configured]

## Confirm a free model answers

1. Make an empty folder and start opencode inside it:

```powershell
mkdir hello-church
cd hello-church
opencode
```

2. Press `/` and type `models`, press Enter — browse the model list. Pick any model whose name includes **free** (or use the default suggested). Model names change often; any free-tagged model works for this workshop.
3. At the prompt, type: `Say hello and tell me which model you are.` and press Enter.
4. Within seconds you should see a friendly reply naming the model.

[SCREENSHOT: opencode conversation showing a reply from a free model]

Exit opencode by pressing `Ctrl+C` twice, or typing `/exit`.

> If no free model responds: switch provider with `/models` (choose an OpenRouter entry),
> or check Troubleshooting below. Bring both keys with you regardless — redundancy wins.

# Troubleshooting

| Problem | Fix |
|---|---|
| `opencode : File C:\...\npm\opencode.ps1 cannot be loaded because running scripts is disabled` | Run: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`, answer Y, open a new terminal, retry |
| `npm ERR! network` during installs | Wi-Fi/proxy blocking. Try phone hotspot |
| Auth login provider list has no "OpenCode" | Update first: `npm install -g opencode-ai@latest`, retry |
| Free model gives errors mid-conversation | `/models` → pick a different free model; free capacity varies through the day |
| Anything else unresolved | Do not panic-bring a broken laptop silently: message the organiser tonight. We will pair you up |

# What to bring on the day

- [ ] Laptop, charged, plus charger
- [ ] Both API keys accessible (email them to yourself)
- [ ] GitHub + Vercel passwords (or logged-in browser sessions)
- [ ] Rough content for your church website: church name, service times, address, a verse you like, 1–2 sentences of welcome text
