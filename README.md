# Ultra Shop PRO (Hobby-safe)

A **complex** storefront to study agentic AI vs human behavior:
- Long, image-rich pages with tabs, accordion, lazy-loaded sections.
- **Product Finder** (POST /api/recommend) that unlocks richer details.
- **Add to Cart** (cookie-backed cart) + **Cart Drawer UI**.
- **Product detail** with tabs + **Buy Now** (CSRF via /api/session → POST /api/checkout).
- **Tracking**: `/api/track?ev=pageview|scroll|click|tab|accordion|lazyload|cart-add`.
- **Richer prices**: 30 products at $149–$199 with small differences.

## Serverless functions (11 total, under Hobby limit)
- products, product/[id], session, cart, checkout, status, track, recommend, reviews, newsletter (10)
- util logger (not counted).

## What to look for
- Humans: asset loads `/assets/*.svg`, scroll 25/50/75/100, persistent cookies, referers, back/forth.
- ChatGPT: keyword bursts to `/api/products?q=...`, occasional empty referers, direct POSTs.
- Perplexity: synthetic pageviews without scroll, cookie gaps, linear jumps.

## Deploy
Upload **contents** of this zip (`public/`, `api/`, `package.json`, `README.md`) to your GitHub repo root → Commit → Vercel auto-deploy.
