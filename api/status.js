import { logRequest } from './_utils/log.js';

export default async function handler(req, res) {
  const start = Date.now();
  try {
    const url = new URL(req.url, 'http://localhost');
    const id = url.searchParams.get('id') || 'BK-000001';
    res.status(200).json({ ok: true, id, status: 'confirmed' });
  } finally {
    logRequest(req, res, start, { kind: 'VERIFY' });
  }
}
