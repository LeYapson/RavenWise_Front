"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const router = useRouter();

  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        setLoading(true);
        // Récupérer les détails du cours
        const courseResponse = await axios.get(`http://localhost:3000/api/v1/courses/${courseId}`);
        console.log('Course detail API:', courseResponse.data);
        
        // L'API renvoie directement l'objet cours, pas un objet avec une propriété 'course'
        setCourse(courseResponse.data);
        
        // Pour les chapitres, nous devons faire un autre appel API ou utiliser une propriété
        // Faisons un appel séparé pour les chapitres (à adapter selon votre API)
        try {
          const chaptersResponse = await axios.get(`http://localhost:3000/api/v1/courses/${courseId}/chapters`);
          setChapters(chaptersResponse.data || []);
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

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#0c1524] text-white py-10">
          <div className="max-w-7xl mx-auto px-4 flex justify-center items-center">
            <p className="animate-pulse text-xl">Chargement du cours...</p>
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
            <p className="text-red-500">{error}</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!course) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#0c1524] text-white py-10">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-red-500">Aucun cours trouvé.</p>
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
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <p className="mb-6">{course.description}</p>

          <h2 className="text-2xl font-bold mb-4">Chapitres</h2>
          {chapters.length > 0 ? (
            <ul>
              {chapters.map(chapter => (
                <li key={chapter.id} className="mb-4">
                  <button 
                    onClick={() => router.push(`/courses/${courseId}/chapters`)}
                    className="text-xl text-[#FDC758] hover:underline"
                  >
                    {chapter.title}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucun chapitre disponible.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}