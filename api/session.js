import { logRequest } from './_utils/log.js';
function token(){ return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2); }
export default async function handler(req, res) {
  const start = Date.now();
  try {
    const sid = 'S-'+Math.random().toString(36).slice(2);
    const t = token();
    res.setHeader('Set-Cookie', [`csrf=${t}; Path=/; HttpOnly; SameSite=Lax`, `sid=${sid}; Path=/; SameSite=Lax`]);
    res.status(200).json({ ok:true, csrf: t, sid });
  } finally {
    logRequest(req, res, start, { kind:'SESSION' });
  }
}
