import { logRequest } from './_utils/log.js';

const ALL = [
  {
    "id": 1001,
    "name": "Widget",
    "price": 189,
    "img": "/assets/A1.svg",
    "teaser": "ABS \u2022 USB-C \u2022 6-month"
  },
  {
    "id": 1002,
    "name": "Gizmo",
    "price": 156,
    "img": "/assets/A2.svg",
    "teaser": "Aluminum \u2022 USB-A \u2022 1-year"
  },
  {
    "id": 1003,
    "name": "Thingamabob",
    "price": 150,
    "img": "/assets/A3.svg",
    "teaser": "Magnesium \u2022 Micro-USB \u2022 2-year"
  },
  {
    "id": 1004,
    "name": "Doohickey",
    "price": 196,
    "img": "/assets/A4.svg",
    "teaser": "ABS \u2022 USB-C \u2022 3-year"
  },
  {
    "id": 1005,
    "name": "Whatchamacallit",
    "price": 166,
    "img": "/assets/A5.svg",
    "teaser": "Aluminum \u2022 USB-A \u2022 6-month"
  },
  {
    "id": 1006,
    "name": "Doodad",
    "price": 164,
    "img": "/assets/A6.svg",
    "teaser": "Magnesium \u2022 Micro-USB \u2022 1-year"
  },
  {
    "id": 1007,
    "name": "Gadget Pro",
    "price": 163,
    "img": "/assets/A7.svg",
    "teaser": "ABS \u2022 USB-C \u2022 2-year"
  },
  {
    "id": 1008,
    "name": "Gadget Mini",
    "price": 157,
    "img": "/assets/A8.svg",
    "teaser": "Aluminum \u2022 USB-A \u2022 3-year"
  },
  {
    "id": 1009,
    "name": "Gadget Air",
    "price": 196,
    "img": "/assets/A9.svg",
    "teaser": "Magnesium \u2022 Micro-USB \u2022 6-month"
  },
  {
    "id": 1010,
    "name": "Bolt",
    "price": 155,
    "img": "/assets/A10.svg",
    "teaser": "ABS \u2022 USB-C \u2022 1-year"
  },
  {
    "id": 1011,
    "name": "Spark",
    "price": 192,
    "img": "/assets/A11.svg",
    "teaser": "Aluminum \u2022 USB-A \u2022 2-year"
  },
  {
    "id": 1012,
    "name": "Nova",
    "price": 196,
    "img": "/assets/A12.svg",
    "teaser": "Magnesium \u2022 Micro-USB \u2022 3-year"
  },
  {
    "id": 1013,
    "name": "Core",
    "price": 183,
    "img": "/assets/A13.svg",
    "teaser": "ABS \u2022 USB-C \u2022 6-month"
  },
  {
    "id": 1014,
    "name": "Edge",
    "price": 154,
    "img": "/assets/A14.svg",
    "teaser": "Aluminum \u2022 USB-A \u2022 1-year"
  },
  {
    "id": 1015,
    "name": "Pulse",
    "price": 186,
    "img": "/assets/A15.svg",
    "teaser": "Magnesium \u2022 Micro-USB \u2022 2-year"
  },
  {
    "id": 1016,
    "name": "Orbit",
    "price": 176,
    "img": "/assets/A16.svg",
    "teaser": "ABS \u2022 USB-C \u2022 3-year"
  },
  {
    "id": 1017,
    "name": "Forge",
    "price": 151,
    "img": "/assets/A17.svg",
    "teaser": "Aluminum \u2022 USB-A \u2022 6-month"
  },
  {
    "id": 1018,
    "name": "Vibe",
    "price": 150,
    "img": "/assets/A18.svg",
    "teaser": "Magnesium \u2022 Micro-USB \u2022 1-year"
  },
  {
    "id": 1019,
    "name": "Beam",
    "price": 154,
    "img": "/assets/A19.svg",
    "teaser": "ABS \u2022 USB-C \u2022 2-year"
  },
  {
    "id": 1020,
    "name": "Flux",
    "price": 162,
    "img": "/assets/A20.svg",
    "teaser": "Aluminum \u2022 USB-A \u2022 3-year"
  }
];

export default async function handler(req, res) {
  const start = Date.now();
  try {
    const url = new URL(req.url, 'http://localhost');
    const q = (url.searchParams.get('q') || '').toLowerCase();
    const sort = url.searchParams.get('sort') || 'price_asc';
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '8', 10);

    let results = ALL.filter(i => !q || i.name.toLowerCase().includes(q) || i.teaser.toLowerCase().includes(q));
    results.sort((a,b)=> sort==='price_desc' ? b.price-a.price : a.price-b.price);

    const total = results.length;
    const startIdx = (page-1)*limit;
    let data = results.slice(startIdx, startIdx+limit);

    // Gate richer details: require deep scroll cookie OR preference cookie OR page>=3
    const cookie = req.headers['cookie'] || '';
    const deep = /scrolled=1/.test(cookie);
    const pref = /pref=1/.test(cookie);
    const rich = (page >= 3) || deep || pref;
    data = data.map(p => (rich ? {...p, details:{warranty: (p.price>=190?'3-year': (p.price>=175?'2-year':'1-year')), port:(p.id%2===0?'USB-A':'USB-C')}} : p));

    res.status(200).json({ ok:true, q, sort, page, limit, total, results: data, rich });
  } finally {
    logRequest(req, res, start, { kind:'LIST' });
  }
}
