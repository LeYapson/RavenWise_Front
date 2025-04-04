// pages/index.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import RavenWiseLogo from '../assets/images/Ravenwise.png';
import BannerBackground from '../assets/images/banner-background.jpg';
import './globals.css';

const HomePage = () => {
  return (
    <>
      <Header />
      <main className="bg-[#0c1524] text-white">
      <section
          className="flex flex-col items-center justify-center min-h-screen p-8 text-center relative overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(12, 21, 36, 0.95)), url(${BannerBackground.src})`,
            backgroundSize: 'cover'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-75 z-[-1]"></div>
          <div className="max-w-2xl z-10 relative animate-fadeIn">
            <Image src={RavenWiseLogo} alt="RavenWise Logo" width={200} height={200} className="mb-8 md:w-64 mx-auto " />
            <h1 className="text-4xl mb-6 md:text-5xl text-center">
              Découvrez le pouvoir de l'apprentissage adaptatif
            </h1>
            <p className="text-lg mb-8 max-w-xl mx-auto text-gray-300 md:text-xl text-center">
              RavenWise est une plateforme d'apprentissage innovante qui utilise l'intelligence artificielle pour personnaliser votre parcours éducatif et vous aider à atteindre vos objectifs.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link href="/signup" className="px-8 py-3 bg-[#ca9e46] text-white rounded-lg shadow-md hover:shadow-lg hover:transform hover:translate-y-[-3px] transition-all duration-300">
                Commencer gratuitement
              </Link>
              <Link href="/courses" className="px-8 py-3 bg-white bg-opacity-5 text-gray-300 border border-gray-600 rounded-lg backdrop-blur-md hover:bg-opacity-10 hover:transform hover:translate-y-[-3px] transition-all duration-300">
                Explorer les cours
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 px-6 md:py-24 md:px-8">
          <h2 className="text-3xl mb-12 text-center text-white">Fonctionnalités principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-xl mx-auto">
            <div className="bg-[#182b4a] p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:translate-y-[-6px] hover:shadow-lg">
              <h3 className="text-2xl mb-4 text-white">Apprentissage adaptatif</h3>
              <p className="text-gray-300">Notre algorithme d'IA adapte le contenu des cours à votre style d'apprentissage et à votre progression pour maximiser votre compréhension et votre rétention.</p>
            </div>
            <div className="bg-[#182b4a] p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:translate-y-[-6px] hover:shadow-lg">
              <h3 className="text-2xl mb-4 text-white">Parcours personnalisés</h3>
              <p className="text-gray-300">Chaque apprenant bénéficie d'un parcours unique, conçu pour répondre à ses besoins spécifiques et l'aider à atteindre ses objectifs personnels.</p>
            </div>
            <div className="bg-[#182b4a] p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:translate-y-[-6px] hover:shadow-lg">
              <h3 className="text-2xl mb-4 text-white">Quiz intelligents</h3>
              <p className="text-gray-300">Nos quiz évaluent votre compréhension et s'adaptent automatiquement pour cibler vos points faibles et renforcer votre apprentissage.</p>
            </div>
            <div className="bg-[#182b4a] p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:translate-y-[-6px] hover:shadow-lg">
              <h3 className="text-2xl mb-4 text-white">Communauté active</h3>
              <p className="text-gray-300">Rejoignez une communauté de passionnés pour échanger, collaborer et enrichir votre expérience d'apprentissage grâce à l'intelligence collective.</p>
            </div>
            <div className="bg-[#182b4a] p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:translate-y-[-6px] hover:shadow-lg">
              <h3 className="text-2xl mb-4 text-white">Contenu de qualité</h3>
              <p className="text-gray-300">Accédez à des cours créés par des experts dans leur domaine, régulièrement mis à jour pour rester à la pointe des connaissances.</p>
            </div>
            <div className="bg-[#182b4a] p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:translate-y-[-6px] hover:shadow-lg">
              <h3 className="text-2xl mb-4 text-white">Suivi de progression</h3>
              <p className="text-gray-300">Visualisez votre progression en temps réel et obtenez des insights précieux pour optimiser votre apprentissage et rester motivé.</p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 px-6 md:py-24 md:px-8">
          <h2 className="text-3xl mb-12 text-center text-white">Comment ça fonctionne</h2>
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col items-start mb-20 relative md:flex-row md:items-center">
              <div className="flex items-center justify-center w-16 h-16 bg-[#ca9e46] text-white rounded-full mr-0 mb-6 md:mr-6 md:mb-0 md:order-1">
                1
              </div>
              <div className="md:ml-6">
                <h3 className="text-2xl mb-4 text-white">Inscrivez-vous gratuitement</h3>
                <p className="text-gray-300">Créez votre compte en quelques secondes pour commencer votre voyage d'apprentissage avec RavenWise. Aucune carte de crédit n'est requise pour l'inscription.</p>
              </div>
            </div>

            <div className="flex flex-col items-end mb-20 relative md:flex-row md:items-center">
              <div className="flex items-center justify-center w-16 h-16 bg-[#ca9e46] text-white rounded-full mr-6 mb-0 md:mr-0 md:ml-6 md:order-2">
                2
              </div>
              <div className="md:mr-6 md:order-1">
                <h3 className="text-2xl mb-4 text-white">Complétez votre profil d'apprentissage</h3>
                <p className="text-gray-300">Répondez à quelques questions pour nous aider à comprendre vos objectifs, vos préférences et votre style d'apprentissage unique.</p>
              </div>
            </div>

            <div className="flex flex-col items-start mb-20 relative md:flex-row md:items-center">
              <div className="flex items-center justify-center w-16 h-16 bg-[#ca9e46] text-white rounded-full mr-0 mb-6 md:mr-6 md:mb-0 md:order-1">
                3
              </div>
              <div className="md:ml-6">
                <h3 className="text-2xl mb-4 text-white">Explorez les cours recommandés</h3>
                <p className="text-gray-300">Découvrez les cours personnalisés que notre algorithme a sélectionnés spécifiquement pour vous, en fonction de vos intérêts et de vos objectifs.</p>
              </div>
            </div>

            <div className="flex flex-col items-end mb-20 relative md:flex-row md:items-center">
              <div className="flex items-center justify-center w-16 h-16 bg-[#ca9e46] text-white rounded-full mr-6 mb-0 md:mr-0 md:ml-6 md:order-2">
                4
              </div>
              <div className="md:mr-6 md:order-1">
                <h3 className="text-2xl mb-4 text-white">Apprenez à votre rythme</h3>
                <p className="text-gray-300">Suivez les leçons, participez aux quiz et testez vos connaissances. Notre plateforme s'adapte à votre rythme et à votre progression.</p>
              </div>
            </div>

            <div className="flex flex-col items-start mb-0 relative md:flex-row md:items-center">
              <div className="flex items-center justify-center w-16 h-16 bg-[#ca9e46] text-white rounded-full mr-0 mb-6 md:mr-6 md:mb-0 md:order-1">
                5
              </div>
              <div className="md:ml-6">
                <h3 className="text-2xl mb-4 text-white">Obtenez des certifications</h3>
                <p className="text-gray-300">Complétez les cours et recevez des certifications reconnues pour mettre en valeur vos compétences et enrichir votre profil professionnel.</p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default HomePage;
