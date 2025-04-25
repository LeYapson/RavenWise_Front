"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { setCookie, deleteCookie } from 'cookies-next';
import { auth } from '../../firebase/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fonction de connexion
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Créer un cookie pour le middleware
      const token = await userCredential.user.getIdToken();
      setCookie('authToken', token, { maxAge: 30 * 24 * 60 * 60 }); // 30 jours
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  // Fonction d'inscription
  const register = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Mettre à jour le profil avec le nom d'utilisateur
      await updateProfile(userCredential.user, { displayName });
      
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  // Fonction de déconnexion
  const logout = async () => {
    try {
      await signOut(auth);
      deleteCookie('authToken');
      router.push('/');
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };

  // Observer les changements d'état d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Mettre à jour le cookie lors du chargement ou du changement d'utilisateur
        const token = await user.getIdToken();
        setCookie('authToken', token, { maxAge: 30 * 24 * 60 * 60 });
      } else {
        deleteCookie('authToken');
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => useContext(AuthContext);