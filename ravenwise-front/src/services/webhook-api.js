// Service spécial pour les webhooks (sans localStorage)
import axios from 'axios';

const webhookApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  }
});

export const webhookService = {
  createUser: async (userData) => {
    try {
      const response = await webhookApi.post('/users', userData);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error.message);
      if (error.response) {
        console.error("Données d'erreur:", error.response.data);
        console.error("Status:", error.response.status);
      }
      throw error;
    }
  },
  
  updateUser: async (userId, userData) => {
    const response = await webhookApi.put(`/users/${userId}`, userData);
    return response.data;
  },
  
  deleteUser: async (userId) => {
    const response = await webhookApi.delete(`/users/${userId}`);
    return response.data;
  }
};