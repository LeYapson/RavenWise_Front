// src/components/community/DiscussionForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createDiscussion } from '../../services/forumService';

export default function DiscussionForm({ onSuccess }) {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);
      
      await createDiscussion({
        title,
        content,
        tags: tagsArray,
        authorId: currentUser.uid,
        createdAt: new Date()
      });
      
      setTitle('');
      setContent('');
      setTags('');
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
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
          <label htmlFor="content" className="block text-gray-300 mb-2">Contenu</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-[#1D2D40] border border-gray-700 rounded-md px-4 py-2 text-white min-h-[120px]"
            required
          ></textarea>
        </div>
        
        <div className="mb-6">
          <label htmlFor="tags" className="block text-gray-300 mb-2">Tags (séparés par des virgules)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full bg-[#1D2D40] border border-gray-700 rounded-md px-4 py-2 text-white"
            placeholder="React, JavaScript, API..."
          />
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