import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.59:3000/api/v1';

// Créer une instance axios avec configuration de base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Services pour les cours
export const courseService = {
  getAllCourses: async (filters = {}) => {
    const response = await api.get('/courses', { params: filters });
    return response.data;
  },
  getCourseById: async (id) => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },
  createCourse: async (courseData) => {
    const response = await api.post('/courses', courseData);
    return response.data;
  },
  getPublishedCourses: async () => {
    const response = await api.get('/courses?published=true');
    return response.data;
  },
  getChaptersByCourse: async (courseId) => {
    const response = await api.get(`/courses/${courseId}/chapters`);
    return response.data;
  },
  updateCourse: async (id, courseData) => {
    const response = await api.patch(`/courses/${id}`, courseData);
    return response.data;
  },
  deleteCourse: async (id) => {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  }
};

// Services pour les chapitres
export const chapterService = {
  createChapter: async (chapterData) => {
    const response = await api.post(`/chapters`, chapterData);
    return response.data;
  },
  getAllChapters: async () => {
    const response = await api.get('/chapters');
    return response.data;
  },
  getChapterById: async (id) => {
    const response = await api.get(`/chapters/${id}`);
    return response.data;
  },
  getChaptersByCourse: async (courseId) => {
    const response = await api.get(`/chapters/course/${courseId}`);
    return response.data;
  },
  getNumberOfChaptersByCourse: async (courseId) => {
    const response = await api.get(`/chapters/course/${courseId}/count`);
    return response.data;
  },
  deleteChapter: async (id) => {
    const response = await api.delete(`/chapters/${id}`);
    return response.data;
  },
};

// Services pour les utilisateurs
export const userService = {
  createUser: async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  getIfUserExistById: async (id) => {
    const response = await api.get(`/users/${id}/exists`);
    return response.data;
  },
  getFollowedCoursesOfUser: async (Id) => {
    const response = await api.get(`/users/${Id}/courses`);
    return response.data;
  },
  followCourseById: async (Id, courseId) => {
    console.log(`[API] Ajout du cours ${courseId} pour l'utilisateur ${Id}`);
    const response = await api.post(`/users/${Id}/courses`, { courseId });
    return response.data;
  },
  updateUser: async (clerkId, userData) => {
    const response = await api.patch(`/users/${clerkId}`, userData);
    return response.data;
  },
  unfollowCourseById: async (Id, courseId) => {
    console.log(`[API] Suppression du cours ${courseId} pour l'utilisateur ${Id}`);
    const response = await api.delete(`/users/${Id}/courses`, {data: { courseId }});
    return response.data;
  },
  deleteUser: async (clerkId) => {
    const response = await api.delete(`/users/${clerkId}`);
    return response.data;
  },
  // Créer un utilisateur avec l'ID Clerk
  createUser: async (userData) => {
    console.log("[API] Données envoyées pour la création:", userData);
    try {
      // S'assurer que tous les champs requis sont présents
      const userToCreate = {
        clerkId: userData.clerkId,
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        //imageUrl: userData.imageUrl || "",
        role: userData.role || "free",
        // Ajoutez d'autres champs requis par votre API
      };
      
      const response = await api.post('/users', userToCreate);
      console.log("[API] Utilisateur créé:", response.data);
      return response.data;
    } catch (error) {
      console.error("[API] Erreur détaillée:", error.response?.data);
      throw error;
    }
  },
  // Chercher un utilisateur par son ID Clerk
  getUserByClerkId: async (clerkId) => {
    console.log("[API] Récupération utilisateur par clerkId:", clerkId);
    try {
      const response = await api.get(`/users/${clerkId}`);
      console.log("[API] Réponse:", response.data);
      return response.data;
    } catch (error) {
      console.error("[API] Erreur lors de la récupération de l'utilisateur:", error.response?.data || error.message);
      throw error;
    }
  },
  // Mettre à jour un utilisateur par son ID Clerk
  updateUserByClerkId: async (clerkId, userData) => {
    console.log("[API] Mise à jour utilisateur:", { clerkId, ...userData });
    const response = await api.patch(`/users/${clerkId}`, userData);
    return response.data;
  },
  // Synchroniser les données Clerk avec notre base de données
  syncWithClerk: async (userData) => {
    try {
      console.log("API: Tentative de récupération de l'utilisateur:", userData.clerkId);
      // Essayer de récupérer l'utilisateur existant
      let existingUser;
      try {
        existingUser = await userService.getUserByClerkId(userData.clerkId);
        console.log("API: Utilisateur existant trouvé:", existingUser);
      } catch (e) {
        console.log("API: Utilisateur non trouvé:", e.message);
        existingUser = null;
      }
      
      // Si l'utilisateur existe, le mettre à jour
      if (existingUser) {
        console.log("API: Mise à jour de l'utilisateur");
        return await userService.updateUserByClerkId(userData.clerkId, userData);
      } 
      // Sinon, créer un nouvel utilisateur
      else {
        console.log("API: Création d'un nouvel utilisateur");
        return await userService.createUser(userData);
      }
    } catch (error) {
      console.error("API: Erreur dans syncWithClerk:", error);
      throw error;
    }
  },
  // Mettre à jour uniquement le rôle d'un utilisateur par son ID Clerk
updateUserRole: async (clerkId, newRole) => {
  console.log(`[API] Mise à jour du rôle: utilisateur ${clerkId} → ${newRole}`);
  try {
    // Envoi uniquement du champ 'role' pour la mise à jour
    const response = await api.patch(`/users/${clerkId}`, { role: newRole });
    console.log("[API] Rôle utilisateur mis à jour:", response.data);
    return response.data;
  } catch (error) {
    console.error("[API] Erreur lors de la mise à jour du rôle:", error.response?.data || error.message);
    throw error;
  }
}
};

