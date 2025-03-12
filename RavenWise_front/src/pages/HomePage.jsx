import React from 'react';
import styled from 'styled-components';
import Header from '../components/common/Header';

const MainContainer = styled.div`
  padding: 20px;
`;

const HomePage = () => {
  return (
    <MainContainer>
      <Header />
      <h2>Welcome to RavenWise</h2>
      <p>This is the homepage content.</p>
    </MainContainer>
  );
};

export default HomePage;