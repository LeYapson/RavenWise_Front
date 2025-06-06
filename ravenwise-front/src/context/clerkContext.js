// src/context/clerkContext.js
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { userService } from '../services/api';

const ClerkContext = createContext();

export function ClerkProvider({ children }) {
  const { isLoaded, userId, sessionId, signOut } = useAuth();
  const { user } = useUser();
  
  // État de chargement et synchronisation
  const [loading, setLoading] = useState(true);
  const [dbUser, setDbUser] = useState(null);
  
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
    if (isLoaded && user) {
      try {
        // Récupérer les données utilisateur nécessaires
        const userData = {
          clerkId: user.id,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.primaryEmailAddress?.emailAddress || "",
          imageUrl: user.imageUrl || ""
        };
        
        // Synchroniser avec la base de données
        const updatedUser = await userService.syncWithClerk(userData);
        setDbUser(updatedUser);
      } catch (error) {
        console.error("Erreur lors de la synchronisation avec la base de données:", error);
      } finally {
        // Mettre fin au chargement, qu'il y ait eu succès ou erreur
        setLoading(false);
      }
    } else if (isLoaded) {
      // Si isLoaded est true mais qu'il n'y a pas d'utilisateur, on arrête également le chargement
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (isLoaded) {
      if (!isAuthenticated) {
        setDbUser(null);
        setLoading(false); // Important : mettre fin au chargement si non authentifié
      } else if (user) {
        syncUserWithDb();
      }
    }
  }, [isLoaded, isAuthenticated, user]);
  
  // Assurez-vous d'exposer les bonnes variables dans la valeur du contexte
  const value = {
    isAuthenticated,
    isLoaded,
    loading,
    currentUser: dbUser, // Renommé pour correspondre à l'utilisation dans ProfilePage
    user: clerkUser, // L'utilisateur Clerk original si nécessaire
    // Méthodes de gestion de l'authentification
    logout: () => signOut(),
    // Méthodes de mise à jour du profil
    updateUserProfile: async (userData) => {
      try {
        const updatedUser = await userService.updateProfile(userData);
        setDbUser(prev => ({ ...prev, ...updatedUser }));
        return updatedUser;
      } catch (error) {
        console.error("Erreur lors de la mise à jour du profil:", error);
        throw error;
      }
    },
    // Méthode de mise à jour de l'adresse
    updateUserAddress: async (addressData) => {
      try {
        const response = await userService.updateAddress(addressData);
        setDbUser(prev => ({ ...prev, address: response.address }));
        return response;
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'adresse:", error);
        throw error;
      }
    }
  };

  return (
    <ClerkContext.Provider value={value}>
      {children}
    </ClerkContext.Provider>
  );
}

export const useClerkAuth = () => useContext(ClerkContext);

export default ClerkContext;