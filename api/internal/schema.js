import { logRequest } from '../_utils/log.js';
export default async function handler(req, res) {
  const start = Date.now();
  try {
    res.status(200).json({ ok:true, internal:true, version:'v2-beta', note:'not linked' });
  } finally {
    logRequest(req, res, start, { kind:'DECOY' });
  }
}
