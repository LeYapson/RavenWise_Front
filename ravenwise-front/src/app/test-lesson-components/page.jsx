"use client";

import React, { useState } from 'react';
import LectureView from '../../components/courses/lesson-types/LectureView';
import ExerciseView from '../../components/courses/lesson-types/ExerciseView';
import QuizView from '../../components/courses/lesson-types/QuizView';
import { isLessonCompleted, markLessonAsCompleted } from '../../utils/lessonCompletion';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

export default function TestLessonComponents() {
  const [currentTest, setCurrentTest] = useState('lecture');
  const [completionStates, setCompletionStates] = useState({
    lecture: isLessonCompleted('test-lecture-001'),
    exercise: isLessonCompleted('test-exercise-001'),
    quiz: isLessonCompleted('test-quiz-001')
  });

  const handleComplete = (type, lessonId) => {
    markLessonAsCompleted(lessonId, {
      courseId: 'test-course',
      chapterId: 'test-chapter',
      lessonType: type,
      lessonTitle: `Test ${type}`
    });
    
    setCompletionStates(prev => ({
      ...prev,
      [type]: true
    }));
    
    alert(`Leçon ${type} marquée comme terminée !`);
  };

  const resetCompletion = (type, lessonId) => {
    // Supprimer de localStorage
    const completions = JSON.parse(localStorage.getItem('lesson_completions') || '{}');
    delete completions[lessonId];
    localStorage.setItem('lesson_completions', JSON.stringify(completions));
    
    setCompletionStates(prev => ({
      ...prev,
      [type]: false
    }));
  };

  const sampleLecture = {
    id: 'test-lecture-001',
    title: 'Introduction au HTML',
    type: 'lecture',
    description: 'Apprenez les bases du HTML dans cette leçon interactive.',
    content: `
      <h1>Introduction au HTML</h1>
      <p>HTML (HyperText Markup Language) est le langage de balisage standard pour créer des pages web.</p>
      
      <h2>Structure de base d'un document HTML</h2>
      <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="fr"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Ma première page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Bonjour le monde !&lt;/h1&gt;
    &lt;p&gt;Ceci est ma première page HTML.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
      
      <h2>Éléments HTML de base</h2>
      <ul>
        <li><strong>&lt;h1&gt; à &lt;h6&gt;</strong> : Titres</li>
        <li><strong>&lt;p&gt;</strong> : Paragraphes</li>
        <li><strong>&lt;a&gt;</strong> : Liens</li>
        <li><strong>&lt;img&gt;</strong> : Images</li>
        <li><strong>&lt;div&gt;</strong> : Conteneur générique</li>
      </ul>
      
      <p>Maintenant que vous connaissez les bases, vous pouvez marquer cette leçon comme terminée en scrollant jusqu'à la fin.</p>
    `,
    estimatedDuration: 15,
    xpReward: 50
  };

  const sampleExercise = {
    id: 'test-exercise-001',
    title: 'Créer votre première page HTML',
    type: 'exercice',
    description: 'Mettez en pratique vos connaissances en créant une page HTML simple.',
    startingCode: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Ma page</title>
</head>
<body>
    <!-- Ajoutez votre contenu ici -->
    
</body>
</html>`,
    instructions: `
      <h2>Instructions</h2>
      <ol>
        <li>Ajoutez un titre principal avec &lt;h1&gt;</li>
        <li>Ajoutez un paragraphe de description</li>
        <li>Créez une liste à puces avec 3 éléments</li>
        <li>Cliquez sur "Exécuter" pour voir le résultat</li>
        <li>Soumettez votre solution</li>
      </ol>
    `,
    estimatedDuration: 20,
    xpReward: 75
  };

  const sampleQuiz = {
    id: 'test-quiz-001',
    title: 'Quiz HTML - Bases',
    type: 'quiz',
    description: 'Testez vos connaissances sur les bases du HTML.',
    questions: [
      {
        question: "Que signifie HTML ?",
        answers: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Home Tool Markup Language",
          "Hyper Transfer Markup Language"
        ],
        correctAnswer: 0
      },
      {
        question: "Quelle balise est utilisée pour créer un lien ?",
        answers: [
          "&lt;link&gt;",
          "&lt;a&gt;",
          "&lt;href&gt;",
          "&lt;url&gt;"
        ],
        correctAnswer: 1
      },
      {
        question: "Comment déclare-t-on un document HTML5 ?",
        answers: [
          "&lt;!DOCTYPE html5&gt;",
          "&lt;!DOCTYPE HTML&gt;",
          "&lt;!DOCTYPE html&gt;",
          "&lt;html5&gt;"
        ],
        correctAnswer: 2
      }
    ],
    estimatedDuration: 10,
    xpReward: 100
  };

  const renderContent = () => {
    const commonProps = {
      isCompleted: completionStates[currentTest]
    };

    switch (currentTest) {
      case 'lecture':
        return (
          <LectureView
            {...commonProps}
            lesson={sampleLecture}
            onComplete={() => handleComplete('lecture', 'test-lecture-001')}
          />
        );
      case 'exercise':
        return (
          <ExerciseView
            {...commonProps}
            lesson={sampleExercise}
            onComplete={() => handleComplete('exercise', 'test-exercise-001')}
          />
        );
      case 'quiz':
        return (
          <QuizView
            {...commonProps}
            lesson={sampleQuiz}
            onComplete={() => handleComplete('quiz', 'test-quiz-001')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#0c1524] text-white">
        {/* Navigation des tests */}
        <div className="bg-[#182b4a] border-b border-gray-700 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold mb-4">Test des Composants de Leçon</h1>
            
            <div className="flex gap-4 mb-4">
              {[
                { key: 'lecture', label: 'Lecture', icon: '📖' },
                { key: 'exercise', label: 'Exercice', icon: '💻' },
                { key: 'quiz', label: 'Quiz', icon: '❓' }
              ].map(({ key, label, icon }) => (
                <button
                  key={key}
                  onClick={() => setCurrentTest(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    currentTest === key
                      ? 'bg-[#FDC758] text-[#0F1B2A] font-semibold'
                      : 'bg-[#253A52] text-white hover:bg-[#304d6d]'
                  }`}
                >
                  <span>{icon}</span>
                  {label}
                  {completionStates[key] && <span className="text-green-400">✓</span>}
                </button>
              ))}
            </div>
            
            {/* Boutons de contrôle */}
            <div className="flex gap-2">
              <button
                onClick={() => resetCompletion(currentTest, 
                  currentTest === 'lecture' ? 'test-lecture-001' :
                  currentTest === 'exercise' ? 'test-exercise-001' : 'test-quiz-001'
                )}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
              >
                Reset {currentTest}
              </button>
              
              <span className="text-sm text-gray-400 flex items-center">
                État: {completionStates[currentTest] ? '✅ Complété' : '⏳ En cours'}
              </span>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <main className="pb-20">
          {renderContent()}
        </main>
      </div>
      <Footer />
    </>
  );
}
