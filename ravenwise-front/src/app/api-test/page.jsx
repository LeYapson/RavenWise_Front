"use client";

import React, { useState, useEffect } from 'react';
import { lessonService, exercicesService, lecturesService, quizzesService } from '../../services/api';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

export default function ApiTestPage() {
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(false);

  const runApiTests = async () => {
    setLoading(true);
    const results = {};

    // Test des leçons
    try {
      console.log('Test: getAllLessons...');
      const lessons = await lessonService.getAllLessons();
      results.lessons = { success: true, count: lessons?.length || 0 };
      
      if (lessons && lessons.length > 0) {
        console.log('Test: getLessonById...');
        const firstLesson = await lessonService.getLessonById(lessons[0].id);
        results.getLessonById = { success: true, lesson: firstLesson };
      }
    } catch (error) {
      console.error('Erreur leçons:', error);
      results.lessons = { success: false, error: error.message };
    }

    // Test des exercices
    try {
      console.log('Test: getAllExercises...');
      const exercises = await exercicesService.getAllExercices();
      results.exercises = { success: true, count: exercises?.length || 0 };
    } catch (error) {
      console.error('Erreur exercices:', error);
      results.exercises = { success: false, error: error.message };
    }

    // Test des lectures
    try {
      console.log('Test: getAllLectures...');
      const lectures = await lecturesService.getAllLectures();
      results.lectures = { success: true, count: lectures?.length || 0 };
    } catch (error) {
      console.error('Erreur lectures:', error);
      results.lectures = { success: false, error: error.message };
    }

    // Test avec un utilisateur spécifique pour les leçons terminées
    try {
      console.log('Test: getIdOfFinishedLessonsOfSpecificUser...');
      const finishedLessons = await lessonService.getIdOfFinishedLessonsOfSpecificUser('user_001');
      results.finishedLessons = { success: true, count: finishedLessons?.length || 0 };
    } catch (error) {
      console.error('Erreur leçons terminées:', error);
      if (error.message === 'ENDPOINT_NOT_AVAILABLE') {
        results.finishedLessons = { success: false, error: 'Endpoint non disponible (normal)' };
      } else {
        results.finishedLessons = { success: false, error: error.message };
      }
    }

    setTestResults(results);
    setLoading(false);
  };

  useEffect(() => {
    runApiTests();
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#0c1524] text-white py-10">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Test des APIs Cours</h1>
          
          <div className="mb-6">
            <button
              onClick={runApiTests}
              disabled={loading}
              className="bg-[#FDC758] text-[#0F1B2A] px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Test en cours...' : 'Relancer les tests'}
            </button>
          </div>

          <div className="space-y-4">
            {/* Résultats des leçons */}
            <div className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-blue-400">Leçons (Lessons)</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>getAllLessons:</span>
                  <span className={testResults.lessons?.success ? 'text-green-400' : 'text-red-400'}>
                    {testResults.lessons?.success 
                      ? `✓ ${testResults.lessons.count} leçons trouvées`
                      : `✗ ${testResults.lessons?.error || 'En cours...'}`
                    }
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>getLessonById:</span>
                  <span className={testResults.getLessonById?.success ? 'text-green-400' : 'text-red-400'}>
                    {testResults.getLessonById?.success 
                      ? `✓ Leçon récupérée: ${testResults.getLessonById.lesson?.title || 'Sans titre'}`
                      : testResults.getLessonById ? `✗ ${testResults.getLessonById.error}` : 'Pas testé'
                    }
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>getFinishedLessons:</span>
                  <span className={testResults.finishedLessons?.success ? 'text-green-400' : 'text-orange-400'}>
                    {testResults.finishedLessons?.success 
                      ? `✓ ${testResults.finishedLessons.count} leçons terminées`
                      : `⚠ ${testResults.finishedLessons?.error || 'En cours...'}`
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* Résultats des exercices */}
            <div className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-green-400">Exercices</h2>
              <div className="flex justify-between">
                <span>getAllExercises:</span>
                <span className={testResults.exercises?.success ? 'text-green-400' : 'text-red-400'}>
                  {testResults.exercises?.success 
                    ? `✓ ${testResults.exercises.count} exercices trouvés`
                    : `✗ ${testResults.exercises?.error || 'En cours...'}`
                  }
                </span>
              </div>
            </div>

            {/* Résultats des lectures */}
            <div className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-purple-400">Lectures</h2>
              <div className="flex justify-between">
                <span>getAllLectures:</span>
                <span className={testResults.lectures?.success ? 'text-green-400' : 'text-red-400'}>
                  {testResults.lectures?.success 
                    ? `✓ ${testResults.lectures.count} lectures trouvées`
                    : `✗ ${testResults.lectures?.error || 'En cours...'}`
                  }
                </span>
              </div>
            </div>

            {/* Détails techniques */}
            <div className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-yellow-400">Détails techniques</h2>
              <pre className="bg-black/30 p-3 rounded text-sm overflow-auto">
                {JSON.stringify(testResults, null, 2)}
              </pre>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-blue-600/10 border border-blue-600/50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-400">APIs testées</h2>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li><code>GET /lessons</code> - Récupérer toutes les leçons</li>
              <li><code>GET /lessons/:id</code> - Récupérer une leçon par ID</li>
              <li><code>GET /users/:id/lessons</code> - Leçons terminées d'un utilisateur</li>
              <li><code>GET /exercices</code> - Récupérer tous les exercices</li>
              <li><code>GET /lectures</code> - Récupérer toutes les lectures</li>
            </ul>
            <p className="mt-4 text-gray-400">
              Cette page teste la connectivité avec les nouvelles routes API pour vous assurer que tout fonctionne correctement.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
