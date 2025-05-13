// src/app/admin/users/page.jsx
"use client";
import React, { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import Card from "../../../components/common/Card";
import SectionTitle from "../../../components/common/SectionTitle";
import DataTable from "../../../components/admin/DataTable";

export default function AdminUsersPage() {
  const { user: currentUser } = useUser();
  const { users } = useClerk();
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Dans une vraie application, vous utiliseriez une API pour récupérer les utilisateurs
        // car useClerk().users n'est pas disponible côté client
        // Ceci est une simulation:
        const mockUsers = [
          { id: "1", firstName: "Sophie", lastName: "Martin", email: "sophie@example.com", role: "user", createdAt: "2023-01-15" },
          { id: "2", firstName: "Thomas", lastName: "Dubois", email: "thomas@example.com", role: "instructor", createdAt: "2023-02-22" },
          { id: "3", firstName: "Emma", lastName: "Lefebvre", email: "emma@example.com", role: "admin", createdAt: "2022-11-05" },
        ];
        
        setAllUsers(mockUsers);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  const handleSetRole = async (userId, role) => {
    try {
      const response = await fetch("/api/users/set-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId: userId, role }),
      });
      
      if (response.ok) {
        // Mettre à jour l'état local pour refléter le changement
        setAllUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === userId ? { ...user, role } : user
          )
        );
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du rôle:", error);
    }
  };
  
  const columns = [
    { key: 'firstName', label: 'Prénom' },
    { key: 'lastName', label: 'Nom' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Rôle' },
    { key: 'createdAt', label: 'Inscription' },
  ];
  
  const actions = [
    { 
      label: 'Définir Admin', 
      handler: user => handleSetRole(user.id, "admin"),
      shouldShow: user => user.role !== "admin"
    },
    { 
      label: 'Définir Instructeur', 
      handler: user => handleSetRole(user.id, "instructor"),
      shouldShow: user => user.role !== "instructor"
    },
    { 
      label: 'Définir Utilisateur', 
      handler: user => handleSetRole(user.id, "user"),
      shouldShow: user => user.role !== "user" 
    },
  ];
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gestion des Utilisateurs</h1>
      
      <Card>
        <SectionTitle title="Liste des utilisateurs" />
        
        {loading ? (
          <div className="text-center py-8">Chargement des utilisateurs...</div>
        ) : (
          <DataTable 
            data={allUsers} 
            columns={columns} 
            actions={actions}
          />
        )}
      </Card>
    </div>
  );
}