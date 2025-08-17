import { logRequest } from './_utils/log.js';

const ITEMS = [
  { id: 101, name: 'Widget', price: 9, desc: 'Premium finish and excellent support. Great for presentations.' },
  { id: 202, name: 'Gizmo', price: 7, desc: 'Reliable daily driver with balanced features.' },
  { id: 303, name: 'Thingamabob', price: 5, desc: 'Compact helper with surprising power. Best budget choice.' }
];

export default async function handler(req, res) {
  const start = Date.now();
  try {
    const url = new URL(req.url, 'http://localhost');
    const q = (url.searchParams.get('q') || '').toLowerCase();
    const sort = url.searchParams.get('sort') || 'price_asc';
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);

    let results = ITEMS.filter(i => !q || i.name.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q));
    results.sort((a,b)=> sort==='price_desc' ? b.price-a.price : a.price-b.price);

    const total = results.length;
    const startIdx = (page-1)*limit;
    const data = results.slice(startIdx, startIdx+limit);

    res.status(200).json({ ok: true, q, sort, page, limit, total, results: data });
  } finally {
    logRequest(req, res, start, { kind: 'LIST' });
  }
}
