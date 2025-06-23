"use client";

import React, { useState } from 'react';
import { FiBookOpen, FiCheck, FiArrowRight } from 'react-icons/fi';

const LectureView = ({ lesson, onComplete, isCompleted }) => {
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);

  // Fonction pour détecter si l'utilisateur a fait défiler jusqu'à la fin
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;
    
    if (isNearBottom && !hasScrolledToEnd) {
      setHasScrolledToEnd(true);
    }
  };

  // Pour déboguer - vérifier ce que contient lesson
  console.log("Contenu de la leçon:", lesson);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* En-tête de la leçon */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-900/30 rounded-full mb-4">
          <FiBookOpen size={24} className="text-green-400" />
        </div>
        <h1 className="text-3xl font-bold mb-2">{lesson.title || "Lecture"}</h1>
        {lesson.description && (
          <p className="text-gray-400 text-lg">{lesson.description}</p>
        )}
      </div>

      {/* Contenu de lecture */}
      <div className="bg-[#182b4a] rounded-xl shadow-lg">
        <div 
          className="prose prose-invert max-w-none p-8 overflow-y-auto max-h-[70vh]"
          onScroll={handleScroll}
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#FDC758 #182b4a'
          }}
        >
          {/* Rendu du contenu HTML */}
          {(lesson.content || lesson.htmlContent) ? (
            <div 
              dangerouslySetInnerHTML={{ __html: lesson.content || lesson.htmlContent || '' }} 
              className="lecture-content"
            />
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-400">Cette leçon ne contient pas de contenu textuel.</p>
            </div>
          )}
          
          {/* Indicateur de fin de contenu */}
          <div className="mt-12 pt-6 border-t border-gray-700 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#FDC758]/10 rounded-full mb-4">
              <FiCheck size={20} className="text-[#FDC758]" />
            </div>
            <p className="text-gray-400">Vous avez terminé cette leçon de lecture</p>
          </div>
        </div>

        {/* Zone d'action */}
        <div className="p-6 border-t border-gray-700 bg-[#1d325a]">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400">
              {hasScrolledToEnd ? (
                <span className="flex items-center text-green-400">
                  <FiCheck size={16} className="mr-1" />
                  Lecture terminée
                </span>
              ) : (
                "Faites défiler pour lire tout le contenu"
              )}
            </div>
            
            <button
              onClick={onComplete}
              disabled={!hasScrolledToEnd && !isCompleted}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                hasScrolledToEnd && !isCompleted
                  ? 'bg-[#FDC758] text-[#0F1B2A] hover:bg-opacity-90'
                  : isCompleted
                    ? 'bg-green-600 text-white cursor-default'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isCompleted ? (
                <>
                  <FiCheck size={18} />
                  Terminé
                </>
              ) : (
                <>
                  Marquer comme lu
                  <FiArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureView;