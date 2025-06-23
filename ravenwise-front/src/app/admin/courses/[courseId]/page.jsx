"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { FiSave, FiArrowLeft } from "react-icons/fi";
import Card from "../../../../components/common/Card";
import { courseService } from "../../../../services/api";

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id;
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Charger les données du cours
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const courseData = await courseService.getCourseById(courseId);
        setCourse(courseData);
        
        // Pré-remplir le formulaire avec les données existantes
        reset({
          title: courseData.title,
          description: courseData.description,
          category: courseData.category,
          difficulty: courseData.difficulty,
          image: courseData.image
        });
        
        setError(null);
      } catch (err) {
        console.error("Erreur lors du chargement du cours:", err);
        setError("Impossible de charger les données du cours. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId, reset]);

  // Soumettre les modifications
  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setError(null);

      // Comparer avec les données existantes pour ne modifier que ce qui a changé
      const updatedData = {};
      for (const key in data) {
        if (course[key] !== data[key]) {
          updatedData[key] = data[key];
        }
      }

      // N'envoyer que si des modifications ont été faites
      if (Object.keys(updatedData).length > 0) {
        console.log("Données à mettre à jour:", updatedData);
        const result = await courseService.updateCourse(courseId, updatedData);
        console.log("Cours mis à jour:", result);
      }

      alert("Le cours a été mis à jour avec succès");
      router.push("/admin/courses");
    } catch (err) {
      console.error("Erreur lors de la mise à jour du cours:", err);
      
      if (err.response?.data) {
        const errorMessage = Array.isArray(err.response.data.message) 
          ? err.response.data.message.join(", ") 
          : err.response.data.message || "Erreur inconnue";
        
        setError(`Erreur: ${errorMessage}`);
      } else {
        setError("Impossible de mettre à jour le cours. Veuillez réessayer.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Affichage pendant le chargement
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FDC758]"></div>
      </div>
    );
  }

  return (
    <div className="edit-course text-white p-6">
      <div className="flex items-center mb-8">
        <button 
          onClick={() => router.push("/admin/courses")}
          className="text-gray-400 hover:text-white mr-4 flex items-center"
        >
          <FiArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-bold">Modifier le cours</h1>
      </div>

      {error && (
        <div className="bg-red-900/30 text-red-300 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="bg-[#182b4a] mb-6">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Informations du cours</h2>
            
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Titre du cours*</label>
              <input
                type="text"
                className={`w-full bg-[#253A52] rounded-lg p-3 text-white ${
                  errors.title ? "border border-red-500" : ""
                }`}
                placeholder="Entrez le titre du cours"
                {...register("title", { required: "Le titre est requis" })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Description</label>
              <textarea
                className="w-full bg-[#253A52] rounded-lg p-3 text-white min-h-[120px]"
                placeholder="Décrivez votre cours"
                {...register("description")}
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">Catégorie*</label>
                <select
                  className={`w-full bg-[#253A52] rounded-lg p-3 text-white ${
                    errors.category ? "border border-red-500" : ""
                  }`}
                  {...register("category", { required: "La catégorie est requise" })}
                >
                  <option value="">Sélectionnez une catégorie</option>
                  <option value="web development">Développement web</option>
                  <option value="framework">Framework</option>
                  <option value="programming">Programmation</option>
                  <option value="data science">Science des données</option>
                  <option value="mobile development">Développement mobile</option>
                  <option value="design">Design</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-400 mb-2">Niveau de difficulté*</label>
                <select
                  className={`w-full bg-[#253A52] rounded-lg p-3 text-white ${
                    errors.difficulty ? "border border-red-500" : ""
                  }`}
                  {...register("difficulty", { required: "Le niveau est requis" })}
                >
                  <option value="">Sélectionnez un niveau</option>
                  <option value="beginner">Débutant</option>
                  <option value="intermediate">Intermédiaire</option>
                  <option value="advanced">Avancé</option>
                  <option value="expert">Expert</option>
                </select>
                {errors.difficulty && (
                  <p className="text-red-500 text-sm mt-1">{errors.difficulty.message}</p>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-400 mb-2">URL de l'image*</label>
              <input
                type="text"
                className={`w-full bg-[#253A52] rounded-lg p-3 text-white ${
                  errors.image ? "border border-red-500" : ""
                }`}
                placeholder="URL de l'image de couverture"
                {...register("image", { 
                  required: "L'URL de l'image est requise",
                  maxLength: {
                    value: 255,
                    message: "L'URL ne doit pas dépasser 255 caractères"
                  }
                })}
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Entrez l'URL d'une image en ligne (format recommandé: 1200x800px)
              </p>
            </div>
            
            {course && (
              <div className="mb-6">
                <label className="block text-gray-400 mb-2">Aperçu de l'image actuelle</label>
                <div className="border border-[#253A52] rounded-lg overflow-hidden h-48 bg-[#0a1220] flex items-center justify-center">
                  {course.image ? (
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder-image.jpg"; // Image de remplacement si erreur
                        e.target.classList.add("border", "border-red-500");
                      }}
                    />
                  ) : (
                    <div className="text-gray-500">Aucune image disponible</div>
                  )}
                </div>
              </div>
            )}
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => router.push("/admin/courses")}
                className="bg-[#253A52] hover:bg-[#2c456e] text-white py-3 px-6 rounded-lg"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#FDC758] hover:bg-[#ffd57e] text-[#0c1524] font-bold py-3 px-6 rounded-lg flex items-center justify-center"
              >
                {submitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#0c1524] mr-2"></div>
                ) : (
                  <FiSave className="mr-2" />
                )}
                Enregistrer les modifications
              </button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
}