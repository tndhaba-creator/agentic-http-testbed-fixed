import { logRequest } from './_utils/log.js';
function parseCookie(req){ const c = req.headers['cookie']||''; const o={}; c.split(';').forEach(kv=>{ const [k,v]=kv.trim().split('='); if(k) o[k]=decodeURIComponent(v||'');}); return o; }
export default async function handler(req, res) {
  const start = Date.now();
  try {
    if (req.method !== 'POST') { res.status(405).json({ ok:false, error:'Use POST' }); return; }
    const url = new URL(req.url, 'http://localhost');
    const product_id = url.searchParams.get('product_id') || (req.body && req.body.product_id);
    const email = url.searchParams.get('email') || (req.body && req.body.email);
    const cookie = req.headers['cookie'] || '';
    const cookieCsrf = (cookie.match(/(?:^|; )csrf=([^;]+)/)||[])[1] || '';
    const headerCsrf = req.headers['x-csrf'] || '';
    const qsCsrf = url.searchParams.get('csrf') || (req.body && req.body.csrf) || '';
    if (!email) { res.status(400).json({ ok:false, error:'Missing email' }); return; }
    const good = cookieCsrf && (headerCsrf === cookieCsrf || qsCsrf === cookieCsrf);
    if (!good) { res.status(403).json({ ok:false, error:'CSRF required' }); return; }
    // naive success
    const id = 'BK-' + Math.floor(Math.random()*1e6).toString().padStart(6,'0');
    res.status(200).json({ ok:true, id, product_id: product_id||null, email });
  } finally {
    logRequest(req, res, start, { kind:'CHECKOUT' });
  }
}
