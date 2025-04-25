/**
 * Composant ProgressBar - Barre de progression réutilisable
 * 
 * @param {number} current - Valeur actuelle
 * @param {number} total - Valeur totale (max)
 * @param {string} height - Hauteur de la barre (par défaut: 2px)
 * @param {string} className - Classes CSS supplémentaires
 */
import React from 'react';

const ProgressBar = ({ current, total, height = "2px", className = "" }) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className={`w-full bg-white/20 rounded-full ${className}`} style={{ height }}>
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;