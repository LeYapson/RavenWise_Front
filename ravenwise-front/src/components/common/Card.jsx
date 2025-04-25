/**
 * Composant Card - Une carte réutilisable pour différentes sections du site
 * 
 * @param {string} className - Classes CSS supplémentaires
 * @param {ReactNode} children - Contenu de la carte
 * @param {string} bgColor - Couleur de fond (par défaut: #182b4a)
 */
import React from 'react';

const Card = ({ className, children, bgColor = "#182b4a" }) => {
  return (
    <div 
      className={`p-6 rounded-lg shadow-lg ${className}`} 
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </div>
  );
};

export default Card;