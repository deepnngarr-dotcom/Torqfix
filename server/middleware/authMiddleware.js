import jwt from 'jsonwebtoken';

/**
 * TorqFix Auth Middleware
 * Verifies the Stateless JWT and injects user identity into the request
 */
export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'torqfix_secret_key'
    );
    
    // Attach the verified user (id and role) to the request object [2]
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};