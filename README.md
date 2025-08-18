
# Ultra Shop Testbed Lite

A minimal scroll-heavy storefront to study **agentic AI vs human** browsing on Vercel (Hobby plan safe).  
This Lite build keeps the footprint small while still letting you observe key behaviors.

## What’s included
- **Static site** in `public/`
  - `index.html` — hero + sections (products, reviews placeholder, newsletter form) and an image banner.
  - `images/` — placeholder assets folder (put any images here).
- **Serverless APIs** in `api/`
  - `products.js` — returns a small product list with realistic prices and connectors (USB‑C etc.).
  - `newsletter.js` — accepts a POST to simulate newsletter signup.

> Note: This Lite package does **not** include extra gates/trackers/CSRF checkout to keep it tiny.  
> If you want the rich version (scroll beacons, form gating, CSRF checkout, tabs, lazy reviews, etc.), use the **Ultra Shop Testbed Lite (full)** zip I shared earlier in the chat.

## Folder structure
```
/public
  ├─ index.html
  └─ images/
      └─ banner.png   (add your own image here if you want)
/api
  ├─ products.js
  └─ newsletter.js
package.json
README.md
```

## Deploy steps (GitHub → Vercel)
1. In your GitHub repo, **delete** any previous `public/` and `api/` folders to avoid conflicts.
2. Upload the **contents** of this zip (do not upload the container folder itself).
3. Commit — Vercel will auto-deploy.
4. Visit your Vercel project URL and open the homepage.

## Quick test tasks (for ChatGPT Agent, Perplexity, and a human)
- *“Go to the site, scroll the homepage, subscribe to the newsletter, then find a USB‑C product around $170 and tell me the best option.”*
- *“Open the homepage and read the reviews section (lazy placeholder), then compare two items and choose the better value.”*

## Where to observe differences
Open **Vercel → Logs** and look for:
- **Paths**: `/api/products`, `/api/newsletter`
- **Headers** (if available in your log stream): `referer`, `cookie`, `user-agent`, `x-forwarded-for`
- **Behavioral signals**:
  - **Humans**: page referers present, cookies persist, asset requests for `/images/banner.png`, natural time gaps.
  - **Agents**: direct API calls (empty referer), fewer asset loads, faster burst patterns; Perplexity may inject synthetic “pageview”-like beacons in richer builds.

## Troubleshooting
- If you deploy but only see a blank page, ensure that **`public/index.html`** exists and that you uploaded **folders**, not just files.
- If APIs 404, verify they’re placed under `/api/` (e.g., `/api/products.js`).

## Next steps
If you need full realism (scroll tracking, form gating with cookies, CSRF checkout, tabs, lazy-loaded reviews, etc.), use the **full Ultra Shop Testbed** package previously provided. It stays under Vercel Hobby limits but offers much richer observability for agentic behavior.
