// src/app/admin/users/page.jsx
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '../../../components/common/Card';
import { userService } from '../../../services/api';
import { FiTrash2, FiUserCheck, FiUserX, FiShield } from 'react-icons/fi';

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  
  // Récupérer les utilisateurs depuis l'API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersData = await userService.getAllUsers();
        setUsers(usersData);
        setError("");
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
        setError("Impossible de charger les utilisateurs. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  // Fonction pour changer le rôle d'un utilisateur
  const handleRoleChange = async (user, role) => {
    try {
      // Mettre à jour le rôle dans notre base de données
      await userService.updateUserRole(user.clerkId, role);
      
      // Mettre à jour l'état local
      setUsers(users.map(u => 
        u.clerkId === user.clerkId ? { ...u, role } : u
      ));
      
      // Notification de succès
      alert(`Le rôle de l'utilisateur a été changé en ${role}`);
    } catch (error) {
      console.error("Erreur lors de la modification du rôle:", error);
      alert(`Impossible de modifier le rôle: ${error.message}`);
    }
  };

  // Fonction pour supprimer un utilisateur
  const handleDeleteUser = async (clerkId) => {
    setConfirmDelete(clerkId);
  };

  // Confirmer la suppression
  const confirmDeleteUser = async () => {
    if (!confirmDelete) return;
    
    try {
      // Utiliser clerkId pour la suppression
      await userService.deleteUser(confirmDelete);
      
      // Mettre à jour l'état local
      setUsers(users.filter(user => user.clerkId !== confirmDelete));
      
      alert("L'utilisateur a été supprimé avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert(`Impossible de supprimer l'utilisateur: ${error.message}`);
    } finally {
      setConfirmDelete(null);
    }
  };

  // Annuler la suppression
  const cancelDeleteUser = () => {
    setConfirmDelete(null);
  };

  return (
    <div className="users-admin p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Gestion des Utilisateurs</h1>
      
      {error && (
        <div className="bg-red-900/30 text-red-300 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <Card className="bg-[#182b4a] overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FDC758]"></div>
          </div>
        ) : users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-[#253A52]">
                <tr>
                  <th className="text-left p-4">ID</th>
                  <th className="text-left p-4">Nom</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">Rôle</th>
                  <th className="text-left p-4">Date d'inscription</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-[#253A52]">
                    <td className="p-4">{user.id}</td>
                    <td className="p-4">{`${user.firstName || ''} ${user.lastName || ''}`}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.role === 'admin'
                            ? "bg-purple-900/30 text-purple-400"
                            : user.role === 'premium'
                            ? "bg-green-900/30 text-green-400"
                            : "bg-blue-900/30 text-blue-400"
                        }`}
                      >
                        {user.role || "free"}
                      </span>
                    </td>
                    <td className="p-4">
                      {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        {/* Boutons de changement de rôle */}
                        <button
                          onClick={() => handleRoleChange(user, 'free')}
                          disabled={user.role === 'free'}
                          className={`p-2 rounded ${
                            user.role === 'free'
                              ? "bg-[#253A52]/50 text-gray-500 cursor-not-allowed"
                              : "bg-blue-900/30 text-blue-400 hover:bg-blue-900/50"
                          }`}
                          title="Définir comme utilisateur gratuit"
                        >
                          <FiUserCheck />
                        </button>
                        <button
                          onClick={() => handleRoleChange(user, 'premium')}
                          disabled={user.role === 'premium'}
                          className={`p-2 rounded ${
                            user.role === 'premium'
                              ? "bg-[#253A52]/50 text-gray-500 cursor-not-allowed"
                              : "bg-green-900/30 text-green-400 hover:bg-green-900/50"
                          }`}
                          title="Définir comme utilisateur premium"
                        >
                          <FiUserX />
                        </button>
                        <button
                          onClick={() => handleRoleChange(user, 'admin')}
                          disabled={user.role === 'admin'}
                          className={`p-2 rounded ${
                            user.role === 'admin'
                              ? "bg-[#253A52]/50 text-gray-500 cursor-not-allowed"
                              : "bg-purple-900/30 text-purple-400 hover:bg-purple-900/50"
                          }`}
                          title="Définir comme administrateur"
                        >
                          <FiShield />
                        </button>
                        
                        {/* Bouton de suppression */}
                        <button
                          onClick={() => handleDeleteUser(user.clerkId)}
                          className="p-2 bg-red-900/30 text-red-400 rounded hover:bg-red-900/50 transition"
                          title="Supprimer"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">Aucun utilisateur trouvé</p>
          </div>
        )}
      </Card>

      {/* Modal de confirmation de suppression */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#182b4a] rounded-xl p-6 max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4 text-white">Confirmer la suppression</h3>
            <p className="text-gray-300 mb-6">
              Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDeleteUser}
                className="px-4 py-2 bg-[#253A52] hover:bg-[#304d6d] text-white rounded transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={confirmDeleteUser}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}