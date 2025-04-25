"use client";

import React from 'react';
import Image from 'next/image';

const CourseHeader = ({ course }) => {
  const levelColors = {
    'Débutant': 'bg-green-500',
    'Intermédiaire': 'bg-blue-500',
    'Avancé': 'bg-purple-600'
  };

  return (
    <div className="relative rounded-xl overflow-hidden">
      {/* Image de fond avec overlay */}
      <div className="w-full h-64 relative">
        {course.image && course.image.startsWith('http') ? (
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-full object-cover filter brightness-50"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
        )}
        
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      {/* Contenu */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
        <div className="max-w-3xl">
          {/* Badge niveau */}
          <span className={`inline-block ${levelColors[course.level] || 'bg-gray-500'} text-white text-sm px-3 py-1 rounded-md mb-4`}>
            {course.level}
          </span>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">{course.title}</h1>
          
          <p className="text-white text-opacity-90 text-lg mb-4">{course.description}</p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-white">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {course.duration}
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              {course.author}
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              {course.chapters.length} chapitres
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;