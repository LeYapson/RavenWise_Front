import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiClock, FiBarChart2, FiArrowRight, FiBookOpen } from 'react-icons/fi';

const CourseCardSmall = ({ course, isNew = false }) => {
  const formatDuration = (minutes) => {
    if (!minutes) return '0 min';
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h${mins > 0 ? ` ${mins}m` : ''}`;
  };

  return (
    <Link href={`/courses/${course.id}`}>
      <div className="bg-[#182b4a] rounded-xl overflow-hidden h-full transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#253A52]/20">
        {/* Image du cours avec badge "Nouveau" si applicable */}
        <div className="relative">
          <div className="w-full h-40 bg-[#253A52]">
            {course.imageUrl ? (
              <Image
                src={course.imageUrl}
                alt={course.title}
                width={500}
                height={280}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#FDC758]">
                <FiBookOpen size={32} />
              </div>
            )}
          </div>
          
          {/* Badge "Nouveau" */}
          {isNew && (
            <div className="absolute top-2 right-2 bg-[#FDC758] text-[#0c1524] text-xs font-bold px-2 py-1 rounded-full">
              Nouveau
            </div>
          )}
          
          {/* Catégorie */}
          {course.category && (
            <div className="absolute bottom-2 left-2">
              <span className="bg-[#253A52]/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                {course.category}
              </span>
            </div>
          )}
        </div>
        
        {/* Contenu de la carte */}
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{course.title}</h3>
          
          {/* Métadonnées du cours */}
          <div className="flex flex-wrap gap-3 mb-4">
            {course.level && (
              <div className="flex items-center text-xs text-gray-300">
                <FiBarChart2 size={12} className="mr-1" />
                <span>{course.level}</span>
              </div>
            )}
            
            {course.duration && (
              <div className="flex items-center text-xs text-gray-300">
                <FiClock size={12} className="mr-1" />
                <span>{formatDuration(course.duration)}</span>
              </div>
            )}
          </div>
          
          {/* Bouton voir le cours */}
          <div className="flex justify-end">
            <div className="text-[#FDC758] flex items-center text-sm font-medium hover:underline">
              <span className="mr-1">Voir le cours</span>
              <FiArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCardSmall;