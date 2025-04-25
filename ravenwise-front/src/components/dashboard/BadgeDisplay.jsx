/**
 * Composant BadgeDisplay - Affiche une collection de badges
 *
 * @param {Array} badges - Liste des badges à afficher
 */
import React from 'react';

const BadgeDisplay = ({ badges }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {badges.map((badge) => (
        <div 
          key={badge.id} 
          className={`flex flex-col items-center p-3 rounded-lg ${
            badge.unlocked 
              ? 'bg-white/10 text-white' 
              : 'bg-white/5 text-gray-500'
          }`}
        >
          <div className={`text-3xl mb-2 ${!badge.unlocked && 'opacity-50'}`}>
            {badge.icon}
          </div>
          <span className="text-xs text-center">
            {badge.name}
          </span>
          {!badge.unlocked && (
            <span className="text-[10px] mt-1 text-gray-500">Verrouillé</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default BadgeDisplay;