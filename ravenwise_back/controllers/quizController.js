const asyncHandler = require('../utils/asyncHandler');

// Contrôleur temporaire avec des fonctions de base
exports.getAllQuizzes = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: [],
    message: "Liste des quiz - Fonctionnalité en développement"
  });
});

exports.getQuizById = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: {},
    message: "Détails du quiz - Fonctionnalité en développement"
  });
});

exports.createQuiz = asyncHandler(async (req, res) => {
  res.status(201).json({
    success: true,
    data: {},
    message: "Création de quiz - Fonctionnalité en développement"
  });
});

exports.updateQuiz = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: {},
    message: "Mise à jour du quiz - Fonctionnalité en développement"
  });
});

exports.deleteQuiz = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Suppression du quiz - Fonctionnalité en développement"
  });
});