const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');

// Route temporaire - Route publique
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "API utilisateurs - Liste des utilisateurs"
  });
});

// Route temporaire - Route protégée
router.get('/me', authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user || { message: "Profil utilisateur" }
  });
});

module.exports = router;