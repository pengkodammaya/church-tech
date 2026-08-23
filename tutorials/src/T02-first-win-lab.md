---
title: "T02 — Lab 0: Your First Win"
subtitle: "Prompt an AI, build a page, deploy it to the internet — in 45 minutes"
---

# The idea

You are going to have a conversation. You describe what you want; opencode writes the
files; you look at the result and describe what to change. That loop — **describe →
look → refine** — is the entire skill this workshop teaches. Everything after this lab
is just longer conversations about bigger things.

You will build a small "welcome" page for your church and deploy it so anyone in the
world can visit it.

# Step 1 — Create your project folder

Open PowerShell (Start → type `powershell`). Keep every project in its own folder:

```powershell
mkdir my-first-site
cd my-first-site
```

# Step 2 — Start opencode

```powershell
opencode
```

If it asks which model, pick one tagged free. You are now looking at the conversation
prompt — this is where all the work happens today.

[SCREENSHOT: fresh opencode session]

# Step 3 — First prompt

Type this (or something like it in your own words):

```
Create a single web page called index.html with a matching styles.css file.
It is a warm welcome page for Grace Community Church: big friendly headline,
service time Sunday 10am, address line, and a Bible verse at the bottom.
Modern clean design, works well on phones.
```

opencode will show you the files it creates and commands it runs, asking before acting.
Approve its actions. In under a minute you will have two files.

> Watch what it does. You do not need to understand the code — but noticing that it
> *created files* and *ran nothing dangerous* builds correct instincts fast.

# Step 4 — Look at it

Either double-click `index.html` in File Explorer, or ask opencode to preview properly:

```
Run a local preview server for me on port 3000 and tell me the address.
```

Then open the printed address (`http://localhost:3000`) in your browser.

[SCREENSHOT: first version of the welcome page in browser]

# Step 5 — Refine by describing

Now practise the loop. Try these one at a time, checking the browser after each:

```
Make the headline colour deep blue and add more spacing around sections.
```

```
Add a section called "What to expect" with three cards: Worship, Kids, Coffee.
```

```
The verse should be Matthew 11:28. Put it in italic inside a light box.
```

Each prompt is specific. Compare with vague ones ("make it nicer") — specific gets
specific. If opencode ever does something you dislike, say exactly what is wrong:
"The two columns overlap on small screens; stack them vertically instead."

# Step 6 — Deploy: put it on the real internet

For a plain HTML site like this one, Vercel needs zero configuration:

1. Go to `https://vercel.com/new` in your browser (logged in from T01).
2. Scroll to the drag-and-drop area. Drag your `my-first-site` folder from File Explorer onto it.
3. Vercel uploads, thinks briefly, then shows **Congratulations** with your live URL — something like `https://my-first-site.vercel.app`.
4. Click the URL. It is on the internet. Open it on your phone.

[SCREENSHOT: vercel.com/new deployment success screen with URL]

> Free-tier notes: Hobby plan is for personal/non-commercial use and gives generous
> bandwidth no church site will exhaust. Custom domains come later (T03 appendix).

# Step 7 — Update a deployed site

Change something ("add a contact phone number to the footer"), check locally, then
re-deploy: drag the folder onto `vercel.com/new` again and confirm. Same URL, new content.
Deployment takes seconds. This edit-and-redeploy rhythm becomes second nature quickly.

# Checkpoint

Before moving on you should have:

- [ ] A project folder with index.html + styles.css created entirely by prompts
- [ ] A public URL that opens on your phone
- [ ] At least three refinement prompts behind you

Show your URL to a neighbour. Notice their reaction. That reaction is why churches
need you doing this.

# If something went wrong

| Problem | Fix |
|---|---|
| Page looks unstyled (plain text) | styles.css missing or misnamed — tell opencode: "the CSS is not loading, check the link tag and filename" |
| Vercel shows build error | For plain HTML this is rare; re-drag the whole folder, not a zip |
| opencode froze mid-task | Press Ctrl+C twice, run `opencode` again, continue the conversation: "continue where you left off" |

Next: **T03**, where this toy page grows into your church's actual website.
