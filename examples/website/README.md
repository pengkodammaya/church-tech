# Grace Community Church — demo website

Static website (HTML + CSS only, no build step) used as the reference implementation
for Workshop Tutorial T03 "Redo the Church Website". Deployable to Vercel with zero
configuration.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Landing page: hero, what to expect, service times, verse of the day |
| `about.html` | Story, beliefs, mission |
| `contact.html` | Contact details + placeholder form |
| `styles.css` | Single shared stylesheet (CSS variables for the colour theme) |

## Run locally

Just open `index.html` in a browser. Or serve it:

```powershell
npx serve .
```

## Deploy

Drag-and-drop this folder at vercel.com/new, or:

```powershell
npx vercel --prod
```

## Customising

- Church name: search and replace "Grace Community Church" in all HTML files.
- Colours: edit the CSS variables at the top of `styles.css`.
- All names, emails, and phone numbers are fictional placeholders.
