const supabase = require('../config/supabaseClient');

// Protected Route Middleware
const protect = async (req, res, next) => {
  try {
    let token;

    // 1. Check if token is attached to the request header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]; // Extract token
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // 2. Ask Supabase if this token is real and currently valid
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }

    // 3. User is real, let them proceed to the route
    req.user = data.user;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server auth error' });
  }
};

module.exports = { protect };
