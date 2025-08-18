import { logRequest } from './_utils/log.js';
export default async function handler(req, res) {
  const start = Date.now();
  try {
    if (req.method !== 'POST') { res.status(405).send('Use POST'); return; }
    // pretend to process preferences, then set a cookie that unlocks richer details
    res.statusCode = 302;
    res.setHeader('Set-Cookie', 'pref=1; Path=/; SameSite=Lax');
    res.setHeader('Location', '/products?ok=1');
    res.end();
  } finally {
    logRequest(req, res, start, { kind:'PREF' });
  }
}
