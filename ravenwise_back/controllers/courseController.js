const Course = require('../models/Course');
const Chapter = require('../models/Chapter');
const asyncHandler = require('../utils/asyncHandler');
const { clerkClient } = require('@clerk/clerk-sdk-node');

// Obtenir tous les cours
exports.getAllCourses = asyncHandler(async (req, res) => {
  const { category, difficulty, search } = req.query;
  let query = {};
  
  // Filtres
  if (category) query.category = category;
  if (difficulty) query.difficulty = difficulty;
  if (search) query.title = { $regex: search, $options: 'i' };

  // Pour les utilisateurs non-admin, afficher seulement les cours publiés
  if (!req.user || req.user.role !== 'admin') {
    query.published = true;
  }
  
  // Ajouter le nombre de chapitres à chaque cours
  const courses = await Course.find(query)
    .populate('chaptersCount')
    .sort({ createdAt: -1 });
  
  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses
  });
});

// Obtenir un cours par ID
exports.getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  
  if (!course) {
    return res.status(404).json({
      success: false,
      error: 'Cours non trouvé'
    });
  }

  // Vérifier que les utilisateurs normaux ne peuvent voir que les cours publiés
  if (!course.published && (!req.user || req.user.role !== 'admin')) {
    return res.status(403).json({
      success: false,
      error: 'Ce cours n\'est pas encore publié'
    });
  }
  
  // Récupérer les chapitres associés
  const chapters = await Chapter.find({ course: course._id }).sort({ order: 1 });
  
  res.status(200).json({
    success: true,
    data: {
      ...course.toObject(),
      chapters
    }
  });
});

// Créer un nouveau cours
exports.createCourse = asyncHandler(async (req, res) => {
  // Vérifier que l'utilisateur est instructeur ou admin
  if (!['instructor', 'admin'].includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      error: 'Accès refusé'
    });
  }
  
  const courseData = {
    ...req.body,
    instructorId: req.user.id,
    instructorName: `${req.user.firstName} ${req.user.lastName}`
  };
  
  const course = await Course.create(courseData);
  
  res.status(201).json({
    success: true,
    data: course
  });
});

// Mettre à jour un cours
exports.updateCourse = asyncHandler(async (req, res) => {
  let course = await Course.findById(req.params.id);
  
  if (!course) {
    return res.status(404).json({
      success: false,
      error: 'Cours non trouvé'
    });
  }
  
  // Vérifier que seul l'instructeur du cours ou un admin peut le modifier
  if (course.instructorId !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Vous n\'êtes pas autorisé à modifier ce cours'
    });
  }
  
  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    success: true,
    data: course
  });
});

// Supprimer un cours
exports.deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  
  if (!course) {
    return res.status(404).json({
      success: false,
      error: 'Cours non trouvé'
    });
  }
  
  // Vérifier que seul l'instructeur du cours ou un admin peut le supprimer
  if (course.instructorId !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Vous n\'êtes pas autorisé à supprimer ce cours'
    });
  }
  
  // Supprimer les chapitres associés
  await Chapter.deleteMany({ course: course._id });
  
  // Supprimer le cours
  await course.remove();
  
  res.status(200).json({
    success: true,
    data: {}
  });
});