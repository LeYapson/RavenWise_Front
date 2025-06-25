"use client";
import React, { useState, useEffect } from 'react';
import { userService, courseService } from '../../services/api'; // Importez vos services API
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Card from "../../components/common/Card";
import RoleGuard from "../../components/guards/RoleGuard";

export default function AdminDashboard() {
  // Ajouter un état pour les statistiques
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    // Autres statistiques...
  });
  
  // Charger les statistiques au chargement de la page
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Récupérer les statistiques depuis vos services API
        const usersData = await userService.getAllUsers();
        const coursesData = await courseService.getAllCourses();
        
        // Mettre à jour l'état avec les données récupérées
        setStats({
          totalUsers: usersData?.length || 0,
          totalCourses: coursesData?.length || 0,
          // Autres statistiques à calculer...
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques:", error);
      }
    };
    
    fetchStats();
  }, []);

  // Utiliser directement le garde pour protéger toute la page admin
  return (
    <RoleGuard requiredRole="admin" redirectTo="/dashboard">
      {/* Contenu du dashboard admin */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-white">Tableau de bord Admin</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Cartes statistiques */}
          <StatCard title="Utilisateurs" value={stats.totalUsers} icon="👥" />
          <StatCard title="Cours" value={stats.totalCourses} icon="📚" />
        </div>
        
        {/* Autres contenus du dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activité récente */}
          <div className="lg:col-span-2 bg-[#182b4a] rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 text-white">Activité récente</h2>
            {/* Contenu de l'activité */}
          </div>
          
          {/* Actions rapides */}
          <div className="bg-[#182b4a] rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 text-white">Actions rapides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <ActionButton 
                label="Créer un cours" 
                href="/admin/courses/create" 
                icon="📝"
                color="bg-blue-600"
              />
              <ActionButton 
                label="Gérer les utilisateurs" 
                href="/admin/users" 
                icon="👥"
                color="bg-green-600"
              />
              <ActionButton 
                label="Modérer le forum" 
                href="/admin/forum" 
                icon="💬"
                color="bg-yellow-600"
              />
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}

// Composant pour les cartes de statistiques
function StatCard({ title, value, icon }) {
  
  return (
    <div className="bg-[#182b4a] rounded-xl p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-400">{title}</h3>
          <p className="text-2xl font-bold mt-1 text-white">{value}</p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}

// Composant pour les boutons d'action
function ActionButton({ label, href, icon, color }) {
  return (
    <a 
      href={href} 
      className={`${color} hover:opacity-90 transition-all rounded-lg p-4 flex items-center justify-between`}
    >
      <span className="font-medium text-white">{label}</span>
      <span className="text-xl">{icon}</span>
    </a>
  );
}