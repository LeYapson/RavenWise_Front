// src/hooks/useRole.js
"use client";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export function useRole() {
  const { user, isLoaded } = useUser();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (isLoaded) {
      // Récupérer le rôle depuis les métadonnées publiques de l'utilisateur
      const userRole = user?.publicMetadata?.role || "user";
      setRole(userRole);
      setLoading(false);
    }
  }, [isLoaded, user]);
  
  // Fonctions pratiques pour vérifier les rôles
  const isAdmin = role === "admin";
  const isInstructor = role === "instructor" || role === "admin";
  const isUser = role === "user" || isInstructor;
  
  return {
    role,
    isAdmin,
    isInstructor,
    isUser,
    loading,
  };
}