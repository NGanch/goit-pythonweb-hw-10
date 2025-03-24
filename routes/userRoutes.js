const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Маршрут для отримання даних користувача
router.get('/me', authMiddleware, (req, res) => {
  res.json(req.user);  // Відправляємо дані користувача
});

module.exports = router;
