"use client";

import React from 'react';
import Link from 'next/link';

const ChapterBlock = ({ chapter, courseId }) => {
  const statusConfig = {
    'completed': {
      bgColor: 'bg-green-500',
      borderColor: 'border-green-500',
      textColor: 'text-white',
      hoverBg: 'hover:bg-green-600',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
        </svg>
      ),
      buttonText: 'Revoir'
    },
    'in-progress': {
      bgColor: 'bg-blue-500',
      borderColor: 'border-blue-500',
      textColor: 'text-white',
      hoverBg: 'hover:bg-blue-600',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
        </svg>
      ),
      buttonText: 'Continuer'
    },
    'locked': {
      bgColor: 'bg-gray-700',
      borderColor: 'border-gray-700',
      textColor: 'text-gray-400',
      hoverBg: '',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
        </svg>
      ),
      buttonText: 'Verrouillé'
    },
    'default': {
      bgColor: 'bg-gray-500',
      borderColor: 'border-gray-500',
      textColor: 'text-gray-400',
      hoverBg: '',
      icon: null,
      buttonText: 'Indisponible'
    }
  };

  const config = statusConfig[chapter.status] || statusConfig.default;

  return (
    <div className={`border-2 ${config?.borderColor || 'border-gray-500'} rounded-xl overflow-hidden transition-all duration-300`}>
      <div className="flex items-center p-4 lg:p-5 bg-[#182b4a]">
        {/* Indicateur d'état avec icône */}
        <div className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center mr-4`}>
          {config.icon}
        </div>
        
        {/* Informations du chapitre */}
        <div className="flex-1">
          <h3 className={`font-semibold text-lg ${chapter.status === 'locked' ? 'text-gray-400' : 'text-white'}`}>
            {chapter.title}
          </h3>
          <p className={`text-sm ${chapter.status === 'locked' ? 'text-gray-500' : 'text-gray-300'}`}>
            {chapter.description}
          </p>
        </div>
        
        {/* Durée et XP */}
        <div className="hidden md:flex flex-col items-end mr-4 text-sm">
          <span className={chapter.status === 'locked' ? 'text-gray-500' : 'text-gray-300'}>
            {chapter.duration}
          </span>
          <span className={`${chapter.status === 'locked' ? 'text-gray-500' : 'text-[#FDC758]'}`}>
            {chapter.xpEarned}/{chapter.totalXP} XP
          </span>
        </div>
        
        {/* Bouton d'action */}
        {chapter.status !== 'locked' ? (
          <Link href={`/courses/${courseId}/${chapter.id}`}>
            <button className={`${config.bgColor} ${config.textColor} px-4 py-2 rounded-md ${config.hoverBg} transition-colors`}>
              {config.buttonText}
            </button>
          </Link>
        ) : (
          <button disabled className={`${config.bgColor} ${config.textColor} px-4 py-2 rounded-md cursor-not-allowed`}>
            {config.buttonText}
          </button>
        )}
      </div>
      
      {/* Barre de progression (pour les chapitres en cours) */}
      {chapter.status === 'in-progress' && (
        <div className="w-full h-1 bg-gray-700">
          <div className="h-full bg-blue-500" style={{ width: `${(chapter.xpEarned / chapter.totalXP) * 100}%` }}></div>
        </div>
      )}
    </div>
  );
};

export default ChapterBlock;