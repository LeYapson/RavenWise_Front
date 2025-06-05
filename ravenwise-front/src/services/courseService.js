
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

// Création d'un cours
export const createCourse = async (courseData) => {
  try {
    const response = await axios.post(`${API_URL}/courses`, courseData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création du cours:", error);
    throw error;
  }
};

// Autres fonctions (getCourses, updateCourse, deleteCourse, etc.)