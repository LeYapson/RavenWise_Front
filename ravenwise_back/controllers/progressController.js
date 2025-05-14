const Progress = require('../models/Progress');
const Course = require('../models/Course');
const Chapter = require('../models/Chapter');
const asyncHandler = require('../utils/asyncHandler');

// Récupérer la progression d'un utilisateur pour tous les cours
exports.getUserProgress = asyncHandler(async (req, res) => {
  const progress = await Progress.find({ userId: req.user.id })
    .populate('courseId', 'title category thumbnail')
    .populate('currentChapter', 'title order');
    
  res.status(200).json({
    success: true,
    data: progress
  });
});

// Obtenir la progression d'un utilisateur pour un cours spécifique
exports.getCourseProgress = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  
  // Vérifier que le cours existe
  const courseExists = await Course.exists({ _id: courseId });
  if (!courseExists) {
    return res.status(404).json({
      success: false,
      error: 'Cours non trouvé'
    });
  }
  
  let progress = await Progress.findOne({
    userId: req.user.id,
    courseId
  });
  
  // Si aucune progression n'existe, renvoyer un objet vide
  if (!progress) {
    return res.status(200).json({
      success: true,
      data: {
        userId: req.user.id,
        courseId,
        completedChapters: [],
        progress: 0
      }
    });
  }
  
  res.status(200).json({
    success: true,
    data: progress
  });
});

// Marquer un chapitre comme complété
exports.completeChapter = asyncHandler(async (req, res) => {
  const { courseId, chapterId } = req.params;
  
  // Implémentation temporaire
  res.status(200).json({
    success: true,
    message: "Fonctionnalité en cours de développement"
  });
});