import React from 'react';
import QuizComponent from '../components/quiz/QuizComponent';
import Header from '../components/common/Header';

const QuizPage = () => {
  const quiz = { title: 'Sample Quiz' };

  return (
    <div>
        <Header />
      <h2>Quiz</h2>
      <QuizComponent quiz={quiz} />
    </div>
  );
};

export default QuizPage;