// src/components/community/DiscussionForm.jsx
import React, { useState } from 'react';
import { useClerkAuth } from '../../context/clerkContext';
import { useUser } from '@clerk/nextjs';
import { communityService } from '../../services/api';

export default function DiscussionForm({ onSuccess }) {
  const { currentUser } = useClerkAuth();
  const { user: clerkUser } = useUser();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Categories disponibles selon l'erreur
  const availableCategories = [
    'web development',
    'framework', 
    'programming',
    'data science',
    'mobile development',
    'design'
  ];
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Validation côté client
      if (!category) {
        setError('Veuillez sélectionner une catégorie');
        setLoading(false);
        return;
      }

      if (!clerkUser?.id) {
        setError('Erreur d\'authentification. Veuillez vous reconnecter.');
        setLoading(false);
        return;
      }
      
      const publicationData = {
        title,
        description: content,
        category,
        authorClerkId: clerkUser.id, // Utiliser l'ID Clerk directement
        // Essayer d'ajouter les informations de l'auteur pour faciliter l'affichage
        // Si l'API rejette authorName, nous pourrions le retirer
        ...(clerkUser.fullName || clerkUser.firstName ? {
          authorName: clerkUser.fullName || `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || clerkUser.firstName || 'Utilisateur'
        } : {}),
        // Ajouter l'image de profil si disponible
        ...(clerkUser.imageUrl ? {
          authorImageUrl: clerkUser.imageUrl
        } : {}),
        // Ne pas envoyer de tags selon l'erreur "property tags should not exist"
      };
      
      console.log('[DEBUG] Données de publication à envoyer:', publicationData);
      console.log('[DEBUG] Utilisateur Clerk:', clerkUser);
      
      await communityService.createPublication(publicationData);
      
      setTitle('');
      setContent('');
      setCategory('');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Erreur lors de la création:", err);
      console.error("Détails de l'erreur:", err.response?.data);
      setError(err.response?.data?.message || err.message || "Une erreur est survenue lors de la création de la discussion");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-[#182b4a] rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-4 text-white">Créer une nouvelle discussion</h2>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-300 mb-2">Titre</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#1D2D40] border border-gray-700 rounded-md px-4 py-2 text-white"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-300 mb-2">Description</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-[#1D2D40] border border-gray-700 rounded-md px-4 py-2 text-white min-h-[120px]"
            placeholder="Décrivez votre discussion..."
            required
          ></textarea>
        </div>
        
        <div className="mb-6">
          <label htmlFor="category" className="block text-gray-300 mb-2">Catégorie <span className="text-red-400">*</span></label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-[#1D2D40] border border-gray-700 rounded-md px-4 py-2 text-white"
            required
          >
            <option value="">Sélectionner une catégorie</option>
            {availableCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="bg-[#FDC758] text-[#0F1B2A] font-bold px-6 py-2 rounded-md hover:bg-opacity-90 disabled:opacity-50"
        >
          {loading ? 'Publication en cours...' : 'Publier la discussion'}
        </button>
      </form>
    </div>
  );
}