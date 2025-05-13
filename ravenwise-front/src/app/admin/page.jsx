"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import AdminLayout from "../../components/admin/AdminLayout";
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
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Tableau de bord administrateur</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Utilisateurs totaux" value={stats.totalUsers} icon="👥" />
          <StatCard title="Utilisateurs actifs" value={stats.activeUsers} icon="👤" />
          <StatCard title="Cours disponibles" value={stats.totalCourses} icon="📚" />
          <StatCard title="Cours complétés" value={stats.completedCourses} icon="🎓" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Actions rapides">
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
          </Card>
          
          <Card title="Activité récente">
            <div className="space-y-4 mt-4">
              {[
                { user: "Sophie Martin", action: "a complété le cours HTML & CSS", time: "Il y a 2 heures" },
                { user: "Thomas Dupont", action: "s'est inscrit à 3 nouveaux cours", time: "Il y a 5 heures" },
                { user: "Emma Lefebvre", action: "a publié une nouvelle discussion", time: "Hier" },
                { user: "Lucas Bernard", action: "a signalé un problème dans un quiz", time: "Il y a 2 jours" },
              ].map((activity, index) => (
                <div key={index} className="bg-[#1D2D40] p-3 rounded-md flex justify-between items-center">
                  <div>
                    <span className="font-medium text-[#FDC758]">{activity.user}</span>
                    <span className="text-gray-300"> {activity.action}</span>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}

// Composant pour les cartes de statistiques
function StatCard({ title, value, icon }) {
  return (
    <div className="bg-[#182b4a] rounded-lg p-4 border border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-400 text-sm">{title}</h3>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
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