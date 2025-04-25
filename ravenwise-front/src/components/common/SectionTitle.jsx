/**
 * Composant SectionTitle - Titre standard pour les sections
 * 
 * @param {string} title - Texte du titre
 * @param {string} className - Classes CSS supplémentaires
 */
import React from 'react';

const SectionTitle = ({ title, className = "" }) => {
  return (
    <h3 className={`text-xl font-semibold mb-4 ${className}`}>
      {title}
    </h3>
  );
};

export default SectionTitle;