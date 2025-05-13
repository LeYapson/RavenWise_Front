// src/context/ClerkContext.js
"use client";

import React, { createContext, useContext } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';

const ClerkContext = createContext();

export function ClerkProvider({ children }) {
  const { isLoaded, userId, sessionId, signOut } = useAuth();
  const { user } = useUser();
  
  // État de chargement
  const loading = !isLoaded;
  
  // État d'authentification
  const isAuthenticated = !!userId;
  
  // Informations de l'utilisateur formatées
  const currentUser = user ? {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: user.fullName,
    email: user.primaryEmailAddress?.emailAddress,
    imageUrl: user.imageUrl,
    // Vous pouvez ajouter d'autres propriétés selon vos besoins
  } : null;
  
  // Méthodes de gestion de l'authentification
  const logout = () => {
    signOut();
  };
  
  // Valeur du contexte
  const value = {
    loading,
    isAuthenticated,
    currentUser,
    logout
  };
  
  return <ClerkContext.Provider value={value}>{children}</ClerkContext.Provider>;
}

export const useClerkAuth = () => useContext(ClerkContext);

export default ClerkContext;