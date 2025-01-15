const express = require('express');
const authController = require('../controllers/auth.controller.js');
const authMiddleware = require('../Middleware/auth.middleware.js');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/perfil', authMiddleware.verifyToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;