//services pour les leçons
export const lessonService = {
  createLesson: async (lessonData) => {
    const response = await api.post('/lessons', lessonData);
    return response.data;
  },
  getAllLessons: async () => {
    const response = await api.get('/lessons');
    return response.data;
  },
  getLessonByChapterId: async (chapterId) => {
    const response = await api.get(`/lessons?chapterId=${chapterId}`);
    return response.data;
  },
  // Nouvelle méthode pour récupérer une leçon par ID
  getLessonById: async (id) => {
    const response = await api.get(`/lessons/${id}`);
    return response.data;
  },
  // Méthode pour marquer une leçon comme terminée (avec fallback)
  completeLessonById: async (id) => {
    try {
      // Essayer l'endpoint générique de complétion de leçon
      const response = await api.post(`/lessons/${id}/complete`);
      return response.data;
    } catch (error) {
      // Si l'endpoint n'existe pas (404), lancer une erreur spécifique
      if (error.response?.status === 404) {
        throw new Error('ENDPOINT_NOT_AVAILABLE');
      }
      // Pour d'autres erreurs, les relancer
      throw error;
    }
  },
  // Nouvelle méthode pour mettre à jour une leçon
  updateLesson: async (id, lessonData) => {
    const response = await api.patch(`/lessons/${id}`, lessonData);
    return response.data;
  },
  // Nouvelle méthode pour supprimer une leçon
  deleteLesson: async (id) => {
    const response = await api.delete(`/lessons/${id}`);
    return response.data;
  }
};

//services pour les exercices
export const exerciseService = {
  createExercice: async (exerciseData) => {
    const response = await api.post('/exercices', exerciseData);
    return response.data;
  },
  getExcerciseById: async (id) => {
    const response = await api.get(`/exercices/${id}`);
    return response.data;
  },
  // Méthode pour marquer un exercice comme terminé (avec fallback)
  completeExercice: async (id) => {
    try {
      // Essayer l'endpoint spécialisé d'abord
      const response = await api.post(`/exercices/${id}/complete`);
      return response.data;
    } catch (error) {
      // Si l'endpoint n'existe pas (404), lancer une erreur spécifique
      if (error.response?.status === 404) {
        throw new Error('ENDPOINT_NOT_AVAILABLE');
      }
      // Pour d'autres erreurs, les relancer
      throw error;
    }
  }
};

