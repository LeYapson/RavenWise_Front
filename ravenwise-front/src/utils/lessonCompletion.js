/**
 * Utilitaires pour la gestion de l'état de complétion des leçons
 * Ces fonctions permettent de persister l'état de complétion côté client
 * en attendant que les endpoints API de complétion soient disponibles
 */

export const STORAGE_KEY = 'completedLessons';

/**
 * Récupérer toutes les leçons complétées depuis localStorage
 * @returns {Object} Objet contenant les leçons complétées indexées par ID
 */
export const getCompletedLessons = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Erreur lors de la lecture des leçons complétées:', error);
    return {};
  }
};

/**
 * Vérifier si une leçon spécifique est complétée
 * @param {string|number} lessonId - ID de la leçon
 * @returns {boolean} True si la leçon est complétée
 */
export const isLessonCompleted = (lessonId) => {
  const completedLessons = getCompletedLessons();
  return !!completedLessons[lessonId];
};

/**
 * Marquer une leçon comme complétée
 * @param {string|number} lessonId - ID de la leçon
 * @param {Object} metadata - Métadonnées de la leçon (courseId, chapterId, type, etc.)
 */
export const markLessonAsCompleted = (lessonId, metadata = {}) => {
  try {
    const completedLessons = getCompletedLessons();
    completedLessons[lessonId] = {
      completedAt: new Date().toISOString(),
      ...metadata
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedLessons));
    console.log(`Leçon ${lessonId} marquée comme complétée`);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la complétion:', error);
  }
};

/**
 * Désmarquer une leçon comme complétée
 * @param {string|number} lessonId - ID de la leçon
 */
export const unmarkLessonAsCompleted = (lessonId) => {
  try {
    const completedLessons = getCompletedLessons();
    delete completedLessons[lessonId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedLessons));
    console.log(`Leçon ${lessonId} retirée des leçons complétées`);
  } catch (error) {
    console.error('Erreur lors de la suppression de la complétion:', error);
  }
};

/**
 * Obtenir les statistiques de complétion pour un cours
 * @param {string|number} courseId - ID du cours
 * @returns {Object} Statistiques de complétion
 */
export const getCourseCompletionStats = (courseId) => {
  const completedLessons = getCompletedLessons();
  const courseLessons = Object.entries(completedLessons).filter(
    ([, data]) => data.courseId === courseId
  );
  
  return {
    totalCompleted: courseLessons.length,
    lastCompletedAt: courseLessons.length > 0 
      ? Math.max(...courseLessons.map(([, data]) => new Date(data.completedAt).getTime()))
      : null,
    completedLessonIds: courseLessons.map(([id]) => id)
  };
};

/**
 * Nettoyer les données de complétion obsolètes (plus de 30 jours)
 * Cette fonction peut être appelée périodiquement pour maintenir le localStorage propre
 */
export const cleanupOldCompletions = () => {
  try {
    const completedLessons = getCompletedLessons();
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    const cleaned = Object.fromEntries(
      Object.entries(completedLessons).filter(([, data]) => {
        const completedAt = new Date(data.completedAt);
        return completedAt > thirtyDaysAgo;
      })
    );
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
    console.log('Nettoyage des données de complétion effectué');
  } catch (error) {
    console.error('Erreur lors du nettoyage des données:', error);
  }
};
