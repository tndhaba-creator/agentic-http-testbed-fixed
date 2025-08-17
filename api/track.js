import { logRequest } from './_utils/log.js';
export default async function handler(req, res) {
  const start = Date.now();
  try {
    const url = new URL(req.url, 'http://localhost');
    const ev = url.searchParams.get('ev') || 'unknown';
    const data = Object.fromEntries(url.searchParams.entries());
    res.setHeader('Cache-Control','no-store');
    res.status(200).json({ ok:true, ev, data });
  } finally {
    logRequest(req, res, start, { kind:'TRACK' });
  }
}
