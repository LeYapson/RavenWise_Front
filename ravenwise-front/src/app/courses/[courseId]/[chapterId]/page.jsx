"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../../../../components/common/Header';
import Footer from '../../../../components/common/Footer';
import dynamic from 'next/dynamic';
import ContentRenderer from '../../../../components/courses/ContentRenderer';

const DynamicQuiz = dynamic(() => import('../../../../components/courses/Quiz'), { 
  ssr: false,
  loading: () => <p>Chargement du quiz...</p>
});

export default function ChapterPage() {
  const { courseId, chapterId } = useParams();
  const router = useRouter();
  const [chapter, setChapter] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Simulation de la récupération des données du chapitre
  useEffect(() => {
    const fetchChapterData = async () => {
      // Dans une vraie application, cela proviendrait de votre API/Firebase
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Exemple de données pour un chapitre
      setChapter({
        id: parseInt(chapterId),
        title: "Introduction au CSS",
        description: "Découvrez comment styliser vos pages web avec CSS",
        courseId: parseInt(courseId),
        courseName: "HTML & CSS Fondamentaux",
        steps: [
          {
            id: 1,
            title: "Qu'est-ce que le CSS?",
            type: "lecture",
            content: `
              
              <p>CSS (Cascading Style Sheets) est un langage qui décrit comment les éléments HTML doivent être affichés à l'écran. Alors que HTML structure le contenu d'une page web, CSS lui donne son apparence visuelle.</p>
              
              <h2>Pourquoi le CSS est important</h2>
              
              <p>Le CSS permet de:</p>
              <ul>
                <li>Contrôler la mise en page des pages web</li>
                <li>Appliquer des styles cohérents à plusieurs pages</li>
                <li>Personnaliser l'affichage selon les appareils</li>
                <li>Améliorer l'accessibilité et l'expérience utilisateur</li>
              </ul>
              
              <div class="info-box">
                <p>Sans CSS, les pages web seraient juste du texte brut structuré, sans couleurs, mise en page ou design.</p>
              </div>
            `
          },
          {
            id: 2,
            title: "Comment ajouter du CSS à une page HTML",
            type: "lecture",
            content: `
              <h1>Comment ajouter du CSS à une page HTML</h1>
              
              <p>Il existe trois façons principales d'intégrer du CSS dans votre page HTML:</p>
              
              <h2>1. CSS en ligne (Inline CSS)</h2>
              
              <p>En utilisant l'attribut <code>style</code> directement dans les balises HTML.</p>
              
              <pre><code>&lt;p style="color: blue; font-size: 16px;"&gt;Ce texte est bleu et de taille 16px.&lt;/p&gt;</code></pre>
              
              <h2>2. CSS interne (Internal CSS)</h2>
              
              <p>En utilisant la balise <code>&lt;style&gt;</code> dans l'en-tête du document.</p>
              
              <pre><code>&lt;head&gt;
  &lt;style&gt;
    p {
      color: blue;
      font-size: 16px;
    }
  &lt;/style&gt;
&lt;/head&gt;</code></pre>
              
              <h2>3. CSS externe (External CSS)</h2>
              
              <p>En liant un fichier CSS externe à votre document HTML.</p>
              
              <pre><code>&lt;head&gt;
  &lt;link rel="stylesheet" href="styles.css"&gt;
&lt;/head&gt;</code></pre>
              
              <div class="warning-box">
                <p>Le CSS externe est généralement la méthode préférée car elle permet de séparer la structure (HTML) du style (CSS).</p>
              </div>
            `
          },
          {
            id: 3,
            title: "Exercice pratique: Votre premier CSS",
            type: "exercise",
            content: `
              <h1>Exercice: Créez votre première feuille de style</h1>
              
              <p>Dans cet exercice, vous allez créer une feuille de style simple pour modifier l'apparence d'une page HTML.</p>
              
              <h2>Instructions:</h2>
              <ol>
                <li>Créez un fichier HTML de base avec quelques éléments (titres, paragraphes, listes)</li>
                <li>Créez un fichier CSS externe nommé <code>styles.css</code></li>
                <li>Liez le fichier CSS à votre document HTML</li>
                <li>Dans le fichier CSS, ajoutez des règles pour:</li>
                <ul>
                  <li>Changer la couleur des titres</li>
                  <li>Modifier la taille du texte des paragraphes</li>
                  <li>Ajouter une marge autour des listes</li>
                  <li>Changer la couleur d'arrière-plan de la page</li>
                </ul>
              </ol>
              
              <div class="code-editor">
                <div class="editor-tabs">
                  <button class="active">HTML</button>
                  <button>CSS</button>
                </div>
                <div class="editor-content">
                  <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="fr"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;title&gt;Ma première page stylisée&lt;/title&gt;
  &lt;!-- Votre lien CSS va ici --&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Bienvenue sur ma page&lt;/h1&gt;
  &lt;p&gt;Voici un paragraphe d'exemple.&lt;/p&gt;
  &lt;h2&gt;Sous-titre&lt;/h2&gt;
  &lt;ul&gt;
    &lt;li&gt;Premier élément de liste&lt;/li&gt;
    &lt;li&gt;Deuxième élément de liste&lt;/li&gt;
    &lt;li&gt;Troisième élément de liste&lt;/li&gt;
  &lt;/ul&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
                </div>
              </div>
              
              <button class="submit-btn">Soumettre l'exercice</button>
            `
          },
          {
            id: 4,
            title: "Quiz: Bases du CSS",
            type: "quiz",
            questions: [
              {
                id: 1,
                question: "Que signifie CSS?",
                options: [
                  "Computer Style Sheets",
                  "Creative Style Systems",
                  "Cascading Style Sheets",
                  "Colorful Style Sheets"
                ],
                correctAnswer: 2
              },
              {
                id: 2,
                question: "Quelle est la méthode recommandée pour ajouter du CSS à plusieurs pages HTML?",
                options: [
                  "CSS en ligne (inline)",
                  "CSS interne (balise style)",
                  "CSS externe (fichier séparé)",
                  "Toutes ces méthodes sont équivalentes"
                ],
                correctAnswer: 2
              },
              {
                id: 3,
                question: "Quel attribut HTML est utilisé pour intégrer du CSS en ligne?",
                options: [
                  "css",
                  "style",
                  "class",
                  "design"
                ],
                correctAnswer: 1
              }
            ]
          }
        ],
        progress: 50,
        totalXP: 350,
        earnedXP: 175,
        nextChapterId: 5,
        prevChapterId: 3
      });
      
      setCourse({
        id: parseInt(courseId),
        title: "HTML & CSS Fondamentaux"
      });
      
      setLoading(false);
    };
    
    fetchChapterData();
  }, [courseId, chapterId]);
  
  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#0c1524] text-white py-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="animate-pulse text-xl">Chargement du contenu...</div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  const handleNextStep = () => {
    if (currentStep < chapter.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      // Vérifier si le chapitre suivant existe
      if (chapter.nextChapterId) {
        // Redirection vers le prochain chapitre
        router.push(`/courses/${courseId}/${chapter.nextChapterId}`);
      } else {
        // Si pas de chapitre suivant, retourner à la page du cours
        router.push(`/courses/${courseId}`);
      }
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const currentStepData = chapter.steps[currentStep];
  const isLastStep = currentStep === chapter.steps.length - 1;
  
  return (
    <>
      <Header />
      <div className="bg-[#0c1524] text-white min-h-screen pb-20">
        {/* Barre de navigation du chapitre */}
        <div className="bg-[#182b4a] border-b border-gray-700 sticky top-0 z-10 shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <Link href={`/courses/${courseId}`} className="text-gray-400 hover:text-white mr-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
              </Link>
              <div>
                <h1 className="text-lg font-bold">{chapter.title}</h1>
                <p className="text-sm text-gray-400">{course.title}</p>
              </div>
            </div>
            
            {/* Progression */}
            <div className="flex items-center">
              <div className="mr-3 text-sm hidden md:block">
                <span className="text-[#FDC758] font-medium">{chapter.earnedXP}/{chapter.totalXP} XP</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-300">{currentStep + 1}/{chapter.steps.length}</span>
              </div>
              
              <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#FDC758]" 
                  style={{ width: `${chapter.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contenu principal */}
        <div className="max-w-5xl mx-auto px-4 py-10">
          {/* Navigation des étapes */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-1">
              {chapter.steps.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(idx)}
                  className={`w-8 h-2 rounded-full transition-all ${
                    idx === currentStep 
                      ? 'bg-[#FDC758]' 
                      : idx < currentStep 
                        ? 'bg-green-500' 
                        : 'bg-gray-700'
                  }`}
                  aria-label={`Étape ${idx + 1}`}
                ></button>
              ))}
            </div>
          </div>
          
          {/* Titre de l'étape */}
          <h2 className="text-2xl font-bold mb-6 text-center">
            {currentStepData.title}
          </h2>
          
          {/* Contenu de l'étape en fonction du type */}
          <div className="bg-[#182b4a] rounded-xl p-6 shadow-lg mb-8">
            {currentStepData.type === 'quiz' ? (
              <DynamicQuiz questions={currentStepData.questions} />
            ) : (
              <ContentRenderer content={currentStepData.content} />
            )}
          </div>
          
          {/* Boutons de navigation */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              className={`px-6 py-2 rounded-md ${
                currentStep === 0 
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                  : 'bg-[#1D2D40] text-white hover:bg-[#263c58]'
              }`}
            >
              Précédent
            </button>
            
            <button
              onClick={handleNextStep}
              className="bg-[#FDC758] text-[#0F1B2A] font-bold px-6 py-2 rounded-md hover:bg-opacity-90"
            >
              {isLastStep ? "Terminer le chapitre" : "Suivant"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}