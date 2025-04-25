/**
 * Composant ActivityItem - Affiche un élément d'activité récente
 * 
 * @param {object} activity - Données de l'activité
 */
import React from 'react';

const ActivityItem = ({ activity }) => {
  return (
    <div className="flex items-center gap-4 pb-4 border-b border-white/30 last:border-b-0">
      <div className="w-9 h-9 flex items-center justify-center text-lg bg-white/20 rounded-full text-white">
        {activity.icon}
      </div>
      <div className="flex-1">
        <p className="font-semibold">{activity.text}</p>
        <p className="text-white/80">{activity.time}</p>
      </div>
    </div>
  );
};

export default ActivityItem;