//services pour les lectures
export const lecturesService = {
  createLecture: async (lecturesData) => {
    const response = await api.post('/lectures', lecturesData);
    return response.data;
  },
  getLectureById: async (id) => {
    const response = await api.get(`/lectures/${id}`);
    return response.data;
  },
  // Méthode pour marquer une lecture comme terminée (avec fallback)
  completeLecture: async (id) => {
    try {
      // Essayer l'endpoint spécialisé d'abord
      const response = await api.post(`/lectures/${id}/complete`);
      return response.data;
    } catch (error) {
      // Si l'endpoint n'existe pas (404), lancer une erreur spécifique
      if (error.response?.status === 404) {
        throw new Error('ENDPOINT_NOT_AVAILABLE');
      }
      // Pour d'autres erreurs, les relancer
      throw error;
    }
  }
};

//services pour les quizzes
export const quizzesService = {
  getQuizByIdWithAnswers: async (id) => {
    const response = await api.get(`/quizzes/${id}/with-answers`);
    return response.data;
  },
  createQuizAndAnswers: async (quizData) => {
    const response = await api.post('/quizzes/with-answers', quizData);
    return response.data;
  },
  answerQuiz: async (quizId, answers) => {
    const response = await api.post(`/quizzes/${quizId}/validate`, { answers });
    return response.data;
  },
  // Méthode pour récupérer un quiz par ID
  getQuizById: async (id) => {
    const response = await api.get(`/quizzes/${id}`);
    return response.data;
  },
  // Méthode pour marquer un quiz comme terminé (avec fallback)
  completeQuiz: async (id) => {
    try {
      // Essayer l'endpoint spécialisé d'abord
      const response = await api.post(`/quizzes/${id}/complete`);
      return response.data;
    } catch (error) {
      // Si l'endpoint n'existe pas (404), lancer une erreur spécifique
      if (error.response?.status === 404) {
        throw new Error('ENDPOINT_NOT_AVAILABLE');
      }
      // Pour d'autres erreurs, les relancer
      throw error;
    }
  }
};

//services pour la communauté
export const communityService = {
  //publications - Support uniquement GET, POST, DELETE (pas d'UPDATE/PATCH)
  createPublication: async (publicationData) => {
    console.log('[API] Création publication avec données:', publicationData);
    const response = await api.post('/publications', publicationData);
    return response.data;
  },
  getAllPublications: async () => {
    const response = await api.get('/publications');
    return response.data;
  },
  getPublicationById: async (id) => {
    const response = await api.get(`/publications/${id}`);
    return response.data;
  },
  getAllPublicationsByCategory: async (category) => {
    const response = await api.get('/publications', { params: { category } });
    return response.data;
  },
  deletePublication: async (id) => {
    const response = await api.delete(`/publications/${id}`);
    return response.data;
  },
  //Messages - Support uniquement GET, POST, DELETE (pas d'UPDATE/PATCH)
  createMessage: async (messageData) => {
    console.log('[API] Création message avec données:', messageData);
    const response = await api.post('/messages', messageData);
    return response.data;
  },
  getAllMessages: async () => {
    const response = await api.get('/messages');
    return response.data;
  },
  getAllMessageByUserId: async (id) => {
    const response = await api.get(`/messages/user/${id}`);
    return response.data;
  },
  getAllMessagesByPublicationId: async (publicationId) => {
    const response = await api.get(`/messages/publication/${publicationId}`);
    return response.data;
  },
  deleteMessage: async (id) => {
    const response = await api.delete(`/messages/${id}`);
    return response.data;
  },
}