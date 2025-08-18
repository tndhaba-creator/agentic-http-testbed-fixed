import { logRequest } from './_utils/log.js';
export default async function handler(req, res) {
  const start = Date.now();
  try {
    res.status(200).json({ ok:true, tools:['products','product_detail','session','checkout','status','track','recommend'], note:'combined tools endpoint' });
  } finally {
    logRequest(req, res, start, { kind:'DECOY' });
  }
}
