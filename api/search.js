import { logRequest } from './_utils/log.js';

export default async function handler(req, res) {
  const start = Date.now();
  try {
    const q = (req.query?.q || '').toString().toLowerCase();
    const items = [
      { id: 101, name: 'Widget', price: 9 },
      { id: 202, name: 'Gizmo', price: 7 },
      { id: 303, name: 'Thingamabob', price: 5 }
    ];
    const results = q ? items.filter(i => i.name.toLowerCase().includes(q)) : items;
    res.status(200).json({ ok: true, q, results });
  } finally {
    logRequest(req, res, start, { kind: 'SEARCH' });
  }
}
