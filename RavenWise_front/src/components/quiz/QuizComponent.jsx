import React from 'react';

const QuizComponent = ({ quiz }) => {
  return (
    <div className="quiz-component">
      <h2>{quiz.title}</h2>
      {/* Add quiz rendering logic here */}
    </div>
  );
};

export default QuizComponent;