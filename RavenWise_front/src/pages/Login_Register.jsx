import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80') center center;
    background-size: cover;
    opacity: 0.2;
    z-index: 0;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ImageContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 500px;
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: var(--bg-primary);
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 450px;
  animation: fadeIn 0.6s ease-out forwards;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 2.5rem;
  border-bottom: 1px solid var(--border);
`;

const Tab = styled.button`
  flex: 1;
  background: transparent;
  border: none;
  color: ${props => props.active ? 'var(--accent-primary)' : 'var(--text-secondary)'};
  font-size: 1.25rem;
  font-weight: ${props => props.active ? '600' : '400'};
  padding: 1rem 0;
  cursor: pointer;
  position: relative;
  transition: color 0.3s ease;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.active ? 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))' : 'transparent'};
    border-radius: 3px 3px 0 0;
    transition: background 0.3s ease;
  }
  
  &:hover {
    color: var(--accent-primary);
  }
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const FormSubtitle = styled.p`
  color: var(--text-secondary);
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
`;

const Input = styled.input`
  background-color: var(--glassmorphism);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1rem;
  color: var(--text-primary);
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const RememberMeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  cursor: pointer;
`;

const ForgotPassword = styled(Link)`
  color: var(--accent-primary);
  font-size: 0.9rem;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
  
  &:after {
    display: none;
  }
`;

const SubmitButton = styled.button`
  padding: 1rem;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg), var(--glow);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: var(--text-secondary);
  
  &:before, &:after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: var(--border);
  }
  
  span {
    padding: 0 1rem;
    font-size: 0.9rem;
  }
`;

const SocialLoginContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: var(--glassmorphism);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    transform: translateY(-2px);
  }
`;

const SocialIcon = styled.span`
  font-size: 1.25rem;
`;

const SignUpText = styled.p`
  text-align: center;
  margin-top: 2rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  
  a {
    color: var(--accent-primary);
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
    
    &:after {
      display: none;
    }
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.85rem;
  margin-top: 0.25rem;
`;

const Login_Register = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }
    
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }
    
    if (activeTab === 'register') {
      if (!formData.name) {
        newErrors.name = "Le nom est requis";
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "La confirmation du mot de passe est requise";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        
        if (activeTab === 'login') {
          // Redirect after successful login
          navigate('/');
        } else {
          // Switch to login tab after successful registration
          setActiveTab('login');
          setFormData({
            ...formData,
            confirmPassword: '',
            name: ''
          });
        }
      }, 1500);
    }
  };

  return (
    <PageContainer>
      <Header />
      <MainContainer>
        <ImageSection>
          <ImageContent>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Bienvenue sur RavenWise</h1>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
              Notre plateforme d'apprentissage adaptative utilise l'intelligence artificielle pour personnaliser votre parcours éducatif 
              et vous aider à atteindre vos objectifs plus efficacement.
            </p>
          </ImageContent>
        </ImageSection>
        
        <FormSection>
          <FormContainer>
            <TabContainer>
              <Tab 
                active={activeTab === 'login'} 
                onClick={() => setActiveTab('login')}
              >
                Connexion
              </Tab>
              <Tab 
                active={activeTab === 'register'} 
                onClick={() => setActiveTab('register')}
              >
                Inscription
              </Tab>
            </TabContainer>
            
            <FormTitle>
              {activeTab === 'login' ? 'Connexion à votre compte' : 'Créer un compte'}
            </FormTitle>
            <FormSubtitle>
              {activeTab === 'login' 
                ? 'Entrez vos identifiants pour accéder à votre espace personnel' 
                : 'Rejoignez notre communauté d\'apprentissage en quelques étapes simples'}
            </FormSubtitle>
            
            <Form onSubmit={handleSubmit}>
              {activeTab === 'register' && (
                <FormGroup>
                  <Label htmlFor="name">Nom complet</Label>
                  <Input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Entrez votre nom complet" 
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                </FormGroup>
              )}
              
              <FormGroup>
                <Label htmlFor="email">Adresse email</Label>
                <Input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="exemple@email.com" 
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="password">Mot de passe</Label>
                <Input 
                  type="password" 
                  id="password" 
                  name="password" 
                  placeholder="Entrez votre mot de passe" 
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
              </FormGroup>
              
              {activeTab === 'register' && (
                <FormGroup>
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <Input 
                    type="password" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    placeholder="Confirmez votre mot de passe" 
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
                </FormGroup>
              )}
              
              {activeTab === 'login' && (
                <RememberMeContainer>
                  <CheckboxLabel>
                    <input 
                      type="checkbox" 
                      name="rememberMe" 
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    Se souvenir de moi
                  </CheckboxLabel>
                  <ForgotPassword to="/forgot-password">Mot de passe oublié ?</ForgotPassword>
                </RememberMeContainer>
              )}
              
              <SubmitButton type="submit" disabled={isLoading}>
                {isLoading 
                  ? 'Chargement...' 
                  : activeTab === 'login' ? 'Se connecter' : 'S\'inscrire'}
              </SubmitButton>
            </Form>
            
            <OrDivider>
              <span>ou continuer avec</span>
            </OrDivider>
            
            <SocialLoginContainer>
              <SocialButton>
                <SocialIcon>G</SocialIcon>
                Google
              </SocialButton>
              <SocialButton>
                <SocialIcon>f</SocialIcon>
                Facebook
              </SocialButton>
              <SocialButton>
                <SocialIcon>in</SocialIcon>
                LinkedIn
              </SocialButton>
            </SocialLoginContainer>
            
            {activeTab === 'login' ? (
              <SignUpText>
                Pas encore de compte ? <a href="#" onClick={() => setActiveTab('register')}>S'inscrire</a>
              </SignUpText>
            ) : (
              <SignUpText>
                Déjà inscrit ? <a href="#" onClick={() => setActiveTab('login')}>Se connecter</a>
              </SignUpText>
            )}
          </FormContainer>
        </FormSection>
      </MainContainer>
    </PageContainer>
  );
};

export default Login_Register;