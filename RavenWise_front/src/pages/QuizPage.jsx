import React from 'react';
import styled from 'styled-components';
import QuizComponent from '../components/quiz/QuizComponent';
import Header from '../components/common/Header';

const MainContainer = styled.div`
  padding: 20px;
`;

const QuizPage = () => {
  const quiz = { title: 'Sample Quiz' };

  return (
    <MainContainer>
        <Header />
      <h2>Quiz</h2>
      <QuizComponent quiz={quiz} />
    </MainContainer>
  );
};

export default QuizPage;