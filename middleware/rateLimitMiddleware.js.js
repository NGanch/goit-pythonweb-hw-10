const rateLimit = require('express-rate-limit');

const rateLimitMiddleware = rateLimit({
  windowMs: 60 * 1000, // 1 хвилина
  max: 5, // Максимум 5 запитів за 1 хвилину
  message: 'Too many requests, please try again later.'
});

module.exports = rateLimitMiddleware;
