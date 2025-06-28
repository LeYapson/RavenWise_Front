/**
 * Utilitaires pour la gestion de l'état de complétion des leçons
 * Ces fonctions permettent de persister l'état de complétion côté client
 * en utilisant localStorage
 */

export const STORAGE_KEY = 'completedLessons';

/**
 * Récupérer toutes les leçons complétées depuis localStorage
 * @returns {Object} Objet contenant les leçons complétées indexées par ID
 */
export const getCompletedLessons = () => {
  try {
    // Vérifier si localStorage est disponible (côté client uniquement)
    if (typeof window === 'undefined' || !window.localStorage) {
      return {};
    }
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
    // Vérifier si localStorage est disponible (côté client uniquement)
    if (typeof window === 'undefined' || !window.localStorage) {
      console.warn('localStorage non disponible, impossible de sauvegarder la complétion');
      return;
    }
    
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
 * @param {string} userId - ID de l'utilisateur (optionnel, pour sync API)
 */
export const unmarkLessonAsCompleted = async (lessonId, userId = null) => {
  try {
    // Supprimer du localStorage d'abord
    const completedLessons = getCompletedLessons();
    delete completedLessons[lessonId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedLessons));

    // Tenter de synchroniser avec l'API si userId fourni
    if (userId) {
      try {
        await lessonService.unmarkLessonAsCompleted(userId, lessonId);
        console.log(`Leçon ${lessonId} retirée des leçons complétées (API + localStorage)`);
      } catch (error) {
        console.warn(`Erreur API lors du démarquage de la leçon ${lessonId}, localStorage utilisé:`, error);
      }
    } else {
      console.log(`Leçon ${lessonId} retirée des leçons complétées (localStorage uniquement)`);
    }
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
 * Synchroniser les données de complétion avec l'API backend
 * @param {string} userId - ID de l'utilisateur
 * @returns {Object} Résultat de la synchronisation
 */
export const syncCompletionWithAPI = async (userId) => {
  if (!userId) {
    console.warn('syncCompletionWithAPI: userId requis');
    return { success: false, error: 'userId requis' };
  }

  try {
    // Récupérer les données depuis l'API
    const apiCompletedLessons = await lessonService.getIdOfFinishedLessonsOfSpecificUser(userId);
    
    // Récupérer les données depuis localStorage
    const localCompletedLessons = getCompletedLessons();
    
    // Créer un Set des IDs depuis l'API (en filtrant les null/undefined)
    const apiLessonIds = new Set();
    if (Array.isArray(apiCompletedLessons)) {
      apiCompletedLessons.forEach(id => {
        if (id !== null && id !== undefined) {
          apiLessonIds.add(String(id));
        }
      });
    }
    
    // Fusionner les données (priorité à l'API)
    const mergedCompletions = { ...localCompletedLessons };
    
    // Ajouter les leçons complétées depuis l'API qui ne sont pas en local
    apiLessonIds.forEach(lessonId => {
      if (!mergedCompletions[lessonId]) {
        mergedCompletions[lessonId] = {
          completedAt: new Date().toISOString(),
          source: 'api'
        };
      }
    });
    
    // Sauvegarder les données fusionnées
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedCompletions));
    
    console.log(`Synchronisation terminée: ${apiLessonIds.size} leçons depuis l'API, ${Object.keys(localCompletedLessons).length} en local`);
    
    return {
      success: true,
      apiCount: apiLessonIds.size,
      localCount: Object.keys(localCompletedLessons).length,
      mergedCount: Object.keys(mergedCompletions).length
    };
    
  } catch (error) {
    if (error.message === 'ENDPOINT_NOT_AVAILABLE') {
      console.log('syncCompletionWithAPI: Endpoint non disponible, utilisation du localStorage uniquement');
      return { success: true, fallback: true };
    } else {
      console.error('Erreur lors de la synchronisation avec l\'API:', error);
      return { success: false, error: error.message };
    }
  }
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
