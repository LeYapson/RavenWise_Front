import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RavenWiseLogo from '../../../assets/images/Ravenwise.png';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Section Image/Branding - Occupe 40% sur desktop, pleine largeur sur mobile */}
      <div className="hidden md:flex md:w-2/5 bg-gradient-to-br from-[#0c1524] to-[#182b4a] p-8 flex-col justify-between">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <Link href="/">
            <div className="w-40 h-auto">
              <Image src={RavenWiseLogo} alt="RavenWise Logo" priority />
            </div>
          </Link>
          
          {/* Texte principal */}
          <div className="flex-grow flex items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-white">
                Découvrez le pouvoir de l'apprentissage adaptatif
              </h1>
              <p className="text-gray-300 text-lg max-w-md">
                Rejoignez RavenWise et accédez à un parcours d'apprentissage personnalisé et adapté à votre rythme.
              </p>
            </div>
          </div>
          
          {/* Citations ou témoignages */}
          <div className="mt-auto bg-black/20 p-6 rounded-xl backdrop-blur-sm border border-white/10">
            <p className="italic text-gray-300 mb-4">
              "RavenWise a transformé ma façon d'apprendre. Les parcours personnalisés ont vraiment fait la différence."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#ca9e46] flex items-center justify-center text-white">
                JD
              </div>
              <div className="ml-3">
                <p className="text-white font-medium">Jean Dupont</p>
                <p className="text-gray-400 text-sm">Étudiant en informatique</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Section Formulaire - Occupe 60% sur desktop, pleine largeur sur mobile */}
      <div className="w-full md:w-3/5 bg-[#0c1524] flex items-center justify-center p-4 md:p-8">
        {/* Logo visible uniquement sur mobile */}
        <div className="md:hidden flex justify-center mb-8">
          <Link href="/">
            <div className="w-32 h-auto">
              <Image src={RavenWiseLogo} alt="RavenWise Logo" priority />
            </div>
          </Link>
        </div>
        
        {/* Conteneur du formulaire */}
        <div className="w-full max-w-md bg-[#0f192c] border border-gray-800 rounded-2xl shadow-2xl shadow-black/50 p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;