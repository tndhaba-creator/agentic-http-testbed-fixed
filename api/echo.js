import { logRequest } from './_utils/log.js';

export default async function handler(req, res) {
  const start = Date.now();
  try {
    const url = new URL(req.url, 'http://localhost');
    const info = {
      pg: url.searchParams.get('pg') || '',
      t: url.searchParams.get('t') || ''
    };
    res.setHeader('Cache-Control','no-store');
    res.status(200).json({ ok:true, info });
  } finally {
    logRequest(req, res, start, { kind:'ECHO' });
  }
}
