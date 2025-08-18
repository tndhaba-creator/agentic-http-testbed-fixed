import { logRequest } from './_utils/log.js';

const ALL = [
  { id:101, name:'Widget', price:9, img:'/assets/img-widget.svg', teaser:'Premium build.' },
  { id:202, name:'Gizmo', price:7, img:'/assets/img-gizmo.svg', teaser:'Balanced daily driver.' },
  { id:303, name:'Thingamabob', price:5, img:'/assets/img-thing.svg', teaser:'Best budget pick.' },
  { id:404, name:'Doohickey', price:11, img:'/assets/img-doo.svg', teaser:'Sturdy & long warranty.' },
  { id:505, name:'Whatchamacallit', price:6, img:'/assets/img-watch.svg', teaser:'Travel-friendly.' },
  { id:606, name:'Doodad', price:8, img:'/assets/img-doodad.svg', teaser:'Solid performance.' },
  { id:707, name:'Gadget Pro', price:13, img:'/assets/img-pro.svg', teaser:'Top-tier build.' },
  { id:808, name:'Gadget Mini', price:4, img:'/assets/img-mini.svg', teaser:'Ultra budget.' },
  { id:909, name:'Gadget Air', price:10, img:'/assets/img-air.svg', teaser:'Slim profile.' },
  { id:1001, name:'Gizmo X', price:12, img:'/assets/img-gizmo.svg', teaser:'Extended battery.' },
  { id:1002, name:'Widget Lite', price:6, img:'/assets/img-widget.svg', teaser:'Lightweight.' },
  { id:1003, name:'Pro Mini', price:7, img:'/assets/img-mini.svg', teaser:'Compact pro.' }
];

export default async function handler(req, res) {
  const start = Date.now();
  try {
    const url = new URL(req.url, 'http://localhost');
    const q = (url.searchParams.get('q') || '').toLowerCase();
    const sort = url.searchParams.get('sort') || 'price_asc';
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '6', 10);

    // filter/search
    let results = ALL.filter(i => !q || i.name.toLowerCase().includes(q) || i.teaser.toLowerCase().includes(q));
    results.sort((a,b)=> sort==='price_desc' ? b.price-a.price : a.price-b.price);

    // pagination
    const total = results.length;
    const startIdx = (page-1)*limit;
    let data = results.slice(startIdx, startIdx+limit);

    // gating: only expose full details if page>=3 OR deep scroll cookie present
    const cookie = req.headers['cookie'] || '';
    const deep = /scrolled=1/.test(cookie);
    const rich = (page >= 3) || deep;
    data = data.map(p => (rich ? {...p, details:{warranty: (p.price>=10?'3-year':'6-month'), port:(p.id%2===0?'USB-A':'USB-C')}} : p));

    res.status(200).json({ ok:true, q, sort, page, limit, total, results: data, rich });
  } finally {
    logRequest(req, res, start, { kind:'LIST' });
  }
}
