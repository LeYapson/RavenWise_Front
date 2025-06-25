"use client";
import { useClerkAuth } from "../../context/clerkContext";
import Link from 'next/link';

export default function RestrictedContent({ 
  children, 
  requiredRole = 'free',
  fallback = null,
  showUpgradeButton = false
}) {
  const { isAuthenticated, role, loading } = useClerkAuth();

  // Si en cours de chargement, afficher un placeholder
  if (loading) {
    return <div className="animate-pulse bg-[#182b4a] p-4 rounded-lg min-h-[100px]"></div>;
  }

  // Si non authentifié, proposer de se connecter
  if (!isAuthenticated) {
    return (
      <div className="bg-[#182b4a] p-6 rounded-lg text-center">
        <p className="mb-4 text-gray-300">Connectez-vous pour accéder à ce contenu</p>
        <Link href="/sign-in" className="px-4 py-2 bg-[#FDC758] text-[#0c1524] rounded-lg font-medium">
          Se connecter
        </Link>
      </div>
    );
  }

  // Vérifier les permissions selon le rôle requis
  let hasAccess = false;
  switch(requiredRole) {
    case 'admin':
      hasAccess = role === 'admin';
      break;
    case 'premium':
      hasAccess = role === 'premium' || role === 'admin';
      break;
    case 'free':
      hasAccess = true; // Tous les utilisateurs authentifiés ont accès au contenu gratuit
      break;
    default:
      hasAccess = true;
  }

  if (!hasAccess) {
    return (
      <div className="bg-[#182b4a] p-6 rounded-lg text-center">
        <h3 className="text-lg font-medium mb-2 text-[#FDC758]">Contenu {requiredRole === 'premium' ? 'Premium' : 'Restreint'}</h3>
        <p className="mb-4 text-gray-300">
          {requiredRole === 'premium' 
            ? "Ce contenu est réservé aux membres premium" 
            : "Vous n'avez pas accès à ce contenu"}
        </p>
        
        {showUpgradeButton && requiredRole === 'premium' && role === 'free' && (
          <Link href="/pricing" className="px-4 py-2 bg-[#FDC758] text-[#0c1524] rounded-lg font-medium">
            Passer à Premium
          </Link>
        )}
        
        {fallback}
      </div>
    );
  }

  return children;
}