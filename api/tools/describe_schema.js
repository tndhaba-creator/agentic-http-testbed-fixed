import { logRequest } from '../_utils/log.js';
export default async function handler(req, res) {
  const start = Date.now();
  try {
    res.status(200).json({
      schema: {
        products: { params:['q','sort','page','limit'] },
        search: { params:['q'] },
        book: { method:'POST', params:['product_id','email','csrf(optional)'] },
        status: { params:['id'] }
      }
    });
  } finally {
    logRequest(req, res, start, { kind: 'DECOY' });
  }
}
