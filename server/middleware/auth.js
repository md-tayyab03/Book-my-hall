const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'SECRET_KEY');
    req.user = decoded; // userId and role will be available as req.user
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = authMiddleware;
