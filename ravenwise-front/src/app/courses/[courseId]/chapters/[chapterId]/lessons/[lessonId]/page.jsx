"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import Header from '../../../../../../../components/common/Header';
import Footer from '../../../../../../../components/common/Footer';
import LectureView from '../../../../../../../components/courses/lesson-types/LectureView';
import ExerciseView from '../../../../../../../components/courses/lesson-types/ExerciseView';
import QuizView from '../../../../../../../components/courses/lesson-types/QuizView';
import { FiArrowLeft, FiClock, FiAward } from 'react-icons/fi';

export default function LessonPage() {
  const { courseId, chapterId, lessonId } = useParams();
  const router = useRouter();
  
  const [lesson, setLesson] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  // Récupération des données de la leçon
  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        setLoading(true);
        
        // Récupérer les données de la leçon
        const lessonResponse = await axios.get(`http://localhost:3000/api/v1/exercices/${lessonId}`);
        const lessonData = lessonResponse.data;
        
        setLesson(lessonData);
        
        // Récupérer les informations du chapitre
        try {
          const chapterResponse = await axios.get(`http://localhost:3000/api/v1/chapters/${chapterId}`);
          setChapter(chapterResponse.data);
        } catch (chapterErr) {
          console.warn("Impossible de charger les données du chapitre:", chapterErr);
        }
        
        // Récupérer les informations du cours
        try {
          const courseResponse = await axios.get(`http://localhost:3000/api/v1/courses/${courseId}`);
          setCourse(courseResponse.data);
        } catch (courseErr) {
          console.warn("Impossible de charger les données du cours:", courseErr);
        }
        
        setError("");
      } catch (err) {
        console.error("Erreur lors du chargement de la leçon:", err);
        setError("Impossible de charger cette leçon.");
      } finally {
        setLoading(false);
      }
    };

    fetchLessonData();
  }, [courseId, chapterId, lessonId]);

  // Fonction pour marquer la leçon comme terminée
  const handleLessonComplete = async () => {
    try {
      // Appel API pour marquer comme terminée
      await axios.post(`http://localhost:3000/api/v1/exercices/${lessonId}/complete`);
      
      setIsCompleted(true);
      
      // Redirection après un court délai
      setTimeout(() => {
        // Vérifier s'il y a une leçon suivante dans ce chapitre
        if (lesson.nextLessonId) {
          router.push(`/courses/${courseId}/chapters/${chapterId}/lessons/${lesson.nextLessonId}`);
        } else {
          // Sinon retour à la page du chapitre
          router.push(`/courses/${courseId}/chapters/${chapterId}`);
        }
      }, 1500);
    } catch (err) {
      console.error("Erreur lors de la complétion de la leçon:", err);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  // Fonction pour retourner au chapitre
  const handleBackToChapter = () => {
    router.push(`/courses/${courseId}/chapters/${chapterId}`);
  };

  // Rendu du contenu selon le type de leçon
  const renderLessonContent = () => {
    if (!lesson) return null;

    const commonProps = {
      lesson,
      onComplete: handleLessonComplete,
      isCompleted
    };

    // Déterminer le type de leçon - conversion en minuscules pour une comparaison cohérente
    const lessonType = (lesson.type || '').toLowerCase();
    
    switch (lessonType) {
      case 'lecture':
      case 'reading':
      case 'text':
        return <LectureView {...commonProps} />;
      
      case 'exercise':
      case 'exercice':
      case 'practice':
        return <ExerciseView {...commonProps} />;
      
      case 'quiz':
      case 'test':
        return <QuizView {...commonProps} />;
      
      default:
        console.warn(`Type de leçon non reconnu: ${lesson.type}, utilisation du type lecture par défaut`);
        return <LectureView {...commonProps} />;
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#0c1524] text-white py-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FDC758] mx-auto mb-6"></div>
                <p className="text-xl">Chargement de la leçon...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !lesson) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#0c1524] text-white py-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
              <div className="rounded-full bg-red-900/20 p-6 mb-6">
                <FiAward size={40} className="text-red-400" />
              </div>
              <p className="text-red-400 text-lg mb-4">{error || "Leçon non trouvée"}</p>
              <button 
                onClick={handleBackToChapter}
                className="bg-[#253A52] hover:bg-[#304d6d] text-white px-6 py-3 rounded-lg transition-all"
              >
                Retour au chapitre
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-[#0c1524] text-white min-h-screen">
        {/* Barre de navigation de la leçon */}
        <div className="bg-[#182b4a] border-b border-gray-700 sticky top-0 z-10 shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={handleBackToChapter}
                  className="text-gray-400 hover:text-white mr-3 p-1"
                >
                  <FiArrowLeft size={20} />
                </button>
                <div>
                  <h1 className="text-lg font-bold">{lesson.title}</h1>
                  <div className="flex items-center text-sm text-gray-400">
                    {course && <span>{course.title}</span>}
                    {chapter && course && <span className="mx-2">•</span>}
                    {chapter && <span>{chapter.title}</span>}
                  </div>
                </div>
              </div>
              
              {/* Informations de la leçon */}
              <div className="flex items-center gap-4">
                {lesson.estimatedDuration && (
                  <div className="flex items-center text-sm text-gray-300">
                    <FiClock size={16} className="mr-1" />
                    <span>{lesson.estimatedDuration} min</span>
                  </div>
                )}
                
                {lesson.xpReward && (
                  <div className="flex items-center text-sm text-[#FDC758]">
                    <FiAward size={16} className="mr-1" />
                    <span>{lesson.xpReward} XP</span>
                  </div>
                )}
                
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  lesson.type === 'lecture' ? 'bg-green-900/30 text-green-300' :
                  lesson.type === 'exercise' ? 'bg-orange-900/30 text-orange-300' :
                  lesson.type === 'quiz' ? 'bg-purple-900/30 text-purple-300' :
                  'bg-gray-900/30 text-gray-300'
                }`}>
                  {lesson.type === 'lecture' && 'Lecture'}
                  {lesson.type === 'exercise' && 'Exercice'}
                  {lesson.type === 'quiz' && 'Quiz'}
                  {!['lecture', 'exercise', 'quiz'].includes(lesson.type) && lesson.type}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal de la leçon */}
        <main className="pb-20">
          {renderLessonContent()}
        </main>
      </div>
      <Footer />
    </>
  );
}