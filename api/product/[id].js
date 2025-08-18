import { logRequest } from '../_utils/log.js';
export default async function handler(req, res) {
  const start = Date.now();
  try {
    const id = req.query?.id || (req.url.split('/').pop());
    const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"/><title>Product ${id} — Ultra Shop PRO</title><link rel="stylesheet" href="/assets/styles.css"/></head>
<body data-page="product-${id}">
<header><div class="container"><nav><a href="/">Home</a><a href="/products">Products</a><a href="/guides">Guides</a><a href="/about">About</a><a href="/support">Support</a><button id="open-cart" class="primary">Cart</button></nav></div></header>
<main class="container">
  <div class="card">
    <h2>Product #${id}</h2>
    <div class="tabs">
      <button data-tab="specs" class="active" data-track="tab-specs">Specs</button>
      <button data-tab="reviews" data-track="tab-reviews">Reviews</button>
    </div>
    <div id="specs" class="tabpanel active"><p>Specs are derived from price and ID; compare warranty & port on the product list view.</p></div>
    <div id="reviews" class="tabpanel"><div class="lazy" data-src="/api/reviews?section=product&id=${id}">Loading…</div></div>
    <div class="section">
      <button class="primary" onclick="window.addToCart(${id})" data-track="add-detail-${id}">Add to cart</button>
      <form id="buy" action="/api/checkout" method="post" class="card" style="margin-top:12px">
        <label>Email <input type="email" name="email" placeholder="you@example.com" required/></label>
        <input type="hidden" name="product_id" value="${id}"/>
        <input type="hidden" id="csrf" name="csrf" value=""/>
        <button type="submit" disabled data-track="checkout-submit">Buy now</button>
      </form>
      <p class="small">A CSRF token is required and will be filled automatically.</p>
    </div>
  </div>
</main>
<footer class="container"><span class="small">© 2025 Ultra Shop PRO</span></footer>
<script src="/assets/app.js"></script>
<script>
(async function(){{
  try {{
    const res = await fetch('/api/session'); const data = await res.json();
    document.getElementById('csrf').value = data.csrf || '';
    document.querySelector('#buy button').disabled = false;
  }} catch(e){{}}
}})();
</script>
</body></html>`;
    res.setHeader('Content-Type','text/html; charset=utf-8');
    res.status(200).send(html);
  } finally {
    logRequest(req, res, start, { kind:'DETAIL' });
  }
}
