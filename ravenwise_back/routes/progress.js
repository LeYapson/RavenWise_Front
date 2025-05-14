const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const { authMiddleware } = require('../middleware/auth');

// Toutes les routes nécessitent une authentification
router.get('/', authMiddleware, progressController.getUserProgress);
router.get('/course/:courseId', authMiddleware, progressController.getCourseProgress);
router.post('/course/:courseId/chapter/:chapterId/complete', authMiddleware, progressController.completeChapter);

module.exports = router;