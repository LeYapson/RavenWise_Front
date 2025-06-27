"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../../../../components/common/Header';
import Footer from '../../../../components/common/Footer';
import { communityService } from '../../../../services/api';
import { useClerkAuth } from '../../../../context/clerkContext';
import { FiArrowLeft, FiHeart, FiMessageSquare, FiEye, FiCalendar, FiUser, FiTrash2 } from 'react-icons/fi';

export default function DiscussionDetailPage() {
  const { discussionId } = useParams();
  const router = useRouter();
  const { currentUser, isAuthenticated, isAdmin } = useClerkAuth();
  
  const [discussion, setDiscussion] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [submittingMessage, setSubmittingMessage] = useState(false);
  const [deletingDiscussion, setDeletingDiscussion] = useState(false);

  // Fonctions helper pour les noms d'auteurs
  const getAuthorName = (authorData) => {
    // Pour les discussions, les données sont dans authorData.author
    const author = authorData?.author || authorData;
    
    if (author?.firstName && author?.lastName) {
      return `${author.firstName} ${author.lastName}`;
    }
    if (author?.name) {
      return author.name;
    }
    if (authorData?.authorName) {
      return authorData.authorName;
    }
    if (author?.firstName) {
      return author.firstName;
    }
    return 'Utilisateur anonyme';
  };

  const getAuthorInitial = (authorData) => {
    const authorName = getAuthorName(authorData);
    return authorName && authorName !== 'Utilisateur anonyme' ? 
      authorName.charAt(0).toUpperCase() : '?';
  };

  const getAuthorImage = (authorData) => {
    // Pour les discussions, les données sont dans authorData.author
    const author = authorData?.author || authorData;
    
    return author?.imageUrl || 
           author?.profileImageUrl || 
           authorData?.authorImageUrl || 
           null;
  };

  // Log de débogage au rendu (peut être supprimé en production)
  console.log('[RENDER] DiscussionDetailPage rendering with:', {
    isAuthenticated,
    currentUser: currentUser?.id,
    discussionId,
    hasDiscussion: !!discussion,
    messagesCount: messages.length
  });

  useEffect(() => {
    const fetchDiscussionData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Récupérer la discussion
        const discussionData = await communityService.getPublicationById(discussionId);
        console.log('[DEBUG] Discussion data:', discussionData);
        setDiscussion(discussionData);
        
        // Récupérer les messages de la discussion
        const messagesData = await communityService.getAllMessagesByPublicationId(discussionId);
        console.log('[DEBUG] Messages data:', messagesData);
        setMessages(Array.isArray(messagesData) ? messagesData : []);
        
      } catch (err) {
        console.error("Erreur lors du chargement de la discussion:", err);
        setError("Impossible de charger cette discussion.");
      } finally {
        setLoading(false);
      }
    };

    if (discussionId) {
      fetchDiscussionData();
    }
  }, [discussionId]);

  // Debug pour comprendre les données utilisateur
  useEffect(() => {
    if (currentUser) {
      console.log('[DEBUG] Current user:', currentUser);
      console.log('[DEBUG] Is admin:', isAdmin);
    }
  }, [currentUser, isAdmin]);

  // Debug complet des données utilisateur et permissions
  useEffect(() => {
    if (currentUser && discussion) {
      console.log('=== DEBUG PERMISSIONS ===');
      console.log('Current user:', currentUser);
      console.log('Current user clerkId:', currentUser.clerkId, typeof currentUser.clerkId);
      console.log('Current user role:', currentUser.role);
      console.log('isAdmin from context:', isAdmin);
      console.log('Discussion:', discussion);
      console.log('Discussion authorId (author.clerkId):', discussion.author?.clerkId, typeof discussion.author?.clerkId);
      console.log('Discussion authorId (legacy authorId):', discussion.authorId, typeof discussion.authorId);
      const authorId = discussion?.author?.clerkId || discussion?.authorId;
      const currentUserId = currentUser?.clerkId;
      console.log('Final authorId used:', authorId, typeof authorId);
      console.log('Final currentUserId used:', currentUserId, typeof currentUserId);
      console.log('ID comparison result:', String(authorId) === String(currentUserId));
      console.log('Final permission check:', isAdmin || String(authorId) === String(currentUserId));
      console.log('========================');
    }
  }, [currentUser, discussion, isAdmin]);

  // Fonction pour vérifier si l'utilisateur peut supprimer la discussion
  const canDeleteDiscussion = () => {
    // L'authorId est dans discussion.author.clerkId selon l'API
    const authorId = discussion?.author?.clerkId || discussion?.authorId;
    const currentUserId = currentUser?.clerkId;
    const isAuthor = isAuthenticated && currentUser && String(authorId) === String(currentUserId);
    const canDelete = isAuthor || isAdmin;
    console.log('[PERMISSION CHECK] Can delete discussion?', {
      isAuthenticated,
      hasCurrentUser: !!currentUser,
      isAdmin,
      discussionAuthorId: authorId,
      discussionAuthorPath: 'discussion.author.clerkId',
      currentUserId: currentUserId,
      isAuthor,
      stringComparison: String(authorId) === String(currentUserId),
      finalResult: canDelete
    });
    return canDelete;
  };

  // Fonction pour vérifier si l'utilisateur peut supprimer un message
  const canDeleteMessage = (message) => {
    // L'authorId peut être dans message.author.clerkId ou message.authorId selon l'API
    const authorId = message?.author?.clerkId || message?.authorId;
    const currentUserId = currentUser?.clerkId;
    const isAuthor = isAuthenticated && currentUser && String(authorId) === String(currentUserId);
    const canDelete = isAuthor || isAdmin;
    console.log('[PERMISSION CHECK] Can delete message?', {
      messageId: message?.id,
      isAuthenticated,
      hasCurrentUser: !!currentUser,
      isAdmin,
      messageAuthorId: authorId,
      messageAuthorPath: 'message.author.clerkId or message.authorId',
      currentUserId: currentUserId,
      isAuthor,
      stringComparison: String(authorId) === String(currentUserId),
      finalResult: canDelete
    });
    return canDelete;
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !isAuthenticated) return;

    try {
      setSubmittingMessage(true);
      
      // Créer le message avec les champs corrects selon l'API
      const messageData = {
        text: newMessage, // Utiliser 'text' au lieu de 'content' selon l'API
        publicationId: parseInt(discussionId, 10), // S'assurer que c'est un nombre
        authorClerkId: currentUser?.clerkId // Utiliser uniquement clerkId
      };
      
      console.log('[DEBUG] Données du message à envoyer:', messageData);
      
      await communityService.createMessage(messageData);
      
      // Recharger les messages
      const messagesData = await communityService.getAllMessagesByPublicationId(discussionId);
      setMessages(Array.isArray(messagesData) ? messagesData : []);
      setNewMessage('');
      
    } catch (err) {
      console.error("Erreur lors de l'envoi du message:", err);
      console.error("Détails de l'erreur:", err.response?.data);
      alert("Erreur lors de l'envoi du message. Veuillez réessayer.");
    } finally {
      setSubmittingMessage(false);
    }
  };

  const handleDeleteDiscussion = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette discussion ? Cette action est irréversible.')) {
      return;
    }

    try {
      setDeletingDiscussion(true);
      await communityService.deletePublication(discussionId);
      router.push('/community');
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
      alert("Erreur lors de la suppression de la discussion.");
    } finally {
      setDeletingDiscussion(false);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      return;
    }

    try {
      await communityService.deleteMessage(messageId);
      // Recharger les messages
      const messagesData = await communityService.getAllMessagesByPublicationId(discussionId);
      setMessages(Array.isArray(messagesData) ? messagesData : []);
    } catch (err) {
      console.error("Erreur lors de la suppression du message:", err);
      alert("Erreur lors de la suppression du message.");
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#0c1524] text-white py-10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex justify-center items-center min-h-[50vh]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FDC758] mx-auto mb-6"></div>
                <p className="text-xl">Chargement de la discussion...</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !discussion) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#0c1524] text-white py-10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">😕</div>
              <h2 className="text-2xl font-bold mb-4">Discussion introuvable</h2>
              <p className="text-gray-400 mb-6">{error || "Cette discussion n'existe pas ou a été supprimée."}</p>
              <Link href="/community" className="bg-[#FDC758] text-[#0F1B2A] px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                Retour à la communauté
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#0c1524] text-white py-10">
        <div className="max-w-4xl mx-auto px-4">
          {/* Bouton retour */}
          <Link href="/community" className="inline-flex items-center gap-2 text-[#FDC758] hover:text-white transition-colors mb-6">
            <FiArrowLeft size={20} />
            Retour à la communauté
          </Link>

          {/* Discussion principale */}
          <div className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg p-6 mb-8">
            {/* En-tête de la discussion */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#FDC758]/30 relative">
                  {getAuthorImage(discussion) ? (
                    <>
                      <img 
                        src={getAuthorImage(discussion)} 
                        alt="Photo de profil"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Si l'image ne charge pas, cacher l'image et montrer l'avatar
                          e.target.style.display = 'none';
                          const avatarDiv = e.target.parentNode.querySelector('.avatar-fallback');
                          if (avatarDiv) avatarDiv.style.display = 'flex';
                        }}
                      />
                      <div className="avatar-fallback w-16 h-16 bg-gradient-to-br from-[#FDC758] to-[#f4a23a] rounded-full flex items-center justify-center text-[#0F1B2A] font-bold text-xl absolute top-0 left-0" style={{display: 'none'}}>
                        {getAuthorInitial(discussion)}
                      </div>
                    </>
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FDC758] to-[#f4a23a] rounded-full flex items-center justify-center text-[#0F1B2A] font-bold text-xl">
                      {getAuthorInitial(discussion)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">
                    {getAuthorName(discussion)}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <FiCalendar size={14} />
                      {new Date(discussion.createdAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    {discussion.category && (
                      <span className="bg-[#FDC758]/20 text-[#FDC758] px-3 py-1 rounded-full text-xs font-medium">
                        {discussion.category}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Bouton de suppression - Auteur ou Admin */}
              {canDeleteDiscussion() && (
                <button
                  onClick={handleDeleteDiscussion}
                  disabled={deletingDiscussion}
                  className="bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 text-red-400 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                  title={isAdmin ? "Supprimer (Admin)" : "Supprimer (Auteur)"}
                >
                  <FiTrash2 size={16} />
                  {deletingDiscussion ? 'Suppression...' : 'Supprimer'}
                </button>
              )}
            </div>

            {/* Titre et contenu */}
            <h1 className="text-3xl font-bold text-white mb-4">{discussion.title}</h1>
            <div className="text-gray-300 leading-relaxed mb-6 whitespace-pre-wrap">
              {discussion.description || discussion.content}
            </div>

            {/* Tags */}
            {discussion.tags && Array.isArray(discussion.tags) && discussion.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-6">
                {discussion.tags.map((tag, index) => (
                  <span key={index} className="bg-white/10 text-gray-300 rounded-full px-3 py-1 text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Statistiques */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-700">
              <div className="flex gap-6 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <FiMessageSquare size={16} />
                  {messages.length} réponse{messages.length !== 1 ? 's' : ''}
                </span>
                <span className="flex items-center gap-1">
                  <FiEye size={16} />
                  {discussion.views || 0} vue{(discussion.views || 0) !== 1 ? 's' : ''}
                </span>
                <span className="flex items-center gap-1">
                  <FiHeart size={16} />
                  {discussion.likes || 0} j'aime
                </span>
              </div>
            </div>
          </div>

          {/* Messages de réponse */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-6">Réponses ({messages.length})</h2>
            
            {messages.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <FiMessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                <p>Aucune réponse pour le moment. Soyez le premier à répondre !</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="bg-white/5 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-blue-500/30 relative">
                          {getAuthorImage(message) ? (
                            <>
                              <img 
                                src={getAuthorImage(message)} 
                                alt="Photo de profil"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  // Si l'image ne charge pas, cacher l'image et montrer l'avatar
                                  e.target.style.display = 'none';
                                  const avatarDiv = e.target.parentNode.querySelector('.avatar-fallback');
                                  if (avatarDiv) avatarDiv.style.display = 'flex';
                                }}
                              />
                              <div className="avatar-fallback w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold absolute top-0 left-0" style={{display: 'none'}}>
                                {getAuthorInitial(message)}
                              </div>
                            </>
                          ) : (
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                              {getAuthorInitial(message)}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {getAuthorName(message)}
                          </div>
                          <div className="text-sm text-gray-400">
                            {new Date(message.createdAt).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      </div>
                      
                      {/* Bouton de suppression - Auteur ou Admin */}
                      {canDeleteMessage(message) && (
                        <button
                          onClick={() => handleDeleteMessage(message.id)}
                          className="bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 text-red-400 px-3 py-1 rounded text-sm transition-colors flex items-center gap-1"
                          title={isAdmin ? "Supprimer (Admin)" : "Supprimer (Auteur)"}
                        >
                          <FiTrash2 size={12} />
                          Supprimer
                        </button>
                      )}
                    </div>
                    <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {message.text || message.content}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Formulaire de réponse */}
          {isAuthenticated ? (
            <div className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Répondre à cette discussion</h3>
              
              <form onSubmit={handleSubmitMessage}>
                <div className="mb-4">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Écrivez votre réponse..."
                    className="w-full bg-[#1a2332] border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#FDC758] transition-colors resize-none"
                    rows={4}
                    required
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submittingMessage || !newMessage.trim()}
                    className="bg-[#FDC758] text-[#0F1B2A] px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submittingMessage ? 'Envoi en cours...' : 'Publier la réponse'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg p-6 text-center">
              <p className="text-gray-400 mb-4">Connectez-vous pour participer à la discussion</p>
              <Link href="/sign-in" className="bg-[#FDC758] text-[#0F1B2A] px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                Se connecter
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
