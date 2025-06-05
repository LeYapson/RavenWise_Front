"use client";

import { useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TestAuth() {
  const { getToken, userId, isSignedIn } = useAuth();
  const [userData, setUserData] = useState(null);

  const testAuthenticatedApi = async () => {
    try {
      // Obtenir un token JWT depuis Clerk
      const token = await getToken();
      
      // Faire une requête authentifiée
      const response = await axios.post(
        'http://localhost:3000/api/courses',
        {
          title: 'Cours test authentifié',
          description: 'Test avec authentification',
          category: 'web-dev',
          difficulty: 'beginner'
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setUserData(response.data);
      alert('Requête authentifiée réussie!');
    } catch (error) {
      console.error('Erreur d\'authentification:', error);
      alert('Erreur: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Test d'authentification</h1>
      
      <div className="p-4 mb-4 border rounded">
        <h2 className="text-xl mb-2">État de connexion</h2>
        <p>{isSignedIn ? 'Connecté' : 'Non connecté'}</p>
        <p>ID utilisateur: {userId || 'Aucun'}</p>
      </div>
      
      <button 
        onClick={testAuthenticatedApi}
        disabled={!isSignedIn}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        Tester l'API authentifiée
      </button>
      
      {userData && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-xl mb-2">Réponse du serveur</h2>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}