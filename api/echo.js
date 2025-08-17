import { logRequest } from './_utils/log.js';

export default async function handler(req, res) {
  const start = Date.now();
  try {
    const info = {
      method: req.method,
      url: req.url,
      query: req.query || {}
    };
    res.status(200).json({ ok: true, info });
  } finally {
    logRequest(req, res, start, { kind: 'ECHO' });
  }
}
