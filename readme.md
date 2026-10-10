# DK — Sauna And Jacuzzi Website

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
step, custom backend, or Functions directory required for hosting. After connecting GitHub,
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

The ZIP has `index.html`, `request-quote.html` and `quote-thank-you.html` at
its root and includes every stylesheet, script and image. Upload the complete extracted folder, not just the HTML file.

## Branding

- Logo: **DK**, a plain gold text wordmark with no box, border, background,
  padding, or shadow.
- Tagline: **Sauna And Jacuzzi**, shown beneath the logo in the header and
  footer on both mobile and desktop. It is not hidden in the hamburger layout.
- The browser favicon uses the same unboxed DK lettering on a transparent
  background. There is no separate boxed DK badge over the About image.

## Contact details

- **Email:** kajengodavids@gmail.com (`mailto:kajengodavids@gmail.com`)
- **Phone:** 067 216 6641 (`tel:+27672166641`)
- **WhatsApp:** 067 216 6641 (`https://wa.me/27672166641`)

The email and phone links are in the footer. The floating button is the
only WhatsApp link on desktop and mobile; it uses South Africa's country
code, `27`, without the local leading `0`.

### Calls to action

- Desktop navigation: **Get a quote today** opens `request-quote.html`.
- Desktop landing page: **Explore our services** remains the only hero button.
- Mobile (below 860px): **Request quote** appears beside **Explore our services**
  in the hero and opens the same submission form. The quote button is hidden
  from the hamburger menu. Both labels remain complete and can wrap on narrow
  screens so the buttons stay side by side without clipping.
- WhatsApp: only the floating button; there are no WhatsApp links in the
  navigation, hero, service cards, CTA band, or footer.

## Quote form and email delivery

Both quote buttons open **`request-quote.html`**. The client fills in their
name, email, phone, location, required service and project details, then clicks
**Submit quote request**. The form posts directly over HTTPS to
`https://formsubmit.co/kajengodavids@gmail.com`; it does **not** open an email
app. FormSubmit emails the submitted details to **kajengodavids@gmail.com**
after the recipient's form is activated.

- Native browser validation plus phone / trimmed-text validation.
- The single floating WhatsApp button steps out of the way when it would
  cover the form, then reappears once there is space. The homepage is unchanged.
- A pending state prevents accidental duplicate submissions without removing
  field values from the POST. Browser Back restores the fields and enables a
  retry after a verification or network problem.
- FormSubmit's CAPTCHA is enabled and the form includes a honeypot. These help
  reduce spam; they do not guarantee that every unwanted message is blocked.
- FormSubmit manages verification, activation and server errors. Only its
  accepted-submission redirect returns the client to `quote-thank-you.html`;
  the frontend never displays a success message merely because Submit was
  clicked. The thank-you page acknowledges submission, not inbox delivery.
- Client details are sent in the POST body, not in a URL or local storage.
  The form explains that FormSubmit processes the details so DK can respond.
- No passwords, API keys, Cloudflare Functions or environment variables are
  required. An automatic customer-email acknowledgement is not configured.

### First-time activation — owner action required

1. Open **https://dk-site-7q6.pages.dev/request-quote.html** (the stable
   production address, not a changing deployment-preview address).
2. Fill in your own details and a project description such as “Owner activation
   test — please ignore.” Submit and complete any spam-verification step.
3. Open the **kajengodavids@gmail.com** inbox. Find FormSubmit's activation
   email (check Spam/Junk too) and click its activation/confirmation link.
   Do not share mailbox passwords or activation links in chat.
4. Return to the form and send **another test request**. Check that the email
   contains all six client fields. Activation alone is not a delivery test;
   do not rely on the first activation submission being forwarded.
5. Once that test arrives, the form is ready for client submissions. If you
   move to another domain, follow any new activation prompt from FormSubmit.

Use the production address for public links and activation. Immutable
Cloudflare deployment-preview URLs change after each update. The return URL
is set to the current site's thank-you page by `js/quote-form.js`; its static
fallback is the production Cloudflare address. Hosting the ZIP on Netlify
uses the same FormSubmit service and may require activation for that domain.

Frontend tests can mock the provider to check validation, posted fields,
redirects, duplicate protection and error recovery **without sending email**.
Live inbox delivery must be confirmed separately after owner activation.

## Preview

- **In Arena:** use the **Website** live preview.
- **Locally:** open `index.html` in a browser, or serve the folder:
  `python3 -m http.server 8090` then visit `http://localhost:8090`.

## Files

```
dk-website/
├── index.html              # Homepage content & sections
├── request-quote.html      # Client form; native FormSubmit POST
├── quote-thank-you.html    # Provider return / confirmation page
├── css/style.css           # Design system, layout, animations
├── js/main.js              # Nav, scrollspy, reveals, counters, lightbox
├── js/quote-form.js        # Validation, pending/retry state, return URL, year
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
The phone number is displayed as **067 216 6641**. The single floating
WhatsApp link uses `https://wa.me/27672166641?text=...`.
To change it, search & replace `27672166641` (links) and `067 216 6641`
(displayed text) in all three HTML pages.

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
Footer hours / service area: edit `.footer-note` in all three HTML pages.
Facebook page link: edit the `footer-fb` anchor in all three HTML pages
(currently https://www.facebook.com/profile.php?id=61594843325324).

## Accessibility & performance notes

- Semantic landmarks, skip link, visible focus styles, ARIA on nav/lightbox.
- All images lazy-loaded (except hero, which is preloaded); descriptive alt text.
- Animations honour `prefers-reduced-motion`.
- No frameworks or external webfonts. Initial pages load only local assets;
  a quote submission sends details to FormSubmit and opens its verification
  flow. Only the homepage images in view are downloaded.
