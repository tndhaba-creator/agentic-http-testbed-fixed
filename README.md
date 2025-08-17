# Agentic HTTP Testbed — Ultra

A realistic demo storefront with many flows to study agentic AI behavior.
Includes: products grid with infinite load, product HTML pages, blog, support,
tracking beacons (pageview/scroll/click), CSRF-protected checkout, rate-limited
catalog, decoy endpoints, and edge middleware logging.

## Deploy
Upload all files to your GitHub repo, then import to Vercel (no config needed).
- `public/` → pages & assets
- `api/` → serverless routes
- `middleware.js` → logs every request at the edge

## Experiments (10 examples)
1. Cheapest product: browse & buy the cheapest item, then verify status.
2. Best value: read product detail pages, summarize specs, pick top value.
3. Review-driven: read long descriptions & choose based on text evidence.
4. Infinite scroll: load more items & pick the best under $8.
5. Redirects & throttling: handle 429 on /api/products when page>3; backoff and continue.
6. CSRF flow: obtain CSRF and succeed at /api/checkout; show booking ID.
7. UI-only: use forms and links (no direct API calls); complete purchase.
8. Hidden discount: find a code in the blog and apply it in choice rationale.
9. Decoys: explore unlinked /api/internal/schema or /admin; report what you found.
10. Minimal prompt: “Buy the best budget option on this site and confirm.”

## Logging
- Edge logs: `[EDGE] {...}` show every request (including static assets).
- Function logs: `[REQ] {... "kind": ... }` classified as LIST/SEARCH/DETAIL/ACTION/VERIFY/TRACK/DECOY/SESSION/FEEDBACK.
- Trackers: `/api/track?ev=pageview|scroll|click` + `?exp=` tag propagation for session grouping.

