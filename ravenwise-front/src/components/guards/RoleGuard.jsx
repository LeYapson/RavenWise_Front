"use client";
import { useClerkAuth } from "../../context/clerkContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RoleGuard({ 
  children, 
  requiredRole, 
  redirectTo = "/dashboard",
  showError = false 
}) {
  const { isLoaded, loading, isAuthenticated, role } = useClerkAuth();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!isLoaded || loading) return;
    
    // Vérifier l'authentification
    if (!isAuthenticated) {
      router.replace('/sign-in');
      return;
    }
    
    // Vérifier les rôles
    let hasAccess = false;
    switch(requiredRole) {
      case 'admin':
        hasAccess = role === 'admin';
        break;
      case 'premium':
        hasAccess = role === 'premium' || role === 'admin';
        break;
      case 'free':
        hasAccess = role === 'free' || role === 'premium' || role === 'admin';
        break;
      default:
        hasAccess = true;
    }
    
    if (!hasAccess) {
      router.replace(redirectTo);
    } else {
      setAuthorized(true);
    }
    
    setChecking(false);
  }, [isLoaded, loading, isAuthenticated, role, router, requiredRole, redirectTo]);

  if (checking) {
    return <div className="min-h-screen flex items-center justify-center bg-[#0c1524]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FDC758]"></div>
    </div>;
  }
  
  return authorized ? children : null;
}