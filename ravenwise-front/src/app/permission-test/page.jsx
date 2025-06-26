"use client";

import React from 'react';
import { useClerkAuth } from '../../context/clerkContext';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

export default function PermissionTestPage() {
  const { currentUser, isAuthenticated, isAdmin, role } = useClerkAuth();

  // Simulation d'une discussion et d'un message pour tester
  const mockDiscussion = {
    id: "discussion-123",
    author: {
      clerkId: "user-456" // Structure correcte selon l'API réelle
    },
    title: "Discussion de test",
    content: "Contenu de test"
  };

  const mockMessage = {
    id: "message-789",
    author: {
      clerkId: "user-456" // Structure correcte selon l'API réelle
    },
    text: "Message de test"
  };

  // Fonction pour vérifier si l'utilisateur peut supprimer la discussion
  const canDeleteDiscussion = () => {
    const authorId = mockDiscussion?.author?.clerkId || mockDiscussion?.authorId;
    const canDelete = isAuthenticated && currentUser && String(authorId) === String(currentUser.id);
    console.log('[TEST] Can delete discussion?', {
      isAuthenticated,
      hasCurrentUser: !!currentUser,
      discussionAuthorId: authorId,
      discussionAuthorPath: 'discussion.author.clerkId',
      currentUserId: currentUser?.id,
      stringComparison: String(authorId) === String(currentUser?.id),
      finalResult: canDelete
    });
    return canDelete;
  };

  // Fonction pour vérifier si l'utilisateur peut supprimer un message
  const canDeleteMessage = (message) => {
    const authorId = message?.author?.clerkId || message?.authorId;
    const canDelete = isAuthenticated && currentUser && String(authorId) === String(currentUser.id);
    console.log('[TEST] Can delete message?', {
      messageId: message?.id,
      isAuthenticated,
      hasCurrentUser: !!currentUser,
      messageAuthorId: authorId,
      messageAuthorPath: 'message.author.clerkId',
      currentUserId: currentUser?.id,
      stringComparison: String(authorId) === String(currentUser?.id),
      finalResult: canDelete
    });
    return canDelete;
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#0c1524] text-white py-10">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Test des Permissions</h1>
          
          {/* Informations utilisateur */}
          <div className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Informations Utilisateur</h2>
            <div className="space-y-2">
              <p><strong>Authentifié:</strong> {isAuthenticated ? 'Oui' : 'Non'}</p>
              <p><strong>Utilisateur ID:</strong> {currentUser?.id || 'Aucun'}</p>
              <p><strong>Type ID:</strong> {typeof currentUser?.id}</p>
              <p><strong>Rôle:</strong> {role}</p>
              <p><strong>Est Admin:</strong> {isAdmin ? 'Oui' : 'Non'}</p>
              <p><strong>Données complètes:</strong></p>
              <pre className="bg-black/30 p-3 rounded text-sm overflow-auto">
                {JSON.stringify(currentUser, null, 2)}
              </pre>
            </div>
          </div>

          {/* Test de discussion */}
          <div className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Test Discussion</h2>
            <div className="space-y-2 mb-4">
              <p><strong>Discussion ID:</strong> {mockDiscussion.id}</p>
              <p><strong>Author ID (clerkId):</strong> {mockDiscussion.author?.clerkId}</p>
              <p><strong>Type Author ID:</strong> {typeof mockDiscussion.author?.clerkId}</p>
              <p><strong>Peut supprimer:</strong> {canDeleteDiscussion() ? 'Oui' : 'Non'}</p>
            </div>
            
            {canDeleteDiscussion() && (
              <button className="bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 text-red-400 px-4 py-2 rounded-lg transition-colors">
                ✓ Bouton Supprimer Visible
              </button>
            )}
            {!canDeleteDiscussion() && (
              <div className="text-gray-500 italic">Bouton de suppression masqué</div>
            )}
          </div>

          {/* Test de message */}
          <div className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Test Message</h2>
            <div className="space-y-2 mb-4">
              <p><strong>Message ID:</strong> {mockMessage.id}</p>
              <p><strong>Author ID (clerkId):</strong> {mockMessage.author?.clerkId}</p>
              <p><strong>Type Author ID:</strong> {typeof mockMessage.author?.clerkId}</p>
              <p><strong>Peut supprimer:</strong> {canDeleteMessage(mockMessage) ? 'Oui' : 'Non'}</p>
            </div>
            
            {canDeleteMessage(mockMessage) && (
              <button className="bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 text-red-400 px-4 py-2 rounded-lg transition-colors">
                ✓ Bouton Supprimer Visible
              </button>
            )}
            {!canDeleteMessage(mockMessage) && (
              <div className="text-gray-500 italic">Bouton de suppression masqué</div>
            )}
          </div>

          {/* Test avec mes propres IDs */}
          {currentUser && (
            <div className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Test avec mon ID</h2>
              <div className="space-y-2 mb-4">
                <p><strong>Mon ID:</strong> {currentUser.id}</p>
                <p><strong>Discussion avec mon ID:</strong></p>
                {(() => {
                  const myDiscussion = { 
                    ...mockDiscussion, 
                    author: { 
                      clerkId: currentUser.id 
                    } 
                  };
                  const authorId = myDiscussion?.author?.clerkId || myDiscussion?.authorId;
                  const canDelete = isAuthenticated && currentUser && String(authorId) === String(currentUser.id);
                  
                  return (
                    <div className="ml-4 space-y-2">
                      <p>AuthorId: {authorId}</p>
                      <p>Comparaison: {String(authorId)} === {String(currentUser.id)} = {String(authorId) === String(currentUser.id) ? 'true' : 'false'}</p>
                      <p>Peut supprimer: {canDelete ? 'Oui' : 'Non'}</p>
                      {canDelete && (
                        <button className="bg-green-600/20 hover:bg-green-600/30 border border-green-600/50 text-green-400 px-4 py-2 rounded-lg transition-colors">
                          ✓ Bouton Supprimer Visible (Mes contenus)
                        </button>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-blue-600/10 border border-blue-600/50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-400">Instructions de Test</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Connectez-vous avec différents comptes (free, premium, admin)</li>
              <li>Vérifiez que les boutons de suppression n'apparaissent que pour vos propres contenus</li>
              <li>Consultez la console pour voir les logs détaillés</li>
              <li>Testez avec des utilisateurs ayant des IDs différents</li>
            </ol>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
