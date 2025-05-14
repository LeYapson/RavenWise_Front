const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapterController');
const { authMiddleware, requireRole } = require('../middleware/auth');

// Routes publiques
router.get('/course/:courseId', chapterController.getChaptersByCourse);
router.get('/:id', chapterController.getChapterById);

// Routes protégées
router.post('/', 
  authMiddleware,
  requireRole('instructor'), 
  chapterController.createChapter
);

router.put('/:id', 
  authMiddleware,
  chapterController.updateChapter
);

router.delete('/:id', 
  authMiddleware,
  chapterController.deleteChapter
);

module.exports = router;