import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

// Créer une instance axios avec configuration de base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token d'authentification
let getToken = null;

// Fonction pour définir le getter de token (sera appelée depuis le contexte Clerk)
export const setTokenGetter = (tokenGetter) => {
  getToken = tokenGetter;
};

api.interceptors.request.use(async (config) => {
  if (typeof window !== 'undefined' && getToken) {
    try {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn('Impossible de récupérer le token d\'authentification:', error);
    }
  }
  return config;
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
    console.log(`[getLessonById] Récupération de la leçon ${id}`);
    const response = await api.get(`/lessons/${id}`);
    const lesson = response.data;
    console.log(`[getLessonById] Leçon récupérée:`, lesson);
    
    // Enrichir les données selon le type de leçon
    if (lesson.type === 'quiz') {
      console.log(`[getLessonById] Quiz détecté, récupération des questions pour la leçon ID ${lesson.id}`);
      try {
        const quizResponse = await api.get(`/quizzes/by-lesson/${lesson.id}`);
        const quizData = quizResponse.data;
        console.log(`[getLessonById] Données quiz récupérées:`, quizData);
        
        // Adapter le format des questions pour qu'il soit compatible avec le composant QuizView
        if (quizData.question && quizData.answers) {
          lesson.questions = [{
            id: 0,
            question: quizData.question,
            options: quizData.answers.map(answer => answer.answer),
            correctAnswer: quizData.answers.findIndex(answer => answer.isCorrect)
          }];
          console.log(`[getLessonById] Questions formatées:`, lesson.questions);
        } else {
          console.warn(`[getLessonById] Format de données quiz inattendu:`, quizData);
          lesson.questions = [];
        }
      } catch (quizError) {
        console.error(`[getLessonById] Erreur lors du chargement des questions pour le quiz de la leçon ${id}:`, quizError);
        console.log(`[getLessonById] Détails de l'erreur:`, {
          status: quizError.response?.status,
          statusText: quizError.response?.statusText,
          data: quizError.response?.data
        });
        lesson.questions = [];
      }
    } else if (lesson.type === 'exercice') {
      console.log(`[getLessonById] Exercice détecté, récupération des données pour la leçon ID ${lesson.id}`);
      try {
        const exerciceResponse = await api.get(`/exercices/by-lesson/${lesson.id}`);
        const exerciceData = exerciceResponse.data;
        console.log(`[getLessonById] Données exercice récupérées:`, exerciceData);
        
        // Enrichir la leçon avec les données spécifiques à l'exercice
        lesson.startingCode = exerciceData.startingCode || '';
        lesson.solution = exerciceData.solution || '';
      } catch (exerciceError) {
        console.error(`[getLessonById] Erreur lors du chargement des données pour l'exercice de la leçon ${id}:`, exerciceError);
        lesson.startingCode = '';
        lesson.solution = '';
      }
    } else if (lesson.type === 'lecture') {
      console.log(`[getLessonById] Lecture détectée, récupération des données pour la leçon ID ${lesson.id}`);
      try {
        const lectureResponse = await api.get(`/lectures/by-lesson/${lesson.id}`);
        const lectureData = lectureResponse.data;
        console.log(`[getLessonById] Données lecture récupérées:`, lectureData);
        
        // Enrichir la leçon avec les données spécifiques à la lecture (si nécessaire)
        // Par exemple, si la lecture a du contenu enrichi, des médias, etc.
        if (lectureData.content) {
          lesson.content = lectureData.content;
        }
      } catch (lectureError) {
        console.error(`[getLessonById] Erreur lors du chargement des données pour la lecture de la leçon ${id}:`, lectureError);
        // Pour les lectures, on garde le contenu de base de la leçon
      }
    }
    
    console.log(`[getLessonById] Leçon finale retournée:`, lesson);
    return lesson;
  },
  
  getIdOfFinishedLessonsOfSpecificUser: async (id) => {
    try {
      // Essayer l'endpoint générique de complétion de leçon
      const response = await api.get(`/users/${id}/lessons`);
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
  }
};

//services pour les quizzes
export const quizzesService = {
  getQuizByIdWithAnswers: async (id) => {
    const response = await api.get(`/quizzes/${id}/with-answers`);
    return response.data;
  },
  getQuizByLessonId: async (lessonId) => {
    // Récupérer le quiz associé à cette leçon
    const response = await api.get(`/quizzes/by-lesson/${lessonId}`);
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
  updateQuiz: async (id, quizData) => {
    const response = await api.patch(`/quizzes/${id}`, quizData);
    return response.data;
  }
};

//services pour les exercices
export const exercicesService = {
  getExerciceByLessonId: async (lessonId) => {
    // Récupérer l'exercice associé à cette leçon
    const response = await api.get(`/exercices/by-lesson/${lessonId}`);
    return response.data;
  },
  createExercice: async (exerciceData) => {
    console.log("=== API Call: POST /exercices ===");
    
    // Assurer que les champs requis sont présents d'après la structure API observée
    const completeData = {
      lessonId: exerciceData.lessonId,
      startingCode: exerciceData.startingCode || "",
      solution: exerciceData.solution || "",
      content: exerciceData.content || "",
      deposit: exerciceData.deposit || ""
    };
    
    console.log("Payload being sent:", JSON.stringify(completeData, null, 2));
    
    try {
      const response = await api.post('/exercices', completeData);
      console.log("Response received:", response.data);
      return response.data;
    } catch (error) {
      console.error("=== ERROR: POST /exercices ===");
      console.error("Status:", error.response?.status);
      console.error("Status Text:", error.response?.statusText);
      console.error("Error Data:", error.response?.data);
      console.error("Error Message:", error.message);
      
      // Log détaillé pour débogage
      if (error.response?.data) {
        console.error("Response body:", JSON.stringify(error.response.data, null, 2));
      }
      
      throw error;
    }
  },
  // Fonction de test pour différents formats
  testCreateExercice: async (exerciceData) => {
    const formats = [
      { 
        name: "complete_with_content_and_deposit", 
        endpoint: "/exercices",
        data: {
          lessonId: exerciceData.lessonId,
          startingCode: exerciceData.startingCode || "",
          solution: exerciceData.solution || "",
          content: exerciceData.content || "",
          deposit: exerciceData.deposit || ""
        }
      },
      { 
        name: "camelCase_standard", 
        endpoint: "/exercices",
        data: exerciceData 
      },
      { 
        name: "snake_case_standard", 
        endpoint: "/exercices",
        data: {
          lesson_id: exerciceData.lessonId,
          starting_code: exerciceData.startingCode,
          solution: exerciceData.solution,
          content: exerciceData.content || "",
          deposit: exerciceData.deposit || ""
        }
      },
      { 
        name: "without_empty_strings", 
        endpoint: "/exercices",
        data: {
          lessonId: exerciceData.lessonId,
          ...(exerciceData.startingCode && { startingCode: exerciceData.startingCode }),
          ...(exerciceData.solution && { solution: exerciceData.solution }),
          ...(exerciceData.content && { content: exerciceData.content }),
          ...(exerciceData.deposit && { deposit: exerciceData.deposit })
        }
      },
      { 
        name: "with_nulls", 
        endpoint: "/exercices",
        data: {
          lessonId: exerciceData.lessonId,
          startingCode: exerciceData.startingCode || null,
          solution: exerciceData.solution || null,
          content: exerciceData.content || null,
          deposit: exerciceData.deposit || null
        }
      }
    ];
    
    for (const format of formats) {
      console.log(`=== TESTING FORMAT: ${format.name} ===`);
      console.log("Endpoint:", format.endpoint);
      console.log("Data:", JSON.stringify(format.data, null, 2));
      
      try {
        const response = await api.post(format.endpoint, format.data);
        console.log(`✅ SUCCESS with ${format.name}:`, response.data);
        return response.data;
      } catch (error) {
        console.log(`❌ FAILED with ${format.name}:`, error.response?.status, error.response?.data || error.message);
      }
    }
    
    throw new Error("All formats failed");
  },
  getExerciceById: async (id) => {
    const response = await api.get(`/exercices/${id}`);
    return response.data;
  },
  getAllExercices: async () => {
    const response = await api.get('/exercices');
    return response.data;
  },
  updateExercice: async (id, exerciceData) => {
    const response = await api.patch(`/exercices/${id}`, exerciceData);
    return response.data;
  }
};

//services pour les lectures
export const lecturesService = {
  getLectureByLessonId: async (lessonId) => {
    // Récupérer la lecture associée à cette leçon
    const response = await api.get(`/lectures/by-lesson/${lessonId}`);
    return response.data;
  },
  createLecture: async (lectureData) => {
    const response = await api.post('/lectures', lectureData);
    return response.data;
  },
  updateLecture: async (id, lectureData) => {
    const response = await api.patch(`/lectures/${id}`, lectureData);
    return response.data;
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
    const publications = response.data;
    
    // Enrichir chaque publication avec le nombre de messages et les informations de l'auteur
    if (Array.isArray(publications)) {
      const enrichedPublications = await Promise.all(
        publications.map(async (publication) => {
          try {
            // Récupérer les messages pour cette publication
            const messages = await communityService.getAllMessagesByPublicationId(publication.id);
            
            // Enrichir avec les informations de l'auteur si elles manquent
            let enrichedPublication = {
              ...publication,
              messagesCount: Array.isArray(messages) ? messages.length : 0
            };
            
            // Si on n'a pas d'informations complètes sur l'auteur, essayer de les récupérer
            if (publication.authorClerkId && (!publication.author || !publication.author.firstName)) {
              try {
                const authorData = await userService.getUserByClerkId(publication.authorClerkId);
                enrichedPublication = {
                  ...enrichedPublication,
                  author: {
                    ...publication.author,
                    firstName: authorData.firstName,
                    lastName: authorData.lastName,
                    name: authorData.firstName && authorData.lastName ? 
                      `${authorData.firstName} ${authorData.lastName}` : 
                      authorData.firstName || 'Utilisateur',
                    imageUrl: authorData.imageUrl,
                    clerkId: authorData.clerkId
                  }
                };
              } catch (userError) {
                console.warn(`Impossible de récupérer les informations de l'auteur ${publication.authorClerkId}:`, userError);
              }
            }
            
            return enrichedPublication;
          } catch (error) {
            console.warn(`Impossible de récupérer les messages pour la publication ${publication.id}:`, error);
            return {
              ...publication,
              messagesCount: 0
            };
          }
        })
      );
      return enrichedPublications;
    }
    
    return publications;
  },
  getPublicationById: async (id) => {
    const response = await api.get(`/publications/${id}`);
    const publication = response.data;
    
    // Enrichir avec les informations de l'auteur si elles manquent
    if (publication.authorClerkId && (!publication.author || !publication.author.firstName)) {
      try {
        const authorData = await userService.getUserByClerkId(publication.authorClerkId);
        return {
          ...publication,
          author: {
            ...publication.author,
            firstName: authorData.firstName,
            lastName: authorData.lastName,
            name: authorData.firstName && authorData.lastName ? 
              `${authorData.firstName} ${authorData.lastName}` : 
              authorData.firstName || 'Utilisateur',
            imageUrl: authorData.imageUrl,
            clerkId: authorData.clerkId
          }
        };
      } catch (userError) {
        console.warn(`Impossible de récupérer les informations de l'auteur ${publication.authorClerkId}:`, userError);
      }
    }
    
    return publication;
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
    const messages = response.data;
    
    // Enrichir chaque message avec les informations de l'auteur si elles manquent
    if (Array.isArray(messages)) {
      const enrichedMessages = await Promise.all(
        messages.map(async (message) => {
          // Si on n'a pas d'informations complètes sur l'auteur, essayer de les récupérer
          if (message.authorClerkId && (!message.author || !message.author.firstName)) {
            try {
              const authorData = await userService.getUserByClerkId(message.authorClerkId);
              return {
                ...message,
                author: {
                  ...message.author,
                  firstName: authorData.firstName,
                  lastName: authorData.lastName,
                  name: authorData.firstName && authorData.lastName ? 
                    `${authorData.firstName} ${authorData.lastName}` : 
                    authorData.firstName || 'Utilisateur',
                  imageUrl: authorData.imageUrl,
                  clerkId: authorData.clerkId
                }
              };
            } catch (userError) {
              console.warn(`Impossible de récupérer les informations de l'auteur du message ${message.authorClerkId}:`, userError);
              return message;
            }
          }
          return message;
        })
      );
      return enrichedMessages;
    }
    
    return messages;
  },
  deleteMessage: async (id) => {
    const response = await api.delete(`/messages/${id}`);
    return response.data;
  },
}