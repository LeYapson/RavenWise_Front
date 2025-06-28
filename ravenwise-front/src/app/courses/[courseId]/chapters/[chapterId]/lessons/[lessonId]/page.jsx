"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { lessonService, exercicesService, lecturesService, quizzesService, courseService, chapterService } from '../../../../../../../services/api';
import Header from '../../../../../../../components/common/Header';
import Footer from '../../../../../../../components/common/Footer';
import LectureView from '../../../../../../../components/courses/lesson-types/LectureView';
import ExerciseView from '../../../../../../../components/courses/lesson-types/ExerciseView';
import QuizView from '../../../../../../../components/courses/lesson-types/QuizView';
import { FiArrowLeft, FiClock, FiAward } from 'react-icons/fi';
import { isLessonCompleted, markLessonAsCompleted } from '../../../../../../../utils/lessonCompletion';

export default function LessonPage() {
  const { courseId, chapterId, lessonId } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Récupérer le type depuis l'URL
  const typeFromUrl = searchParams.get('type') || '';
  
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
        
        let lessonData;
        let lessonType = typeFromUrl || 'lecture'; // Type par défaut
        
        // D'abord essayer de récupérer depuis la table lessons
        try {
          lessonData = await lessonService.getLessonById(lessonId);
          lessonType = lessonData.type || typeFromUrl || 'lecture';
        } catch (lessonError) {
          console.log("Leçon non trouvée dans la table lessons, essai avec les services spécialisés...");
          
          // Si pas trouvé, essayer selon le type spécifié dans l'URL
          try {
            switch (typeFromUrl.toLowerCase()) {
              case 'exercice':
              case 'exercise':
                lessonData = await exercicesService.getExerciceById(lessonId);
                lessonType = 'exercice';
                break;
              case 'quiz':
                lessonData = await quizzesService.getQuizById(lessonId);
                lessonType = 'quiz';
                break;
              case 'lecture':
              default:
                lessonData = await lecturesService.getLectureById(lessonId);
                lessonType = 'lecture';
                break;
            }
          } catch (serviceError) {
            console.error("Erreur avec les services spécialisés:", serviceError);
            throw new Error("Leçon non trouvée dans aucun service");
          }
        }
        
        // Normaliser les données
        const normalizedLesson = {
          ...lessonData,
          type: lessonType
        };
        setLesson(normalizedLesson);
        
        // Vérifier l'état de complétion depuis localStorage si l'API ne le fournit pas
        const isLessonCompleted_Local = isLessonCompleted(lessonId);
        setIsCompleted(isLessonCompleted_Local);
        
        // Récupérer les informations du chapitre
        try {
          const chapterData = await chapterService.getChapterById(chapterId);
          setChapter(chapterData);
        } catch (chapterErr) {
          console.warn("Impossible de charger les données du chapitre:", chapterErr);
        }
        
        // Récupérer les informations du cours
        try {
          const courseData = await courseService.getCourseById(courseId);
          setCourse(courseData);
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

  // Fonction pour marquer la leçon comme terminée (localStorage uniquement)
  const handleLessonComplete = () => {
    try {
      setIsCompleted(true);
      
      // Stocker l'état de complétion dans localStorage
      markLessonAsCompleted(lessonId, {
        courseId,
        chapterId,
        lessonType: lesson.type,
        lessonTitle: lesson.title
      });
      
      // Afficher un message de succès
      alert("Leçon terminée avec succès!");
      
      // Redirection après un court délai
      setTimeout(() => {
        // Retour à la page du cours
        router.push(`/courses/${courseId}`);
      }, 1500);
    } catch (err) {
      console.error("Erreur lors de la complétion de la leçon:", err);
      alert("Une erreur est survenue lors de la validation. Veuillez réessayer.");
    }
  };

  // Fonction pour retourner au chapitre
  const handleBackToChapter = () => {
    router.push(`/courses/${courseId}/chapters/${chapterId}`);
  };

  // Renommée pour plus de clarté
  const handleBackToCourse = () => {
    router.push(`/courses/${courseId}`); // Retour direct à la page du cours au lieu du chapitre
  };

  // Rendu du contenu selon le type de leçon
  const renderLessonContent = () => {
    if (!lesson) return null;

    const commonProps = {
      lesson,
      onComplete: handleLessonComplete,
      isCompleted
    };

    // Utiliser le type déjà normalisé dans lesson.type
    switch (lesson.type.toLowerCase()) {
      case 'quiz':
      case 'test':
        return <QuizView {...commonProps} />;
    
      case 'exercice':
      case 'exercise':
      case 'practice':
        return <ExerciseView {...commonProps} />;
    
      case 'lecture':
      case 'reading':
      case 'text':
      default:
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
                onClick={handleBackToCourse} // Utiliser handleBackToCourse au lieu de handleBackToChapter
                className="bg-[#253A52] hover:bg-[#304d6d] text-white px-6 py-3 rounded-lg transition-all"
              >
                Retour au cours
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
                  onClick={handleBackToCourse}  // Changer ici aussi
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
                
                {/* Affichage du type de leçon avec badge et gestion du undefined */}
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  !lesson.type || lesson.type === '' ? 'bg-green-900/30 text-green-300' :
                  lesson.type === 'quiz' ? 'bg-purple-900/30 text-purple-300' :
                  lesson.type === 'lecture' ? 'bg-green-900/30 text-green-300' :
                  lesson.type === 'exercice' ? 'bg-orange-900/30 text-orange-300' :
                  'bg-gray-900/30 text-gray-300'
                }`}>
                  {!lesson.type || lesson.type === '' ? 'Lecture' :
                   lesson.type === 'quiz' ? 'Quiz' :
                   lesson.type === 'lecture' ? 'Lecture' :
                   lesson.type === 'exercice' ? 'Exercice' :
                   lesson.type}
                </span>
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