"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import AdminLayout from "../../../components/admin/AdminLayout";
import Card from "../../../components/common/Card";

export default function CoursesAdminPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Simulation d'une requête API pour récupérer les cours
    setTimeout(() => {
      const mockCourses = [
        { id: 1, title: "HTML & CSS Fondamentaux", category: "Développement Web", enrollments: 245, lessons: 12, published: true },
        { id: 2, title: "JavaScript Moderne", category: "Développement Web", enrollments: 187, lessons: 18, published: true },
        { id: 3, title: "React pour débutants", category: "Frameworks", enrollments: 156, lessons: 15, published: true },
        { id: 4, title: "Python Avancé", category: "Programmation", enrollments: 132, lessons: 20, published: false },
        { id: 5, title: "Introduction à l'IA", category: "Data Science", enrollments: 89, lessons: 8, published: true }
      ];
      
      setCourses(mockCourses);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrer les cours par recherche
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Gestion de la suppression d'un cours
  const handleDeleteCourse = (id) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce cours ?")) {
      // Dans un cas réel, ce serait une requête API
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Gestion des cours</h1>
          <Link 
            href="/admin/courses/create"
            className="bg-[#FDC758] text-[#0F1B2A] px-4 py-2 rounded-md font-medium hover:bg-opacity-90"
          >
            Créer un cours
          </Link>
        </div>

        <Card>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Rechercher un cours..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 bg-[#1D2D40] border border-gray-700 rounded-md text-white"
            />
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-400">Chargement des cours...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Titre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Catégorie</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Inscriptions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Leçons</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-[#1D2D40]/60">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{course.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{course.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{course.enrollments}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{course.lessons}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${course.published ? 'bg-green-900 text-green-200' : 'bg-gray-700 text-gray-300'}`}>
                          {course.published ? 'Publié' : 'Brouillon'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <Link 
                            href={`/admin/courses/${course.id}`}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            Voir
                          </Link>
                          <Link 
                            href={`/admin/courses/${course.id}/edit`}
                            className="text-yellow-400 hover:text-yellow-300"
                          >
                            Modifier
                          </Link>
                          <button 
                            onClick={() => handleDeleteCourse(course.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredCourses.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  Aucun cours trouvé. {searchQuery && "Essayez une autre recherche."}
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
  );
}