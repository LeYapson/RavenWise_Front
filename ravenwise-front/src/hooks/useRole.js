// src/hooks/useRole.js
"use client";
import { useClerkAuth } from "../context/clerkContext";
import { useState, useEffect } from "react";

export function useRole() {
  const { currentUser, loading: authLoading } = useClerkAuth();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!authLoading) {
      // Récupérer le rôle depuis notre utilisateur en BDD
      const userRole = currentUser?.role || "free";
      setRole(userRole);
      setLoading(false);
    }
  }, [authLoading, currentUser]);
  
  // Fonctions pratiques pour vérifier les rôles
  const isAdmin = role === "admin";
  const isPremium = role === "premium";
  const isFree = role === "free";
  
  return {
    role,
    isAdmin,
    isPremium,
    isFree,
    loading,
  };
}