// src/app/admin/courses/create/page.jsx
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../../../components/admin/AdminLayout';
import CourseForm from '../../../../components/admin/CourseForm';
import { createCourse } from '../../../../services/courseService';

export default function CreateCoursePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSubmit = async (courseData) => {
    setLoading(true);
    setError(null);
    
    try {
      await createCourse(courseData);
      router.push('/admin/courses');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Créer un nouveau cours</h1>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-md mb-6">
            {error}
          </div>
        )}
        
        <CourseForm onSubmit={handleSubmit} isLoading={loading} />
      </div>
    </AdminLayout>
  );
}