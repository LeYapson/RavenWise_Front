"use client";

import { useState, useEffect } from "react";
import { useClerkAuth } from "../../context/clerkContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FiSettings, FiEdit, FiShare2, FiBarChart, FiAward, FiBookOpen, FiClock, FiCalendar, FiMail, FiUser } from "react-icons/fi";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ProgressBar from "@/components/common/ProgressBar";
import { useUser } from "@clerk/nextjs";

export default function ProfilePage() {
  // Ajouter des logs de débogage
  const { currentUser, loading, isAdmin } = useClerkAuth();
  console.log("Page profil - currentUser:", currentUser);
  console.log("Page profil - isAdmin:", isAdmin);

  const { user: clerkUser, isLoaded: clerkIsLoaded } = useUser();
  const router = useRouter();

  // État des stats utilisateur (à remplacer par des API calls)
  const [userStats, setUserStats] = useState({
    coursesCompleted: 8,
    coursesInProgress: 3,
    quizzesPassed: 42,
    totalXP: 1570,
    level: 12,
    xpToNextLevel: 500,
    currentXP: 320,
    streak: 14,
    totalHours: 68,
    longestStreak: 21
  });

  // État des badges
  const [badges, setBadges] = useState([
    { id: 1, name: "Premier pas", icon: "🏆", description: "Terminer votre premier cours", earned: true, date: "12/03/2023" },
    { id: 2, name: "Explorateur", icon: "🧭", description: "Suivre des cours dans 3 catégories différentes", earned: true, date: "23/04/2023" },
    { id: 3, name: "Persévérant", icon: "⏱️", description: "Maintenir un streak de 7 jours", earned: true, date: "15/05/2023" },
    { id: 4, name: "Expert Quiz", icon: "🧠", description: "Obtenir un score parfait sur 5 quiz", earned: true, date: "02/06/2023" },
    { id: 5, name: "Codeur Débutant", icon: "💻", description: "Compléter le parcours initiation au code", earned: false },
    { id: 6, name: "Super Contributeur", icon: "🌟", description: "Aider 10 autres membres sur le forum", earned: false }
  ]);
  
  // État pour forcer l'affichage après un certain temps
  const [forceDisplay, setForceDisplay] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading && clerkIsLoaded) {
        console.log("Affichage forcé après le timeout");
        setForceDisplay(true);
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [loading, clerkIsLoaded]);

  // Formater la date d'inscription à partir de l'objet Clerk
  const formatInscriptionDate = (createdAt) => {
    if (!createdAt) return "Date inconnue";
    
    const date = new Date(createdAt);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  };

  // Si en chargement et Clerk n'est pas chargé, afficher le loader
  if ((loading && !clerkIsLoaded && !forceDisplay) || (!clerkUser && !forceDisplay)) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#0c1524] flex flex-col items-center justify-center p-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FDC758] mb-4"></div>
          <div className="text-white text-lg">Chargement du profil...</div>
        </div>
        <Footer />
      </>
    );
  }
  
  // Une fois Clerk chargé, on peut utiliser ses données
  const inscriptionDate = clerkUser ? formatInscriptionDate(clerkUser.createdAt) : "Date inconnue";
  //const isAdmin = clerkUser?.publicMetadata?.role === 'admin';

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0c1524] text-white pb-12">
        {/* Bannière de profil */}
        <div className="bg-[#182b4a] py-8 shadow-lg">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#FDC758] shadow-lg">
                  {clerkUser?.imageUrl ? (
                    <Image
                      src={clerkUser.imageUrl}
                      alt="Photo de profil"
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-[#253A52] flex items-center justify-center text-3xl font-bold">
                      {clerkUser?.firstName?.charAt(0) || "?"}
                    </div>
                  )}
                </div>
                {isAdmin && (
                  <div className="absolute bottom-0 right-0 bg-[#FDC758] text-[#0c1524] px-2 py-1 rounded-full text-xs font-bold shadow-md">
                    Admin
                  </div>
                )}
              </div>

              {/* Informations utilisateur */}
              <div className="flex-grow text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">
                  {clerkUser?.fullName || "Utilisateur"}
                </h1>
                <p className="text-gray-400 mb-1">
                  <span className="inline-flex items-center gap-1">
                    <FiMail className="opacity-70" />
                    {clerkUser?.primaryEmailAddress?.emailAddress || "Email non disponible"}
                  </span>
                </p>
                <p className="text-gray-400 mb-3">
                  <span className="inline-flex items-center gap-1">
                    <FiCalendar className="opacity-70" />
                    Membre depuis {inscriptionDate}
                  </span>
                </p>
                <p className="text-[#FDC758] mb-4 font-medium">
                  Niveau {userStats.level} • {userStats.totalXP} XP
                </p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                  <Link href="/profil/settings">
                    <button className="flex items-center gap-2 bg-[#253A52] hover:bg-[#304d6d] px-4 py-2 rounded-lg transition-colors">
                      <FiEdit size={18} />
                      <span>Modifier le profil</span>
                    </button>
                  </Link>
                </div>
              </div>
              
              {/* Statistiques clés */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 md:mt-0 bg-[#253A52] p-4 rounded-lg shadow-md">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-[#FDC758]">{userStats.coursesCompleted}</span>
                  <span className="text-sm text-gray-300">Cours terminés</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-[#FDC758]">{userStats.quizzesPassed}</span>
                  <span className="text-sm text-gray-300">Quiz réussis</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-[#FDC758]">{userStats.streak}</span>
                  <span className="text-sm text-gray-300">Jours consécutifs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="container mx-auto px-4 md:px-8 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne de gauche */}
            <div className="lg:col-span-2">
              {/* Progression niveau */}
              <div className="bg-[#182b4a] rounded-lg p-6 mb-8 shadow-md">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FiBarChart className="text-[#FDC758]" />
                  Progression du niveau
                </h2>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span>Niveau {userStats.level}</span>
                    <span>Niveau {userStats.level + 1}</span>
                  </div>
                  <ProgressBar 
                    progress={(userStats.currentXP / userStats.xpToNextLevel) * 100} 
                    colorClass="bg-gradient-to-r from-[#FDC758] to-[#F19A3E]" 
                  />
                  <div className="text-right text-sm mt-1 text-gray-400">
                    {userStats.currentXP}/{userStats.xpToNextLevel} XP
                  </div>
                </div>
              </div>
              
              {/* Cours en cours */}
              <div className="bg-[#182b4a] rounded-lg p-6 mb-8 shadow-md">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FiBookOpen className="text-[#FDC758]" />
                  Cours en cours ({userStats.coursesInProgress})
                </h2>
                
                {userStats.coursesInProgress > 0 ? (
                  <div className="space-y-4">
                    <div className="bg-[#253A52] p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Fondamentaux de JavaScript</h3>
                        <span className="text-xs bg-[#304d6d] px-2 py-1 rounded">65% terminé</span>
                      </div>
                      <ProgressBar progress={65} colorClass="bg-green-500" />
                      <Link href="/courses/js-fundamentals">
                        <button className="mt-3 text-sm text-[#FDC758] hover:underline">
                          Continuer le cours
                        </button>
                      </Link>
                    </div>
                    
                    <div className="bg-[#253A52] p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Introduction à React</h3>
                        <span className="text-xs bg-[#304d6d] px-2 py-1 rounded">30% terminé</span>
                      </div>
                      <ProgressBar progress={30} colorClass="bg-blue-500" />
                      <Link href="/courses/intro-react">
                        <button className="mt-3 text-sm text-[#FDC758] hover:underline">
                          Continuer le cours
                        </button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-400">
                    <p>Aucun cours en cours.</p>
                    <Link href="/courses">
                      <button className="mt-4 px-4 py-2 bg-[#253A52] hover:bg-[#304d6d] rounded-lg transition-colors">
                        Découvrir les cours
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            
            {/* Colonne de droite */}
            <div>
              {/* Badges et récompenses */}
              <div className="bg-[#182b4a] rounded-lg p-6 mb-8 shadow-md">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FiAward className="text-[#FDC758]" />
                  Badges ({badges.filter(b => b.earned).length}/{badges.length})
                </h2>
                
                <div className="grid grid-cols-2 gap-3">
                  {badges.map(badge => (
                    <div 
                      key={badge.id} 
                      className={`p-3 rounded-lg ${badge.earned ? 'bg-[#253A52]' : 'bg-[#1d2c44] opacity-60'} text-center`}
                      title={badge.earned ? `Obtenu le ${badge.date}` : "Badge non obtenu"}
                    >
                      <div className="text-2xl mb-1">{badge.icon}</div>
                      <h3 className="font-medium text-sm mb-1">{badge.name}</h3>
                      <p className="text-xs text-gray-400">{badge.description}</p>
                      {badge.earned && (
                        <div className="mt-2 text-xs text-[#FDC758]">{badge.date}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Statistiques */}
              <div className="bg-[#182b4a] rounded-lg p-6 shadow-md">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FiClock className="text-[#FDC758]" />
                  Statistiques
                </h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Temps total d'apprentissage</span>
                    <span className="font-medium">{userStats.totalHours} heures</span>
                  </div>
                  <div className="w-full h-px bg-[#253A52]"></div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Streak actuel</span>
                    <span className="font-medium">{userStats.streak} jours</span>
                  </div>
                  <div className="w-full h-px bg-[#253A52]"></div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Streak le plus long</span>
                    <span className="font-medium">{userStats.longestStreak} jours</span>
                  </div>
                  <div className="w-full h-px bg-[#253A52]"></div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">XP totale</span>
                    <span className="font-medium">{userStats.totalXP} points</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}