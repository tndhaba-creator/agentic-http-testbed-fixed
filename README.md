# Agentic HTTP Testbed — Ultra-Lite v2 (Hobby-safe)

- Looks/feels like a normal shop (images, pages, blog).
- Catalog `/api/products` supports paging. Page 1–2 returns minimal info; Page ≥3 (or a deep scroll beacon) returns **richer details**.
- Product pages served via serverless HTML `/api/product/[id]`.
- Checkout with **CSRF**: `/api/session` issues cookie, `/api/checkout` enforces it.
- Trackers: `/api/track` records pageview/scroll/click and sets `scrolled=1` cookie on deep scroll.
- Combined decoy endpoint `/api/tools`.
- **No middleware.js** to avoid Next-only edge errors and stay Hobby-friendly.

## Function count (≤ 8 total)
api/products.js
api/product/[id].js
api/session.js
api/checkout.js
api/status.js
api/track.js
api/tools.js
api/_utils/log.js (utility only, not counted)

## Experiments this enables
1) UI paging: must call `/api/products?page=2` and `/api/products?page=3` to see full set.
2) Scroll gating: rich details appear only after deep scroll (via `/api/track?ev=scrolldeep` cookie).
3) CSRF flow: `/api/session` prior to `/api/checkout`.
4) Coverage vs. sampling: agents that enumerate all items will fetch page 1→2→3 and all detail pages.
5) Human vs. agent: watch for scroll beacons and cookie presence differences.

