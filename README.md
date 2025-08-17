# Agentic HTTP Testbed (Vercel)

Minimal site to observe agentic AI traffic:
- Pages: `/`, `/docs`, `/products`
- APIs: `/api/search`, `/api/book` (POST), `/api/status`
- Decoys: `/openapi.json`, `/api/tools/list`
- Logs: printed to Vercel Logs with method, URL, status, UA, referer, header order, duration.

## Deploy
1) Create a new GitHub repo and push these files.
2) Go to Vercel → "New Project" → import the repo → Deploy.
3) Grab the public URL (e.g., `https://your-project.vercel.app`).

## Run experiments
Prompt an agent (ChatGPT/Perplexity/Claude):
> Start at https://your-project.vercel.app . Find the cheapest product via /api/search, book it with /api/book, then verify using /api/status. If needed, check /openapi.json. Return the booking ID.

## Inspect logs
Vercel Project → Deployments → "View Functions Logs".
Look for lines starting with `[REQ]` and analyze:
- Loop motif (TOOL → ACTION → VERIFY)
- Decoy hits (`kind: DECOY`)
- Header name order stability
- Timing variance (duration_ms)
