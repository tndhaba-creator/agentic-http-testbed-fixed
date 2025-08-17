import { logRequest } from './_utils/log.js';

export default async function handler(req, res) {
  const start = Date.now();
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ ok: false, error: 'Use POST' });
      return;
    }
    const product_id = req.query?.product_id || (req.body && req.body.product_id);
    const email = req.query?.email || (req.body && req.body.email);
    if (!product_id || !email) {
      res.status(400).json({ ok: false, error: 'Missing product_id or email' });
      return;
    }
    const id = 'BK-' + Math.floor(Math.random() * 1e6).toString().padStart(6, '0');
    res.status(200).json({ ok: true, id, product_id, email });
  } finally {
    logRequest(req, res, start, { kind: 'ACTION' });
  }
}
