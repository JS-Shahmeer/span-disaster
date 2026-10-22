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
npm install
npm run dev     # http://localhost:3000
npm run build
```

Set `NEXT_PUBLIC_SITE_URL` to the production URL so metadata links resolve.
