/**
 * Composant StatsGrid - Affiche une grille de statistiques utilisateur
 *
 * @param {object} stats - Objet contenant les différentes statistiques à afficher
 */
import React from 'react';

const StatsGrid = ({ stats }) => {
  // Configuration des statistiques avec leurs icônes et libellés
  const statsConfig = [
    { key: 'coursesCompleted', icon: '📚', label: 'Cours terminés' },
    { key: 'quizzesTaken', icon: '❓', label: 'Quiz complétés' },
    { key: 'practiceHours', icon: '⏱️', label: 'Heures de pratique' },
    { key: 'streak', icon: '🔥', label: 'Jours consécutifs' }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {statsConfig.map((item) => (
        <div key={item.key} className="bg-white/5 rounded-lg p-3 flex flex-col items-center">
          <div className="text-xl mb-1">{item.icon}</div>
          <div className="text-2xl font-bold">{stats[item.key]}</div>
          <div className="text-xs text-gray-400">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;