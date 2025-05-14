const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { 
  clerkAuth,
  extractUserInfo,
  requireRole,
  authMiddleware
} = require('../middleware/auth');

// Routes publiques
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);

// Routes protégées avec Clerk
router.post('/', 
  clerkAuth,
  extractUserInfo,
  requireRole('instructor'),
  courseController.createCourse
);

// Alternative avec JWT
router.put('/:id', 
  authMiddleware,
  courseController.updateCourse
);

module.exports = router;