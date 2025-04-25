/**
 * Composant SkillProgress - Affiche la progression d'une compétence
 * 
 * @param {object} skill - Données de la compétence
 */
import React from 'react';
import ProgressBar from '../common/ProgressBar';

const SkillProgress = ({ skill }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-white/80">{skill.name}</span>
        <span className="text-white/80">{skill.progress}%</span>
      </div>
      <ProgressBar 
        current={skill.progress} 
        total={100} 
        height="8px" 
      />
    </div>
  );
};

export default SkillProgress;