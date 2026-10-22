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
cp .env.example .env     # fill in DATABASE_URL, AUTH_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm install
npm run db:migrate       # create tables
npm run db:seed          # load launch content and create the first admin
npm run dev              # http://localhost:3000
```

Without `DATABASE_URL` the public site still builds and renders from the bundled
content in `src/data`; the contact form and admin need a database.

## Backend

- **Database:** Postgres through Prisma (`prisma/schema.prisma`). Products, resources,
  contact messages and admin users live in the database. Activities, meetings and
  milestones stay in `src/data` as page content.
- **Admin:** `/admin` (sign in with an `AdminUser`). Read contact messages, and create,
  edit, hide or delete products and resources. Saving revalidates the public pages.
- **Uploads:** resource files and product images upload to Vercel Blob when
  `BLOB_READ_WRITE_TOKEN` is set (4 MB limit); otherwise paste a file URL.
- **Deploys:** Vercel runs `npm run vercel-build`, which applies pending migrations
  when `DATABASE_URL` is set, then builds.

## Store

- Cart lives in the browser (`localStorage`); checkout re-prices every line from the
  database and redirects to Stripe Checkout. Products with no price show "Coming Soon".
- `POST /api/stripe/webhook` records paid sessions as `Order`s (idempotent) and marks
  refunds. In Stripe, add a webhook for `checkout.session.completed`,
  `checkout.session.async_payment_succeeded` and `charge.refunded`.
- Shipping: set `STRIPE_SHIPPING_RATE_ID` to a Shipping Rate from the Stripe dashboard.
  Tax: set `STRIPE_AUTOMATIC_TAX=true` once Stripe Tax is set up.
- Orders show in `/admin/orders`, where they can be marked fulfilled with notes.
- Local testing: `stripe listen --forward-to localhost:3000/api/stripe/webhook`.

## Email

Contact messages and paid orders send notifications through Resend when
`RESEND_API_KEY`, `EMAIL_FROM` and `NOTIFY_EMAIL` are set; customers also get an order
confirmation. Without them, emails are skipped and everything else still works.

## Social links

Fill in `src/config/site.js`; each link set there shows as an icon in the footer.

Set `NEXT_PUBLIC_SITE_URL` to the production URL so metadata links resolve.
