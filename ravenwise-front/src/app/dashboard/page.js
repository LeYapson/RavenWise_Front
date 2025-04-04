// app/dashboard/page.js
import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const DashboardPage = () => {
  // Données simulées
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
              <div className="bg-[#182b4a] p-6 rounded-lg shadow-lg mb-6">
                <h3 className="text-xl font-semibold mb-4">Recommandé pour vous</h3>
                <div className="flex flex-col gap-4">
                  {userData.recommendations.map((item, index) => (
                    <a key={index} href="/courses/1" className="flex items-center gap-4 p-4 border-b border-white/30 last:border-b-0 hover:bg-white/10 transition-colors">
                      <div className="w-10 h-10 flex items-center justify-center text-lg bg-white/20 rounded-lg text-white">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-white/80">{item.type} • {item.level}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Activity Feed */}
              <div className="bg-[#182b4a] p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Activité Récente</h3>
                <div className="flex flex-col gap-4">
                  {userData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 pb-4 border-b border-white/30 last:border-b-0">
                      <div className="w-9 h-9 flex items-center justify-center text-lg bg-white/20 rounded-full text-white">
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{activity.text}</p>
                        <p className="text-white/80">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Side Section */}
            <div className="col-span-12 md:col-span-4">
              {/* Level Info */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">Niveau {userData.level}</div>
                  <div className="text-lg">{userData.xpCurrent}/{userData.xpToNextLevel} XP</div>
                </div>
                <div className="w-full bg-white/20 h-2 rounded-full mt-2">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                    style={{ width: `${(userData.xpCurrent / userData.xpToNextLevel) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Progress Card */}
              <div className="bg-white/10 p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold mb-4">Ma Progression</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {Object.entries(userData.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                        {value}
                      </p>
                      <p className="text-white/80">{key.charAt(0).toUpperCase() + key.slice(1).replace('Completed', ' complétés').replace('Taken', ' réussis')}</p>
                    </div>
                  ))}
                </div>

                <h4 className="text-lg font-semibold mb-4">Compétences</h4>
                {userData.skills.map((skill, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-white/80">{skill.name}</span>
                      <span className="text-white/80">{skill.progress}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                        style={{ width: `${skill.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Achievements Section */}
              <div className="bg-white/10 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Badges & Réalisations</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {userData.badges.map((badge) => (
                    <div key={badge.id} className="text-center p-4 rounded-lg shadow-md">
                      <div
                        className={`w-16 h-16 flex items-center justify-center text-2xl font-bold rounded-full mb-2 ${badge.unlocked ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'bg-white/20 text-white/80'}`}
                      >
                        {badge.icon}
                      </div>
                      <p className={badge.unlocked ? 'text-white' : 'text-white/80'}>{badge.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashboardPage;
