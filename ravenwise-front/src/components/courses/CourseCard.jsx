"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-[#182b4a] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <Link href={`/courses/${course.id}`} className="block relative h-48 overflow-hidden">
        <Image 
          src={course.image} 
          alt={course.title}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300 hover:scale-105"
        />
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-medium bg-white/10 text-white/80 py-1 px-2 rounded">
            {course.level}
          </span>
          {course.isRecommended && (
            <span className="text-xs font-medium bg-[#ca9e46]/20 text-[#ca9e46] py-1 px-2 rounded flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              Recommandé
            </span>
          )}
        </div>
        
        <Link href={`/courses/${course.id}`} className="block">
          <h3 className="text-xl font-semibold mb-2 text-white hover:text-[#ca9e46] transition-colors duration-200">
            {course.title}
          </h3>
        </Link>
        
        <p className="text-gray-400 mb-4 flex-grow line-clamp-2">{course.description}</p>
        
        {course.inProgress ? (
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">{course.completedChapters}/{course.chaptersCount} chapitres</span>
              <span className="text-[#ca9e46]">{course.progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#ca9e46] to-[#e0b347]" 
                style={{width: `${course.progress}%`}}
              ></div>
            </div>
          </div>
        ) : (
          <Link 
            href={`/courses/${course.id}`} 
            className="text-center block py-2 px-4 bg-[#1f3a5f] text-white hover:bg-[#2a4c7d] transition-colors rounded-md"
          >
            Commencer
          </Link>
        )}
      </div>
    </div>
  );
};

export default CourseCard;