# Launch checklist

Everything here is configuration or client content; the code for each item is in place.

## 1. Merge
- [ ] Merge PRs in order: #1 (UI) → #2 (backend) → #3 (store) → #4 (SEO) → #5 (remove admin). Or merge the combined `release/complete` branch. Each targets the previous branch, so retarget to `main` as you go or merge the top one after the others.

## 2. Vercel environment variables (Production and Preview)
- [ ] `NEXT_PUBLIC_SITE_URL`: the final domain, e.g. `https://spandisaster.org`
- [ ] `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`: webhook to `/api/stripe/webhook` for `checkout.session.completed` and `checkout.session.async_payment_succeeded`
- [ ] `STRIPE_SHIPPING_RATE_ID` (optional), `STRIPE_AUTOMATIC_TAX=true` once Stripe Tax is set up
- [ ] `RESEND_API_KEY`, `EMAIL_FROM` (verified domain), `NOTIFY_EMAIL`: needed for the contact form and order emails

## 3. Content from the client
- [ ] Logo (replaces the placeholder "+" mark in header, footer, favicon `src/app/icon.svg` and OG image)
- [ ] Product prices, shipping and tax decisions, then set `price` (dollars) in `src/data/products.js`
- [ ] Resource files and video links, added in `src/data/resources.js` (set `placeholder: false`), files in `/public`
- [ ] Community Preparedness document and page (in the agreement's scope, not in the Base44 design yet)
- [ ] Legal page text: privacy, terms, accessibility, shipping & returns
- [ ] Contact email and social media URLs in `src/config/site.js`
- [ ] Replace AI-generated images hosted on `media.base44.com` with final photos in `/public`

## 4. Go live
- [ ] Add the custom domain in Vercel and point DNS
- [ ] Switch Stripe to live keys and re-create the webhook in live mode
- [ ] Place one real test order, then refund it from Stripe
- [ ] Submit `https://<domain>/sitemap.xml` to Google Search Console and Bing Webmaster Tools
