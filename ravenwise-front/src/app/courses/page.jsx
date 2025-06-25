"use client";

import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import CourseCard from '../../components/courses/CourseCard';
import LearningPathProgress from '../../components/courses/LearningPathProgress';
import { courseService, userService } from '../../services/api';
import { useUser } from '@clerk/nextjs';

export default function CoursesPage() {
  const { user: currentUser, isLoaded: userLoaded } = useUser();
  const [activeCategory, setActiveCategory] = useState('all');
  
  // États pour les données
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userProgress, setUserProgress] = useState(null);
  const [followedCourses, setFollowedCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [errorCourses, setErrorCourses] = useState("");

  // Charger les cours
  const fetchCourses = async () => {
    try {
      setLoadingCourses(true);
      const coursesData = await courseService.getPublishedCourses();
      
      if (Array.isArray(coursesData)) {
        setCourses(coursesData);
        
        // Extraire les catégories uniques des cours
        const uniqueCategories = [...new Set(coursesData
          .filter(course => course.category)
          .map(course => course.category))];
          
        setCategories(uniqueCategories);
      } else {
        setCourses([]);
        setCategories([]);
      }
      
      setErrorCourses("");
    } catch (error) {
      console.error("Erreur lors du téléchargement des cours:", error);
      setErrorCourses("Impossible de charger les cours.");
    } finally {
      setLoadingCourses(false);
    }
  };

  // Charger les cours suivis par l'utilisateur
  const fetchUserFollowedCourses = async () => {
    if (!currentUser) return;
    
    try {
      const userCoursesData = await userService.getFollowedCoursesOfUser(currentUser.id);
      setFollowedCourses(userCoursesData || []);
      
      // Calculer la progression globale si nécessaire
      if (userCoursesData && userCoursesData.length > 0) {
        // Supposons que chaque cours a une propriété progress
        const totalProgress = userCoursesData.reduce((sum, course) => sum + (course.progress || 0), 0);
        const averageProgress = totalProgress / userCoursesData.length;
        
        setUserProgress({
          completedCourses: userCoursesData.filter(c => c.progress === 100).length,
          totalCourses: userCoursesData.length,
          overallProgress: averageProgress
        });
      }
    } catch (error) {
      console.error("Erreur lors du chargement des cours suivis:", error);
    }
  };

  // Effet pour charger les données au montage du composant
  useEffect(() => {
    fetchCourses();
  }, []);

  // Effet pour charger les cours de l'utilisateur quand il est connecté
  useEffect(() => {
    if (userLoaded && currentUser) {
      fetchUserFollowedCourses();
    }
  }, [userLoaded, currentUser]);

  // Filtrer les cours selon la catégorie sélectionnée
  const filteredCourses = activeCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === activeCategory);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0c1524] text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          {userLoaded && currentUser && userProgress && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6">Votre progression</h2>
              <LearningPathProgress 
                completedCourses={userProgress.completedCourses}
                totalCourses={userProgress.totalCourses}
                overallProgress={userProgress.overallProgress}
              />
            </div>
          )}

          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Tous les cours</h2>
              
              {/* Affichage des catégories dynamiques */}
              <div className="flex space-x-2 overflow-x-auto pb-2">
                <button 
                  onClick={() => setActiveCategory('all')}
                  className={`px-4 py-2 rounded-full text-sm ${
                    activeCategory === 'all' 
                      ? 'bg-[#FDC758] text-[#0c1524] font-bold' 
                      : 'bg-[#253A52] text-white hover:bg-[#304d6d]'
                  } transition-all whitespace-nowrap`}
                >
                  Tous
                </button>
                
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm ${
                      activeCategory === category 
                        ? 'bg-[#FDC758] text-[#0c1524] font-bold' 
                        : 'bg-[#253A52] text-white hover:bg-[#304d6d]'
                    } transition-all whitespace-nowrap`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {loadingCourses ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FDC758]"></div>
              </div>
            ) : errorCourses ? (
              <div className="bg-red-900/20 text-red-400 p-4 rounded-lg text-center">
                {errorCourses}
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="bg-[#182b4a] rounded-lg p-8 text-center">
                <p className="text-xl mb-2">Aucun cours disponible</p>
                {activeCategory !== 'all' && (
                  <p className="text-gray-400">
                    Aucun cours dans la catégorie "{activeCategory}". Essayez une autre catégorie.
                  </p>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                  <CourseCard 
                    key={course.id}
                    course={course}
                    isFollowing={followedCourses.some(fc => fc.id === course.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}