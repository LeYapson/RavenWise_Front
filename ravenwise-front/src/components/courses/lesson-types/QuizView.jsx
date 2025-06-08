"use client";

import React, { useState } from 'react';
import { FiHelpCircle, FiCheck, FiX, FiAward } from 'react-icons/fi';

const QuizView = ({ lesson, onComplete, isCompleted }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = lesson.questions || [];

  // Sélectionner une réponse
  const handleSelectAnswer = (questionIndex, answerIndex) => {
    if (showResults) return; // Empêcher la modification après soumission
    
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    });
  };

  // Calculer le score
  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  // Soumettre le quiz
  const handleSubmitQuiz = () => {
    setShowResults(true);
    setQuizCompleted(true);
    const score = calculateScore();
    
    // Si le score est suffisant (par exemple 70%), marquer comme terminé
    if (score >= questions.length * 0.7) {
      onComplete();
    }
  };

  // Naviguer entre les questions
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Vérifier si toutes les questions ont une réponse
  const allAnswered = questions.every((_, index) => selectedAnswers[index] !== undefined);

  if (questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-400">Aucune question disponible pour ce quiz.</p>
      </div>
    );
  }

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* En-tête */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-900/30 rounded-full mb-4">
          <FiHelpCircle size={24} className="text-purple-400" />
        </div>
        <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
        {lesson.description && (
          <p className="text-gray-400 text-lg">{lesson.description}</p>
        )}
      </div>

      {!showResults ? (
        /* Mode Quiz */
        <div className="bg-[#182b4a] rounded-xl p-6">
          {/* Indicateur de progression */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-gray-400">
              Question {currentQuestion + 1} sur {questions.length}
            </span>
            <div className="flex space-x-1">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-3 h-3 rounded-full ${
                    selectedAnswers[index] !== undefined
                      ? 'bg-[#FDC758]'
                      : index === currentQuestion
                        ? 'bg-blue-500'
                        : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question actuelle */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-6">
              {questions[currentQuestion]?.question}
            </h2>

            <div className="space-y-3">
              {questions[currentQuestion]?.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(currentQuestion, index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-[#FDC758] bg-[#FDC758]/10'
                      : 'border-gray-600 hover:border-gray-500 bg-[#1d325a]'
                  }`}
                >
                  <span className="flex items-center">
                    <span className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-[#FDC758] bg-[#FDC758]'
                        : 'border-gray-400'
                    }`}>
                      {selectedAnswers[currentQuestion] === index && (
                        <FiCheck size={14} className="text-[#0F1B2A]" />
                      )}
                    </span>
                    {option}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
              className={`px-4 py-2 rounded ${
                currentQuestion === 0
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-[#1d325a] text-white hover:bg-[#263c58]'
              }`}
            >
              Précédent
            </button>

            <div className="flex gap-3">
              {currentQuestion < questions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  Suivant
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={!allAnswered}
                  className={`px-6 py-2 rounded font-medium ${
                    allAnswered
                      ? 'bg-[#FDC758] text-[#0F1B2A] hover:bg-opacity-90'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Terminer le quiz
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Mode Résultats */
        <div className="bg-[#182b4a] rounded-xl p-6">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
              percentage >= 70 ? 'bg-green-900/30' : 'bg-red-900/30'
            }`}>
              <FiAward size={32} className={percentage >= 70 ? 'text-green-400' : 'text-red-400'} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Quiz terminé !</h2>
            <p className="text-xl">
              Score : <span className={`font-bold ${percentage >= 70 ? 'text-green-400' : 'text-red-400'}`}>
                {score}/{questions.length} ({percentage}%)
              </span>
            </p>
            <p className="text-gray-400 mt-2">
              {percentage >= 70 ? 'Félicitations ! Vous avez réussi ce quiz.' : 'Vous pouvez retenter le quiz pour améliorer votre score.'}
            </p>
          </div>

          {/* Révision des réponses */}
          <div className="space-y-6">
            {questions.map((question, qIndex) => {
              const userAnswer = selectedAnswers[qIndex];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <div key={qIndex} className="bg-[#1d325a] rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                      isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {isCorrect ? <FiCheck size={14} /> : <FiX size={14} />}
                    </div>
                    <h3 className="font-medium">Question {qIndex + 1}: {question.question}</h3>
                  </div>

                  <div className="ml-9 space-y-2">
                    {question.options.map((option, oIndex) => (
                      <div
                        key={oIndex}
                        className={`p-2 rounded text-sm ${
                          oIndex === question.correctAnswer
                            ? 'bg-green-900/30 text-green-300 border border-green-700'
                            : oIndex === userAnswer && userAnswer !== question.correctAnswer
                              ? 'bg-red-900/30 text-red-300 border border-red-700'
                              : 'bg-gray-800 text-gray-300'
                        }`}
                      >
                        {option}
                        {oIndex === question.correctAnswer && <span className="ml-2">✓ Correct</span>}
                        {oIndex === userAnswer && userAnswer !== question.correctAnswer && <span className="ml-2">✗ Votre réponse</span>}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions finales */}
          <div className="mt-8 text-center">
            {percentage >= 70 && !isCompleted && (
              <button
                onClick={onComplete}
                className="bg-[#FDC758] text-[#0F1B2A] px-6 py-3 rounded-lg font-medium hover:bg-opacity-90"
              >
                Continuer vers la prochaine leçon
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizView;