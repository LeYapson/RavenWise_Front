// src/context/clerkContext.js
"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { userService } from '../services/api';

// Créer le contexte
const ClerkContext = createContext(undefined);

// Hook pour utiliser le contexte
export const useClerkAuth = () => {
  const context = useContext(ClerkContext);
  if (context === undefined) {
    throw new Error('useClerkAuth doit être utilisé à l\'intérieur d\'un ClerkProvider');
  }
  return context;
};

export function ClerkProvider({ children }) {
  // États Clerk
  const { isLoaded, userId, sessionId, signOut } = useAuth();
  const { user } = useUser();
  
  // États internes
  const [loading, setLoading] = useState(true);
  const [dbUser, setDbUser] = useState(null);
  const [syncError, setSyncError] = useState(null);
  
  // État d'authentification
  const isAuthenticated = !!userId;
  
  // Informations de l'utilisateur formatées depuis Clerk
  const clerkUser = user ? {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: user.fullName,
    email: user.primaryEmailAddress?.emailAddress,
    imageUrl: user.imageUrl,
  } : null;
  
  // Synchroniser l'utilisateur avec notre base de données
  const syncUserWithDb = async () => {
    if (!isLoaded || !user) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    
    try {
      console.log("[DEBUG] Tentative de récupération de l'utilisateur avec clerkId:", user.id);
      
      // Récupérer directement l'utilisateur par son clerkId
      const dbUserData = await userService.getUserByClerkId(user.id);
      console.log("[DEBUG] Utilisateur récupéré de la base de données:", dbUserData);
      console.log("[DEBUG] Rôle de l'utilisateur:", dbUserData.role);
      
      // Stocker l'utilisateur complet de la base de données
      setDbUser(dbUserData);
      
      // Si c'est un nouvel utilisateur ou si les données ont changé, les mettre à jour
      if (dbUserData && (
        dbUserData.firstName !== user.firstName || 
        dbUserData.lastName !== user.lastName ||
        dbUserData.email !== user.primaryEmailAddress?.emailAddress ||
        dbUserData.imageUrl !== user.imageUrl
      )) {
        console.log("[DEBUG] Mise à jour des informations utilisateur");
        const updateData = {
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.primaryEmailAddress?.emailAddress || "",
          //imageUrl: user.imageUrl || ""
          role: dbUserData.role || "free" // Conserver le rôle existant
        };
        
        const updatedUser = await userService.updateUserByClerkId(user.id, updateData);
        setDbUser(updatedUser);
      }
    } catch (error) {
      console.error("[DEBUG] Erreur lors de la récupération des données utilisateur:", error);
      
      // Si l'utilisateur n'existe pas dans la base de données, le créer
      if (error.response?.status === 404) {
        console.log("[DEBUG] Utilisateur non trouvé (404), création d'un nouveau profil");
        const userData = {
          clerkId: user.id,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.primaryEmailAddress?.emailAddress || "",
          //imageUrl: user.imageUrl || "",
          role: "free" // Rôle par défaut
        };
        
        try {
          const newUser = await userService.createUser(userData);
          console.log("[DEBUG] Nouvel utilisateur créé:", newUser);
          setDbUser(newUser);
        } catch (createError) {
          console.error("[DEBUG] Erreur lors de la création du profil:", createError);
        }
      } else {
        console.error("[DEBUG] Erreur de récupération:", error.message);
        // Ne pas tenter de créer un utilisateur pour d'autres erreurs
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Synchroniser l'utilisateur quand Clerk est chargé ou quand l'utilisateur change
  useEffect(() => {
    if (isLoaded) {
      if (!isAuthenticated) {
        console.log("[ClerkContext] Non authentifié, réinitialisation de l'utilisateur");
        setDbUser(null);
        setLoading(false);
      } else if (user) {
        console.log("[ClerkContext] Utilisateur Clerk détecté, synchronisation");
        syncUserWithDb();
      }
    }
  }, [isLoaded, isAuthenticated, user?.id]); // Ajout de user?.id pour détecter les changements d'utilisateur
  
  // Récupération explicite des rôles de l'utilisateur
  const userRole = dbUser?.role || 'free';
  const isAdmin = userRole === 'admin';
  const isPremium = userRole === 'premium';
  
  // Afficher le rôle pour débogage
  useEffect(() => {
    if (dbUser) {
      console.log("[ClerkContext] Rôle utilisateur:", userRole);
      console.log("[ClerkContext] isAdmin:", isAdmin);
    }
  }, [dbUser, userRole, isAdmin]);
  
  // Exposer les méthodes et propriétés
  const value = {
    // États d'authentification
    isAuthenticated,
    isLoaded,
    loading,
    
    // Données utilisateur
    currentUser: dbUser,
    user: clerkUser,
    
    // Ajouter une propriété spécifique pour l'image
    userImage: clerkUser?.imageUrl || dbUser?.imageUrl || "/images/default-avatar.png",
    
    // Rôles et permissions
    role: userRole,
    isAdmin,
    isPremium,
    
    // Méthodes d'authentification
    logout: () => signOut(),
    refreshUserData: syncUserWithDb,
    
    // Méthodes de mise à jour du profil
    updateUserProfile: async (userData) => {
      try {
        const updatedUser = await userService.updateProfile(userData);
        setDbUser(prev => ({ ...prev, ...updatedUser }));
        return updatedUser;
      } catch (error) {
        console.error("[ClerkContext] Erreur lors de la mise à jour du profil:", error);
        throw error;
      }
    },
    
    // État d'erreur
    syncError,
    
    // Ajouter des méthodes de vérification des permissions
    canAccessContent: (contentType) => {
      // Si l'utilisateur n'est pas authentifié, aucun accès
      if (!isAuthenticated) return false;
      
      switch(contentType) {
        case 'free':
          // Tout utilisateur authentifié peut accéder au contenu gratuit
          return true;
        case 'premium':
          // Seuls les utilisateurs premium et admin peuvent accéder au contenu premium
          return isPremium || isAdmin;
        case 'admin':
          // Seuls les administrateurs peuvent accéder au panneau d'administration
          return isAdmin;
        default:
          return false;
      }
    },
    
    // Méthodes pour vérifier les accès spécifiques
    canAccessCourse: (course) => {
      if (!isAuthenticated) return false;
      if (isAdmin) return true; // Les administrateurs ont accès à tous les cours
      
      // Pour les utilisateurs normaux, vérifier le type du cours
      if (course.isPremium) {
        return isPremium; // Seuls les utilisateurs premium peuvent accéder aux cours premium
      }
      
      return true; // Par défaut, accès aux cours gratuits
    },
    
    canAccessLesson: (lesson) => {
      if (!isAuthenticated) return false;
      if (isAdmin) return true; // Les administrateurs ont accès à toutes les leçons
      
      // Les leçons verrouillées ne sont accessibles qu'aux utilisateurs premium
      if (lesson.isLocked) {
        return isPremium;
      }
      
      return true; // Par défaut, accès aux leçons déverrouillées
    }
  };

  return (
    <ClerkContext.Provider value={value}>
      {children}
    </ClerkContext.Provider>
  );
}