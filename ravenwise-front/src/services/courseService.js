// src/services/courseService.js
import { firestore } from '../../firebase/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDoc, 
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc 
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Création d'un cours
export const createCourse = async (courseData) => {
  try {
    const coursesRef = collection(firestore, 'courses');
    const docRef = await addDoc(coursesRef, {
      ...courseData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return { id: docRef.id, ...courseData };
  } catch (error) {
    console.error("Erreur lors de la création du cours:", error);
    throw error;
  }
};

// Autres fonctions (getCourses, updateCourse, deleteCourse, etc.)