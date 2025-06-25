"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { 
  FiBook, FiClock, FiTrendingUp, FiAward, 
  FiBarChart2, FiCalendar, FiCheck, FiPlay 
} from 'react-icons/fi';

import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import CourseCardSmall from '../../components/courses/CourseCardSmall';
import { courseService, userService, exerciseService } from '../../services/api';

/**
 * DashboardPage - Page principale du tableau de bord utilisateur
 * Regroupe les informations sur la progression, les recommandations et l'activité récente
 */
export default function Dashboard() {
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  
  // États
  const [userData, setUserData] = useState(null);
  const [followedCourses, setFollowedCourses] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Charger les données utilisateur et ses cours
  useEffect(() => {
    const fetchUserData = async () => {
      if (!isLoaded || !isSignedIn) return;
      
      try {
        setLoading(true);
        
        // Récupérer les données de l'utilisateur
        try {
          const userData = await userService.getUserById(user.id);
          setUserData(userData);
        } catch (userErr) {
          console.warn("Erreur lors du chargement des données utilisateur:", userErr);
        }
        
        // Récupérer les cours suivis par l'utilisateur
        try {
          const userCourses = await userService.getFollowedCoursesOfUser(user.id);
          setFollowedCourses(userCourses || []);
          
          // Calculer la progression globale
          if (userCourses && userCourses.length > 0) {
            const totalProgress = userCourses.reduce((sum, course) => sum + (course.progress || 0), 0);
            setOverallProgress(userCourses.length > 0 ? totalProgress / userCourses.length : 0);
          }
          
          // Récupérer l'activité récente (derniers exercices complétés)
          // Note: cette partie dépend de si votre API a cette fonctionnalité
          try {
            // Si vous avez un endpoint pour récupérer l'activité récente
            // const recentActivityData = await userService.getRecentActivity(user.id);
            // setRecentActivity(recentActivityData);
            
            // Simuler des données d'activité récente à partir des cours suivis
            const activity = [];
            for (const course of userCourses.slice(0, 3)) {
              if (course.lastCompletedLesson) {
                activity.push({
                  id: `activity-${course.id}`,
                  type: 'lesson_completed',
                  courseId: course.id,
                  courseTitle: course.title,
                  lessonId: course.lastCompletedLesson.id,
                  lessonTitle: course.lastCompletedLesson.title,
                  timestamp: course.lastCompletedLesson.completedAt
                });
              }
            }
            setRecentActivity(activity);
          } catch (activityErr) {
            console.warn("Erreur lors du chargement de l'activité récente:", activityErr);
          }
        } catch (coursesErr) {
          console.error("Erreur lors du chargement des cours suivis:", coursesErr);
          setFollowedCourses([]);
        }
        
        // Récupérer les cours recommandés
        try {
          const allCourses = await courseService.getPublishedCourses();
          
          // Filtrer pour ne pas recommander des cours déjà suivis
          const followedIds = followedCourses.map(c => c.id);
          const notFollowed = allCourses.filter(c => !followedIds.includes(c.id));
          
          // Simuler une recommandation simple (premiers cours non suivis)
          setRecommendedCourses(notFollowed.slice(0, 3));
        } catch (recommendErr) {
          console.warn("Erreur lors du chargement des recommandations:", recommendErr);
        }
        
        setError("");
      } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
        setError("Impossible de charger vos données. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [isLoaded, isSignedIn, user]);
  
  // Rediriger si non connecté
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  // Calculer si un cours est récemment mis à jour (moins de 30 jours)
  const isRecentlyUpdated = (updatedAt) => {
    if (!updatedAt) return false;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return new Date(updatedAt) >= thirtyDaysAgo;
  };

  if (!isLoaded || loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#0c1524] text-white py-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FDC758] mx-auto mb-6"></div>
                <p className="text-xl">Chargement de votre tableau de bord...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#0c1524] text-white py-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center py-20">
              <div className="text-red-500 mb-4">
                <FiAward size={48} className="mx-auto" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Une erreur est survenue</h2>
              <p className="text-gray-400 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-[#253A52] hover:bg-[#304d6d] text-white px-6 py-3 rounded-lg transition-all"
              >
                Réessayer
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
      <main className="min-h-screen bg-[#0c1524] text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          {/* En-tête du tableau de bord */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
            <p className="text-gray-400">
              Bienvenue, {userData?.name || userData?.firstName || user?.firstName || 'étudiant'} ! Voici votre progression.
            </p>
          </div>
          
          {/* Tuiles de statistiques */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Cours suivis */}
            <div className="bg-[#182b4a] rounded-xl p-6 flex items-start">
              <div className="w-12 h-12 rounded-full bg-[#253A52] flex items-center justify-center text-[#FDC758] mr-4">
                <FiBook size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Cours suivis</p>
                <p className="text-2xl font-bold">{followedCourses.length}</p>
              </div>
            </div>
            
            {/* Temps total d'apprentissage */}
            <div className="bg-[#182b4a] rounded-xl p-6 flex items-start">
              <div className="w-12 h-12 rounded-full bg-[#253A52] flex items-center justify-center text-[#FDC758] mr-4">
                <FiClock size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Temps d'apprentissage</p>
                <p className="text-2xl font-bold">
                  {followedCourses.reduce((total, course) => total + (course.timeSpent || 0), 0)} min
                </p>
              </div>
            </div>
            
            {/* Progression globale */}
            <div className="bg-[#182b4a] rounded-xl p-6 flex items-start">
              <div className="w-12 h-12 rounded-full bg-[#253A52] flex items-center justify-center text-[#FDC758] mr-4">
                <FiTrendingUp size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Progression globale</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold">{Math.round(overallProgress)}%</p>
                  <div className="ml-3 bg-[#253A52] h-2 w-24 rounded-full overflow-hidden">
                    <div className="bg-[#FDC758] h-full" style={{ width: `${overallProgress}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Points XP */}
            <div className="bg-[#182b4a] rounded-xl p-6 flex items-start">
              <div className="w-12 h-12 rounded-full bg-[#253A52] flex items-center justify-center text-[#FDC758] mr-4">
                <FiAward size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Points XP</p>
                <p className="text-2xl font-bold">{userData?.xpPoints || 0}</p>
              </div>
            </div>
          </div>
          
          {/* Section "Continuer l'apprentissage" */}
          {followedCourses.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Continuer l'apprentissage</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {followedCourses.slice(0, 3).map(course => (
                  <div key={course.id} className="bg-[#182b4a] rounded-xl overflow-hidden">
                    <div className="relative">
                      {course.imageUrl && (
                        <Image 
                          src={course.imageUrl} 
                          alt={course.title}
                          width={500}
                          height={200}
                          className="w-full h-40 object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#182b4a] to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-xl font-bold">{course.title}</h3>
                        {course.category && (
                          <span className="inline-block bg-[#FDC758] text-[#0c1524] text-xs font-bold px-2 py-1 rounded-full mt-2">
                            {course.category}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-400 mb-1">
                          <span>Progression</span>
                          <span>{course.progress || 0}%</span>
                        </div>
                        <div className="w-full bg-[#253A52] h-2 rounded-full overflow-hidden">
                          <div className="bg-[#FDC758] h-full" style={{ width: `${course.progress || 0}%` }}></div>
                        </div>
                      </div>
                      
                      <Link 
                        href={`/courses/${course.id}`}
                        className="w-full bg-[#253A52] hover:bg-[#304d6d] text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-all"
                      >
                        <FiPlay size={16} />
                        Continuer
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              
              {followedCourses.length > 3 && (
                <div className="text-center mt-6">
                  <Link 
                    href="/courses"
                    className="inline-block bg-[#253A52] hover:bg-[#304d6d] text-white px-6 py-3 rounded-lg transition-all"
                  >
                    Voir tous mes cours
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {/* Activité récente */}
          {recentActivity.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Activité récente</h2>
              <div className="bg-[#182b4a] rounded-xl overflow-hidden">
                <ul className="divide-y divide-[#253A52]">
                  {recentActivity.map((activity, index) => (
                    <li key={activity.id || index} className="p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#253A52] flex items-center justify-center text-green-400 flex-shrink-0">
                        <FiCheck size={20} />
                      </div>
                      <div>
                        <p className="font-medium">
                          {activity.type === 'lesson_completed' ? 'Leçon complétée: ' : ''}
                          {activity.lessonTitle || 'Une leçon'}
                        </p>
                        <div className="flex items-center text-sm text-gray-400">
                          <Link href={`/courses/${activity.courseId}`} className="hover:text-[#FDC758] transition-colors">
                            {activity.courseTitle}
                          </Link>
                          {activity.timestamp && (
                            <>
                              <span className="mx-1">•</span>
                              <span>{formatDate(activity.timestamp)}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {/* Cours recommandés */}
          {recommendedCourses.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Recommandé pour vous</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {recommendedCourses.map(course => (
                  <CourseCardSmall
                    key={course.id}
                    course={course}
                    isNew={isRecentlyUpdated(course.updatedAt)}
                  />
                ))}
              </div>
              
              <div className="text-center mt-6">
                <Link 
                  href="/courses"
                  className="inline-block bg-[#253A52] hover:bg-[#304d6d] text-white px-6 py-3 rounded-lg transition-all"
                >
                  Explorer tous les cours
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}