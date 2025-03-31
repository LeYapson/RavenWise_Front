import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #0c1524;
  border-top: 2px solid rgb(51, 65, 85);
  color: var(--text-secondary);
  padding: 3rem 1.5rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2.5rem;
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const LogoText = styled.span`
  font-family: 'Zen Dots', sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
`;

const RavenText = styled.span`
  color: white;
`;

const WiseText = styled.span`
  color: #FDC758;
`;

const FooterDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--accent-primary);
    color: white;
    transform: translateY(-3px);
  }
`;

const FooterTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
    border-radius: 3px;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 0.75rem;
  
  a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.95rem;
    display: inline-flex;
    align-items: center;
    transition: all 0.3s ease;
    
    &:hover {
      color: var(--accent-primary);
      transform: translateX(5px);
    }
    
    &:before {
      content: "→";
      margin-right: 0.5rem;
      opacity: 0;
      transform: translateX(-5px);
      transition: all 0.3s ease;
    }
    
    &:hover:before {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const ContactInfo = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  
  svg {
    margin-top: 3px;
    flex-shrink: 0;
  }
`;

const ContactText = styled.span`
  font-size: 0.95rem;
  line-height: 1.5;
`;

const SubscribeForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SubscribeInput = styled.input`
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.75rem 1rem;
  color: var(--text-primary);
  font-size: 0.95rem;
  
  &:focus {
    outline: none;
    border-color: var(--accent-primary);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const SubscribeButton = styled.button`
  padding: 0.75rem 1rem;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 2rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const FooterCopyright = styled.p`
  font-size: 0.9rem;
  margin: 0;
`;

const FooterBottomLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  
  a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--accent-primary);
    }
  }
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <FooterLogo>
            <LogoText>
              <RavenText>Raven</RavenText>
              <WiseText>Wise</WiseText>
            </LogoText>
          </FooterLogo>
          <FooterDescription>
            RavenWise est une plateforme d'apprentissage moderne qui combine l'IA et la pédagogie pour offrir des cours adaptés au rythme de chaque apprenant.
          </FooterDescription>
          <SocialLinks>
            <SocialLink href="#" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </SocialLink>
            <SocialLink href="#" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </SocialLink>
            <SocialLink href="#" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </SocialLink>
            <SocialLink href="#" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </SocialLink>
          </SocialLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Liens Rapides</FooterTitle>
          <FooterLinks>
            <FooterLink>
              <Link to="/">Accueil</Link>
            </FooterLink>
            <FooterLink>
              <Link to="/courses">Cours</Link>
            </FooterLink>
            <FooterLink>
              <Link to="/quiz">Quiz</Link>
            </FooterLink>
            <FooterLink>
              <Link to="/community">Communauté</Link>
            </FooterLink>
            <FooterLink>
              <Link to="/about">À propos</Link>
            </FooterLink>
            <FooterLink>
              <Link to="/contact">Contact</Link>
            </FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Contact</FooterTitle>
          <ContactInfo>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <ContactText>
              123 Avenue de l'Innovation<br />
              75000 Paris, France
            </ContactText>
          </ContactInfo>
          <ContactInfo>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <ContactText>+33 (0)1 23 45 67 89</ContactText>
          </ContactInfo>
          <ContactInfo>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <ContactText>contact@ravenwise.com</ContactText>
          </ContactInfo>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Newsletter</FooterTitle>
          <FooterDescription>
            Inscrivez-vous à notre newsletter pour recevoir les dernières actualités, cours et événements.
          </FooterDescription>
          <SubscribeForm>
            <SubscribeInput type="email" placeholder="Votre adresse email" required />
            <SubscribeButton type="submit">S'abonner</SubscribeButton>
          </SubscribeForm>
        </FooterColumn>
      </FooterContent>
      
      <FooterBottom>
        <FooterCopyright>
          © {currentYear} RavenWise. Tous droits réservés.
        </FooterCopyright>
        <FooterBottomLinks>
          <Link to="/terms">Conditions d'utilisation</Link>
          <Link to="/privacy">Politique de confidentialité</Link>
          <Link to="/cookies">Cookies</Link>
        </FooterBottomLinks>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;