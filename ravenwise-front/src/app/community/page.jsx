"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import DiscussionForm from '../../components/community/DiscussionForm';
import { getDiscussions } from '../../services/forumService';
import { useClerkAuth } from '../context/clerkContext';

const Community = () => {
  const { currentUser, loading, isAuthenticated, logout } = useClerkAuth();
  const [activeTab, setActiveTab] = useState('discussions');
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewDiscussionForm, setShowNewDiscussionForm] = useState(false);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const fetchedDiscussions = await getDiscussions();
        setDiscussions(fetchedDiscussions);
      } catch (error) {
        console.error("Erreur lors de la récupération des discussions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscussions();
  }, []);

  const handleDiscussionCreated = async () => {
    setShowNewDiscussionForm(false);
    setLoading(true);
    const fetchedDiscussions = await getDiscussions();
    setDiscussions(fetchedDiscussions);
    setLoading(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'discussions':
        return (
          <div className="mb-8">
            {loading ? (
              <div className="text-center text-gray-300">Chargement...</div>
            ) : (
              discussions.map(discussion => (
                <Link key={discussion.id} href={`/community/discussions/${discussion.id}`} className="block bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg p-4 mb-6 shadow-md hover:shadow-lg transition-transform duration-300 hover:translate-y-[-5px]">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-cover bg-center rounded-full" style={{ backgroundImage: `url(${discussion.author.avatar})` }}></div>
                      <div>
                        <div className="font-semibold text-white">{discussion.author.name}</div>
                        <div className="text-sm text-gray-400">{discussion.date}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xl font-semibold mb-2 text-white">{discussion.title}</div>
                  <p className="text-gray-300 mb-4">{discussion.content}</p>
                  <div className="flex justify-between text-sm text-gray-300">
                    <div className="flex gap-2">
                      {discussion.tags.map((tag, index) => (
                        <span key={index} className="bg-white/10 text-gray-300 rounded-full px-3 py-1">{tag}</span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <span>💬 {discussion.replies}</span>
                      <span>👁️ {discussion.views}</span>
                      <span>❤️ {discussion.likes}</span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        );

      case 'members':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Code pour les membres actifs */}
          </div>
        );

      case 'events':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Code pour les événements */}
          </div>
        );

      case 'projects':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Code pour les projets */}
          </div>
        );

      default:
        return <div>Contenu non disponible</div>;
    }
  };

  return (
    <>
      <Header />
      <div className="p-5 max-w-screen-xl mx-auto">
        <h1 className="text-4xl text-center mb-6">Communauté RavenWise</h1>

        {/* Bouton pour créer une discussion */}
        {isAuthenticated && activeTab === 'discussions' && (
          <div className="mb-6 flex justify-end">
            <button
              onClick={() => setShowNewDiscussionForm(!showNewDiscussionForm)}
              className="bg-[#FDC758] text-[#0F1B2A] font-bold px-4 py-2 rounded-md hover:bg-opacity-90"
            >
              {showNewDiscussionForm ? 'Annuler' : 'Nouvelle discussion'}
            </button>
          </div>
        )}

        {/* Formulaire de création de discussion */}
        {showNewDiscussionForm && (
          <DiscussionForm onSuccess={handleDiscussionCreated} />
        )}

        {/* Navigation par onglets */}
        <div className="flex border-b border-gray-700 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('discussions')}
            className={`px-4 py-2 text-lg ${activeTab === 'discussions' ? 'text-yellow-300 font-semibold border-b-2 border-yellow-300' : 'text-gray-400'}`}
          >
            Discussions
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`px-4 py-2 text-lg ${activeTab === 'members' ? 'text-yellow-300 font-semibold border-b-2 border-yellow-300' : 'text-gray-400'}`}
          >
            Membres Actifs
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 text-lg ${activeTab === 'events' ? 'text-yellow-300 font-semibold border-b-2 border-yellow-300' : 'text-gray-400'}`}
          >
            Événements
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 text-lg ${activeTab === 'projects' ? 'text-yellow-300 font-semibold border-b-2 border-yellow-300' : 'text-gray-400'}`}
          >
            Projets Collaboratifs
          </button>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder={`Rechercher des ${activeTab === 'discussions' ? 'discussions' : activeTab === 'members' ? 'membres' : activeTab === 'events' ? 'événements' : 'projets'}...`}
            className="w-full p-3 bg-white/10 backdrop-blur-md border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:border-yellow-300"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</div>
        </div>

        {renderContent()}
      </div>
      <Footer />
    </>
  );
};

export default Community;
