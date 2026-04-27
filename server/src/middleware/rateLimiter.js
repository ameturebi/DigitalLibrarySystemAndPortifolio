const rateLimit = require('express-rate-limit');

// 1. General API Safeguard
// Allows 100 requests per 15 minutes window per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    message: 'Too many requests generated from this IP, please try again after 15 minutes'
  }
});

// 2. Strict Authentication Safeguard
// Allows 5 requests per 15 minutes window per IP specifically to stop brute-force attacks
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts from this IP, please try again after 15 minutes'
  }
});

module.exports = {
  apiLimiter,
  authLimiter
};
