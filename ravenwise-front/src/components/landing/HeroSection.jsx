/**
 * Composant HeroSection - Section principale de la page d'accueil
 * Présente l'application et incite à l'action
 */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
// Importez l'image ici
import BannerBackground from '../../assets/images/banner-background.jpg';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-[#0c1524] to-[#182b4a] py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center">
        {/* Contenu textuel */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Apprenez intelligemment avec{' '}
            <span className="text-[#ca9e46]">RavenWise</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-lg">
            Découvrez une plateforme d'apprentissage qui s'adapte à votre rythme et à votre style. 
            La puissance de l'IA au service de votre réussite.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/sign-up" className="bg-[#ca9e46] hover:bg-[#d4af61] text-[#0c1524] font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Commencer gratuitement
            </Link>
            <Link href="/sign-in" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg transition-all duration-300">
              Se connecter
            </Link>
          </div>
        </div>
        
        {/* Image ou illustration */}
        <div className="md:w-1/2 flex justify-center">
          <div className="w-full max-w-md h-96 bg-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden">
            {/* Utilisez l'image importée */}
            <Image 
              src={BannerBackground}
              alt="RavenWise Dashboard" 
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;