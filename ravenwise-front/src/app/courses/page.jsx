"use client";

import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import CourseCard from '../../components/courses/CourseCard';
import LearningPathProgress from '../../components/courses/LearningPathProgress';
//import { useAuth } from '../../context/clerkContext';

export default function CoursesPage() {
  const { currentUser } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Ces données viendraient de votre backend/Firebase dans une application réelle
  const learningPaths = [
    { id: 'web-dev', title: 'Développement Web', completedPercentage: 45, color: '#3498db' },
    { id: 'mobile-dev', title: 'Développement Mobile', completedPercentage: 20, color: '#e74c3c' },
    { id: 'data-science', title: 'Data Science', completedPercentage: 10, color: '#2ecc71' },
  ];
  
  const categories = [
    { id: 'all', name: 'Tous les cours' },
    { id: 'web-dev', name: 'Développement Web' },
    { id: 'mobile-dev', name: 'Développement Mobile' },
    { id: 'data-science', name: 'Data Science' },
    { id: 'recommended', name: 'Recommandés pour vous' },
    { id: 'in-progress', name: 'En cours' },
  ];
  
  const courses = [
    {
      id: 1,
      title: "HTML & CSS Fondamentaux",
      description: "Apprenez les bases du développement web avec HTML et CSS",
      image: "https://placehold.co/600x400/3498db/FFFFFF/png?text=HTML+%26+CSS",
      category: "web-dev",
      level: "Débutant",
      chaptersCount: 8,
      completedChapters: 3,
      progress: 37,
      isRecommended: true,
      inProgress: true,
    },
    {
      id: 2,
      title: "JavaScript Moderne",
      description: "Maîtrisez JavaScript ES6+ et ses fonctionnalités avancées",
      image: "https://placehold.co/600x400/f39c12/FFFFFF/png?text=JavaScript",
      category: "web-dev",
      level: "Intermédiaire",
      chaptersCount: 12,
      completedChapters: 0,
      progress: 0,
      isRecommended: true,
      inProgress: false,
    },
    {
      id: 3,
      title: "React pour débutants",
      description: "Créez des interfaces dynamiques avec React",
      image: "https://placehold.co/600x400/2ecc71/FFFFFF/png?text=React",
      category: "web-dev",
      level: "Intermédiaire",
      chaptersCount: 10,
      completedChapters: 1,
      progress: 10,
      isRecommended: false,
      inProgress: true,
    },
    {
      id: 4,
      title: "Développement Android avec Kotlin",
      description: "Développez des applications mobiles pour Android",
      image: "https://placehold.co/600x400/e74c3c/FFFFFF/png?text=Android",
      category: "mobile-dev",
      level: "Intermédiaire",
      chaptersCount: 15,
      completedChapters: 0,
      progress: 0,
      isRecommended: false,
      inProgress: false,
    },
    {
      id: 5,
      title: "Python pour la Data Science",
      description: "Analysez des données avec Python et ses bibliothèques",
      image: "https://placehold.co/600x400/9b59b6/FFFFFF/png?text=Python",
      category: "data-science",
      level: "Avancé",
      chaptersCount: 14,
      completedChapters: 2,
      progress: 14,
      isRecommended: true,
      inProgress: true,
    },
  ];

  // Filtrer les cours selon la catégorie active
  const filteredCourses = activeCategory === 'all' 
    ? courses 
    : activeCategory === 'recommended' 
      ? courses.filter(course => course.isRecommended) 
      : activeCategory === 'in-progress' 
        ? courses.filter(course => course.inProgress)
        : courses.filter(course => course.category === activeCategory);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0c1524] text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Vos parcours d'apprentissage</h1>
            <p className="text-gray-400 mb-8">Continuez votre progression ou démarrez un nouveau parcours</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {learningPaths.map(path => (
                <LearningPathProgress 
                  key={path.id} 
                  title={path.title} 
                  completedPercentage={path.completedPercentage} 
                  color={path.color}
                  pathId={path.id}
                />
              ))}
            </div>
          </div>
          
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Explorer les cours</h2>
            
            {/* Filtres de catégories */}
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full transition-all ${
                    activeCategory === category.id
                      ? 'bg-[#FDC758] text-[#0F1B2A] font-semibold'
                      : 'bg-[#1B2A3B] text-white hover:bg-[#263c58]'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            {/* Grille de cours */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
            
            {filteredCourses.length === 0 && (
              <div className="text-center py-10">
                <p className="text-xl text-gray-400">Aucun cours trouvé dans cette catégorie.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}