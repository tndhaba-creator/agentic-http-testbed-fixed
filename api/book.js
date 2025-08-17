import { logRequest } from './_utils/log.js';

export default async function handler(req, res) {
  const start = Date.now();
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ ok: false, error: 'Use POST' });
      return;
    }
    const url = new URL(req.url, 'http://localhost');
    const product_id = url.searchParams.get('product_id');
    const email = url.searchParams.get('email');
    const csrf = req.headers['x-csrf'] || url.searchParams.get('csrf');
    const id = 'BK-' + Math.floor(Math.random()*1e6).toString().padStart(6,'0');

    if (!product_id || !email) {
      res.status(400).json({ ok:false, error:'Missing product_id or email' });
      return;
    }

    const extra = { kind:'ACTION', product_id, email, csrf_present: !!csrf };
    res.status(200).json({ ok:true, id, product_id, email, note: csrf ? 'csrf_ok' : 'no_csrf_logged' });
    logRequest(req, res, start, extra);
  } catch(e) {
    res.status(500).json({ ok:false, error:e.message });
  }
}
