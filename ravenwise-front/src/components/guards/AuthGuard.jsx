"use client";
import { useClerkAuth } from "../../context/clerkContext";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Link from 'next/link';

export default function AuthGuard({ 
  children, 
  redirectTo = '/sign-in',
  showMessage = true
}) {
  const { isAuthenticated, loading } = useClerkAuth();
  const router = useRouter();

  useEffect(() => {
    // Si le chargement est terminé et l'utilisateur n'est pas authentifié
    if (!loading && !isAuthenticated) {
      // Redirection automatique (optionnel)
      // router.push(redirectTo);
    }
  }, [isAuthenticated, loading, router, redirectTo]);

  // Pendant le chargement de l'authentification
  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#0c1524] text-white py-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FDC758] mx-auto mb-6"></div>
                <p className="text-xl">Vérification de l'authentification...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Si l'utilisateur n'est pas authentifié
  if (!isAuthenticated) {
    if (!showMessage) {
      return null; // Ou redirection silencieuse
    }

    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#0c1524] text-white py-10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="bg-[#182b4a] rounded-xl p-8 text-center max-w-md w-full">
                <div className="text-6xl mb-6">🔒</div>
                <h1 className="text-2xl font-bold mb-4">Accès restreint</h1>
                <p className="text-gray-400 mb-6">
                  Vous devez être connecté pour accéder à cette page.
                </p>
                
                <div className="space-y-3">
                  <Link 
                    href="/sign-in"
                    className="block w-full bg-[#FDC758] text-[#0c1524] py-3 px-6 rounded-lg font-medium hover:bg-opacity-90 transition-all"
                  >
                    Se connecter
                  </Link>
                  
                  <Link 
                    href="/sign-up"
                    className="block w-full bg-transparent border-2 border-[#FDC758] text-[#FDC758] py-3 px-6 rounded-lg font-medium hover:bg-[#FDC758] hover:text-[#0c1524] transition-all"
                  >
                    Créer un compte
                  </Link>
                  
                  <Link 
                    href="/"
                    className="block w-full text-gray-400 py-2 hover:text-white transition-colors"
                  >
                    Retour à l'accueil
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Si l'utilisateur est authentifié, afficher le contenu
  return children;
}
