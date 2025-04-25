"use client";

import React from 'react';

const CourseProgress = ({ course }) => {
  // Calcul du nombre de chapitres complétés
  const completedChapters = course.chapters.filter(ch => ch.status === 'completed').length;
  
  // Calcul du pourcentage de progression global
  const progressPercentage = (completedChapters / course.chapters.length) * 100;
  
  return (
    <div className="bg-[#182b4a] rounded-xl p-6 border border-gray-700">
      <h3 className="font-bold text-xl mb-4">Ma progression</h3>
      
      {/* Barre de progression circulaire */}
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Cercle de fond */}
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="transparent" 
              stroke="#2D3748" 
              strokeWidth="8" 
            />
            
            {/* Cercle de progression */}
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="transparent" 
              stroke="#FDC758"
              strokeWidth="8" 
              strokeDasharray={`${progressPercentage * 2.83} ${283 - progressPercentage * 2.83}`} 
              strokeDashoffset="70.75" // Démarre à 12 heures (90 degrés)
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-3xl font-bold">{Math.round(progressPercentage)}%</span>
            <span className="text-xs text-gray-400">complété</span>
          </div>
        </div>
      </div>
      
      {/* Statistiques */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#1D2D40] rounded-lg p-3 text-center">
          <span className="block text-2xl font-bold text-[#FDC758]">{completedChapters}/{course.chapters.length}</span>
          <span className="text-xs text-gray-400">Chapitres</span>
        </div>
        <div className="bg-[#1D2D40] rounded-lg p-3 text-center">
          <span className="block text-2xl font-bold text-[#FDC758]">{course.earnedXP}/{course.totalXP}</span>
          <span className="text-xs text-gray-400">XP gagnés</span>
        </div>
      </div>
      
      {/* Prochaine étape */}
      <div className="mb-4">
        <h4 className="font-medium text-sm text-gray-300 mb-2">Prochaine étape</h4>
        {course.chapters.find(ch => ch.status === 'in-progress') ? (
          <div className="bg-[#1D2D40] p-3 rounded-md">
            <p className="font-medium text-white">
              {course.chapters.find(ch => ch.status === 'in-progress').title}
            </p>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Continuer le chapitre</span>
              <span>{course.chapters.find(ch => ch.status === 'in-progress').duration} restantes</span>
            </div>
          </div>
        ) : (
          <div className="bg-[#1D2D40] p-3 rounded-md">
            <p className="text-white">Tous les chapitres accessibles ont été complétés!</p>
          </div>
        )}
      </div>
      
      {/* Bouton continuer */}
      <button className="w-full bg-[#FDC758] text-[#0F1B2A] font-bold py-3 rounded-md hover:bg-opacity-90 transition-colors">
        {course.chapters.find(ch => ch.status === 'in-progress') 
          ? "Continuer l'apprentissage" 
          : "Revoir le cours"}
      </button>
    </div>
  );
};

export default CourseProgress;