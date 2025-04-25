"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Changez l'import pour utiliser next/navigation
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';

// Importez vos composants de cours ici
import CourseHeader from '../../../components/courses/CourseHeader';
import ChapterBlock from '../../../components/courses/ChapterBlock';
import CourseProgress from '../../../components/courses/CourseProgress';
import RelatedCourses from '../../../components/courses/RelatedCourses';

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.courseId; // Utilisez params.courseId au lieu de courseId directement
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Simulez le chargement des données du cours
  useEffect(() => {
    const fetchCourse = async () => {
      // Simulation d'un appel API - à remplacer par votre logique de récupération des données
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Exemple de données statiques - à remplacer par vos données réelles
      setCourse({
        id: parseInt(courseId),
        title: "JavaScript Moderne",
        description: "Maîtrisez JavaScript ES6+ et ses fonctionnalités avancées",
        instructor: "Sophie Martin",
        level: "Intermédiaire",
        duration: "12 heures",
        ratings: 4.8,
        studentsCount: 1243,
        chapters: [
          {
            id: 1,
            title: "Introduction à JavaScript moderne",
            completed: true,
            lessons: [/* ... */]
          },
          {
            id: 2,
            title: "Variables et portées",
            completed: false,
            lessons: [/* ... */]
          },
          // Ajoutez plus de chapitres selon vos besoins
        ],
        progress: 25,
        relatedCourses: [
          {
            id: 3,
            title: "React pour débutants",
            instructor: "Marc Durand",
            image: "https://placehold.co/600x400/2ecc71/FFFFFF/png?text=React"
          },
          // Ajoutez d'autres cours liés
        ]
      });
      
      setLoading(false);
    };
    
    fetchCourse();
  }, [courseId]);
  
  // Affichage pendant le chargement
  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#0c1524] text-white py-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="animate-pulse text-xl">Chargement du cours...</div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  // Si le cours n'existe pas
  if (!course) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#0c1524] text-white py-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="text-xl">Cours non trouvé</div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  // Affichage normal du cours
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0c1524] text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          {/* En-tête du cours */}
          <CourseHeader course={course} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            {/* Colonne principale - Chapitres */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Parcours du cours</h2>
              
              <div className="space-y-6">
                {course.chapters.map((chapter) => (
                  <ChapterBlock key={chapter.id} chapter={chapter} courseId={course.id} />
                ))}
              </div>
            </div>
            
            {/* Barre latérale - Progression */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-8">
                <CourseProgress course={course} />
                <RelatedCourses courses={course.relatedCourses} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}