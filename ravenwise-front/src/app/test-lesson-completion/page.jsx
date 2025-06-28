"use client";

import React, { useState, useEffect } from 'react';
import { isLessonCompleted, markLessonAsCompleted, getCompletedLessons } from '../../utils/lessonCompletion';

export default function TestLessonCompletion() {
  const [lessonId, setLessonId] = useState('test-lesson-123');
  const [isCompleted, setIsCompleted] = useState(false);
  const [allCompletions, setAllCompletions] = useState({});

  // Vérifier l'état de complétion
  const checkCompletion = () => {
    const completed = isLessonCompleted(lessonId);
    setIsCompleted(completed);
  };

  // Marquer comme complété
  const markAsCompleted = () => {
    markLessonAsCompleted(lessonId, {
      courseId: 'test-course-456',
      chapterId: 'test-chapter-789',
      lessonType: 'lecture',
      lessonTitle: 'Test Lesson'
    });
    checkCompletion();
    loadAllCompletions();
  };

  // Charger toutes les complétions
  const loadAllCompletions = () => {
    const completions = getCompletedLessons();
    setAllCompletions(completions);
  };

  // Effacer les données de test
  const clearTestData = () => {
    localStorage.removeItem('completedLessons');
    checkCompletion();
    loadAllCompletions();
  };

  useEffect(() => {
    checkCompletion();
    loadAllCompletions();
  }, [lessonId]);

  return (
    <div className="min-h-screen bg-[#0c1524] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test de Complétion des Leçons</h1>
        
        <div className="bg-[#182b4a] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test d'une leçon</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">ID de la leçon :</label>
            <input
              type="text"
              value={lessonId}
              onChange={(e) => setLessonId(e.target.value)}
              className="w-full p-2 bg-[#253A52] rounded border border-gray-600 text-white"
            />
          </div>
          
          <div className="mb-4">
            <p className="text-lg">
              État actuel : 
              <span className={`ml-2 px-3 py-1 rounded ${isCompleted ? 'bg-green-600' : 'bg-gray-600'}`}>
                {isCompleted ? 'Complété' : 'Non complété'}
              </span>
            </p>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={markAsCompleted}
              className="bg-[#FDC758] text-[#0F1B2A] px-4 py-2 rounded hover:bg-opacity-90"
            >
              Marquer comme complété
            </button>
            
            <button
              onClick={checkCompletion}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Vérifier l'état
            </button>
            
            <button
              onClick={clearTestData}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Effacer les données de test
            </button>
          </div>
        </div>
        
        <div className="bg-[#182b4a] rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Toutes les complétions stockées</h2>
          
          {Object.keys(allCompletions).length === 0 ? (
            <p className="text-gray-400">Aucune complétion stockée</p>
          ) : (
            <div className="space-y-2">
              {Object.entries(allCompletions).map(([id, data]) => (
                <div key={id} className="bg-[#253A52] p-3 rounded">
                  <p><strong>ID :</strong> {id}</p>
                  <p><strong>Cours :</strong> {data.courseId}</p>
                  <p><strong>Chapitre :</strong> {data.chapterId}</p>
                  <p><strong>Type :</strong> {data.lessonType}</p>
                  <p><strong>Titre :</strong> {data.lessonTitle}</p>
                  <p><strong>Complété le :</strong> {new Date(data.completedAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
