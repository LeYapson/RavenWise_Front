// src/services/forumService.js
import { db } from '../firebase/firebase';  // Utilisez db au lieu de firestore

// Création d'une discussion
export const createDiscussion = async (discussionData) => {
  try {
    const discussionsRef = collection(db, 'discussions'); // Utilisez db ici aussi
    const docRef = await addDoc(discussionsRef, {
      ...discussionData,
      createdAt: new Date(),
      views: 0,
      likes: 0,
      replies: 0
    });
    return { id: docRef.id, ...discussionData };
  } catch (error) {
    console.error("Erreur lors de la création de la discussion:", error);
    throw error;
  }
};

// Récupération des discussions
export const getDiscussions = async () => {
  try {
    const discussionsRef = collection(db, 'discussions'); // Utilisez db ici aussi
    const q = query(discussionsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const discussions = [];
    querySnapshot.forEach((doc) => {
      discussions.push({ id: doc.id, ...doc.data() });
    });
    
    return discussions;
  } catch (error) {
    console.error("Erreur lors de la récupération des discussions:", error);
    throw error;
  }
};

// Autres fonctions pour les discussions...