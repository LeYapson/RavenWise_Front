/**
 * Composant Header - En-tête principal de l'application
 * Affiche le logo, la navigation et les boutons d'action
 */
"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useClerkAuth } from '../../context/clerkContext';
import { useRouter } from 'next/navigation';
import RavenWiseLogo from '../../assets/images/Ravenwise.png';
import { FiUser, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const { isAuthenticated, isAdmin, currentUser, userImage, logout } = useClerkAuth();
  const router = useRouter();
  
  // État pour le menu déroulant et le menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  
  // Fermer le menu si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  // Fermer le menu mobile quand on navigue
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };
  
  // Fonction pour se déconnecter
  const handleSignOut = async () => {
    await logout();
    router.push('/');
  };

  return (
    <>
      <header className="bg-[#0F1B2A] py-4 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo - Redirige vers le dashboard si connecté, sinon vers la homepage */}
          <Link href={isAuthenticated ? "/dashboard" : "/"}>
            <div className="w-36 h-auto">
              <Image src={RavenWiseLogo} alt="RavenWise Logo" width={150} height={45} priority />
            </div>
          </Link>
          
          {/* Navigation desktop - inchangée */}
          <nav className="hidden md:block">
            <ul className="flex">
              {isAuthenticated && (
                <>
                  <li className="mx-4">
                    <Link href="/courses" className="text-white font-bold no-underline">Cours</Link>
                  </li>
                  <li className="mx-4">
                    <Link href="/community" className="text-white font-bold no-underline">Communauté</Link>
                  </li>
                  
                  {/* Lien Admin visible uniquement pour les administrateurs */}
                  {isAdmin && (
                    <li className="mx-4">
                      <Link href="/admin" className="text-[#FDC758] font-bold no-underline">
                        Administration
                      </Link>
                    </li>
                  )}
                </>
              )}
            </ul>
          </nav>
          
          <div className="flex items-center gap-3">
            {/* Bouton menu mobile */}
            {isAuthenticated && (
              <button 
                className="md:hidden text-white hover:text-[#FDC758] transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            )}

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {/* Badge d'administrateur */}
                {isAdmin && (
                  <span className="bg-[#FDC758] text-[#0F1B2A] text-xs font-bold px-2 py-1 rounded-full">
                    Admin
                  </span>
                )}
                
                {/* Menu utilisateur avec dropdown */}
                <div className="relative" ref={menuRef}>
                  <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-[#FDC758] transition-all focus:outline-none"
                    title="Menu utilisateur"
                  >
                    <Image 
                      src={userImage}
                      alt="Profil"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </button>
                  
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#182b4a] rounded-lg shadow-lg py-1 z-50 border border-[#253A52]">
                      <div className="px-4 py-2 border-b border-[#253A52]">
                        <p className="text-sm font-medium text-white">{currentUser?.fullName}</p>
                        <p className="text-xs text-gray-400">{currentUser?.primaryEmailAddress?.emailAddress}</p>
                      </div>
                      
                      <Link 
                        href="/profil" 
                        className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#253A52]"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FiUser className="mr-2" /> Mon profil
                      </Link>
                      
                      <Link 
                        href="/profil/settings" 
                        className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#253A52]"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FiSettings className="mr-2" /> Paramètres
                      </Link>
                      
                      <button 
                        onClick={handleSignOut}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#253A52]"
                      >
                        <FiLogOut className="mr-2" /> Déconnexion
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Link href="/sign-in" className="text-[#FDC758] font-bold border-2 border-[#FDC758] px-4 py-2 rounded-md mr-2 transition-all duration-300 hover:bg-[#FDC758] hover:text-[#0F1B2A]">
                Connexion
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Menu mobile overlay */}
      {isMobileMenuOpen && isAuthenticated && (
        <div className="md:hidden bg-[#182b4a] border-b border-[#253A52] px-6 py-4">
          <nav>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/courses" 
                  className="block text-white font-bold py-2 hover:text-[#FDC758] transition-colors"
                  onClick={handleMobileLinkClick}
                >
                  Cours
                </Link>
              </li>
              <li>
                <Link 
                  href="/community" 
                  className="block text-white font-bold py-2 hover:text-[#FDC758] transition-colors"
                  onClick={handleMobileLinkClick}
                >
                  Communauté
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link 
                    href="/admin" 
                    className="block text-[#FDC758] font-bold py-2 hover:text-yellow-400 transition-colors"
                    onClick={handleMobileLinkClick}
                  >
                    Administration
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;