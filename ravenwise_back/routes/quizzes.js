const express = require('express');
const router = express.Router();  // Créer un routeur Express
const quizController = require('../controllers/quizController');
const { authMiddleware } = require('../middleware/auth');

// Routes publiques
router.get('/', quizController.getAllQuizzes);
router.get('/:id', quizController.getQuizById);

// Routes protégées
router.post('/', authMiddleware, quizController.createQuiz);
router.put('/:id', authMiddleware, quizController.updateQuiz);
router.delete('/:id', authMiddleware, quizController.deleteQuiz);

// IMPORTANT: Exporter le routeur
module.exports = router;  // Exporter le routeur Express et non un objet