import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import RavenWiseLogo from '../assets/images/Ravenwise.png';
import BannerBackground from '../assets/images/banner-background.jpg';

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 85vh;
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(${BannerBackground}) no-repeat center center;
    background-size: cover;
    z-index: -2;
    opacity: 0.7; /* Ajustez l'opacité si nécessaire */
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, 
                  rgba(10, 15, 24, 0.5) 0%, 
                  rgba(10, 15, 24, 0.8) 75%,
                  var(--bg-primary) 100%);
    z-index: -1;
  }
  
  @media (min-width: 768px) {
    min-height: 90vh;
  }
`;

// Ajout du composant HeroContent qui semble manquant
const HeroContent = styled.div`
  max-width: 1000px;
  position: relative;
  z-index: 2;
  animation: fadeIn 0.8s ease-out forwards;
`;

const Logo = styled.img`
  width: 180px;
  height: auto;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    width: 220px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto 2rem;
  color: var(--text-primary);
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled(Link)`
  padding: 0.875rem 2rem;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:after {
    display: none;
  }
  
  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  color: white;
  box-shadow: var(--shadow-md);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg), var(--glow);
  }
`;

const SecondaryButton = styled(Button)`
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-primary);
  border: 1px solid var(--border);
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-3px);
  }
`;

const Section = styled.section`
  padding: 5rem 1.5rem;
  
  @media (min-width: 768px) {
    padding: 6rem 2rem;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background: var(--glassmorphism);
  border-radius: 12px;
  border: 1px solid var(--border);
  padding: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
  }
`;

const FeatureTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const HowItWorksSteps = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.alignRight ? 'flex-end' : 'flex-start'};
  text-align: ${props => props.alignRight ? 'right' : 'left'};
  margin-bottom: 5rem;
  position: relative;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    text-align: left;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:not(:last-child):after {
    content: '';
    position: absolute;
    height: 100px;
    width: 2px;
    background: linear-gradient(to bottom, var(--accent-primary), transparent);
    bottom: -100px;
    left: ${props => props.alignRight ? 'auto' : '2rem'};
    right: ${props => props.alignRight ? '2rem' : 'auto'};
    
    @media (min-width: 768px) {
      left: 2rem;
      right: auto;
    }
  }
`;

const StepNumber = styled.div`
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1.5rem;
  flex-shrink: 0;
  
  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: ${props => props.alignRight ? '0' : '2rem'};
    margin-left: ${props => props.alignRight ? '2rem' : '0'};
    order: ${props => props.alignRight ? '2' : '1'};
  }
`;

const StepContent = styled.div`
  @media (min-width: 768px) {
    order: ${props => props.alignRight ? '1' : '2'};
  }
`;

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection>
          <HeroContent>
            <Logo src={RavenWiseLogo} alt="RavenWise Logo" />
            <HeroTitle>
              Découvrez le pouvoir de l'apprentissage adaptatif
            </HeroTitle>
            <HeroSubtitle>
              RavenWise est une plateforme d'apprentissage innovante qui utilise l'intelligence artificielle pour personnaliser votre parcours éducatif et vous aider à atteindre vos objectifs.
            </HeroSubtitle>
            <ButtonContainer>
              <PrimaryButton to="/signup">Commencer gratuitement</PrimaryButton>
              <SecondaryButton to="/courses">Explorer les cours</SecondaryButton>
            </ButtonContainer>
          </HeroContent>
        </HeroSection>

        <Section id="features">
          <SectionTitle>Fonctionnalités principales</SectionTitle>
          <FeatureGrid>
            <FeatureCard>
              <FeatureTitle>Apprentissage adaptatif</FeatureTitle>
              <p>Notre algorithme d'IA adapte le contenu des cours à votre style d'apprentissage et à votre progression pour maximiser votre compréhension et votre rétention.</p>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>Parcours personnalisés</FeatureTitle>
              <p>Chaque apprenant bénéficie d'un parcours unique, conçu pour répondre à ses besoins spécifiques et l'aider à atteindre ses objectifs personnels.</p>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>Quiz intelligents</FeatureTitle>
              <p>Nos quiz évaluent votre compréhension et s'adaptent automatiquement pour cibler vos points faibles et renforcer votre apprentissage.</p>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>Communauté active</FeatureTitle>
              <p>Rejoignez une communauté de passionnés pour échanger, collaborer et enrichir votre expérience d'apprentissage grâce à l'intelligence collective.</p>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>Contenu de qualité</FeatureTitle>
              <p>Accédez à des cours créés par des experts dans leur domaine, régulièrement mis à jour pour rester à la pointe des connaissances.</p>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>Suivi de progression</FeatureTitle>
              <p>Visualisez votre progression en temps réel et obtenez des insights précieux pour optimiser votre apprentissage et rester motivé.</p>
            </FeatureCard>
          </FeatureGrid>
        </Section>

        <Section id="how-it-works">
          <SectionTitle>Comment ça fonctionne</SectionTitle>
          <HowItWorksSteps>
            <Step>
              <StepNumber>1</StepNumber>
              <StepContent>
                <h3>Inscrivez-vous gratuitement</h3>
                <p>Créez votre compte en quelques secondes pour commencer votre voyage d'apprentissage avec RavenWise. Aucune carte de crédit n'est requise pour l'inscription.</p>
              </StepContent>
            </Step>
            
            <Step alignRight>
              <StepNumber alignRight>2</StepNumber>
              <StepContent alignRight>
                <h3>Complétez votre profil d'apprentissage</h3>
                <p>Répondez à quelques questions pour nous aider à comprendre vos objectifs, vos préférences et votre style d'apprentissage unique.</p>
              </StepContent>
            </Step>
            
            <Step>
              <StepNumber>3</StepNumber>
              <StepContent>
                <h3>Explorez les cours recommandés</h3>
                <p>Découvrez les cours personnalisés que notre algorithme a sélectionnés spécifiquement pour vous, en fonction de vos intérêts et de vos objectifs.</p>
              </StepContent>
            </Step>
            
            <Step alignRight>
              <StepNumber alignRight>4</StepNumber>
              <StepContent alignRight>
                <h3>Apprenez à votre rythme</h3>
                <p>Suivez les leçons, participez aux quiz et testez vos connaissances. Notre plateforme s'adapte à votre rythme et à votre progression.</p>
              </StepContent>
            </Step>
            
            <Step>
              <StepNumber>5</StepNumber>
              <StepContent>
                <h3>Obtenez des certifications</h3>
                <p>Complétez les cours et recevez des certifications reconnues pour mettre en valeur vos compétences et enrichir votre profil professionnel.</p>
              </StepContent>
            </Step>
          </HowItWorksSteps>
        </Section>
        <Footer />
      </main>
    </>
  );
};

export default HomePage;