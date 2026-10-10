# DK — Sauna & Hot-Tub Studio Website

Static, dependency-free site (HTML + CSS + vanilla JS). Mobile-first, accessible, fast.

## Deploy to Cloudflare Pages

The complete site is on the `arena/e3ed20da-dk-site` branch. Connect
`bratwinjones/DK-Site` through **Workers & Pages > Create application > Pages >
Connect to Git**, select the `dk-site` project name, and use these settings:

| Setting | Value |
| --- | --- |
| Production branch | `arena/e3ed20da-dk-site` |
| Framework preset | `None` |
| Build command | `exit 0` |
| Build output directory | `.` |
| Root directory | Leave empty |
| Environment variables | None needed |

Copy only the value in each field. The output directory is exactly one dot;
do not include explanatory text or quotation marks.

`wrangler.toml` sets `pages_build_output_dir` to the repository root and is the
source of truth for that setting during Pages deployments. There is no build
step, backend, or Functions directory required. After connecting GitHub,
pushes to the production branch trigger automatic deployments.

If a deployment fails with **build output directory not found**, check the
output-directory value and that Cloudflare is deploying the updated branch.
Wait for a successful deployment before testing its Pages address or attaching
a custom domain.

## Deploy to Netlify

1. Download `DK-Site-Netlify.zip` and extract it into a folder.
2. In Netlify, choose a manual deploy (or open https://app.netlify.com/drop).
3. Drag in the extracted folder containing `index.html`, `css`, `js`, and `assets`.
   For an existing site, use its **Deploys** page to upload the folder.
4. No build command, package installation, or backend is needed.

The ZIP has `index.html` at its root and includes every stylesheet, script,
and image. Upload the complete extracted folder, not just the HTML file.

## Contact details

- **Email:** kajengodavids@gmail.com (`mailto:kajengodavids@gmail.com`)
- **Phone:** 067 216 6641 (`tel:+27672166641`)
- **WhatsApp:** 067 216 6641 (`https://wa.me/27672166641`)

The email and phone links are in the footer. All WhatsApp buttons, service
links, metadata, and accessibility labels use the updated number. WhatsApp
links use South Africa's country code, `27`, without the local leading `0`.

## Preview

- **In Arena:** use the **Website** live preview.
- **Locally:** open `index.html` in a browser, or serve the folder:
  `python3 -m http.server 8090` then visit `http://localhost:8090`.

## Files

```
dk-website/
├── index.html              # All content & sections
├── css/style.css           # Design system, layout, animations
├── js/main.js              # Nav, scrollspy, reveals, counters, lightbox
└── assets/img/
    ├── hero-sauna.jpg          # Hero background (1920w)
    ├── about-spa.jpg           # About section image
    ├── cta-golden-hour.jpg     # Mid-page CTA band background
    └── gallery/
        ├── thumbs/g01–g17.jpg  # Gallery grid images (800w, lazy-loaded)
        └── full/g01–g17.jpg    # Lightbox images (max 1600w)
```

All photography is real DK project work (Cape Town & Western Cape), except
`assets/img/services/hot-tub-installation.jpg`, which is a placeholder until a
real hot-tub photo is supplied (see the `HOT-TUB CARD IMAGE` comment in
`index.html`).

## Editing guide

### WhatsApp number
Displayed everywhere as **067 216 6641**; all links use the international
format: `https://wa.me/27672166641?text=...`.
To change it, search & replace `27672166641` (links) and `067 216 6641`
(displayed text) in `index.html`.

### Services
Each service is one `<article class="card">` block in `index.html`
(markered with the comment `SERVICE CARDS`). Edit the `<h3>`, `<p>` and the
inline SVG icon; copy an entire `<article>` to add another card. The grid
adjusts automatically (1 → 2 → 3 columns).

### Gallery
Each image is one `<figure>` in the `#galleryGrid` block. To use real photos:
1. Drop your files into `assets/img/gallery/thumbs/` and `.../full/`
   (keep the same file names), **or**
2. Edit the `src` (thumbnail), `data-full` (lightbox image) and
   `<figcaption>` / `alt` text of any `<figure>`.
The grid is responsive: 1 → 2 → 3 → 4 columns.

### About text & stats
Paragraphs live under the `ABOUT TEXT` comment. Stats animate from 0 to the
value of each `data-count` attribute.

### Colours & type
All tokens are CSS custom properties at the top of `css/style.css`
(`--gold`, `--paper`, `--dark`, `--wa`, fonts, radii, shadows).

### Business details
Footer hours / service area: edit `.footer-note` in `index.html`.
Facebook page link: edit the `footer-fb` anchor in `index.html`
(currently https://www.facebook.com/profile.php?id=61594843325324).

## Accessibility & performance notes

- Semantic landmarks, skip link, visible focus styles, ARIA on nav/lightbox.
- All images lazy-loaded (except hero, which is preloaded); descriptive alt text.
- Animations honour `prefers-reduced-motion`.
- No frameworks, no webfonts, no external requests — whole page ≈ 100 KB of
  code + only the images in view are downloaded.
