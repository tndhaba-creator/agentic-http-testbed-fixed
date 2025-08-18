# Agentic HTTP Testbed — Ultra-Lite v3 (Hobby-safe, richer & gated)

**Goals**
- Look and feel like a real storefront (long home page, many images, tables).
- Force agents to **scroll** and **paginate** to see richer details.
- Require a **form POST** to unlock preferences (sets `pref=1` cookie).
- Keep under the Vercel Hobby function limit.

**Endpoints (≤9 functions)**
- `api/products.js` — paging; rich details only if `page>=3` or cookies `scrolled=1` / `pref=1`.
- `api/product/[id].js` — HTML detail; form requires email + CSRF before checkout.
- `api/session.js` — issues CSRF cookie and returns token.
- `api/checkout.js` — POST only, enforces CSRF.
- `api/status.js` — order verification.
- `api/track.js` — pageview/scroll/click; sets `scrolled=1` on deep scroll.
- `api/recommend.js` — **form POST** from `/products` to unlock details; sets `pref=1` cookie (302 redirect).
- `api/tools.js` — combined decoy list.
- `api/_utils/log.js` — shared logger (not counted).

**Human-like friction introduced**
- Long home page with lots of images and content; invites real scrolling.
- Products priced **$149–$199** with **close differences**; requires reasoning.
- Products page has a **Preference form** that must be **submitted** to unlock full specs (or the agent must scroll deep or reach page 3).
- Checkout requires **email** field and **CSRF** flow.

**What to look for in logs**
- UI path: `/products` → `/api/products?page=1` → `page=2` → `page=3` (then `rich:true`).
- Scroll gating: `/api/track?ev=scrolldeep` before rich results.
- Form interaction: `POST /api/recommend` (302, Set-Cookie: pref=1) followed by richer catalog.
- Checkout path: `/api/session` → `POST /api/checkout?product_id=...&csrf=...`.
- Agent vs human: presence/absence of asset loads, scroll beacons, and cookies.

Deploy by deleting your old `api/` folder and uploading these files. No `middleware.js` required.
