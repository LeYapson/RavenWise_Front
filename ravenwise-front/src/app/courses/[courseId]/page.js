"use client";
import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';

const LearningPath = () => {
  const router = useRouter();
  const { courseId } = router.query;

  // Exemple de données pour les étapes du parcours d'apprentissage
  const learningPaths = {
    "intro-programming": [
      { id: 1, title: "Introduction à la Programmation", description: "Découvrez les bases de la programmation et les concepts fondamentaux.", image: "/images/intro-programming.jpg", completed: true },
      { id: 2, title: "Structures de Données", description: "Apprenez les différentes structures de données et leur utilisation.", image: "/images/data-structures.jpg", completed: false },
      { id: 3, title: "Algorithmes et Complexité", description: "Explorez les algorithmes courants et leur complexité.", image: "/images/algorithms.jpg", completed: false },
    ],
    "web-development": [
      { id: 1, title: "Introduction à HTML et CSS", description: "Apprenez les bases du HTML et du CSS.", image: "/images/web-development.jpg", completed: true },
      { id: 2, title: "JavaScript Avancé", description: "Plongez dans les fonctionnalités avancées de JavaScript.", image: "/images/web-development.jpg", completed: false },
      { id: 3, title: "Frameworks Modernes", description: "Découvrez les frameworks modernes comme React et Vue.js.", image: "/images/web-development.jpg", completed: false },
    ],
    // Ajoutez d'autres parcours ici
  };

  const currentPath = learningPaths[courseId] || [];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Header />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Parcours d'Apprentissage</h1>
        <p className="text-center mb-8">
          Suivez votre progression à travers les différentes étapes de votre parcours d'apprentissage.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPath.map((step) => (
            <div
              key={step.id}
              className={`bg-white text-black p-6 rounded-lg shadow-lg transform transition-transform duration-300 ${
                step.completed ? 'hover:translate-y-[-6px] hover:shadow-lg' : 'grayscale'
              }`}
            >
              <Image
                src={step.image}
                alt={step.title}
                width={300}
                height={200}
                className="mb-4 rounded-lg"
              />
              <h2 className="text-2xl font-semibold mb-2">{step.title}</h2>
              <p className="text-gray-700">{step.description}</p>
              {step.completed ? (
                <span className="text-green-500 font-semibold">Terminé</span>
              ) : (
                <span className="text-yellow-500 font-semibold">En cours</span>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LearningPath;
