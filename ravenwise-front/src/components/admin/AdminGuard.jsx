"use client";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useClerkAuth } from "../../context/clerkContext";

export default function AdminGuard({ children }) {
  const { isAdmin, loading, currentUser } = useClerkAuth();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [debug, setDebug] = useState({
    checked: false,
    isAdmin,
    loading,
    currentUser: currentUser ? { ...currentUser, id: currentUser.id, role: currentUser.role } : null
  });

  useEffect(() => {
    // Mettre à jour l'état de débogage à chaque changement
    setDebug({
      checked: true,
      isAdmin,
      loading,
      currentUser: currentUser ? { ...currentUser, id: currentUser.id, role: currentUser.role } : null
    });
    
    console.log("[AdminGuard] État de l'authentification:", {
      isAdmin,
      loading,
      currentUser
    });

    if (!loading) {
      if (!currentUser) {
        console.log("[AdminGuard] Aucun utilisateur trouvé, redirection vers login");
        router.push('/sign-in');
      } else if (!isAdmin) {
        console.log("[AdminGuard] Utilisateur non admin, redirection vers dashboard");
        router.push('/dashboard');
      } else {
        console.log("[AdminGuard] Utilisateur admin confirmé, accès autorisé");
        setAuthorized(true);
      }
    }
  }, [loading, isAdmin, currentUser, router]);

  // Afficher l'état de débogage
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0c1524] flex flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FDC758] mb-4"></div>
        <div className="text-white text-lg">Vérification des droits d'administration...</div>
      </div>
    );
  }
  
  // Afficher l'interface de débogage si l'utilisateur n'est pas autorisé
  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#0c1524] p-8">
        <div className="bg-red-900/30 text-white p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Accès non autorisé - Informations de débogage</h2>
          <pre className="bg-[#253A52] p-4 rounded overflow-auto max-h-96 text-sm">
            {JSON.stringify(debug, null, 2)}
          </pre>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={() => router.push('/dashboard')}
            className="bg-[#253A52] hover:bg-[#304d6d] text-white px-4 py-2 rounded"
          >
            Retour au Dashboard
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="bg-[#FDC758] text-[#0c1524] px-4 py-2 rounded font-medium"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return children;
}