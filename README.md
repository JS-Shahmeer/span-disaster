# SPAN Disaster Services website

Next.js site for SPAN Disaster Services, built by Optimal IT Solutions.

## Stack

- Next.js 15 (App Router), React 19
- Tailwind CSS 3 with the SPAN design tokens in `src/app/globals.css`
- UI ported from the Base44 prototype (app `6acfc11b88787a633a2cb9f6`)

## Structure

- `src/app/` routes, layout and per-page metadata
- `src/views/` page bodies ported from the Base44 pages
- `src/components/` header, footer, home sections and shared UI
- `src/data/` site content (activities, meetings, milestones, products, resources)

## Development

```bash
cp .env.example .env     # Stripe and Resend keys are optional locally
npm install
npm run dev              # http://localhost:3000
```

## Content

There is no database or admin panel. Products and resources are edited in
`src/data/products.js` and `src/data/resources.js` (files go in `/public`), then
committed and deployed. Orders live in the Stripe dashboard.

## Store

- Cart lives in the browser (`localStorage`); checkout re-prices every line from
  `src/data/products.js` and redirects to Stripe Checkout. Products with no price show "Coming Soon".
- `POST /api/stripe/webhook` emails the order to `NOTIFY_EMAIL` and a confirmation to
  the customer. In Stripe, add a webhook for `checkout.session.completed` and
  `checkout.session.async_payment_succeeded`.
- Shipping: set `STRIPE_SHIPPING_RATE_ID` to a Shipping Rate from the Stripe dashboard.
  Tax: set `STRIPE_AUTOMATIC_TAX=true` once Stripe Tax is set up.
- Orders, refunds and customer details are managed in the Stripe dashboard (Payments).
- Local testing: `stripe listen --forward-to localhost:3000/api/stripe/webhook`.

## Email

Contact messages and paid orders send notifications through Resend when
`RESEND_API_KEY`, `EMAIL_FROM` and `NOTIFY_EMAIL` are set; customers also get an order
confirmation. The contact form needs these to deliver messages; without them it asks
visitors to email instead.

## Social links

Fill in `src/config/site.js`; each link set there shows as an icon in the footer.

Set `NEXT_PUBLIC_SITE_URL` to the production URL so metadata links resolve.
