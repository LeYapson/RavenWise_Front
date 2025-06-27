"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import DiscussionForm from '../../components/community/DiscussionForm';
import { communityService } from '../../services/api';
import { useClerkAuth } from '../../context/clerkContext';

const Community = () => {
  const { currentUser, loading, isAuthenticated, logout } = useClerkAuth();
  const [discussions, setDiscussions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [showNewDiscussionForm, setShowNewDiscussionForm] = useState(false);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        setError(null);
        const fetchedDiscussions = await communityService.getAllPublications();
        console.log("Publications récupérées:", fetchedDiscussions); // Debug
        console.log("Structure d'une publication:", fetchedDiscussions[0]); // Debug structure
        setDiscussions(Array.isArray(fetchedDiscussions) ? fetchedDiscussions : []);
      } catch (error) {
        console.error("Erreur lors de la récupération des discussions", error);
        setError("Impossible de charger les discussions. Veuillez réessayer.");
        setDiscussions([]);
      }
    };

    fetchDiscussions();
  }, []);

  const handleDiscussionCreated = async () => {
    setShowNewDiscussionForm(false);
    try {
      setError(null);
      const fetchedDiscussions = await communityService.getAllPublications();
      setDiscussions(Array.isArray(fetchedDiscussions) ? fetchedDiscussions : []);
    } catch (error) {
      console.error("Erreur lors du rechargement des discussions", error);
      setError("Erreur lors du rechargement des discussions");
    }
  };

  // Filtrer les discussions selon le terme de recherche
  const filteredDiscussions = discussions.filter(discussion =>
    discussion.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    return (
      <div className="mb-8">
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-md mb-6">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="text-center text-gray-300 py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FDC758] mx-auto mb-4"></div>
            Chargement des discussions...
          </div>
        ) : filteredDiscussions.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-semibold mb-2">Aucune discussion trouvée</h3>
            <p className="text-gray-500">
              {searchTerm ? 'Essayez avec d\'autres mots-clés' : 'Soyez le premier à lancer une discussion !'}
            </p>
          </div>
        ) : (
          filteredDiscussions.map(discussion => {
            // Debug pour voir la structure des données
            console.log('[DEBUG] Discussion data:', discussion);
            console.log('[DEBUG] Author data:', discussion.author);
            console.log('[DEBUG] AuthorName:', discussion.authorName);
            
            // Fonction pour formater la date
            const formatDate = (dateString) => {
              if (!dateString) return 'Date inconnue';
              try {
                const date = new Date(dateString);
                if (isNaN(date.getTime())) return 'Date invalide';
                return date.toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                });
              } catch (error) {
                return 'Date invalide';
              }
            };

            // Fonction pour obtenir le nom de l'auteur
            const getAuthorName = () => {
              // Vérifier s'il y a un objet author complet
              if (discussion.author?.firstName && discussion.author?.lastName) {
                return `${discussion.author.firstName} ${discussion.author.lastName}`;
              }
              // Vérifier s'il y a un nom dans l'objet author
              if (discussion.author?.name) {
                return discussion.author.name;
              }
              // Vérifier s'il y a un nom d'auteur direct
              if (discussion.authorName) {
                return discussion.authorName;
              }
              // Vérifier s'il y a juste un prénom
              if (discussion.author?.firstName) {
                return discussion.author.firstName;
              }
              return 'Utilisateur anonyme';
            };

            // Fonction pour obtenir l'initiale de l'auteur
            const getAuthorInitial = () => {
              const authorName = getAuthorName();
              return authorName && authorName !== 'Utilisateur anonyme' ? 
                authorName.charAt(0).toUpperCase() : '?';
            };

            // Fonction pour obtenir l'image de profil de l'auteur
            const getAuthorImage = () => {
              return discussion.author?.imageUrl || 
                     discussion.author?.profileImageUrl || 
                     discussion.authorImageUrl || 
                     null;
            };

            return (
              <Link key={discussion.id} href={`/community/discussions/${discussion.id}`} className="block bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg p-6 mb-6 shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px] hover:border-[#FDC758]/50">
                <div className="flex justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#FDC758]/30 relative">
                      {getAuthorImage() ? (
                        <>
                          <img 
                            src={getAuthorImage()} 
                            alt={getAuthorName()}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Si l'image ne charge pas, cacher l'image et montrer l'avatar
                              e.target.style.display = 'none';
                              const avatarDiv = e.target.parentNode.querySelector('.avatar-fallback');
                              if (avatarDiv) avatarDiv.style.display = 'flex';
                            }}
                          />
                          <div className="avatar-fallback w-12 h-12 bg-gradient-to-br from-[#FDC758] to-[#f4a23a] rounded-full flex items-center justify-center text-[#0F1B2A] font-bold text-lg absolute top-0 left-0" style={{display: 'none'}}>
                            {getAuthorInitial()}
                          </div>
                        </>
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-[#FDC758] to-[#f4a23a] rounded-full flex items-center justify-center text-[#0F1B2A] font-bold text-lg">
                          {getAuthorInitial()}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {getAuthorName()}
                      </div>
                      <div className="text-sm text-gray-400">
                        {formatDate(discussion.createdAt || discussion.updatedAt || discussion.date)}
                      </div>
                    </div>
                  </div>
                
                {discussion.category && (
                  <span className="bg-[#FDC758]/20 text-[#FDC758] px-3 py-1 rounded-full text-sm font-medium">
                    {discussion.category}
                  </span>
                )}
              </div>
              
              <div className="text-xl font-semibold mb-3 text-white line-clamp-2">
                {discussion.title}
              </div>
              
              <p className="text-gray-300 mb-4 line-clamp-3">
                {discussion.description || discussion.content}
              </p>
              
              <div className="flex justify-between items-center text-sm text-gray-400">
                <div className="flex gap-2 flex-wrap">
                  {discussion.tags && Array.isArray(discussion.tags) && discussion.tags.map((tag, index) => (
                    <span key={index} className="bg-white/10 text-gray-300 rounded-full px-3 py-1 text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4 items-center">
                  <span className="flex items-center gap-1">
                    💬 {discussion.messagesCount || discussion.replies || discussion._count?.messages || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    👁️ {discussion.views || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    ❤️ {discussion.likes || 0}
                  </span>
                </div>
              </div>
            </Link>
          );
        })
      )}
    </div>
    );
  };

  return (
    <>
      <Header />
      <div className="p-5 max-w-screen-xl mx-auto">
        {/* En-tête de la page */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Communauté RavenWise</h1>
          <p className="text-gray-400 text-lg">Échangez, apprenez et collaborez avec la communauté</p>
        </div>

        {/* Bouton pour créer une discussion */}
        {isAuthenticated && (
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

        {/* Barre de recherche */}
        <div className="relative mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher des discussions..."
            className="w-full p-3 pl-10 bg-white/10 backdrop-blur-md border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:border-yellow-300 transition-colors"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        {/* Affichage du nombre de discussions */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Discussions 
            {discussions.length > 0 && (
              <span className="bg-[#FDC758]/20 text-[#FDC758] text-lg px-3 py-1 rounded-full ml-3">
                {filteredDiscussions.length}
              </span>
            )}
          </h2>
          {searchTerm && (
            <p className="text-gray-400">
              {filteredDiscussions.length} résultat{filteredDiscussions.length !== 1 ? 's' : ''} pour "{searchTerm}"
            </p>
          )}
        </div>

        {renderContent()}
      </div>
      <Footer />
    </>
  );
};

export default Community;
