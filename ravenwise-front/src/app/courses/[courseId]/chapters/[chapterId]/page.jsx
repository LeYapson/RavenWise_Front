"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import Header from '../../../../../components/common/Header';
import Footer from '../../../../../components/common/Footer';
import { FiArrowLeft, FiClock, FiBarChart2, FiPlay, FiLock, FiCheck } from 'react-icons/fi';

export default function ChapterPage() {
  const { courseId, chapterId } = useParams();
  const router = useRouter();
  const [chapter, setChapter] = useState(null);
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Premier useEffect pour charger les données
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Récupérer les données du chapitre
        const chapterResponse = await axios.get(`http://localhost:3000/api/v1/chapters/${chapterId}`);
        setChapter(chapterResponse.data);
        
        // Récupérer les données du cours
        try {
          const courseResponse = await axios.get(`http://localhost:3000/api/v1/courses/${courseId}`);
          setCourse(courseResponse.data);
        } catch (courseErr) {
          console.warn("Impossible de charger les données du cours:", courseErr);
        }
        
        // Récupérer les leçons du chapitre
        try {
          const lessonsResponse = await axios.get(`http://localhost:3000/api/v1/lessons?chapterId=${chapterId}`);
          setLessons(lessonsResponse.data || []);
        } catch (lessonsErr) {
          console.warn("Impossible de charger les leçons:", lessonsErr);
          setLessons([]);
        }
        
        setError("");
      } catch (err) {
        console.error("Erreur lors du chargement du chapitre:", err);
        setError("Impossible de charger ce chapitre.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [courseId, chapterId]);

  // Deuxième useEffect pour la redirection (TOUJOURS présent, pas conditionnel)
  useEffect(() => {
    // Déplacer la condition à l'INTÉRIEUR du hook
    if (lessons && lessons.length > 0 && !loading) {
      // Rediriger vers la première leçon du chapitre
      router.push(`/courses/${courseId}/chapters/${chapterId}/lessons/${lessons[0].id}`);
    }
  }, [lessons, loading, courseId, chapterId, router]);

  // Fonction de navigation
  const handleBackToCourse = () => {
    router.push(`/courses/${courseId}`);
  };

  // Affichage en cas de chargement
  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#0c1524] text-white py-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FDC758] mx-auto mb-6"></div>
                <p className="text-xl">Chargement du chapitre...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Affichage en cas d'erreur
  if (error || !chapter) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#0c1524] text-white py-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
              <div className="rounded-full bg-red-900/20 p-6 mb-6">
                <FiBarChart2 size={40} className="text-red-400" />
              </div>
              <p className="text-red-400 text-lg mb-4">{error || "Chapitre non trouvé"}</p>
              <button 
                onClick={handleBackToCourse}
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

  // Affichage d'attente avant redirection
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0c1524] text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FDC758] mx-auto mb-6"></div>
              <p className="text-xl">Chargement des leçons...</p>
              {lessons.length === 0 && (
                <div className="mt-4">
                  <p className="text-gray-400 mb-4">Aucune leçon trouvée dans ce chapitre.</p>
                  <button 
                    onClick={handleBackToCourse}
                    className="bg-[#253A52] hover:bg-[#304d6d] text-white px-6 py-2 rounded-lg transition-all"
                  >
                    Retour au cours
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}