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
      origin: hdr['origin'] || '',
      sec_fetch_site: hdr['sec-fetch-site'] || '',
      sec_fetch_mode: hdr['sec-fetch-mode'] || '',
      accept_language: hdr['accept-language'] || '',
      ...extra
    };
    console.log('[REQ]', JSON.stringify(entry));
  } catch(e){ console.log('[LOG_ERR]', e.message); }
}
