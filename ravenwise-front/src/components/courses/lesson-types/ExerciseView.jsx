"use client";

import React, { useState } from 'react';
import { FiCode, FiPlay, FiCheck, FiRotateCcw, FiDownload } from 'react-icons/fi';

const ExerciseView = ({ lesson, onComplete, isCompleted }) => {
  const [userCode, setUserCode] = useState(lesson.startingCode || '');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Simulation d'exécution de code
  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Exécution en cours...');
    
    // Simulation d'un délai d'exécution
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulation de résultat
    setOutput(`Résultat de l'exécution:
<!DOCTYPE html>
<html>
<head>
    <style>
        ${userCode.includes('color') ? 'body { color: blue; }' : ''}
        ${userCode.includes('background') ? 'body { background: lightgray; }' : ''}
    </style>
</head>
<body>
    <h1>Ma première page stylisée</h1>
    <p>Voici un paragraphe d'exemple.</p>
</body>
</html>`);
    
    setIsRunning(false);
  };

  // Réinitialiser le code
  const handleReset = () => {
    setUserCode(lesson.startingCode || '');
    setOutput('');
    setIsSubmitted(false);
  };

  // Soumettre l'exercice
  const handleSubmit = () => {
    setIsSubmitted(true);
    onComplete();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* En-tête */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-900/30 rounded-full mb-4">
          <FiCode size={24} className="text-orange-400" />
        </div>
        <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
        {lesson.description && (
          <p className="text-gray-400 text-lg">{lesson.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Instructions */}
        <div className="bg-[#182b4a] rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FiCode className="mr-2 text-orange-400" />
            Instructions
          </h2>
          
          <div 
            className="prose prose-invert prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: lesson.content || lesson.instructions || '' }}
          />

          {/* Critères de validation */}
          {lesson.validationCriteria && (
            <div className="mt-6 p-4 bg-[#1d325a] rounded-lg">
              <h3 className="font-semibold mb-2 text-[#FDC758]">Critères de validation :</h3>
              <ul className="space-y-1">
                {lesson.validationCriteria.map((criteria, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-[#FDC758] rounded-full mr-2"></div>
                    {criteria}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Éditeur de code */}
        <div className="bg-[#182b4a] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="font-bold">Éditeur de code</h2>
            <div className="flex gap-2">
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="flex items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm disabled:opacity-50"
              >
                <FiPlay size={14} />
                {isRunning ? 'Exécution...' : 'Exécuter'}
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm"
              >
                <FiRotateCcw size={14} />
                Réinitialiser
              </button>
            </div>
          </div>

          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            className="w-full h-80 p-4 bg-[#1a1a1a] text-white font-mono text-sm resize-none focus:outline-none"
            placeholder="Écrivez votre code ici..."
            style={{
              fontFamily: 'Monaco, Menlo, "Ubuntu Mono", consolas, monospace'
            }}
          />
        </div>
      </div>

      {/* Zone de résultat */}
      {output && (
        <div className="mt-6 bg-[#182b4a] rounded-xl p-6">
          <h3 className="font-bold mb-4">Résultat :</h3>
          <pre className="bg-[#1a1a1a] p-4 rounded-lg text-sm overflow-x-auto text-green-400">
            {output}
          </pre>
        </div>
      )}

      {/* Actions finales */}
      <div className="mt-8 bg-[#182b4a] rounded-xl p-6">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">
            {isSubmitted ? (
              <span className="flex items-center text-green-400">
                <FiCheck size={16} className="mr-1" />
                Exercice soumis avec succès
              </span>
            ) : (
              "Testez votre code puis soumettez votre solution"
            )}
          </div>
          
          <div className="flex gap-3">
            {lesson.solutionFile && (
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
                <FiDownload size={16} />
                Télécharger la solution
              </button>
            )}
            
            <button
              onClick={handleSubmit}
              disabled={isCompleted}
              className={`flex items-center gap-2 px-6 py-2 rounded font-medium transition-all ${
                !isCompleted
                  ? 'bg-[#FDC758] text-[#0F1B2A] hover:bg-opacity-90'
                  : 'bg-green-600 text-white cursor-default'
              }`}
            >
              {isCompleted ? (
                <>
                  <FiCheck size={18} />
                  Terminé
                </>
              ) : (
                'Soumettre l\'exercice'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseView;