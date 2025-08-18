import { logRequest } from './_utils/log.js';
const ALL = [
  {
    "id": 2000,
    "name": "Widget",
    "price": 177,
    "img": "/assets/prod-1.svg",
    "teaser": "ABS \u2022 USB-C \u2022 6-month"
  },
  {
    "id": 2001,
    "name": "Gizmo",
    "price": 184,
    "img": "/assets/prod-2.svg",
    "teaser": "Aluminum \u2022 USB-A \u2022 1-year"
  },
  {
    "id": 2002,
    "name": "Thingamabob",
    "price": 198,
    "img": "/assets/prod-3.svg",
    "teaser": "Magnesium \u2022 Micro-USB \u2022 2-year"
  },
  {
    "id": 2003,
    "name": "Doohickey",
    "price": 178,
    "img": "/assets/prod-4.svg",
    "teaser": "ABS \u2022 USB-C \u2022 3-year"
  },
  {
    "id": 2004,
    "name": "Whatchamacallit",
    "price": 177,
    "img": "/assets/prod-5.svg",
    "teaser": "Aluminum \u2022 USB-A \u2022 6-month"
  },
  {
    "id": 2005,
    "name": "Doodad",
    "price": 181,
    "img": "/assets/prod-6.svg",
    "teaser": "Magnesium \u2022 Micro-USB \u2022 1-year"
  },
  {
    "id": 2006,
    "name": "Gadget Pro",
    "price": 186,
    "img": "/assets/prod-7.svg",
    "teaser": "ABS \u2022 USB-C \u2022 2-year"
  },
  {
    "id": 2007,
    "name": "Gadget Mini",
    "price": 161,
    "img": "/assets/prod-8.svg",
    "teaser": "Aluminum \u2022 USB-A \u2022 3-year"
  },
  {
    "id": 2008,
    "name": "Gadget Air",
    "price": 160,
    "img": "/assets/prod-9.svg",
    "teaser": "Magnesium \u2022 Micro-USB \u2022 6-month"
  },
  {
    "id": 2009,
    "name": "Bolt",
    "price": 181,
    "img": "/assets/prod-10.svg",
    "teaser": "ABS \u2022 USB-C \u2022 1-year"
  },
  {
    "id": 2010,
    "name": "Spark",
    "price": 179,
    "img": "/assets/prod-11.svg",
    "teaser": "Aluminum \u2022 USB-A \u2022 2-year"
  },
  {
    "id": 2011,
    "name": "Nova",
    "price": 189,
    "img": "/assets/prod-12.svg",
    "teaser": "Magnesium \u2022 Micro-USB \u2022 3-year"
  },
  {
    "id": 2012,
    "name": "Core",
    "price": 188,
    "img": "/assets/prod-13.svg",
    "teaser": "ABS \u2022 USB-C \u2022 6-month"
  },
  {
    "id": 2013,
    "name": "Edge",
    "price": 199,
    "img": "/assets/prod-14.svg",
    "teaser": "Aluminum \u2022 USB-A \u2022 1-year"
  },
  {
    "id": 2014,
    "name": "Pulse",
    "price": 160,
    "img": "/assets/prod-15.svg",
    "teaser": "Magnesium \u2022 Micro-USB \u2022 2-year"
  },
  {
    "id": 2015,
    "name": "Orbit",
    "price": 155,
    "img": "/assets/prod-16.svg",
    "teaser": "ABS \u2022 USB-C \u2022 3-year"
  },
  {
    "id": 2016,
    "name": "Forge",
    "price": 177,
    "img": "/assets/prod-17.svg",
    "teaser": "Aluminum \u2022 USB-A \u2022 6-month"
  },
  {
    "id": 2017,
    "name": "Vibe",
    "price": 168,
    "img": "/assets/prod-18.svg",
    "teaser": "Magnesium \u2022 Micro-USB \u2022 1-year"
  },
  {
    "id": 2018,
    "name": "Beam",
    "price": 158,
    "img": "/assets/prod-19.svg",
    "teaser": "ABS \u2022 USB-C \u2022 2-year"
  },
  {
    "id": 2019,
    "name": "Flux",
    "price": 154,
    "img": "/assets/prod-20.svg",
    "teaser": "Aluminum \u2022 USB-A \u2022 3-year"
  },
  {
    "id": 2020,
    "name": "Halo",
    "price": 183,
    "img": "/assets/prod-21.svg",
    "teaser": "Magnesium \u2022 Micro-USB \u2022 6-month"
  },
  {
    "id": 2021,
    "name": "Drift",
    "price": 193,
    "img": "/assets/prod-22.svg",
    "teaser": "ABS \u2022 USB-C \u2022 1-year"
  },
  {
    "id": 2022,
    "name": "Quark",
    "price": 189,
    "img": "/assets/prod-23.svg",
    "teaser": "Aluminum \u2022 USB-A \u2022 2-year"
  },
  {
    "id": 2023,
    "name": "Mica",
    "price": 151,
    "img": "/assets/prod-24.svg",
    "teaser": "Magnesium \u2022 Micro-USB \u2022 3-year"
  },
  {
    "id": 2024,
    "name": "Ion",
    "price": 187,
    "img": "/assets/prod-25.svg",
    "teaser": "ABS \u2022 USB-C \u2022 6-month"
  },
  {
    "id": 2025,
    "name": "Pico",
    "price": 174,
    "img": "/assets/prod-26.svg",
    "teaser": "Aluminum \u2022 USB-A \u2022 1-year"
  },
  {
    "id": 2026,
    "name": "Arc",
    "price": 177,
    "img": "/assets/prod-27.svg",
    "teaser": "Magnesium \u2022 Micro-USB \u2022 2-year"
  },
  {
    "id": 2027,
    "name": "Rift",
    "price": 190,
    "img": "/assets/prod-28.svg",
    "teaser": "ABS \u2022 USB-C \u2022 3-year"
  },
  {
    "id": 2028,
    "name": "Lumen",
    "price": 196,
    "img": "/assets/prod-29.svg",
    "teaser": "Aluminum \u2022 USB-A \u2022 6-month"
  },
  {
    "id": 2029,
    "name": "Tera",
    "price": 188,
    "img": "/assets/prod-30.svg",
    "teaser": "Magnesium \u2022 Micro-USB \u2022 1-year"
  }
];
export default async function handler(req, res) {
  const start = Date.now();
  try {
    const url = new URL(req.url, 'http://localhost');
    const q = (url.searchParams.get('q') || '').toLowerCase();
    const sort = url.searchParams.get('sort') || 'price_asc';
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '9', 10);
    let results = ALL.filter(i => !q || i.name.toLowerCase().includes(q) || i.teaser.toLowerCase().includes(q));
    results.sort((a,b)=> sort==='price_desc' ? b.price-a.price : a.price-b.price);
    const startIdx = (page-1)*limit;
    let data = results.slice(startIdx, startIdx+limit);
    const cookie = req.headers['cookie'] || '';
    const deep = /scrolled=1/.test(cookie);
    const pref = /pref=1/.test(cookie);
    const rich = (page >= 3) || deep || pref;
    data = data.map(p => (rich ? {...p, details:{warranty: (p.price>=190?'3-year': (p.price>=175?'2-year':'1-year')), port:(p.id%2===0?'USB-A':'USB-C')}} : p));
    res.status(200).json({ ok:true, q, sort, page, limit, total:results.length, results:data, rich });
  } finally {
    logRequest(req, res, start, { kind:'LIST' });
  }
}
