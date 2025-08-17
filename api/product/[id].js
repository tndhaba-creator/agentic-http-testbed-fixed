import { logRequest } from '../_utils/log.js';

const DB = {
  "101": { id:101, name:"Widget", price:9, desc:"Premium finish and excellent support. Great for presentations.", specs:["Aluminum body","2-year warranty","USB-C"] },
  "202": { id:202, name:"Gizmo", price:7, desc:"Reliable daily driver with balanced features.", specs:["Polymer shell","1-year warranty","USB-A"] },
  "303": { id:303, name:"Thingamabob", price:5, desc:"Compact helper with surprising power. Best budget choice.", specs:["ABS housing","6-month warranty","Micro-USB"] }
};

export default async function handler(req, res) {
  const start = Date.now();
  try {
    const id = req.query?.id || (req.url.split('/').pop());
    const item = DB[id];
    if (!item) {
      res.status(404).send('<h1>Not Found</h1>');
      return;
    }
    const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><title>${item.name} — Details</title><link rel="stylesheet" href="/assets/styles.css"/></head>
<body data-page="product-${item.id}">
<header><div class="container"><nav><a href="/">Home</a><a href="/products">Products</a><a href="/docs">Docs</a></nav></div></header>
<main class="container">
  <div class="card">
    <h2>${item.name}</h2>
    <p>${item.desc}</p>
    <ul>${item.specs.map(s=>`<li>${s}</li>`).join('')}</ul>
    <p class="price">$${item.price}</p>
    <form action="/api/book" method="post">
      <input type="hidden" name="product_id" value="${item.id}"/>
      <input type="hidden" name="email" value="webform@testbed.local"/>
      <button type="submit">Buy now</button>
    </form>
  </div>
</main>
<footer class="container"><small class="muted">© Acme Gadgets</small></footer>
<script src="/assets/app.js"></script>
</body>
</html>`;
    res.setHeader('Content-Type','text/html; charset=utf-8');
    res.status(200).send(html);
  } finally {
    logRequest(req, res, start, { kind: 'DETAIL' });
  }
}
