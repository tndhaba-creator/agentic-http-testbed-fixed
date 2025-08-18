export function logRequest(req, res, startMs, extra = {}) {
  try {
    const duration = Date.now() - startMs;
    const hdr = req.headers || {};
    const entry = {
      ts: new Date().toISOString(),
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration_ms: duration,
      ua: hdr['user-agent'] || '',
      referer: hdr['referer'] || '',
      cookie_present: !!hdr['cookie'],
      'x-forwarded-for': hdr['x-forwarded-for'] || '',
      ...extra
    };
    console.log('[REQ]', JSON.stringify(entry));
  } catch(e){}
}
