const Chapter = require('../models/Chapter');
const Course = require('../models/Course');
const asyncHandler = require('../utils/asyncHandler');

// Obtenir tous les chapitres d'un cours
exports.getChaptersByCourse = asyncHandler(async (req, res) => {
  const chapters = await Chapter.find({ course: req.params.courseId })
    .sort({ order: 1 });
  
  res.status(200).json({
    success: true,
    count: chapters.length,
    data: chapters
  });
});

// Obtenir un chapitre par ID
exports.getChapterById = asyncHandler(async (req, res) => {
  const chapter = await Chapter.findById(req.params.id);
  
  if (!chapter) {
    return res.status(404).json({
      success: false,
      error: 'Chapitre non trouvé'
    });
  }
  
  res.status(200).json({
    success: true,
    data: chapter
  });
});

// Créer un nouveau chapitre
exports.createChapter = asyncHandler(async (req, res) => {
  // Vérifier si le cours existe
  const course = await Course.findById(req.body.course);
  
  if (!course) {
    return res.status(404).json({
      success: false,
      error: 'Cours non trouvé'
    });
  }
  
  // Vérifier que l'utilisateur est l'instructeur du cours ou un admin
  if (course.instructorId !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Vous n\'êtes pas autorisé à ajouter des chapitres à ce cours'
    });
  }
  
  const chapter = await Chapter.create(req.body);
  
  res.status(201).json({
    success: true,
    data: chapter
  });
});

// Mettre à jour un chapitre
exports.updateChapter = asyncHandler(async (req, res) => {
  let chapter = await Chapter.findById(req.params.id);
  
  if (!chapter) {
    return res.status(404).json({
      success: false,
      error: 'Chapitre non trouvé'
    });
  }
  
  // Vérifier que l'utilisateur est l'instructeur du cours ou un admin
  const course = await Course.findById(chapter.course);
  
  if (!course) {
    return res.status(404).json({
      success: false,
      error: 'Cours associé non trouvé'
    });
  }
  
  if (course.instructorId !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Vous n\'êtes pas autorisé à modifier ce chapitre'
    });
  }
  
  chapter = await Chapter.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    success: true,
    data: chapter
  });
});

// Supprimer un chapitre
exports.deleteChapter = asyncHandler(async (req, res) => {
  const chapter = await Chapter.findById(req.params.id);
  
  if (!chapter) {
    return res.status(404).json({
      success: false,
      error: 'Chapitre non trouvé'
    });
  }
  
  // Vérifier que l'utilisateur est l'instructeur du cours ou un admin
  const course = await Course.findById(chapter.course);
  
  if (!course) {
    return res.status(404).json({
      success: false,
      error: 'Cours associé non trouvé'
    });
  }
  
  if (course.instructorId !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Vous n\'êtes pas autorisé à supprimer ce chapitre'
    });
  }
  
  await chapter.remove();
  
  res.status(200).json({
    success: true,
    data: {}
  });
});