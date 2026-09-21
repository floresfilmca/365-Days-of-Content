# Drywall365 — Landing Page

Landing page for the **365-Day Content System for Drywall Contractors**. Plain HTML/CSS/JS, no build step, no framework — deploys straight to Vercel from GitHub.

## Before you deploy — 3 things to change

1. **Domain.** Every canonical URL, Open Graph tag, and the sitemap currently use `https://www.drywall365.com/`. If you buy a different domain, find-and-replace that string across `index.html`, `terms.html`, `privacy.html`, `robots.txt`, and `sitemap.xml`.
2. **Checkout link.** In `index.html`, the buy button has:
   ```html
   <a href="#" id="checkout-link" data-checkout-url="REPLACE_WITH_LEMON_SQUEEZY_CHECKOUT_URL">
   ```
   Once your Lemon Squeezy product is approved and live, replace `REPLACE_WITH_LEMON_SQUEEZY_CHECKOUT_URL` with your real checkout link (`main.js` picks it up automatically).
3. **Price.** The page currently shows $27 (crossed-out $47 as an anchor price). Update the numbers in `index.html` under `#pricing` and in the Product JSON-LD block in `<head>` if you change your price.

## Regenerating icons / OG image

`gen_assets.py` generates `images/favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, and `images/og-image.png` from scratch using Pillow. Re-run it any time you want to tweak the colors or headline baked into those images:

```bash
pip install pillow
python3 gen_assets.py
```

## Deploying — GitHub + Vercel

### 1. Push this folder to GitHub

```bash
cd drywall365-landing
git init
git add .
git commit -m "Initial landing page"
git branch -M main
git remote add origin https://github.com/<your-username>/drywall365-landing.git
git push -u origin main
```

(Create the empty repo on GitHub first — github.com/new — then use the URL it gives you.)

### 2. Import into Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account.
2. Click **Add New → Project**.
3. Select the `drywall365-landing` repository.
4. Framework preset: choose **Other** (this is plain static HTML — no build command, no output directory needed).
5. Click **Deploy**. Vercel gives you a live URL like `drywall365-landing.vercel.app` within about a minute.

### 3. Connect your custom domain

1. Buy your domain (Namecheap, Google Domains/Squarespace, Cloudflare, etc.) if you haven't already.
2. In the Vercel project, go to **Settings → Domains** and add your domain (e.g. `drywall365.com` and `www.drywall365.com`).
3. Vercel shows you DNS records to add (usually an `A` record for the root domain and a `CNAME` for `www`). Add those in your domain registrar's DNS settings.
4. Wait for DNS to propagate (minutes to a few hours) — Vercel automatically issues a free SSL certificate once it's verified.

### 4. After every future edit

Just `git add .`, `git commit`, `git push` — Vercel redeploys automatically on every push to `main`. No manual redeploy step.

## SEO checklist already handled

- `robots.txt` and `sitemap.xml` at the domain root
- Canonical URL tag on every page
- Full Open Graph + Twitter Card tags (with a real 1200×630 share image)
- `Product`, `Organization`, and `FAQPage` JSON-LD structured data (the FAQ can show up as a rich result in Google)
- Semantic HTML (`header`, `main`, `section`, `footer`, one `h1` per page, descriptive `h2`s)
- Mobile-first responsive layout, no horizontal scroll
- Fast by default: no framework/JS bundle, system + Google Fonts only, images are small generated PNGs — should score well on Core Web Vitals (LCP/INP/CLS) out of the box
- Custom `404.html`
- `site.webmanifest` for add-to-home-screen support

**Still worth doing once the site is live:**
- Submit the sitemap in [Google Search Console](https://search.google.com/search-console) and Bing Webmaster Tools
- Request indexing for the homepage
- Add real customer testimonials once you have them (see the `TODO` comment in `index.html` near `.testimonials-placeholder` — never publish fabricated reviews)
- Consider a blog/content section later for ongoing organic traffic (separate from this single LP)

## File structure

```
drywall365-landing/
├── index.html          # the landing page
├── terms.html
├── privacy.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── vercel.json          # security headers + caching rules
├── gen_assets.py         # regenerates favicons + OG image
├── css/styles.css
├── js/main.js
└── images/
    ├── favicon.ico
    ├── favicon-16x16.png
    ├── favicon-32x32.png
    ├── apple-touch-icon.png
    └── og-image.png
```
