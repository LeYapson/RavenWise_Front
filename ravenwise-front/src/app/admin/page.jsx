"use client";
import React, { useState, useEffect } from 'react';
import { userService, courseService } from '../../services/api'; // Importez vos services API
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Card from "../../components/common/Card";

export default function AdminDashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  // État pour stocker les vraies statistiques
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalRevenue: 0,
    completionRate: 0
  });
  const [loading, setLoading] = useState(true);

  // Vérifier si l'utilisateur est administrateur
  useEffect(() => {
    if (isLoaded) {
      const isAdmin = user?.publicMetadata?.role === 'admin';
      if (!isAdmin) {
        router.push('/dashboard');
      } else {
        // Charger les statistiques réelles
        fetchStats();
      }
    }
  }, [isLoaded, user, router]);

  // Récupérer les vraies données à partir de l'API
  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Récupérer le nombre réel d'utilisateurs
      const users = await userService.getAllUsers();
      const totalUsers = users.length;
      
      // Récupérer le nombre réel de cours
      const courses = await courseService.getAllCourses();
      const totalCourses = courses.length;
      
      // Autres statistiques - à adapter selon vos endpoints disponibles
      // Si vous n'avez pas d'API pour les revenus, utilisez 0 ou supprimez cette section
      
      setStats({
        totalUsers,
        totalCourses,
        // Utilisez des valeurs par défaut pour les données non disponibles
        totalRevenue: 0, // ou supprimez si non applicable
        completionRate: 0 // ou calculez à partir des données disponibles
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques:", error);
    } finally {
      setLoading(false);
    }
  };

  // Rendu du composant avec les vraies données
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-[#0c1524] text-white">Chargement...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Cartes statistiques */}
        <StatCard title="Utilisateurs" value={stats.totalUsers} icon="👥" trend="+12%" />
        <StatCard title="Cours" value={stats.totalCourses} icon="📚" trend="+3%" />
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