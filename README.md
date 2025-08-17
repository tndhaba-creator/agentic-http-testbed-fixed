# Agentic HTTP Testbed — Pro

A more realistic demo shop to observe agentic AI traffic.

## What's included
- **Pages**: `/`, `/docs`, `/products` (static HTML with CSS/JS)
- **Product detail pages**: `/api/product/101`, `/202`, `/303` (HTML from serverless)
- **APIs**:
  - `GET /api/products` (list/search/paginate)
  - `GET /api/search` (alias)
  - `POST /api/book?product_id=...&email=...` (logs `csrf_present`)
  - `GET /api/status?id=...`
  - `GET /api/tools/list` and `GET /api/tools/describe_schema` (decoys)
  - `GET /api/echo?pg=...` (beacon)
- **OpenAPI**: `/openapi.json`
- **Robots & Sitemap**: `/robots.txt`, `/sitemap.xml`

## Deploy
Upload all files to GitHub (same repo), commit, and let Vercel redeploy.

## Experiments
Use natural prompts like:
- "Browse this site and find the cheapest product. Summarize why it's best and buy it."
- "Start from the homepage, use docs or schema if needed, purchase the budget option, and verify the order."
