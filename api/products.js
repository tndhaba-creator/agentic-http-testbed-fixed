import { logRequest } from './_utils/log.js';

const ITEMS = [
  { id:101, name:'Widget', price:9, desc:'Premium finish and excellent support. Great for presentations.' },
  { id:202, name:'Gizmo', price:7, desc:'Reliable daily driver with balanced features.' },
  { id:303, name:'Thingamabob', price:5, desc:'Compact helper with surprising power. Best budget choice.' },
  { id:404, name:'Doohickey', price:11, desc:'Sturdy build and long warranty.' },
  { id:505, name:'Whatchamacallit', price:6, desc:'Lightweight and travel-friendly.' },
  { id:606, name:'Doodad', price:8, desc:'Solid performance for daily tasks.' },
  { id:707, name:'Gadget Pro', price:13, desc:'Top-tier build, premium support.' },
  { id:808, name:'Gadget Mini', price:4, desc:'Ultra budget with minimal features.' },
  { id:909, name:'Gadget Air', price:10, desc:'Slim profile, mid-tier specs.' }
];

export default async function handler(req, res) {
  const start = Date.now();
  try {
    const url = new URL(req.url, 'http://localhost');
    const q = (url.searchParams.get('q') || '').toLowerCase();
    const sort = url.searchParams.get('sort') || 'price_asc';
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '9', 10);

    let results = ITEMS.filter(i => !q || i.name.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q));
    results.sort((a,b)=> sort==='price_desc' ? b.price-a.price : a.price-b.price);

    const total = results.length;
    const startIdx = (page-1)*limit;
    const data = results.slice(startIdx, startIdx+limit);

    // Simulate occasional 429 throttling on deep pages
    if (page > 3) {
      res.status(429).json({ ok:false, error:'Too Many Requests', hint:'slow down' });
    } else {
      res.status(200).json({ ok:true, q, sort, page, limit, total, results: data });
    }
  } finally {
    logRequest(req, res, start, { kind:'LIST' });
  }
}
