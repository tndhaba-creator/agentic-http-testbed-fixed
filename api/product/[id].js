import { logRequest } from '../_utils/log.js';

const DB = {
  "101": { id:101, name:"Widget", price:9, desc:"Premium finish and excellent support.", specs:["Aluminum body","2-year warranty","USB-C"] },
  "202": { id:202, name:"Gizmo", price:7, desc:"Reliable daily driver with balanced features.", specs:["Polymer shell","1-year warranty","USB-A"] },
  "303": { id:303, name:"Thingamabob", price:5, desc:"Compact helper with surprising power.", specs:["ABS housing","6-month warranty","Micro-USB"] },
  "404": { id:404, name:"Doohickey", price:11, desc:"Sturdy build and long warranty.", specs:["Steel frame","3-year warranty","USB-C"] },
  "505": { id:505, name:"Whatchamacallit", price:6, desc:"Lightweight and travel-friendly.", specs:["ABS","1-year warranty","USB-C"] },
  "606": { id:606, name:"Doodad", price:8, desc:"Solid performance for daily tasks.", specs:["Aluminum","1-year warranty","USB-A"] },
  "707": { id:707, name:"Gadget Pro", price:13, desc:"Top-tier build, premium support.", specs:["Magnesium","3-year warranty","USB-C"] },
  "808": { id:808, name:"Gadget Mini", price:4, desc:"Ultra budget with minimal features.", specs:["Plastic","3-month warranty","Micro-USB"] },
  "909": { id:909, name:"Gadget Air", price:10, desc:"Slim profile, mid-tier specs.", specs:["Aluminum","2-year warranty","USB-C"] },
  "1001": { id:1001, name:"Gizmo X", price:12, desc:"Extended battery life.", specs:["Aluminum","2-year warranty","USB-C"] },
  "1002": { id:1002, name:"Widget Lite", price:6, desc:"Lightweight version of Widget.", specs:["Plastic","6-month warranty","USB-C"] },
  "1003": { id:1003, name:"Pro Mini", price:7, desc:"Compact pro features.", specs:["Magnesium","1-year warranty","USB-A"] }
};

export default async function handler(req, res) {
  const start = Date.now();
  try {
    const id = req.query?.id || (req.url.split('/').pop());
    const item = DB[id];
    if (!item) { res.status(404).send('<h1>Not Found</h1>'); return; }
    const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"/><title>${item.name} — Acme</title><link rel="stylesheet" href="/assets/styles.css"/></head>
<body data-page="product-${item.id}">
<header><div class="container"><nav><a href="/">Home</a><a href="/products">Products</a><a href="/blog">Blog</a><a href="/about">About</a><a href="/support">Support</a></nav></div></header>
<main class="container">
  <div class="card">
    <h2>${item.name}</h2>
    <p>${item.desc}</p>
    <ul>${item.specs.map(s=>`<li>${s}</li>`).join('')}</ul>
    <p class="price">$${item.price}</p>
    <form id="buy" action="/api/checkout" method="post">
      <input type="hidden" name="product_id" value="${item.id}"/>
      <input type="hidden" name="email" value="webform@testbed.local"/>
      <input type="hidden" id="csrf" name="csrf" value=""/>
      <button type="submit" disabled>Buy now</button>
    </form>
    <p class="small">A CSRF token is required and will be filled automatically.</p>
  </div>
</main>
<footer class="container"><span class="small">© Acme Gadgets</span></footer>
<script src="/assets/app.js"></script>
<script>
(async function(){
  try {
    const res = await fetch('/api/session');
    const data = await res.json();
    document.getElementById('csrf').value = data.csrf || '';
    document.querySelector('#buy button').disabled = false;
  } catch(e){}
})();
</script>
</body></html>`;
    res.setHeader('Content-Type','text/html; charset=utf-8');
    res.status(200).send(html);
  } finally {
    logRequest(req, res, start, { kind:'DETAIL' });
  }
}
