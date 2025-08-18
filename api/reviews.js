import { logRequest } from './_utils/log.js';
export default async function handler(req, res) {
  const start = Date.now();
  try {
    const url = new URL(req.url, 'http://localhost');
    const section = url.searchParams.get('section') || 'misc';
    const id = url.searchParams.get('id') || '';
    const html = `<ul>
      <li>"Solid value for the price" — A.C.</li>
      <li>"Warranty support was responsive" — M.R.</li>
      <li>"USB-C was a must, and it works great" — T.N.</li>
    </ul>`;
    res.setHeader('Content-Type','text/html; charset=utf-8');
    res.status(200).send(html);
  } finally {
    logRequest(req, res, start, { kind:'REVIEWS' });
  }
}
