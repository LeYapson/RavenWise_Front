"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Card from "../../../components/common/Card";
import { FiEdit, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";
import { courseService } from "../../../services/api";

export default function CoursesAdminPage() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Charger tous les cours au chargement de la page
  useEffect(() => {
    fetchCourses();
  }, []);

  // Récupérer tous les cours depuis l'API
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const coursesData = await courseService.getAllCourses();
      setCourses(coursesData);
      setError(null);
    } catch (err) {
      console.error("Erreur lors du chargement des cours:", err);
      setError("Impossible de charger les cours. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour supprimer un cours
  const handleDeleteCourse = async (id) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce cours ?")) {
      try {
        await courseService.deleteCourse(id);
        // Mettre à jour la liste des cours après suppression
        setCourses(courses.filter((course) => course.id !== id));
      } catch (error) {
        console.error("Erreur lors de la suppression du cours:", error);
        alert("Impossible de supprimer le cours. Veuillez réessayer.");
      }
    }
  };

  // Filtrer les cours par la recherche
  const filteredCourses = courses.filter(
    (course) =>
      course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="courses-admin text-white p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Gestion des cours</h1>
        <Link href="/admin/courses/create">
          <button className="bg-[#FDC758] hover:bg-[#ffd57e] text-[#0c1524] font-bold py-2 px-4 rounded-lg flex items-center">
            <FiPlus className="mr-2" /> Créer un cours
          </button>
        </Link>
      </div>

      {/* Affichage des erreurs */}
      {error && (
        <div className="bg-red-900/30 text-red-300 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Barre de recherche */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher un cours..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#253A52] rounded-lg py-3 px-4 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FDC758]"
          />
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Affichage des cours */}
      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FDC758]"></div>
        </div>
      ) : filteredCourses.length > 0 ? (
        <Card className="bg-[#182b4a] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-[#253A52]">
                <tr>
                  <th className="text-left p-4">Titre</th>
                  <th className="text-left p-4">Catégorie</th>
                  <th className="text-left p-4">Niveau</th>
                  <th className="text-left p-4">Leçons</th>
                  <th className="text-left p-4">Statut</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="border-b border-[#253A52]">
                    <td className="p-4 font-medium">{course.title}</td>
                    <td className="p-4">{course.category || "Non catégorisé"}</td>
                    <td className="p-4">{course.level || "Non spécifié"}</td>
                    <td className="p-4">
                      {course.lessons?.length || 0} leçon(s)
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          course.published
                            ? "bg-green-900/30 text-green-400"
                            : "bg-yellow-900/30 text-yellow-400"
                        }`}
                      >
                        {course.published ? "Publié" : "Brouillon"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => router.push(`/admin/courses/${course.id}`)}
                          className="p-2 bg-[#253A52] rounded hover:bg-[#2f496e] transition"
                          title="Modifier"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="p-2 bg-red-900/30 text-red-400 rounded hover:bg-red-900/50 transition"
                          title="Supprimer"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">Aucun cours trouvé</p>
          <Link href="/admin/courses/create">
            <button className="bg-[#FDC758] hover:bg-[#ffd57e] text-[#0c1524] font-bold py-2 px-4 rounded-lg">
              Créer votre premier cours
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}