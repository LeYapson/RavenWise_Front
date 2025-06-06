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
  }
};

// Services pour les chapitres
export const chapterService = {
  getChaptersByCourse: async (courseId) => {
    const response = await api.get(`/chapters/course/${courseId}`);
    return response.data;
  }
};

// Services pour les utilisateurs
export const userService = {
  // Récupérer les données de l'utilisateur actuel
  getMe: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },
  
  // Créer ou mettre à jour l'utilisateur avec les données Clerk
  syncWithClerk: async (userData) => {
    const response = await api.post('/users/sync', userData);
    return response.data;
  },
  
  // Mettre à jour le profil utilisateur
  updateProfile: async (userData) => {
    const response = await api.put('/users/me', userData);
    return response.data;
  },
  
  // Mettre à jour l'adresse
  updateAddress: async (addressData) => {
    const response = await api.put('/users/me/address', addressData);
    return response.data;
  }
};