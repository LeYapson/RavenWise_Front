"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { FiSave, FiArrowLeft, FiPlus, FiTrash2, FiEdit2, FiList, FiMove, FiLock, FiUnlock } from "react-icons/fi";
import Card from "../../../../components/common/Card";
import { courseService, chapterService, lessonService } from "../../../../services/api";

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId;
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [lessons, setLessons] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  // États pour la gestion des chapitres et leçons
  const [showChapterForm, setShowChapterForm] = useState(false);
  const [editingChapter, setEditingChapter] = useState(null);
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [expandedChapters, setExpandedChapters] = useState({});

  // Formulaire chapitre
  const [chapterForm, setChapterForm] = useState({
    title: "",
    description: "",
    order: 1
  });

  // Formulaire leçon
  const [lessonForm, setLessonForm] = useState({
    title: "",
    content: "",
    type: "lecture", // lecture, exercice, quiz
    estimatedDuration: 5,
    xpReward: 10,
    isLocked: false,
    order: 1,
    // Nouvelles propriétés pour les exercices
    startingCode: "",
    solution: "",
    // Nouvelles propriétés pour les quiz
    questions: []
  });

  // Charger les données du cours et ses chapitres
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        
        // Récupérer le cours
        const courseData = await courseService.getCourseById(courseId);
        setCourse(courseData);
        
        // Pré-remplir le formulaire
        reset({
          title: courseData.title,
          description: courseData.description,
          category: courseData.category,
          difficulty: courseData.difficulty,
          image: courseData.image
        });
        
        // Récupérer les chapitres
        const chaptersData = await courseService.getChaptersByCourse(courseId);
        
        // Trier les chapitres par ordre
        const sortedChapters = chaptersData.sort((a, b) => a.order - b.order);
        setChapters(sortedChapters);
        
        // Récupérer les leçons pour chaque chapitre
        const lessonsObj = {};
        
        for (const chapter of sortedChapters) {
          try {
            const chapterLessons = await lessonService.getLessonByChapterId(chapter.id);
            lessonsObj[chapter.id] = chapterLessons.sort((a, b) => a.order - b.order);
          } catch (err) {
            console.warn(`Erreur lors du chargement des leçons pour le chapitre ${chapter.id}:`, err);
            lessonsObj[chapter.id] = [];
          }
        }
        
        setLessons(lessonsObj);
        setError(null);
      } catch (err) {
        console.error("Erreur lors du chargement du cours:", err);
        setError("Impossible de charger les données du cours. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId, reset]);

  // Soumettre les modifications du cours
  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setError(null);

      // Comparer avec les données existantes pour ne modifier que ce qui a changé
      const updatedData = {};
      for (const key in data) {
        if (course[key] !== data[key]) {
          updatedData[key] = data[key];
        }
      }

      // N'envoyer que si des modifications ont été faites
      if (Object.keys(updatedData).length > 0) {
        console.log("Données à mettre à jour:", updatedData);
        const result = await courseService.updateCourse(courseId, updatedData);
        console.log("Cours mis à jour:", result);
      }

      alert("Le cours a été mis à jour avec succès");
    } catch (err) {
      console.error("Erreur lors de la mise à jour du cours:", err);
      
      if (err.response?.data) {
        const errorMessage = Array.isArray(err.response.data.message) 
          ? err.response.data.message.join(", ") 
          : err.response.data.message || "Erreur inconnue";
        
        setError(`Erreur: ${errorMessage}`);
      } else {
        setError("Impossible de mettre à jour le cours. Veuillez réessayer.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Gérer le formulaire de chapitre
  const handleChapterInputChange = (e) => {
    const { name, value } = e.target;
    setChapterForm({
      ...chapterForm,
      [name]: value
    });
  };

  // Ouvrir le formulaire pour ajouter un chapitre
  const addNewChapter = () => {
    setChapterForm({
      title: "",
      description: "",
      order: chapters.length + 1
    });
    setEditingChapter(null);
    setShowChapterForm(true);
  };

  // Ouvrir le formulaire pour éditer un chapitre
  const editChapter = (chapter) => {
    setChapterForm({
      title: chapter.title,
      description: chapter.description || "",
      order: chapter.order || chapters.indexOf(chapter) + 1
    });
    setEditingChapter(chapter);
    setShowChapterForm(true);
  };

  // Sauvegarder un chapitre (création ou modification)
  const saveChapter = async () => {
    try {
      setSubmitting(true);
      
      // Format correct selon l'erreur retournée par l'API
      const chapterData = {
        title: chapterForm.title,
        description: chapterForm.description,
        courseId: parseInt(courseId, 10) // L'API attend un entier, pas une chaîne
      };
      
      console.log("Données envoyées à l'API:", chapterData);
      
      if (editingChapter) {
        // Mise à jour
        const updatedChapter = await chapterService.updateChapter(editingChapter.id, chapterData);
        
        setChapters(prev => prev.map(ch => ch.id === editingChapter.id ? updatedChapter : ch)
          .sort((a, b) => a.order - b.order));
      } else {
        // Création
        const newChapter = await chapterService.createChapter(chapterData);
        
        setChapters(prev => [...prev, newChapter].sort((a, b) => a.order - b.order));
      }
      
      setShowChapterForm(false);
      setEditingChapter(null);
    } catch (err) {
      console.error("Erreur détaillée lors de l'enregistrement du chapitre:", err);
      if (err.response?.data) {
        console.log("Réponse du serveur:", err.response.data);
        
        // Afficher un message d'erreur plus précis
        const errMessages = err.response.data.message;
        const formattedError = Array.isArray(errMessages) 
          ? errMessages.join("\n") 
          : errMessages || "Erreur inconnue";
        
        alert(`Erreur lors de la création du chapitre:\n${formattedError}`);
      } else {
        alert("Une erreur est survenue lors de l'enregistrement du chapitre.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Supprimer un chapitre
  const deleteChapter = async (chapterId) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce chapitre ? Toutes les leçons associées seront également supprimées.")) {
      return;
    }
    
    try {
      await chapterService.deleteChapter(chapterId);
      
      // Mettre à jour l'état local
      setChapters(prev => prev.filter(ch => ch.id !== chapterId));
      
      const newLessons = { ...lessons };
      delete newLessons[chapterId];
      setLessons(newLessons);
      
      // Fermer le formulaire si on éditait ce chapitre
      if (editingChapter && editingChapter.id === chapterId) {
        setShowChapterForm(false);
        setEditingChapter(null);
      }
    } catch (err) {
      console.error("Erreur lors de la suppression du chapitre:", err);
      alert("Une erreur est survenue lors de la suppression du chapitre.");
    }
  };

  // Gérer le formulaire de leçon
  const handleLessonInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLessonForm({
      ...lessonForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Ouvrir le formulaire pour ajouter une leçon
  const addNewLesson = (chapterId) => {
    setLessonForm({
      title: "",
      content: "",
      type: "lecture",
      estimatedDuration: 5,
      xpReward: 10,
      isLocked: false,
      order: lessons[chapterId] ? lessons[chapterId].length + 1 : 1,
      // Initialiser les champs spécifiques
      startingCode: "",
      solution: "",
      questions: []
    });
    setEditingLesson(null);
    setSelectedChapterId(chapterId);
    setShowLessonForm(true);
  };

  // Ouvrir le formulaire pour éditer une leçon
  const editLesson = (lesson, chapterId) => {
    setLessonForm({
      title: lesson.title,
      content: lesson.content || "",
      type: lesson.type || "lecture",
      estimatedDuration: lesson.estimatedDuration || 5,
      xpReward: lesson.xpReward || 10,
      isLocked: lesson.isLocked || false,
      order: lesson.order || lessons[chapterId].indexOf(lesson) + 1,
      // Charger les propriétés spécifiques
      startingCode: lesson.startingCode || "",
      solution: lesson.solution || "",
      questions: lesson.questions || []
    });
    setEditingLesson(lesson);
    setSelectedChapterId(chapterId);
    setShowLessonForm(true);
  };

  // Sauvegarder une leçon (création ou modification)
  const saveLesson = async () => {
    try {
      setSubmitting(true);
      
      // Préparer les données selon le type de leçon
      const lessonData = {
        title: lessonForm.title,
        content: lessonForm.content,
        type: lessonForm.type,
        estimatedDuration: parseInt(lessonForm.estimatedDuration, 10),
        chapterId: parseInt(selectedChapterId, 10),
        
        // Ajouter les propriétés spécifiques selon le type
        ...(lessonForm.type === 'exercice' && {
          startingCode: lessonForm.startingCode,
          solution: lessonForm.solution
        }),
        
        ...(lessonForm.type === 'quiz' && {
          questions: lessonForm.questions
        })
        
        // Note: xpReward et isLocked ne sont pas envoyés à l'API car ils ne sont pas acceptés
      };
      
      console.log("Données leçon envoyées à l'API:", lessonData);
      
      if (editingLesson) {
        // Mise à jour
        const updatedLesson = await lessonService.updateLesson(editingLesson.id, lessonData);
        
        // Conserver les valeurs de l'interface utilisateur qui ne sont pas stockées via l'API
        updatedLesson.xpReward = lessonForm.xpReward;
        updatedLesson.isLocked = lessonForm.isLocked;
        
        setLessons(prev => ({
          ...prev,
          [selectedChapterId]: prev[selectedChapterId]
            .map(l => l.id === editingLesson.id ? updatedLesson : l)
            .sort((a, b) => a.order - b.order)
        }));
      } else {
        // Création
        const newLesson = await lessonService.createLesson(lessonData);
        
        // Ajouter manuellement les propriétés qui ne sont pas dans l'API
        newLesson.xpReward = lessonForm.xpReward;
        newLesson.isLocked = lessonForm.isLocked;
        
        setLessons(prev => ({
          ...prev,
          [selectedChapterId]: [...(prev[selectedChapterId] || []), newLesson]
            .sort((a, b) => a.order - b.order)
        }));
      }
      
      setShowLessonForm(false);
      setEditingLesson(null);
    } catch (err) {
      console.error("Erreur lors de l'enregistrement de la leçon:", err);
      
      if (err.response?.data) {
        console.log("Réponse du serveur pour la leçon:", err.response.data);
        
        // Afficher un message d'erreur précis
        const errMessages = err.response.data.message;
        const formattedError = Array.isArray(errMessages) 
          ? errMessages.join("\n") 
          : errMessages || "Erreur inconnue";
        
        alert(`Erreur lors de l'enregistrement de la leçon:\n${formattedError}`);
      } else {
        alert("Une erreur est survenue lors de l'enregistrement de la leçon.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Supprimer une leçon
  const deleteLesson = async (lessonId, chapterId) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette leçon ?")) {
      return;
    }
    
    try {
      await lessonService.deleteLesson(lessonId);
      
      // Mettre à jour l'état local
      setLessons(prev => ({
        ...prev,
        [chapterId]: prev[chapterId].filter(l => l.id !== lessonId)
      }));
      
      // Fermer le formulaire si on éditait cette leçon
      if (editingLesson && editingLesson.id === lessonId) {
        setShowLessonForm(false);
        setEditingLesson(null);
      }
    } catch (err) {
      console.error("Erreur lors de la suppression de la leçon:", err);
      alert("Une erreur est survenue lors de la suppression de la leçon.");
    }
  };

  // Gérer l'expansion/contraction des chapitres
  const toggleChapter = (chapterId) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  // Affichage pendant le chargement
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FDC758]"></div>
      </div>
    );
  }

  return (
    <div className="edit-course text-white p-6">
      <div className="flex items-center mb-8">
        <button 
          onClick={() => router.push("/admin/courses")}
          className="text-gray-400 hover:text-white mr-4 flex items-center"
        >
          <FiArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-bold">Modifier le cours</h1>
      </div>

      {error && (
        <div className="bg-red-900/30 text-red-300 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Formulaire pour les infos de base du cours */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="bg-[#182b4a] mb-6">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Informations du cours</h2>
            
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Titre du cours*</label>
              <input
                type="text"
                className={`w-full bg-[#253A52] rounded-lg p-3 text-white ${
                  errors.title ? "border border-red-500" : ""
                }`}
                placeholder="Entrez le titre du cours"
                {...register("title", { required: "Le titre est requis" })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Description</label>
              <textarea
                className="w-full bg-[#253A52] rounded-lg p-3 text-white min-h-[120px]"
                placeholder="Décrivez votre cours"
                {...register("description")}
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">Catégorie*</label>
                <select
                  className={`w-full bg-[#253A52] rounded-lg p-3 text-white ${
                    errors.category ? "border border-red-500" : ""
                  }`}
                  {...register("category", { required: "La catégorie est requise" })}
                >
                  <option value="">Sélectionnez une catégorie</option>
                  <option value="web development">Développement web</option>
                  <option value="framework">Framework</option>
                  <option value="programming">Programmation</option>
                  <option value="data science">Science des données</option>
                  <option value="mobile development">Développement mobile</option>
                  <option value="design">Design</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-400 mb-2">Niveau de difficulté*</label>
                <select
                  className={`w-full bg-[#253A52] rounded-lg p-3 text-white ${
                    errors.difficulty ? "border border-red-500" : ""
                  }`}
                  {...register("difficulty", { required: "Le niveau est requis" })}
                >
                  <option value="">Sélectionnez un niveau</option>
                  <option value="beginner">Débutant</option>
                  <option value="intermediate">Intermédiaire</option>
                  <option value="advanced">Avancé</option>
                  <option value="expert">Expert</option>
                </select>
                {errors.difficulty && (
                  <p className="text-red-500 text-sm mt-1">{errors.difficulty.message}</p>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-400 mb-2">URL de l'image*</label>
              <input
                type="text"
                className={`w-full bg-[#253A52] rounded-lg p-3 text-white ${
                  errors.image ? "border border-red-500" : ""
                }`}
                placeholder="URL de l'image de couverture"
                {...register("image", { 
                  required: "L'URL de l'image est requise",
                  maxLength: {
                    value: 255,
                    message: "L'URL ne doit pas dépasser 255 caractères"
                  }
                })}
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Entrez l'URL d'une image en ligne (format recommandé: 1200x800px)
              </p>
            </div>
            
            {course && (
              <div className="mb-6">
                <label className="block text-gray-400 mb-2">Aperçu de l'image actuelle</label>
                <div className="border border-[#253A52] rounded-lg overflow-hidden h-48 bg-[#0a1220] flex items-center justify-center">
                  {course.image ? (
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder-image.jpg";
                        e.target.classList.add("border", "border-red-500");
                      }}
                    />
                  ) : (
                    <div className="text-gray-500">Aucune image disponible</div>
                  )}
                </div>
              </div>
            )}
            
            <div className="mb-6">
              <div className="flex items-center bg-[#253A52]/50 p-4 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-white">Statut de publication</h3>
                  <p className="text-sm text-gray-400">
                    Publier le cours le rendra visible pour les utilisateurs. Les cours non publiés sont uniquement visibles par les administrateurs.
                  </p>
                </div>
                <div className="ml-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      {...register("isPublished")}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0c9]"></div>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#FDC758] hover:bg-[#ffd57e] text-[#0c1524] font-bold py-3 px-6 rounded-lg flex items-center justify-center"
              >
                {submitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#0c1524] mr-2"></div>
                ) : (
                  <FiSave className="mr-2" />
                )}
                Enregistrer les modifications
              </button>
            </div>
          </div>
        </Card>
      </form>

      {/* Section pour gérer les chapitres */}
      <Card className="bg-[#182b4a] mb-6">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Chapitres</h2>
            <button
              onClick={addNewChapter}
              className="bg-[#253A52] hover:bg-[#304d6d] text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              <FiPlus size={18} className="mr-2" /> Ajouter un chapitre
            </button>
          </div>
          
          {chapters.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <FiList size={48} className="mx-auto mb-3 opacity-50" />
              <p>Ce cours n'a pas encore de chapitres.</p>
              <p className="text-sm">Cliquez sur "Ajouter un chapitre" pour commencer.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {chapters.map(chapter => (
                <div key={chapter.id} className="bg-[#1d325a] rounded-lg overflow-hidden">
                  <div 
                    className="p-4 flex items-center justify-between cursor-pointer"
                    onClick={() => toggleChapter(chapter.id)}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#253A52] flex items-center justify-center text-[#FDC758] font-bold mr-3">
                        {chapter.order || chapters.indexOf(chapter) + 1}
                      </div>
                      <div>
                        <h3 className="font-medium">{chapter.title}</h3>
                        {chapter.description && (
                          <p className="text-sm text-gray-400">{chapter.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          editChapter(chapter);
                        }}
                        className="p-2 bg-[#253A52] hover:bg-[#304d6d] text-white rounded transition-colors"
                        title="Modifier ce chapitre"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChapter(chapter.id);
                        }}
                        className="p-2 bg-red-900/30 hover:bg-red-900/50 text-red-400 rounded transition-colors"
                        title="Supprimer ce chapitre"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Leçons du chapitre */}
                  {expandedChapters[chapter.id] && (
                    <div className="border-t border-[#253A52] p-4 bg-[#152238]">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-gray-300 font-medium">Leçons</h4>
                        <button
                          onClick={() => addNewLesson(chapter.id)}
                          className="bg-[#253A52] hover:bg-[#304d6d] text-white px-3 py-1 rounded flex items-center text-sm transition-colors"
                        >
                          <FiPlus size={14} className="mr-1" /> Ajouter une leçon
                        </button>
                      </div>
                      
                      {!lessons[chapter.id] || lessons[chapter.id].length === 0 ? (
                        <div className="text-center py-4 text-gray-400 text-sm">
                          <p>Aucune leçon dans ce chapitre.</p>
                          <p>Ajoutez des leçons pour que vos étudiants puissent apprendre.</p>
                        </div>
                      ) : (
                        <ul className="space-y-2">
                          {lessons[chapter.id].map(lesson => (
                            <li key={lesson.id} className="bg-[#1a2a47] rounded-lg p-3 flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full bg-[#253A52] flex items-center justify-center text-gray-300 text-xs mr-3">
                                  {lesson.order || lessons[chapter.id].indexOf(lesson) + 1}
                                </div>
                                <div>
                                  <div className="flex items-center">
                                    <h5 className="font-medium">{lesson.title}</h5>
                                    {lesson.isLocked && (
                                      <FiLock size={14} className="ml-2 text-gray-400" title="Leçon verrouillée" />
                                    )}
                                  </div>
                                  <div className="flex items-center text-xs mt-1">
                                    <span className={`px-2 py-0.5 rounded-full ${
                                      lesson.type === 'quiz' ? 'bg-purple-900/30 text-purple-300' :
                                      lesson.type === 'lecture' ? 'bg-green-900/30 text-green-300' :
                                      lesson.type === 'exercice' ? 'bg-orange-900/30 text-orange-300' :
                                      'bg-gray-900/30 text-gray-300'
                                    }`}>
                                      {lesson.type === 'quiz' ? 'Quiz' :
                                       lesson.type === 'lecture' ? 'Lecture' :
                                       lesson.type === 'exercice' ? 'Exercice' :
                                       lesson.type || 'Lecture'}
                                    </span>
                                    {lesson.estimatedDuration && (
                                      <span className="ml-2 text-gray-400">{lesson.estimatedDuration} min</span>
                                    )}
                                    {lesson.xpReward && (
                                      <span className="ml-2 text-[#FDC758]">{lesson.xpReward} XP</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => editLesson(lesson, chapter.id)}
                                  className="p-1.5 bg-[#253A52] hover:bg-[#304d6d] text-white rounded transition-colors"
                                  title="Modifier cette leçon"
                                >
                                  <FiEdit2 size={14} />
                                </button>
                                <button
                                  onClick={() => deleteLesson(lesson.id, chapter.id)}
                                  className="p-1.5 bg-red-900/30 hover:bg-red-900/50 text-red-400 rounded transition-colors"
                                  title="Supprimer cette leçon"
                                >
                                  <FiTrash2 size={14} />
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Modal pour ajouter/éditer un chapitre */}
      {showChapterForm && (
        <div className="fixed inset-0 z-40 bg-black/70 flex items-center justify-center">
          <div className="bg-[#182b4a] rounded-xl p-6 w-full max-w-xl">
            <h2 className="text-xl font-bold mb-4">
              {editingChapter ? "Modifier le chapitre" : "Ajouter un chapitre"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Titre du chapitre*</label>
                <input
                  type="text"
                  name="title"
                  value={chapterForm.title}
                  onChange={handleChapterInputChange}
                  className="w-full bg-[#253A52] rounded-lg p-3 text-white"
                  placeholder="Entrez le titre du chapitre"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Description</label>
                <textarea
                  name="description"
                  value={chapterForm.description}
                  onChange={handleChapterInputChange}
                  className="w-full bg-[#253A52] rounded-lg p-3 text-white min-h-[120px]"
                  placeholder="Décrivez le contenu de ce chapitre"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Ordre</label>
                <input
                  type="number"
                  name="order"
                  value={chapterForm.order}
                  onChange={handleChapterInputChange}
                  className="w-full bg-[#253A52] rounded-lg p-3 text-white"
                  placeholder="Position du chapitre dans le cours"
                  min="1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Position du chapitre dans la liste des chapitres du cours
                </p>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowChapterForm(false);
                    setEditingChapter(null);
                  }}
                  className="px-4 py-2 bg-[#253A52] hover:bg-[#304d6d] text-white rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={saveChapter}
                  disabled={submitting || !chapterForm.title}
                  className="px-4 py-2 bg-[#FDC758] hover:bg-[#ffd57e] text-[#0c1524] font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal pour ajouter/éditer une leçon */}
      {showLessonForm && (
        <div className="fixed inset-0 z-40 bg-black/70 flex items-center justify-center">
          <div className="bg-[#182b4a] rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingLesson ? "Modifier la leçon" : "Ajouter une leçon"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Titre de la leçon*</label>
                <input
                  type="text"
                  name="title"
                  value={lessonForm.title}
                  onChange={handleLessonInputChange}
                  className="w-full bg-[#253A52] rounded-lg p-3 text-white"
                  placeholder="Entrez le titre de la leçon"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Type de leçon*</label>
                <select
                  name="type"
                  value={lessonForm.type}
                  onChange={handleLessonInputChange}
                  className="w-full bg-[#253A52] rounded-lg p-3 text-white"
                >
                  <option value="lecture">Lecture</option>
                  <option value="exercice">Exercice</option>
                  <option value="quiz">Quiz</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Durée estimée (minutes)</label>
                  <input
                    type="number"
                    name="estimatedDuration"
                    value={lessonForm.estimatedDuration}
                    onChange={handleLessonInputChange}
                    className="w-full bg-[#253A52] rounded-lg p-3 text-white"
                    min="1"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 mb-2">Récompense XP</label>
                  <input
                    type="number"
                    name="xpReward"
                    value={lessonForm.xpReward}
                    onChange={handleLessonInputChange}
                    className="w-full bg-[#253A52] rounded-lg p-3 text-white"
                    min="0"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Ordre</label>
                  <input
                    type="number"
                    name="order"
                    value={lessonForm.order}
                    onChange={handleLessonInputChange}
                    className="w-full bg-[#253A52] rounded-lg p-3 text-white"
                    min="1"
                  />
                </div>
                
                <div className="flex items-center h-full pt-8">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="isLocked"
                      checked={lessonForm.isLocked}
                      onChange={handleLessonInputChange}
                      className="mr-2 h-4 w-4"
                    />
                    <span className="flex items-center">
                      <FiLock size={16} className="mr-2" /> 
                      Leçon verrouillée
                    </span>
                  </label>
                </div>
              </div>
              
              {/* Contenu adaptatif selon le type de leçon */}
              {lessonForm.type === "lecture" && (
                <div>
                  <label className="block text-gray-400 mb-2">Contenu de la lecture</label>
                  <textarea
                    name="content"
                    value={lessonForm.content}
                    onChange={handleLessonInputChange}
                    className="w-full bg-[#253A52] rounded-lg p-3 text-white min-h-[200px]"
                    placeholder="Contenu de la leçon (HTML supporté)"
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">
                    Vous pouvez utiliser du HTML pour formater le contenu.
                  </p>
                </div>
              )}

              {lessonForm.type === "exercice" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 mb-2">Instructions de l'exercice</label>
                    <textarea
                      name="content"
                      value={lessonForm.content}
                      onChange={handleLessonInputChange}
                      className="w-full bg-[#253A52] rounded-lg p-3 text-white min-h-[100px]"
                      placeholder="Décrivez l'exercice à réaliser"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 mb-2">Code de départ (optionnel)</label>
                    <textarea
                      name="startingCode"
                      value={lessonForm.startingCode || ""}
                      onChange={handleLessonInputChange}
                      className="w-full bg-[#253A52] rounded-lg p-3 text-white min-h-[100px] font-mono"
                      placeholder="Code initial fourni à l'étudiant"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 mb-2">Solution attendue (optionnel)</label>
                    <textarea
                      name="solution"
                      value={lessonForm.solution || ""}
                      onChange={handleLessonInputChange}
                      className="w-full bg-[#253A52] rounded-lg p-3 text-white min-h-[100px] font-mono"
                      placeholder="Solution de référence pour l'exercice"
                    ></textarea>
                  </div>
                </div>
              )}

              {lessonForm.type === "quiz" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 mb-2">Introduction au quiz</label>
                    <textarea
                      name="content"
                      value={lessonForm.content}
                      onChange={handleLessonInputChange}
                      className="w-full bg-[#253A52] rounded-lg p-3 text-white min-h-[80px]"
                      placeholder="Introduction optionnelle pour le quiz"
                    ></textarea>
                  </div>
                  
                  <div className="bg-[#1d325a] p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-white">Questions</h3>
                      <button
                        type="button"
                        onClick={() => {
                          // Ajouter une nouvelle question
                          const newQuestions = [...(lessonForm.questions || []), {
                            question: "",
                            options: ["", "", "", ""],
                            correctOption: 0
                          }];
                          setLessonForm({...lessonForm, questions: newQuestions});
                        }}
                        className="bg-[#253A52] hover:bg-[#304d6d] text-white px-3 py-1 rounded flex items-center text-sm transition-colors"
                      >
                        <FiPlus size={14} className="mr-1" /> Ajouter une question
                      </button>
                    </div>
                    
                    {(!lessonForm.questions || lessonForm.questions.length === 0) ? (
                      <div className="text-center text-gray-400 py-4">
                        <p>Aucune question ajoutée</p>
                        <p className="text-sm">Cliquez sur "Ajouter une question" pour commencer</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {(lessonForm.questions || []).map((question, qIndex) => (
                          <div key={qIndex} className="bg-[#152238] p-4 rounded-lg">
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="font-medium text-white">Question {qIndex + 1}</h4>
                              <button
                                type="button"
                                onClick={() => {
                                  // Supprimer cette question
                                  const newQuestions = [...lessonForm.questions];
                                  newQuestions.splice(qIndex, 1);
                                  setLessonForm({...lessonForm, questions: newQuestions});
                                }}
                                className="text-red-400 hover:text-red-300"
                              >
                                <FiTrash2 size={16} />
                              </button>
                            </div>
                            
                            <div className="mb-3">
                              <input
                                type="text"
                                value={question.question}
                                onChange={(e) => {
                                  const newQuestions = [...lessonForm.questions];
                                  newQuestions[qIndex].question = e.target.value;
                                  setLessonForm({...lessonForm, questions: newQuestions});
                                }}
                                className="w-full bg-[#253A52] rounded-lg p-3 text-white"
                                placeholder="Texte de la question"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              {question.options.map((option, oIndex) => (
                                <div key={oIndex} className="flex items-center">
                                  <input
                                    type="radio"
                                    name={`correctOption-${qIndex}`}
                                    checked={question.correctOption === oIndex}
                                    onChange={() => {
                                      const newQuestions = [...lessonForm.questions];
                                      newQuestions[qIndex].correctOption = oIndex;
                                      setLessonForm({...lessonForm, questions: newQuestions});
                                    }}
                                    className="mr-3"
                                  />
                                  <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => {
                                      const newQuestions = [...lessonForm.questions];
                                      newQuestions[qIndex].options[oIndex] = e.target.value;
                                      setLessonForm({...lessonForm, questions: newQuestions});
                                    }}
                                    className="w-full bg-[#253A52] rounded-lg p-2 text-white"
                                    placeholder={`Option ${oIndex + 1}`}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-gray-400 mb-2">Contenu</label>
                <textarea
                  name="content"
                  value={lessonForm.content}
                  onChange={handleLessonInputChange}
                  className="w-full bg-[#253A52] rounded-lg p-3 text-white min-h-[200px]"
                  placeholder="Contenu de la leçon (HTML supporté)"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  Pour les leçons de type lecture, vous pouvez utiliser du HTML pour formater le contenu.
                  Pour les quiz, vous devez ajouter les questions dans l'éditeur spécifique (à venir).
                </p>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowLessonForm(false);
                    setEditingLesson(null);
                  }}
                  className="px-4 py-2 bg-[#253A52] hover:bg-[#304d6d] text-white rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={saveLesson}
                  disabled={submitting || !lessonForm.title}
                  className="px-4 py-2 bg-[#FDC758] hover:bg-[#ffd57e] text-[#0c1524] font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}