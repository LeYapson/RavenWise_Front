// src/app/admin/page.jsx
"use client";
import React from "react";
import AdminStats from "../../components/admin/AdminStats";
import DataTable from "../../components/admin/DataTable";
import Card from "../../components/common/Card";
import SectionTitle from "../../components/common/SectionTitle";

export default function AdminDashboard() {
  // Données simulées pour le dashboard admin
  const statsData = {
    totalUsers: 1425,
    activeUsers: 892,
    totalCourses: 47,
    totalQuizzes: 156,
    revenueMonth: "3,720€",
    enrollmentsWeek: 128,
  };

  const recentUsers = [
    { id: 1, name: "Sophie Martin", email: "sophie@example.com", joinedAt: "Il y a 2 heures", coursesEnrolled: 3 },
    { id: 2, name: "Thomas Dubois", email: "thomas@example.com", joinedAt: "Il y a 6 heures", coursesEnrolled: 1 },
    { id: 3, name: "Emma Lefebvre", email: "emma@example.com", joinedAt: "Il y a 1 jour", coursesEnrolled: 5 },
  ];

  const coursePerformance = [
    { id: 1, title: "JavaScript Moderne", enrollments: 342, completionRate: 68, rating: 4.7 },
    { id: 2, title: "HTML & CSS Fondamentaux", enrollments: 512, completionRate: 74, rating: 4.8 },
    { id: 3, title: "React pour débutants", enrollments: 287, completionRate: 62, rating: 4.5 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Administration</h1>
      
      <AdminStats stats={statsData} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Utilisateurs récents */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <SectionTitle title="Utilisateurs récents" />
            <a href="/admin/users" className="text-[#FDC758] hover:underline text-sm">
              Voir tous les utilisateurs
            </a>
          </div>
          
          <DataTable 
            data={recentUsers}
            columns={[
              { key: 'name', label: 'Nom' },
              { key: 'email', label: 'Email' },
              { key: 'joinedAt', label: 'Inscrit' },
              { key: 'coursesEnrolled', label: 'Cours' }
            ]}
            actions={[
              { label: 'Voir', handler: (user) => window.location.href = `/admin/users/${user.id}` }
            ]}
          />
        </Card>
        
        {/* Performance des cours */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <SectionTitle title="Performance des cours" />
            <a href="/admin/courses" className="text-[#FDC758] hover:underline text-sm">
              Voir tous les cours
            </a>
          </div>
          
          <DataTable 
            data={coursePerformance}
            columns={[
              { key: 'title', label: 'Titre' },
              { key: 'enrollments', label: 'Inscriptions' },
              { key: 'completionRate', label: 'Complétion %' },
              { key: 'rating', label: 'Note' }
            ]}
            actions={[
              { label: 'Éditer', handler: (course) => window.location.href = `/admin/courses/${course.id}` }
            ]}
          />
        </Card>
      </div>
    </div>
  );
}