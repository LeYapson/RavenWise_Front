"use client";

import React, { useState, useEffect } from 'react';
import { communityService } from '../../../services/api';
import AdminGuard from '../../../components/admin/AdminGuard';
import { FiMessageSquare, FiTrash2, FiEye, FiCalendar, FiUser, FiSearch, FiFilter } from 'react-icons/fi';

export default function CommunityModerationPage() {
  const [publications, setPublications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('publications');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    fetchCommunityData();
  }, []);

  const fetchCommunityData = async () => {
    try {
      setLoading(true);
      const [publicationsData, messagesData] = await Promise.all([
        communityService.getAllPublications(),
        communityService.getAllMessages()
      ]);
      setPublications(publicationsData || []);
      setMessages(messagesData || []);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePublication = async (publicationId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette publication ?')) {
      return;
    }

    try {
      await communityService.deletePublication(publicationId);
      setPublications(prev => prev.filter(p => p.id !== publicationId));
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression de la publication.');
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      return;
    }

    try {
      await communityService.deleteMessage(messageId);
      setMessages(prev => prev.filter(m => m.id !== messageId));
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression du message.');
    }
  };

  const filteredPublications = publications.filter(pub => {
    const matchesSearch = pub.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pub.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || pub.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredMessages = messages.filter(msg => {
    return msg.text?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const categories = [...new Set(publications.map(p => p.category).filter(Boolean))];

  if (loading) {
    return (
      <AdminGuard>
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FDC758]"></div>
        </div>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Modération Communauté</h1>
          <p className="text-gray-400">Gérez les publications et messages de la communauté</p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <FiMessageSquare className="text-blue-400" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Publications</h3>
                <p className="text-2xl font-bold text-blue-400">{publications.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <FiMessageSquare className="text-green-400" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Messages</h3>
                <p className="text-2xl font-bold text-green-400">{messages.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <FiUser className="text-purple-400" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Auteurs Actifs</h3>
                <p className="text-2xl font-bold text-purple-400">
                  {new Set([...publications.map(p => p.author?.clerkId), ...messages.map(m => m.author?.clerkId)].filter(Boolean)).size}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#1a2332] border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#FDC758]"
                />
              </div>
            </div>

            {activeTab === 'publications' && (
              <div className="flex items-center gap-2">
                <FiFilter className="text-gray-400" size={20} />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-[#1a2332] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#FDC758]"
                >
                  <option value="all">Toutes les catégories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Onglets */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('publications')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'publications'
                ? 'bg-[#FDC758] text-[#0F1B2A]'
                : 'bg-white/10 text-gray-400 hover:text-white'
            }`}
          >
            Publications ({filteredPublications.length})
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'messages'
                ? 'bg-[#FDC758] text-[#0F1B2A]'
                : 'bg-white/10 text-gray-400 hover:text-white'
            }`}
          >
            Messages ({filteredMessages.length})
          </button>
        </div>

        {/* Contenu des onglets */}
        {activeTab === 'publications' && (
          <div className="space-y-4">
            {filteredPublications.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <FiMessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                <p>Aucune publication trouvée</p>
              </div>
            ) : (
              filteredPublications.map(publication => (
                <div key={publication.id} className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#FDC758] to-[#f4a23a] rounded-full flex items-center justify-center text-[#0F1B2A] font-bold">
                          {publication.author?.firstName?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">
                            {publication.author?.firstName} {publication.author?.lastName}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <FiCalendar size={14} />
                              {new Date(publication.created_at).toLocaleDateString('fr-FR')}
                            </span>
                            {publication.category && (
                              <span className="bg-[#FDC758]/20 text-[#FDC758] px-2 py-1 rounded-full text-xs">
                                {publication.category}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <h2 className="text-xl font-bold text-white mb-2">{publication.title}</h2>
                      <p className="text-gray-300 mb-4 line-clamp-3">{publication.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>ID: {publication.id}</span>
                        <span>Author ID: {publication.author?.clerkId}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => window.open(`/community/discussions/${publication.id}`, '_blank')}
                        className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/50 text-blue-400 px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <FiEye size={16} />
                        Voir
                      </button>
                      <button
                        onClick={() => handleDeletePublication(publication.id)}
                        className="bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 text-red-400 px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <FiTrash2 size={16} />
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-4">
            {filteredMessages.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <FiMessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                <p>Aucun message trouvé</p>
              </div>
            ) : (
              filteredMessages.map(message => (
                <div key={message.id} className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {message.author?.firstName?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">
                            {message.author?.firstName} {message.author?.lastName}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <FiCalendar size={14} />
                              {new Date(message.createdAt).toLocaleDateString('fr-FR')}
                            </span>
                            {message.publication && (
                              <span className="text-blue-400">
                                → {message.publication.title}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-4">{message.text}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>ID: {message.id}</span>
                        <span>Author ID: {message.author?.clerkId}</span>
                        {message.publication && (
                          <span>Publication ID: {message.publication.id}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      {message.publication && (
                        <button
                          onClick={() => window.open(`/community/discussions/${message.publication.id}`, '_blank')}
                          className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/50 text-blue-400 px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <FiEye size={16} />
                          Voir
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteMessage(message.id)}
                        className="bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 text-red-400 px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <FiTrash2 size={16} />
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </AdminGuard>
  );
}
