# angelsimcha.com

Personal site for Angel Simcha. Plain HTML, CSS and JavaScript. No build step.

## Run locally (VS Code)

1. Open this folder in VS Code.
2. Install the "Live Server" extension.
3. Right-click `index.html` and choose "Open with Live Server".

## Deploy

Commit and push to the `main` branch on GitHub. Vercel picks it up automatically.

```
git add .
git commit -m "describe the change"
git push
```

## Where things live

| To change | Edit |
| --- | --- |
| Nav links, footer, social links, email | `site.js` (top of the file) |
| Colours and fonts | `style.css` (`:root` block at the top) |
| Gallery photos and captions | `gallery-data.js`, photos go in `images/gallery/` |
| Press kit headshots | `images/press/` |
| Work card photos | `images/work/` (hammet.jpg, operators-corner.jpg, lace.jpg) |
| Page text | the matching `.html` file |

## Adding a gallery photo

1. Save the image in `images/gallery/` (JPG, around 1600px wide, under 500 KB is ideal).
2. Add a line in `gallery-data.js`:
   `{ src: "images/gallery/my-photo.jpg", cat: "speaking", caption: "What is happening" }`
3. `cat` is one of: speaking, leadership, team, events.

If an image file is missing, a coloured placeholder tile shows instead, so the site never looks broken.

## Contact form

Submits to Formspree (`https://formspree.io/f/meevbank`) and redirects to `contact-success.html`.

## Logos

Drop logo files into `images/logos/` with these exact names (PNG, transparent background works best, at least 800px wide):
`hammet.png`, `operators-corner.png`, `lace.png`.
Until a file is added, the card shows the name as text, so nothing breaks.

Also add these when you have them (each card falls back to a letter tile until then):
`kingdom-pathways.png`, `daniel-nation.png`, `eliora.png` (square, about 256px or larger).

## Clean URLs

`vercel.json` turns on clean URLs, so angelsimcha.com/work.html opens as angelsimcha.com/work and index.html redirects to the bare domain. This only applies on Vercel. When you preview locally by opening files, you will still see .html.
