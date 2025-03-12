import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import RavenShape from '../../assets/images/Raven_Shape.png';
import GlobalStyles from '../../assets/styles/GlobalStyle';

const HeaderContainer = styled.header`
  position: flex;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: #132238;
  color: #FDC758;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid rgb(51, 65, 85);
  width: 100%;
  z-index: 1000;
`;

const Nav = styled.nav`
  flex: 1;
  display: flex;
  justify-content: center;

  ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;

    li {
      margin: 0 15px;

      a {
        color: white;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }

  @media (max-width: 768px) {
    ul {
      flex-direction: column;
      align-items: center;

      li {
        margin: 5px 0;
      }
    }
  }
`;

const AuthLinks = styled.div`
  display: flex;
  align-items: center;

  a {
    text-decoration: none;
    margin-right: 20px;
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 5px;
    transition: all 0.3s ease;
  }

  a:first-child {
    /* Style pour le bouton Login */
    color: #FDC758;
    background-color: transparent;
    border: 2px solid #FDC758;
    
    &:hover {
      background-color: rgba(253, 199, 88, 0.1);
    }
  }

  a:last-child {
    /* Style pour le bouton Register */
    color: #0F1B2A;
    background-color: #FDC758;
    border: 2px solid #FDC758;
    
    &:hover {
      background-color: #e0b347;
      border-color: #e0b347;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    a {
      margin: 5px 0;
      width: 100%;
      text-align: center;
    }
  }
`;


const Logo = styled.img`
  width: 50px; /* Ajustez cette valeur selon vos besoins */
  height: auto;
`;

const SiteName = styled(Link)`
  color: #FDC758;
  text-decoration: none;
  font-family: 'Zen Dots', sans-serif;
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <GlobalStyles />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Logo src={RavenShape} alt="RavenWise Logo" />
        <SiteName to="/">RavenWise</SiteName>
      </div>
      <Nav>
        <ul>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/quiz">Quiz</Link></li>
          <li><Link to="/community">Community</Link></li>
        </ul>
      </Nav>
      <AuthLinks>
        <Link to="/login">Login</Link>
        <Link to="/signup">Register</Link>
      </AuthLinks>
    </HeaderContainer>
  );
};

export default Header;