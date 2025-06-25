"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import { 
  FiPlay, 
  FiClock, 
  FiBarChart2, 
  FiCalendar, 
  FiUser, 
  FiLock, 
  FiCheck,
  FiBookOpen,
  FiAward,
  FiArrowRight,
  FiChevronDown,
  FiChevronUp,
  FiBookmark
} from 'react-icons/fi';
import { courseService, lessonService, chapterService, userService } from '../../../services/api';
import { useUser } from '@clerk/nextjs';

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedChapters, setExpandedChapters] = useState({});
  const [chapterLessons, setChapterLessons] = useState({});
  const [loadingLessons, setLoadingLessons] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  // Mise à jour de useEffect pour précharger les nombres de leçons
  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        setLoading(true);
        // Récupérer les détails du cours
        const courseData = await courseService.getCourseById(courseId);
        console.log('Course detail API:', courseData);
        
        setCourse(courseData);
        
        try {
          const chaptersData = await courseService.getChaptersByCourse(courseId);
          setChapters(chaptersData || []);
          
          // Précharger le nombre de leçons pour chaque chapitre
          if (chaptersData?.length > 0) {
            // Créer un tableau de promesses pour les requêtes de comptage de leçons
            const lessonsCountPromises = chaptersData.map(chapter => 
              lessonService.getLessonByChapterId(chapter.id)
                .then(data => ({ 
                  chapterId: chapter.id, 
                  count: data ? data.length : 0 
                }))
                .catch(() => ({ chapterId: chapter.id, count: 0 }))
            );
            
            // Attendre toutes les requêtes
            const lessonsCountResults = await Promise.all(lessonsCountPromises);
            
            // Mettre à jour les chapitres avec les décomptes exacts
            setChapters(prevChapters => prevChapters.map(chapter => {
              const result = lessonsCountResults.find(item => item.chapterId === chapter.id);
              return {
                ...chapter,
                lessonsCount: result ? result.count : 0
              };
            }));
          }
        } catch (chaptersErr) {
          console.error("Erreur lors du chargement des chapitres:", chaptersErr);
          setChapters([]);
        }
        
        setError("");
      } catch (err) {
        console.error("Erreur lors du téléchargement du cours:", err);
        setError("Impossible de charger le détail du cours.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [courseId]);

  // Fonction pour récupérer les leçons d'un chapitre
  const fetchChapterLessons = async (chapterId) => {
    // Si on a déjà les leçons, ne pas les recharger
    if (chapterLessons[chapterId]) {
      return;
    }
    
    setLoadingLessons(prev => ({ ...prev, [chapterId]: true }));
    
    try {
      const lessonsData = await lessonService.getLessonByChapterId(chapterId);
      setChapterLessons(prev => ({ 
        ...prev, 
        [chapterId]: lessonsData || [] 
      }));
    } catch (err) {
      console.error(`Erreur lors du chargement des leçons pour le chapitre ${chapterId}:`, err);
    } finally {
      setLoadingLessons(prev => ({ ...prev, [chapterId]: false }));
    }
  };

  // Fonction pour basculer l'état d'expansion d'un chapitre
  const toggleChapter = async (chapterId) => {
    const newExpandedState = !expandedChapters[chapterId];
    
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: newExpandedState
    }));
    
    // Charger les leçons si le chapitre est ouvert et qu'on n'a pas encore les leçons
    if (newExpandedState) {
      fetchChapterLessons(chapterId);
    }
  };

  // Améliorez la fonction formatDuration pour gérer tous les cas possibles
  const formatDuration = (minutes) => {
    // Si la valeur est undefined, null, ou une chaîne vide
    if (minutes === undefined || minutes === null || minutes === '') {
      return "Durée non spécifiée";
    }
    
    // Conversion en nombres
    const mins = parseInt(minutes, 10);
    if (isNaN(mins)) {
      return "Durée non spécifiée";
    }
    
    // Gestion de tous les cas possibles
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    
    if (hours === 0) {
      return `${remainingMins}min`;
    } else if (remainingMins === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${remainingMins}min`;
    }
  };

  // Fonction pour calculer la durée totale d'un chapitre à partir de ses leçons
  const calculateChapterDuration = (chapterId) => {
    if (!chapterLessons[chapterId] || chapterLessons[chapterId].length === 0) {
      return null;
    }
    
    // Calculer la somme des durées des leçons
    const totalMinutes = chapterLessons[chapterId].reduce((total, lesson) => {
      const lessonDuration = parseInt(lesson.estimatedDuration, 10);
      return isNaN(lessonDuration) ? total : total + lessonDuration;
    }, 0);
    
    return totalMinutes > 0 ? totalMinutes : null;
  };

  // Ajouter cette fonction dans votre composant CourseDetailPage
  const calculateTotalCourseDuration = () => {
    let totalDuration = 0;
    
    // Parcourir tous les chapitres qui ont des leçons chargées
    Object.keys(chapterLessons).forEach(chapterId => {
      if (chapterLessons[chapterId] && chapterLessons[chapterId].length > 0) {
        // Ajouter la durée de toutes les leçons de ce chapitre
        totalDuration += chapterLessons[chapterId].reduce((sum, lesson) => {
          return sum + (lesson.estimatedDuration || 0);
        }, 0);
      }
    });
    
    return totalDuration;
  };

  // Charger toutes les leçons de tous les chapitres
  const preloadAllLessons = async () => {
    if (!chapters || chapters.length === 0) return;
    
    for (const chapter of chapters) {
      if (!chapterLessons[chapter.id]) {
        await fetchChapterLessons(chapter.id);
      }
    }
  };

  useEffect(() => {
    if (chapters && chapters.length > 0) {
      preloadAllLessons();
    }
  }, [chapters]);

  // Ajouter cette fonction pour vérifier si l'utilisateur suit déjà le cours
  useEffect(() => {
    const checkIfFollowing = async () => {
      if (isLoaded && user && course) {
        try {
          const userCourses = await userService.getFollowedCoursesOfUser(user.id);
          const isAlreadyFollowing = userCourses.some(c => c.id === Number(courseId));
          setIsFollowing(isAlreadyFollowing);
        } catch (err) {
          console.error("Erreur lors de la vérification du suivi du cours:", err);
        }
      }
    };
    
    checkIfFollowing();
  }, [isLoaded, user, course, courseId]);

  // Ajouter cette fonction pour suivre/ne plus suivre un cours
  const toggleFollowCourse = async () => {
    if (!isLoaded || !user) {
      router.push('/sign-in');
      return;
    }
    
    try {
      setFollowLoading(true);
      
      if (isFollowing) {
        // Ajouter courseId en paramètre
        await userService.unfollowCourseById(user.id, Number(courseId));
        setIsFollowing(false);
      } else {
        // Ajouter courseId en paramètre
        await userService.followCourseById(user.id, Number(courseId));
        setIsFollowing(true);
      }
    } catch (err) {
      console.error("Erreur lors du suivi/désabonnement du cours:", err);
      console.log("Détails de l'erreur:", err.response?.data || err.message);
      alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#0c1524] text-white py-10">
          <div className="max-w-7xl mx-auto px-4 flex justify-center items-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FDC758] mx-auto mb-6"></div>
              <p className="text-xl">Chargement du cours...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !course) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#0c1524] text-white py-10">
          <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center min-h-[50vh]">
            <div className="rounded-full bg-red-900/20 p-6 mb-6">
              <FiBookOpen size={40} className="text-red-400" />
            </div>
            <p className="text-red-400 text-lg mb-4">{error || "Aucun cours trouvé avec cet identifiant."}</p>
            <button 
              onClick={() => router.push('/courses')}
              className="bg-[#253A52] hover:bg-[#304d6d] text-white px-6 py-3 rounded-lg transition-all"
            >
              Retour aux cours
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      {/* Bannière du cours */}
      <div className="relative bg-gradient-to-b from-[#182b4a] to-[#0c1524] h-64 md:h-80">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" 
             style={{ backgroundImage: course.imageUrl ? `url(${course.imageUrl})` : 'none' }}>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#253A52] to-[#0c1524] opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 border-[#FDC758]">
              {course.imageUrl ? (
                <Image 
                  src={course.imageUrl} 
                  alt={course.title}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#253A52] flex items-center justify-center text-[#FDC758]">
                  <FiBookOpen size={32} />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                {course.category && (
                  <span className="bg-[#FDC758] text-[#0c1524] text-xs font-bold px-2 py-1 rounded-full">
                    {course.category}
                  </span>
                )}
                {course.level && (
                  <span className="text-gray-400 text-sm">
                    {course.level}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">{course.title}</h1>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contenu principal */}
      <main className="bg-[#0c1524] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne principale */}
            <div className="lg:col-span-2">
              {/* Onglets */}
              <div className="border-b border-gray-700 mb-8">
                <div className="flex space-x-6">
                  <button 
                    onClick={() => setActiveTab("overview")}
                    className={`pb-4 relative ${activeTab === "overview" ? "text-[#FDC758]" : "text-gray-400 hover:text-white"}`}
                  >
                    Aperçu
                    {activeTab === "overview" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FDC758] rounded-t"></div>}
                  </button>
                  <button 
                    onClick={() => setActiveTab("content")}
                    className={`pb-4 relative ${activeTab === "content" ? "text-[#FDC758]" : "text-gray-400 hover:text-white"}`}
                  >
                    Contenu du cours
                    {activeTab === "content" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FDC758] rounded-t"></div>}
                  </button>
                </div>
              </div>
              
              {/* Contenu des onglets */}
              {activeTab === "overview" && (
                <>
                  {course.description && (
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-4">À propos de ce cours</h2>
                      <p className="text-gray-300 leading-relaxed">
                        {course.description}
                      </p>
                    </div>
                  )}
                  
                  {course.learningPoints && course.learningPoints.length > 0 && (
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-4">Ce que vous allez apprendre</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {course.learningPoints.map((point, index) => (
                          <div key={index} className="flex gap-2">
                            <FiCheck className="text-green-400 flex-shrink-0 mt-1" />
                            <p className="text-gray-300">{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {course.prerequisites && course.prerequisites.length > 0 && (
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-4">Prérequis</h2>
                      <div className="bg-[#182b4a] p-6 rounded-lg">
                        <ul className="space-y-2">
                          {course.prerequisites.map((prerequisite, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-[#FDC758]"></div>
                              <span>{prerequisite}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </>
              )}
              
              {/* Contenu de l'onglet Contenu modifié pour afficher les leçons dans un menu déroulant */}
              {activeTab === "content" && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-6">Contenu du cours</h2>
                  
                  <div className="space-y-4">
                    {chapters.length > 0 ? (
                      chapters.map((chapter, index) => (
                        <div key={chapter.id} className="bg-[#182b4a] rounded-lg overflow-hidden">
                          <div 
                            className="p-4 border-l-4 border-[#FDC758] flex justify-between items-center cursor-pointer transition-colors hover:bg-[#1d325a]"
                            onClick={() => toggleChapter(chapter.id)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#253A52] flex items-center justify-center text-[#FDC758] font-bold">
                                {index + 1}
                              </div>
                              <div>
                                <h3 className="font-medium">{chapter.title}</h3>
                                <p className="text-sm text-gray-400">
                                  {/* Afficher le nombre de leçons correctement */}
                                  {chapterLessons[chapter.id] ? 
                                    `${chapterLessons[chapter.id].length} leçons` : 
                                    `${chapter.lessonsCount || '0'} leçons`} 
                                  {chapterLessons[chapter.id] ? 
                                    ` • ${formatDuration(calculateChapterDuration(chapter.id))}` : 
                                    chapter.duration ? ` • ${formatDuration(chapter.duration)}` : ''}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (chapterLessons[chapter.id]?.length > 0) {
                                    // Rediriger directement vers la première leçon
                                    router.push(`/courses/${courseId}/chapters/${chapter.id}/lessons/${chapterLessons[chapter.id][0].id}`);
                                  } else {
                                    // Si les leçons ne sont pas encore chargées, les charger puis rediriger
                                    fetchChapterLessons(chapter.id).then(() => {
                                      if (chapterLessons[chapter.id]?.length > 0) {
                                        router.push(`/courses/${courseId}/chapters/${chapter.id}/lessons/${chapterLessons[chapter.id][0].id}`);
                                      } else {
                                        alert('Aucune leçon disponible pour ce chapitre.');
                                      }
                                    });
                                  }
                                }}
                                className="bg-[#253A52] hover:bg-[#304d6d] text-white p-2 rounded-lg transition-all mr-2"
                                title="Commencer ce chapitre"
                              >
                                <FiPlay size={16} />
                              </button>
                              {expandedChapters[chapter.id] ? <FiChevronUp /> : <FiChevronDown />}
                            </div>
                          </div>
                          
                          {/* Contenu expansible */}
                          {expandedChapters[chapter.id] && (
                            <div className="px-4 py-2 border-t border-[#253A52] bg-[#152238]">
                              {loadingLessons[chapter.id] ? (
                                <div className="py-6 text-center">
                                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#FDC758] mx-auto mb-2"></div>
                                  <p className="text-sm text-gray-400">Chargement des leçons...</p>
                                </div>
                              ) : chapterLessons[chapter.id] && chapterLessons[chapter.id].length > 0 ? (
                                <ul className="divide-y divide-[#253A52]/50">
                                  {chapterLessons[chapter.id].map((lesson, i) => (
                                    <li key={lesson.id} className="py-4">
                                      <div className="flex flex-col md:flex-row justify-between md:items-center">
                                        <div className="flex items-start gap-3 mb-3 md:mb-0">
                                          <div className="mt-1">
                                            {lesson.isCompleted ? (
                                              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                                                <FiCheck className="text-green-400" size={14} />
                                              </div>
                                            ) : lesson.isLocked ? (
                                              <div className="w-6 h-6 rounded-full bg-gray-500/20 flex items-center justify-center">
                                                <FiLock className="text-gray-500" size={14} />
                                              </div>
                                            ) : (
                                              <div className="w-6 h-6 rounded-full bg-[#FDC758]/20 flex items-center justify-center">
                                                <FiPlay className="text-[#FDC758]" size={14} />
                                              </div>
                                            )}
                                          </div>
                                          <div>
                                            <div className="flex flex-wrap gap-2 mb-1">
                                              {/* Affichage de la catégorie */}
                                              {lesson.category && (
                                                <span className="text-xs text-[#FDC758]">{lesson.category}</span>
                                              )}
                                              
                                              {/* Affichage du type de leçon avec badge */}
                                              {lesson.type && (
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                                  lesson.type === 'quiz' ? 'bg-purple-900/30 text-purple-300' :
                                                  lesson.type === 'lecture' ? 'bg-green-900/30 text-green-300' :
                                                  lesson.type === 'exercice' ? 'bg-orange-900/30 text-orange-300' :
                                                  'bg-gray-900/30 text-gray-300'
                                                }`}>
                                                  {lesson.type === 'quiz' && 'Quiz'}
                                                  {lesson.type === 'lecture' && 'Lecture'}
                                                  {lesson.type === 'exercice' && 'Exercice'}
                                                  {/* Afficher le type tel quel si ce n'est pas un des trois types connus */}
                                                  {(lesson.type !== 'quiz' && 
                                                    lesson.type !== 'lecture' && 
                                                    lesson.type !== 'exercice') && lesson.type}
                                                </span>
                                              )}
                                            </div>
                                            
                                            <h4 className={`font-medium ${lesson.isLocked ? "text-gray-500" : ""}`}>
                                              {lesson.title || `Leçon ${i+1}`}
                                            </h4>
                                            {lesson.content && (
                                              <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                                                {lesson.content}
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3 ml-9 md:ml-0">
                                          <span className="text-xs text-gray-200 bg-[#253A52] px-2 py-1 rounded flex items-center whitespace-nowrap">
                                            <FiClock size={12} className="mr-1" />
                                            {formatDuration(lesson.estimatedDuration)}
                                          </span>
                                          
                                          <button 
                                            className={`${lesson.isLocked ? 'text-gray-500 cursor-not-allowed' : 'text-[#FDC758] hover:bg-[#FDC758]/10'} p-1 rounded-full transition-colors`}
                                            onClick={() => !lesson.isLocked && router.push(`/courses/${courseId}/chapters/${chapter.id}/lessons/${lesson.id}?type=${lesson.type || 'lecture'}`)}
                                            disabled={lesson.isLocked}
                                            title={lesson.isLocked ? "Leçon verrouillée" : "Commencer cette leçon"}
                                          >
                                            <FiArrowRight size={16} />
                                          </button>
                                        </div>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <div className="py-6 text-center">
                                  <p className="text-gray-400">Aucune leçon disponible pour ce chapitre.</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="bg-[#182b4a] rounded-lg p-8 text-center">
                        <div className="inline-block bg-[#253A52] p-4 rounded-full mb-4">
                          <FiBookOpen size={24} className="text-[#FDC758]" />
                        </div>
                        <h3 className="text-xl font-medium mb-2">Aucun chapitre disponible</h3>
                        <p className="text-gray-400">Le contenu de ce cours est en cours de préparation.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div>
              <div className="bg-[#182b4a] rounded-xl overflow-hidden sticky top-24">
                {/* Image de couverture */}
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={course.imageUrl || "/images/course-default.jpg"}
                    alt={course.title}
                    width={500}
                    height={280}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <FiPlay size={24} className="text-white" />
                    </div>
                  </div>
                </div>
                
                {/* Informations du cours */}
                <div className="p-6">
                  {course.price ? (
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-white">{course.price}€</span>
                      {course.originalPrice && (
                        <span className="text-gray-400 line-through ml-2">{course.originalPrice}€</span>
                      )}
                    </div>
                  ) : (
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-[#FDC758]">Gratuit</span>
                    </div>
                  )}
                  
                  <button 
                    onClick={() => {
                      if (chapters.length > 0 && chapterLessons[chapters[0].id]?.length > 0) {
                        router.push(`/courses/${courseId}/chapters/${chapters[0].id}/lessons/${chapterLessons[chapters[0].id][0].id}`);
                      } else if (chapters.length > 0) {
                        // Charger d'abord les leçons du premier chapitre, puis rediriger
                        fetchChapterLessons(chapters[0].id).then(() => {
                          if (chapterLessons[chapters[0].id]?.length > 0) {
                            router.push(`/courses/${courseId}/chapters/${chapters[0].id}/lessons/${chapterLessons[chapters[0].id][0].id}`);
                          }
                        });
                      }
                    }}
                    className="w-full bg-[#FDC758] hover:bg-[#e9b53e] text-[#0c1524] font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 mb-4 transition-all"
                  >
                    <FiPlay size={18} />
                    Commencer le cours
                  </button>
                  
                  {isLoaded && user && (
                    <button
                      onClick={toggleFollowCourse}
                      disabled={followLoading}
                      className={`w-full ${
                        isFollowing 
                          ? 'bg-[#253A52] hover:bg-[#304d6d] text-white' 
                          : 'bg-transparent border-2 border-[#FDC758] text-[#FDC758] hover:bg-[#FDC758]/10'
                      } font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 mb-6 transition-all`}
                    >
                      {followLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      ) : (
                        <FiBookmark size={18} />
                      )}
                      {isFollowing ? "Ne plus suivre" : "Suivre ce cours"}
                    </button>
                  )}
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#253A52] flex items-center justify-center text-[#FDC758]">
                        <FiClock />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Durée</p>
                        <p className="font-medium">
                          {Object.keys(chapterLessons).length > 0 
                            ? formatDuration(calculateTotalCourseDuration())
                            : course.duration 
                              ? formatDuration(course.duration) 
                              : "Calcul en cours..."}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#253A52] flex items-center justify-center text-[#FDC758]">
                        <FiBarChart2 />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Niveau</p>
                        <p className="font-medium">{course.level || "Intermédiaire"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#253A52] flex items-center justify-center text-[#FDC758]">
                        <FiBookOpen />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Chapitres</p>
                        <p className="font-medium">{chapters.length}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#253A52] flex items-center justify-center text-[#FDC758]">
                        <FiCalendar />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Mis à jour</p>
                        <p className="font-medium">{course.updatedAt ? new Date(course.updatedAt).toLocaleDateString('fr-FR') : "Récemment"}</p>
                      </div>
                    </div>
                    
                    {course.instructor && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#253A52] flex items-center justify-center text-[#FDC758]">
                          <FiUser />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Instructeur</p>
                          <p className="font-medium">{course.instructor}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-[#253A52]">
                    <p className="text-gray-400 text-sm mb-4">Ce cours inclut:</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <FiCheck className="text-[#FDC758]" /> 
                        <span>Accès à vie</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <FiCheck className="text-[#FDC758]" /> 
                        <span>Exercices pratiques</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <FiCheck className="text-[#FDC758]" /> 
                        <span>Certificat d'achèvement</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <FiCheck className="text-[#FDC758]" /> 
                        <span>Support communautaire</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}