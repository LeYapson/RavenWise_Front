/**
 * Composant RecommendationCard - Affiche une recommandation personnalisée
 * 
 * @param {object} recommendation - Données de la recommandation
 */
import React from 'react';
import Link from 'next/link';

const RecommendationCard = ({ recommendation }) => {
  return (
    <Link 
      href={`/${recommendation.type.toLowerCase()}s/${recommendation.id}`} 
      className="flex items-center gap-4 p-4 border-b border-white/30 last:border-b-0 hover:bg-white/10 transition-colors"
    >
      <div className="w-10 h-10 flex items-center justify-center text-lg bg-white/20 rounded-lg text-white">
        {recommendation.icon}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold">{recommendation.title}</h4>
        <p className="text-white/80">{recommendation.type} • {recommendation.level}</p>
      </div>
    </Link>
  );
};

export default RecommendationCard;