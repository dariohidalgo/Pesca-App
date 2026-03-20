
export default function handler(req, res) {
  res.status(200).json({
    nodeVersion: process.version,
    env: process.env.NODE_ENV,
    query: req.query,
    hasFetch: typeof fetch !== 'undefined'
  });
}
