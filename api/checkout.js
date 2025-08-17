import { logRequest } from './_utils/log.js';

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

    if (!product_id || !email) { res.status(400).json({ ok:false, error:'Missing product_id or email' }); return; }

    // require CSRF: either header matches cookie, or query/body matches cookie
    const good = cookieCsrf && (headerCsrf === cookieCsrf || qsCsrf === cookieCsrf);
    if (!good) { res.status(403).json({ ok:false, error:'CSRF required' }); return; }

    const id = 'BK-' + Math.floor(Math.random()*1e6).toString().padStart(6,'0');
    res.status(200).json({ ok:true, id, product_id, email });
  } finally {
    logRequest(req, res, start, { kind:'ACTION' });
  }
}
