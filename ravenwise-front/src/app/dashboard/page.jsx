"use client";
import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Card from '../../components/common/Card';
import SectionTitle from '../../components/common/SectionTitle';
import LevelInfo from '../../components/dashboard/LevelInfo';
import RecommendationCard from '../../components/dashboard/RecommendationCard';
import ActivityItem from '../../components/dashboard/ActivityItem';
import SkillProgress from '../../components/dashboard/SkillProgress';
import BadgeDisplay from '../../components/dashboard/BadgeDisplay';
import StatsGrid from '../../components/dashboard/StatsGrid';

/**
 * DashboardPage - Page principale du tableau de bord utilisateur
 * Regroupe les informations sur la progression, les recommandations et l'activité récente
 */
const DashboardPage = () => {
  // Données simulées (à remplacer par des appels à l'API/Firebase)
  const userData = {
    name: "Alex",
    level: 12,
    xpCurrent: 2450,
    xpToNextLevel: 3000,
    stats: {
      coursesCompleted: 8,
      quizzesTaken: 23,
      practiceHours: 42,
      streak: 7
    },
    skills: [
      { name: "JavaScript", progress: 78 },
      { name: "React", progress: 62 },
      { name: "CSS/SCSS", progress: 85 },
      { name: "Node.js", progress: 45 }
    ],
    badges: [
      { id: 1, name: "Débutant", icon: "🌱", unlocked: true },
      { id: 2, name: "Explorateur", icon: "🧭", unlocked: true },
      { id: 3, name: "Codeur Matinal", icon: "🌅", unlocked: true },
      { id: 4, name: "Curieux", icon: "🔍", unlocked: true },
      { id: 5, name: "Marathonien", icon: "🏃", unlocked: false },
      { id: 6, name: "Mentor", icon: "🧠", unlocked: false }
    ],
    recommendations: [
      { id: 1, title: "Advanced React Patterns", type: "Cours", icon: "📚", level: "Intermédiaire" },
      { id: 2, title: "JavaScript Async Mastery", type: "Quiz", icon: "❓", level: "Avancé" },
      { id: 3, title: "CSS Grid & Flexbox", type: "Tutoriel", icon: "📝", level: "Débutant" },
    ],
    recentActivity: [
      { id: 1, text: "Quiz complété : Fondamentaux JavaScript", icon: "🏆", time: "Il y a 2 heures" },
      { id: 2, text: "Obtenu le badge 'Explorateur'", icon: "🎖️", time: "Il y a 1 jour" },
      { id: 3, text: "Terminé le cours React Hooks", icon: "✅", time: "Il y a 3 jours" },
      { id: 4, text: "Nouvelle série de 5 jours consécutifs!", icon: "🔥", time: "Il y a 4 jours" }
    ]
  };

  return (
    <>
      <Header />
      <div className="bg-[#0c1524] text-white min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6">
            {/* Main Section */}
            <div className="col-span-12 md:col-span-8">
              {/* Recommendations Card */}
              <Card className="mb-6">
                <SectionTitle title="Recommandé pour vous" />
                <div className="flex flex-col gap-4">
                  {userData.recommendations.map((item, index) => (
                    <RecommendationCard key={index} recommendation={item} />
                  ))}
                </div>
              </Card>

              {/* Activity Feed */}
              <Card>
                <SectionTitle title="Activité Récente" />
                <div className="flex flex-col gap-4">
                  {userData.recentActivity.map((activity, index) => (
                    <ActivityItem key={index} activity={activity} />
                  ))}
                </div>
              </Card>
            </div>

            {/* Side Section */}
            <div className="col-span-12 md:col-span-4">
              {/* Level Info */}
              <LevelInfo 
                level={userData.level} 
                xpCurrent={userData.xpCurrent} 
                xpToNextLevel={userData.xpToNextLevel} 
              />

              {/* Progress Card */}
              <Card className="mb-6" bgColor="rgba(255, 255, 255, 0.1)">
                <SectionTitle title="Ma Progression" />
                <StatsGrid stats={userData.stats} />

                <h4 className="text-lg font-semibold mb-4">Compétences</h4>
                {userData.skills.map((skill, index) => (
                  <SkillProgress key={index} skill={skill} />
                ))}
              </Card>

              {/* Achievements Section */}
              <Card bgColor="rgba(255, 255, 255, 0.1)">
                <SectionTitle title="Badges & Réalisations" />
                <BadgeDisplay badges={userData.badges} />
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashboardPage;