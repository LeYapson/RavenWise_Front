const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const { authMiddleware, requireRole } = require('../middleware/auth');

// Routes publiques (lecture)
router.get('/', forumController.getAllDiscussions);
router.get('/:id', forumController.getDiscussionById);

// Routes protégées (création et interaction)
router.post('/', authMiddleware, forumController.createDiscussion);
router.post('/:id/reply', authMiddleware, forumController.addReply);
router.put('/:id/like', authMiddleware, forumController.likeDiscussion);
router.put('/:id/unlike', authMiddleware, forumController.unlikeDiscussion);

module.exports = router;