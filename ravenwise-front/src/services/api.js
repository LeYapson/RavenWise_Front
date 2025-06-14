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
api.interceptors.request.use(async (config) => {
  // Récupérer le token depuis la session Clerk
  const token = localStorage.getItem('clerk-token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
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
    const response = await api.put(`/courses/${id}`, courseData);
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
    const response = await api.post('/chapters', chapterData);
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
  followCourseById: async (Id) => {
    const response = await api.post(`/users/${Id}/courses`);
    return response.data;
  },
  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },
  unfollowCourseById: async (Id) => {
    const response = await api.delete(`/users/${Id}/courses`);
    return response.data;
  },
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
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
}