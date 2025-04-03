import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const MainContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`;

const PageTitle = styled.h1`
  margin-bottom: 1rem;
`;

const IntroText = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin-bottom: 3rem;
  color: var(--text-secondary);
`;

const PartnersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const PartnerCard = styled.div`
  background: var(--glassmorphism);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--border);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
`;

const PartnerLogo = styled.div`
  height: 120px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  
  img {
    max-height: 100%;
    max-width: 80%;
    object-fit: contain;
  }
`;

const PartnerContent = styled.div`
  padding: 1.5rem;
`;

const PartnerName = styled.h3`
  margin-bottom: 0.5rem;
`;

const PartnerDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
`;

const ScenariosSection = styled.div`
  margin-top: 4rem;
`;

const SectionTitle = styled.h2`
  margin-bottom: 2rem;
`;

const ScenariosList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
`;

const ScenarioCard = styled(Link)`
  display: block;
  background: var(--glassmorphism);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--border);
  text-decoration: none;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
    
    &:after {
      display: none;
    }
  }
`;

const ScenarioHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CompanyLogo = styled.div`
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    max-width: 80%;
    max-height: 80%;
  }
`;

const ScenarioTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
`;

const ScenarioContent = styled.div`
  padding: 1.5rem;
`;

const ScenarioDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-size: 0.95rem;
`;

const ScenarioMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-top: 1.5rem;
`;

const ScenarioDifficulty = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  background-color: ${props => 
    props.level === 'Débutant' ? 'rgba(74, 222, 128, 0.2)' : 
    props.level === 'Intermédiaire' ? 'rgba(250, 204, 21, 0.2)' : 
    'rgba(248, 113, 113, 0.2)'
  };
  color: ${props => 
    props.level === 'Débutant' ? '#4ade80' : 
    props.level === 'Intermédiaire' ? '#facc15' : 
    '#f87171'
  };
`;

const PartnershipsPage = () => {
  const partners = [
    {
      id: 1,
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
      description: "Explorez des scénarios de développement Azure, apprendre les technologies .NET et découvrez les meilleures pratiques utilisées par les ingénieurs Microsoft."
    },
    {
      id: 2,
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/368px-Google_2015_logo.svg.png",
      description: "Plongez dans les défis d'ingénierie basés sur les technologies Google Cloud, Angular et les architectures à grande échelle."
    },
    {
      id: 3,
      name: "Amazon Web Services",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/512px-Amazon_Web_Services_Logo.svg.png",
      description: "Résolvez des problèmes réels d'infrastructure cloud et apprenez à concevoir des architectures évolutives avec AWS."
    }
  ];

  const scenarios = [
    {
      id: 1,
      title: "Optimisation d'une API e-commerce",
      company: "Amazon Web Services",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/512px-Amazon_Web_Services_Logo.svg.png",
      description: "Dans ce scénario, vous travaillerez sur l'optimisation d'une API pour un service e-commerce à fort trafic, en utilisant les services AWS pour améliorer les performances et la scalabilité.",
      difficulty: "Intermédiaire",
      duration: "3-4 heures",
      skills: ["Node.js", "AWS Lambda", "DynamoDB"]
    },
    {
      id: 2,
      title: "Développement d'une application de traduction en temps réel",
      company: "Google",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/368px-Google_2015_logo.svg.png",
      description: "Créez une application web qui utilise l'API Google Translate pour traduire du texte en temps réel entre différentes langues, avec stockage des historiques de traduction.",
      difficulty: "Débutant",
      duration: "2-3 heures",
      skills: ["JavaScript", "Google Cloud", "API REST"]
    },
    {
      id: 3,
      title: "Déploiement d'une application conteneurisée",
      company: "Microsoft",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
      description: "Apprenez à conteneuriser une application .NET Core et à la déployer sur Azure Kubernetes Service avec un pipeline CI/CD automatisé.",
      difficulty: "Avancé",
      duration: "5-6 heures",
      skills: ["Docker", "Kubernetes", ".NET Core", "Azure DevOps"]
    }
  ];

  return (
    <>
      <Header />
      <MainContainer>
        <PageTitle>Partenariats et Scénarios Réels</PageTitle>
        <IntroText>
          Développez vos compétences sur des cas réels en collaboration avec nos entreprises partenaires. Ces scénarios vous permettent de travailler sur des problèmes concrets et d'appliquer vos connaissances dans des contextes professionnels.
        </IntroText>
        
        <SectionTitle>Nos partenaires</SectionTitle>
        <PartnersGrid>
          {partners.map(partner => (
            <PartnerCard key={partner.id}>
              <PartnerLogo>
                <img src={partner.logo} alt={partner.name} />
              </PartnerLogo>
              <PartnerContent>
                <PartnerName>{partner.name}</PartnerName>
                <PartnerDescription>{partner.description}</PartnerDescription>
              </PartnerContent>
            </PartnerCard>
          ))}
        </PartnersGrid>
        
        <ScenariosSection>
          <SectionTitle>Scénarios disponibles</SectionTitle>
          <ScenariosList>
            {scenarios.map(scenario => (
              <ScenarioCard key={scenario.id} to={`/partnerships/scenarios/${scenario.id}`}>
                <ScenarioHeader>
                  <CompanyLogo>
                    <img src={scenario.companyLogo} alt={scenario.company} />
                  </CompanyLogo>
                  <ScenarioTitle>{scenario.title}</ScenarioTitle>
                </ScenarioHeader>
                <ScenarioContent>
                  <ScenarioDescription>{scenario.description}</ScenarioDescription>
                  <div>
                    {scenario.skills.map((skill, index) => (
                      <ScenarioDifficulty key={index} level="Intermédiaire">
                        {skill}
                      </ScenarioDifficulty>
                    ))}
                  </div>
                  <ScenarioMeta>
                    <ScenarioDifficulty level={scenario.difficulty}>
                      {scenario.difficulty}
                    </ScenarioDifficulty>
                    <span>⏱️ {scenario.duration}</span>
                  </ScenarioMeta>
                </ScenarioContent>
              </ScenarioCard>
            ))}
          </ScenariosList>
        </ScenariosSection>
      </MainContainer>
      <Footer />
    </>
  );
};

export default PartnershipsPage;