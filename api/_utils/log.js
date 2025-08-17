export function logRequest(req, res, startMs, extra = {}) {
  try {
    const duration = Date.now() - startMs;
    const headerOrder = Object.keys(req.headers || {}).join('|');
    const entry = {
      ts: new Date().toISOString(),
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration_ms: duration,
      ua: req.headers['user-agent'] || '',
      referer: req.headers['referer'] || '',
      cookie_present: !!req.headers['cookie'],
      header_order: headerOrder,
      ...extra
    };
    console.log('[REQ]', JSON.stringify(entry));
  } catch (e) {
    console.log('[LOG_ERR]', e.message);
  }
}
