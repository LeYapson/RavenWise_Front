import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Raven404 from "../assets/images/Raven404.png";
import Header from "../components/common/Header";

const MainContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const Lien = styled.div`

  a {
    color: #0F1B2A;
    text-decoration: none;
    margin-right: 50px;
    font-weight: bold;
    background-color: #FDC758;
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #e0b347;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    a {
      margin: 5px 0;
    }
  }
`;

//page not found
const PageNotFound = () => {
  return (
    <MainContainer>
      <Header />
      <h2>Même Raven ne sait pas ou tu es...</h2> <br />
      <img src={Raven404} alt="Raven 404" />
      <Lien>
      <Link to="/">Go to Home</Link>
      </Lien>
    </MainContainer>
  );
};

export default PageNotFound;
