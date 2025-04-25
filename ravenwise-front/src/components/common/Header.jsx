/**
 * Composant Header - En-tête principal de l'application
 * Affiche le logo, la navigation et les boutons d'action
 */
"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../context/AuthContext';
import RavenWiseLogo from '../../assets/images/Ravenwise.png';

const Header = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  
  return (
    <header className="bg-[#0F1B2A] py-4 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo - Redirige vers le dashboard si connecté, sinon vers la homepage */}
        <Link href={isAuthenticated ? "/dashboard" : "/"}>
          <div className="w-36 h-auto">
            <Image src={RavenWiseLogo} alt="RavenWise Logo" width={150} height={45} priority />
          </div>
        </Link>
        
        <nav className="hidden md:block">
          <ul className="flex">
            {isAuthenticated && (
              <>
                <li className="mx-4">
                  <Link href="/courses" className="text-white font-bold no-underline">Cours</Link>
                </li>
                <li className="mx-4">
                  <Link href="/quiz" className="text-white font-bold no-underline">Quiz</Link>
                </li>
                <li className="mx-4">
                  <Link href="/community" className="text-white font-bold no-underline">Communauté</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        
        <div className="flex items-center">
          {!isAuthenticated ? (
            // Afficher les boutons de connexion/inscription si non connecté
            <>
              <Link href="/auth/login" className="text-[#FDC758] font-bold border-2 border-[#FDC758] px-4 py-2 rounded-md mr-2 transition-all duration-300 hover:bg-[#FDC758] hover:text-[#0F1B2A]">
                Se connecter
              </Link>
              <Link href="/auth/register" className="bg-[#FDC758] text-[#0F1B2A] font-bold px-4 py-2 rounded-md transition-all duration-300 hover:bg-opacity-90">
                S'inscrire
              </Link>
            </>
          ) : (
            // Afficher le profil et bouton de déconnexion si connecté
            <div className="flex items-center">
              <Link href="/settings/profile" className="flex items-center mr-4">
                <div className="w-8 h-8 rounded-full bg-[#ca9e46] flex items-center justify-center text-white mr-2">
                  {currentUser?.displayName ? currentUser.displayName.charAt(0) : 'U'}
                </div>
                <span className="text-white hidden md:inline">{currentUser?.displayName || currentUser?.email}</span>
              </Link>
              <button 
                onClick={logout}
                className="text-[#FDC758] font-bold border-2 border-[#FDC758] px-4 py-2 rounded-md transition-all duration-300 hover:bg-[#FDC758] hover:text-[#0F1B2A]"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;