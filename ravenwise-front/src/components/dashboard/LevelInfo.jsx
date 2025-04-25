/**
 * Composant LevelInfo - Affiche les informations de niveau et XP
 * 
 * @param {number} level - Niveau actuel
 * @param {number} xpCurrent - XP actuel
 * @param {number} xpToNextLevel - XP requis pour le prochain niveau
 */
import React from 'react';
import ProgressBar from '../common/ProgressBar';

const LevelInfo = ({ level, xpCurrent, xpToNextLevel }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">Niveau {level}</div>
        <div className="text-lg">{xpCurrent}/{xpToNextLevel} XP</div>
      </div>
      <ProgressBar 
        current={xpCurrent} 
        total={xpToNextLevel} 
        height="8px" 
        className="mt-2" 
      />
    </div>
  );
};

export default LevelInfo;