"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
// Supprimez cette import qui n'est plus nécessaire
// import AdminLayout from "../../components/admin/AdminLayout";
import Card from "../../components/common/Card";

export default function AdminDashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    activeUsers: 0,
    completedCourses: 0
  });
  const [loading, setLoading] = useState(true);

  // Vérifier si l'utilisateur est administrateur
  useEffect(() => {
    if (isLoaded) {
      const isAdmin = user?.publicMetadata?.role === 'admin';
      if (!isAdmin) {
        router.push('/dashboard');
      } else {
        // Charger les statistiques (simulé ici)
        setTimeout(() => {
          setStats({
            totalUsers: 152,
            totalCourses: 24,
            activeUsers: 87,
            completedCourses: 435
          });
          setLoading(false);
        }, 1000);
      }
    }
  }, [isLoaded, user, router]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-[#0c1524] text-white">Chargement...</div>;
  }

  return (
    // Supprimez le <AdminLayout> ici
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Cartes statistiques */}
        <StatCard title="Utilisateurs" value={stats.totalUsers} icon="👥" trend="+12%" />
        <StatCard title="Cours" value={stats.totalCourses} icon="📚" trend="+3%" />
        <StatCard title="Revenus" value="8,350€" icon="💰" trend="+8%" />
        <StatCard title="Taux d'engagement" value="67%" icon="📈" trend="+5%" />
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
            <ActionButton 
              label="Gérer les quiz" 
              href="/admin/quiz" 
              icon="❓"
              color="bg-purple-600"
            />
          </div>
        </div>
      </div>
    </div>
    // Supprimez la fermeture de </AdminLayout>
  );
}

// Composant pour les cartes de statistiques
function StatCard({ title, value, icon, trend }) {
  const isPositive = trend.startsWith('+');
  
  return (
    <div className="bg-[#182b4a] rounded-xl p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-400">{title}</h3>
          <p className="text-2xl font-bold mt-1 text-white">{value}</p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className={`mt-4 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {trend} depuis le mois dernier
      </p>
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