const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  console.log('Received token:', token);

  if (!token) return res.status(401).json({ error: 'Access denied' });

  let tokenValue = token;
  if (token.startsWith('Bearer ')) {
    tokenValue = token.slice(7);
  }

  try {
    const decoded = jwt.verify(tokenValue, process.env.SECRET_KEY || 'Swetha');
    console.log('Decoded token:', decoded);
    if (!decoded.id || !decoded.username) {
      return res.status(403).json({ error: 'Invalid token: Missing user ID or username' });
    }
    req.user = decoded;
    console.log('req.user set:', req.user);
    next();
  } catch (err) {
    console.log('Token verification failed:', err.message);
    return res.status(403).json({ error: 'Invalid token' });
  }
};

module.exports = authenticateToken;