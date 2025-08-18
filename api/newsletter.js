import { logRequest } from './_utils/log.js';
export default async function handler(req, res) {
  const start = Date.now();
  try {
    if (req.method !== 'POST') { res.status(405).send('Use POST'); return; }
    res.statusCode = 302;
    res.setHeader('Set-Cookie', 'sub=1; Path=/; SameSite=Lax');
    res.setHeader('Location', '/?subscribed=1');
    res.end();
  } finally {
    logRequest(req, res, start, { kind:'NEWSLETTER' });
  }
}
