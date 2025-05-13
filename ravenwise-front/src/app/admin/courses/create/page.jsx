"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../../../../components/admin/AdminLayout";
import Card from "../../../../components/common/Card";

export default function CreateCoursePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "beginner",
    estimatedHours: "",
    thumbnail: null,
    thumbnailPreview: null,
    published: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === "file" && files[0]) {
      // Prévisualisation de l'image
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          thumbnailPreview: e.target.result,
          thumbnail: files[0]
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulation d'une requête API pour créer un cours
      console.log("Données du formulaire soumises:", formData);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simuler un délai
      
      alert("Cours créé avec succès!");
      router.push("/admin/courses");
    } catch (error) {
      console.error("Erreur lors de la création du cours:", error);
      alert("Une erreur est survenue lors de la création du cours.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Créer un nouveau cours</h1>
          <button
            onClick={() => router.push("/admin/courses")}
            className="bg-[#1D2D40] text-white px-4 py-2 rounded-md hover:bg-[#263c58]"
          >
            Annuler
          </button>
        </div>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Colonne de gauche */}
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-gray-300 mb-2">Titre du cours *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-[#1D2D40] border border-gray-700 rounded-md text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-gray-300 mb-2">Description *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full p-3 bg-[#1D2D40] border border-gray-700 rounded-md text-white"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-gray-300 mb-2">Catégorie *</label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-[#1D2D40] border border-gray-700 rounded-md text-white"
                    >
                      <option value="">Sélectionner</option>
                      <option value="web-development">Développement Web</option>
                      <option value="frameworks">Frameworks</option>
                      <option value="programming">Programmation</option>
                      <option value="data-science">Data Science</option>
                      <option value="mobile">Développement Mobile</option>
                      <option value="design">Design</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="difficulty" className="block text-gray-300 mb-2">Difficulté *</label>
                    <select
                      id="difficulty"
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-[#1D2D40] border border-gray-700 rounded-md text-white"
                    >
                      <option value="beginner">Débutant</option>
                      <option value="intermediate">Intermédiaire</option>
                      <option value="advanced">Avancé</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="estimatedHours" className="block text-gray-300 mb-2">Durée estimée (heures) *</label>
                  <input
                    type="number"
                    id="estimatedHours"
                    name="estimatedHours"
                    value={formData.estimatedHours}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full p-3 bg-[#1D2D40] border border-gray-700 rounded-md text-white"
                  />
                </div>
              </div>
              
              {/* Colonne de droite */}
              <div className="space-y-6">
                <div>
                  <label htmlFor="thumbnail" className="block text-gray-300 mb-2">Image du cours</label>
                  <div className="relative border-2 border-dashed border-gray-700 rounded-md p-6 text-center">
                    {formData.thumbnailPreview ? (
                      <div>
                        <img 
                          src={formData.thumbnailPreview} 
                          alt="Aperçu" 
                          className="mx-auto mb-4 max-h-48 rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, thumbnail: null, thumbnailPreview: null }))}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Supprimer l'image
                        </button>
                      </div>
                    ) : (
                      <div>
                        <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-400">Cliquez ou glissez-déposez pour ajouter une image</p>
                        <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF jusqu'à 5MB</p>
                      </div>
                    )}
                    <input
                      type="file"
                      id="thumbnail"
                      name="thumbnail"
                      onChange={handleChange}
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
                
                <div className="p-6 bg-[#1D2D40] rounded-md">
                  <h3 className="text-lg font-medium text-white mb-4">Options de publication</h3>
                  
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="published"
                      name="published"
                      checked={formData.published}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#FDC758] bg-gray-700 border-gray-600 rounded focus:ring-[#FDC758] focus:ring-opacity-25"
                    />
                    <label htmlFor="published" className="ml-2 text-gray-300">Publier immédiatement</label>
                  </div>
                  
                  <p className="text-sm text-gray-400">
                    {formData.published 
                      ? "Le cours sera visible par tous les utilisateurs dès sa création." 
                      : "Le cours sera enregistré comme brouillon et ne sera pas visible par les utilisateurs."
                    }
                  </p>
                </div>
                
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`bg-[#FDC758] text-[#0F1B2A] px-6 py-3 rounded-md font-medium hover:bg-opacity-90 ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Création en cours..." : "Créer le cours"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </AdminLayout>
  );
}