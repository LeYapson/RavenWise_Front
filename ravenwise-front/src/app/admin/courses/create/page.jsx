"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FiSave } from "react-icons/fi";
import Card from "../../../../components/common/Card";
import { courseService } from "../../../../services/api";

export default function CreateCoursePage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);

      // Format des données selon les exigences de l'API
      const courseData = {
        title: data.title,
        description: data.description || "",
        category: data.category,
        difficulty: data.difficulty,
        image: data.image
      };
      
      console.log("Données envoyées à l'API:", courseData);

      // Appel API pour créer le cours
      const createdCourse = await courseService.createCourse(courseData);
      console.log("Cours créé avec succès:", createdCourse);
      
      alert("Le cours a été créé avec succès !");
      router.push("/admin/courses");
    } catch (err) {
      console.error("Erreur lors de la création du cours:", err);
      
      // Afficher les détails de l'erreur
      if (err.response?.data) {
        const errorMessage = Array.isArray(err.response.data.message) 
          ? err.response.data.message.join(", ") 
          : err.response.data.message || "Erreur inconnue";
        
        setError(`Erreur: ${errorMessage}`);
      } else {
        setError("Impossible de créer le cours. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-course text-white p-6">
      <h1 className="text-3xl font-bold mb-8">Créer un cours</h1>

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
                placeholder="URL de l'image de couverture (ex: https://exemple.com/image.jpg)"
                {...register("image", { 
                  required: "L'URL de l'image est requise",
                  maxLength: {
                    value: 255,
                    message: "L'URL ne doit pas dépasser 255 caractères"
                  },
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: "L'URL doit commencer par http:// ou https://"
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
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#FDC758] hover:bg-[#ffd57e] text-[#0c1524] font-bold py-3 px-6 rounded-lg flex items-center justify-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#0c1524] mr-2"></div>
                ) : (
                  <FiSave className="mr-2" />
                )}
                Créer le cours
              </button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
}