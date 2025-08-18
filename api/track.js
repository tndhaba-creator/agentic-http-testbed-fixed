import { logRequest } from './_utils/log.js';
export default async function handler(req, res) {
  const start = Date.now();
  try {
    const url = new URL(req.url, 'http://localhost');
    const ev = url.searchParams.get('ev') || 'unknown';
    if (ev === 'scrolldeep') {
      res.setHeader('Set-Cookie','scrolled=1; Path=/; SameSite=Lax');
    }
    res.setHeader('Cache-Control','no-store');
    res.status(200).json({ ok:true, ev });
  } finally {
    logRequest(req, res, start, { kind:'TRACK' });
  }
}
