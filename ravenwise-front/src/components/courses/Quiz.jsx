"use client";
import React, { useState } from 'react';

export default function Quiz({ questions = [] }) {
  if (!Array.isArray(questions) || questions.length === 0) {
    return <div>Aucune question disponible pour ce quiz</div>;
  }
  
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  
  const handleAnswerSelect = (questionId, optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIndex
    });
  };
  
  const handleSubmit = () => {
    setShowResults(true);
  };
  
  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };
  
  const score = calculateScore();
  const allAnswered = questions.every(q => selectedAnswers[q.id] !== undefined);
  
  return (
    <div className="space-y-8">
      {showResults ? (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Résultats</h3>
            <p className="text-xl">
              Votre score: <span className="text-[#FDC758] font-bold">{score}/{questions.length}</span>
            </p>
          </div>
          
          {questions.map(q => {
            const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
            
            return (
              <div 
                key={q.id} 
                className={`p-4 rounded-lg ${
                  isCorrect ? 'bg-green-900/20 border border-green-700' : 'bg-red-900/20 border border-red-700'
                }`}
              >
                <p className="font-medium mb-3">{q?.question || "Question non disponible"}</p>
                <div className="space-y-2">
                  {q.options?.map((option, idx) => (
                    <div 
                      key={idx}
                      className={`p-3 rounded-md ${
                        selectedAnswers[q.id] === idx
                          ? idx === q.correctAnswer
                            ? 'bg-green-700/50'
                            : 'bg-red-700/50'
                          : idx === q.correctAnswer
                            ? 'bg-green-700/50'
                            : 'bg-[#1D2D40]'
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-8">
          {questions.map(q => (
            <div key={q.id} className="mb-6">
              <p className="font-medium mb-3">{q?.question || "Question non disponible"}</p>
              <div className="space-y-2">
                {q.options?.map((option, idx) => (
                  <div 
                    key={idx}
                    className={`p-3 rounded-md cursor-pointer ${
                      selectedAnswers[q.id] === idx
                        ? 'bg-[#FDC758] text-[#0F1B2A]'
                        : 'bg-[#1D2D40] hover:bg-[#263c58]'
                    }`}
                    onClick={() => handleAnswerSelect(q.id, idx)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`w-full py-3 rounded-md font-bold ${
              allAnswered
                ? 'bg-[#FDC758] text-[#0F1B2A] hover:bg-opacity-90'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            Vérifier mes réponses
          </button>
        </div>
      )}
    </div>
  );
}