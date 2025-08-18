import { logRequest } from './_utils/log.js';
function parseCookie(req){ const c = req.headers['cookie']||''; const o={}; c.split(';').forEach(kv=>{ const [k,v]=kv.trim().split('='); if(k) o[k]=decodeURIComponent(v||'');}); return o; }
function getCart(req){ const c = parseCookie(req)['cart']; if(!c) return {items:[]}; try { return JSON.parse(Buffer.from(c,'base64').toString('utf8')) || {items:[]}; } catch(e){ return {items:[]}; } }
function setCart(res, cart){ const b64 = Buffer.from(JSON.stringify(cart),'utf8').toString('base64'); res.setHeader('Set-Cookie', `cart=${encodeURIComponent(b64)}; Path=/; SameSite=Lax`); }
const PRICES = new Map([[2000,177],[2001,184],[2002,198],[2003,178],[2004,177],[2005,181],[2006,186],[2007,161],[2008,160],[2009,181],[2010,179],[2011,189],[2012,188],[2013,199],[2014,160],[2015,155],[2016,177],[2017,168],[2018,158],[2019,154],[2020,183],[2021,193],[2022,189],[2023,151],[2024,187],[2025,174],[2026,177],[2027,190],[2028,196],[2029,188]]);
const NAMES = new Map([[2000,"Widget"],[2001,"Gizmo"],[2002,"Thingamabob"],[2003,"Doohickey"],[2004,"Whatchamacallit"],[2005,"Doodad"],[2006,"Gadget Pro"],[2007,"Gadget Mini"],[2008,"Gadget Air"],[2009,"Bolt"],[2010,"Spark"],[2011,"Nova"],[2012,"Core"],[2013,"Edge"],[2014,"Pulse"],[2015,"Orbit"],[2016,"Forge"],[2017,"Vibe"],[2018,"Beam"],[2019,"Flux"],[2020,"Halo"],[2021,"Drift"],[2022,"Quark"],[2023,"Mica"],[2024,"Ion"],[2025,"Pico"],[2026,"Arc"],[2027,"Rift"],[2028,"Lumen"],[2029,"Tera"]]);
export default async function handler(req, res){
  const start = Date.now();
  try {
    const url = new URL(req.url, 'http://localhost');
    let cart = getCart(req);
    if(req.method === 'GET'){
      res.status(200).json(cart);
    } else if(req.method === 'POST'){
      const chunks=[]; for await (const ch of req) chunks.push(ch); const bodyStr = Buffer.concat(chunks).toString('utf8')||'{}';
      let body={}; try{ body = JSON.parse(bodyStr);}catch(e){}
      const id = parseInt(body.product_id, 10); const qty = Math.max(1, parseInt(body.qty||'1',10));
      const price = PRICES.get(id) || 0; const name = NAMES.get(id) || ('#'+id);
      const idx = cart.items.findIndex(x=>x.id===id);
      if(idx>=0) cart.items[idx].qty += qty; else cart.items.push({id,name,price,qty});
      setCart(res, cart);
      res.status(200).json({ok:true, cart});
    } else if(req.method === 'DELETE'){
      const id = parseInt(url.searchParams.get('id')||'0',10);
      cart.items = (cart.items||[]).filter(x=>x.id!==id);
      setCart(res, cart);
      res.status(200).json({ok:true, cart});
    } else {
      res.status(405).json({ok:false, error:'Use GET/POST/DELETE'});
    }
  } finally {
    logRequest(req, res, start, { kind:'CART' });
  }
}
