"use client";

import React from 'react';
import Link from 'next/link';

const LearningPathProgress = ({ title, completedPercentage, color, pathId }) => {
  // Détermine si le parcours est commencé, en cours ou terminé
  const getStatus = () => {
    if (completedPercentage === 0) return 'Non commencé';
    if (completedPercentage === 100) return 'Terminé';
    return 'En cours';
  };

  return (
    <Link href={`/courses?path=${pathId}`}>
      <div 
        className="bg-[#182b4a] rounded-xl p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
        style={{ borderLeft: `4px solid ${color}` }}
      >
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-4">{getStatus()}</p>
        
        <div className="flex items-center gap-3">
          <div className="flex-grow h-3 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${completedPercentage}%`, backgroundColor: color }}
            ></div>
          </div>
          <span className="text-gray-300 font-medium">{completedPercentage}%</span>
        </div>
      </div>
    </Link>
  );
};

export default LearningPathProgress;