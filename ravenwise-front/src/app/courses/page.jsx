"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import CourseCard from '../../components/courses/CourseCard';
import LearningPathProgress from '../../components/courses/LearningPathProgress';
import { useUser } from '@clerk/nextjs';

export default function CoursesPage() {
  const { user: currentUser } = useUser(); // On garde éventuellement cette info pour la suite
  const [activeCategory, setActiveCategory] = useState('all');

  // État pour les cours récupérés depuis l'API
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [errorCourses, setErrorCourses] = useState("");

  const fetchCourses = async () => {
    try {
      setLoadingCourses(true);
      const response = await axios.get('http://localhost:3000/api/v1/courses');
      console.log('Réponse API:', response.data);
      
      // Modification ici - accepter soit response.data.data soit directement response.data
      const coursesData = Array.isArray(response.data) ? response.data : (response.data.data || []);
      setCourses(coursesData);
      
      setErrorCourses("");
    } catch (error) {
      console.error("Erreur lors du téléchargement des cours:", error);
      setErrorCourses("Impossible de charger les cours.");
    } finally {
      setLoadingCourses(false);
    }
  };

  // Récupérer les cours au chargement de la page
  useEffect(() => {
    fetchCourses();
  }, []);

  // Données statiques pour les parcours d'apprentissage et catégories
  const learningPaths = [
    { id: 'web-dev', title: 'Développement Web', completedPercentage: 45, color: '#3498db' },
    { id: 'mobile-dev', title: 'Développement Mobile', completedPercentage: 20, color: '#e74c3c' },
    { id: 'data-science', title: 'Data Science', completedPercentage: 10, color: '#2ecc71' },
  ];

  const categories = [
    { id: 'all', name: 'Tous les cours' },
    { id: 'web development', name: 'Développement Web' },
    { id: 'mobile development', name: 'Développement Mobile' },
    { id: 'data science', name: 'Data Science' },
    { id: 'recommended', name: 'Recommandés pour vous' },
    { id: 'in-progress', name: 'En cours' },
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

            {/* Affichage des cours ou des messages de chargement/erreur */}
            {loadingCourses ? (
              <p>Chargement des cours...</p>
            ) : errorCourses ? (
              <p className="text-red-500">{errorCourses}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}

            {(!loadingCourses && filteredCourses.length === 0) && (
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