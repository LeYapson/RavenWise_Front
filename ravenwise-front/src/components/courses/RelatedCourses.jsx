"use client";

import React from 'react';
import Link from 'next/link';

const RelatedCourses = ({ courses }) => {
  if (!courses || courses.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-[#182b4a] rounded-xl p-6 border border-gray-700">
      <h3 className="font-bold text-xl mb-4">Cours reliés</h3>
      
      <div className="space-y-4">
        {courses.map(course => (
          <Link href={`/courses/${course.id}`} key={course.id}>
            <div className="flex items-center gap-3 p-2 hover:bg-[#1D2D40] rounded-md transition-colors">
              <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                {course.image.startsWith('http') ? (
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-blue-500 flex items-center justify-center">
                    <span className="text-xl">{course.title.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-medium text-white">{course.title}</h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedCourses;