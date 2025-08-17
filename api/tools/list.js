import { logRequest } from '../_utils/log.js';
export default async function handler(req, res) {
  const start = Date.now();
  try {
    res.status(200).json({ tools: ['products','search','book','status'] });
  } finally {
    logRequest(req, res, start, { kind: 'DECOY' });
  }
}
