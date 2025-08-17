import { logRequest } from './_utils/log.js';
export default async function handler(req, res) {
  const start = Date.now();
  try {
    if (req.method !== 'POST') { res.status(405).json({ ok:false, error:'Use POST' }); return; }
    res.status(200).json({ ok:true, message:'Thanks for the feedback!' });
  } finally {
    logRequest(req, res, start, { kind:'FEEDBACK' });
  }
}
