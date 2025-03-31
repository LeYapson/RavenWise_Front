import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Link } from 'react-router-dom';

const MainContainer = styled.div`
  padding: 80px 20px 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
  text-align: center;
`;

const SectionTitle = styled.h2`
  margin: 2.5rem 0 1.5rem;
  font-size: 1.8rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
    border-radius: 2px;
  }
`;

const QuizCategoriesContainer = styled.div`
  margin-bottom: 3rem;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const CategoryCard = styled(Link)`
  background-color: var(--glassmorphism);
  backdrop-filter: blur(15px);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  text-decoration: none;
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-base) ease, box-shadow var(--transition-base) ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
  
  &:after {
    display: none;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(180deg, var(--accent-primary), var(--accent-secondary));
  }
`;

const CategoryIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.05);
  color: var(--accent-primary);
  font-size: 1.5rem;
`;

const CategoryTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
`;

const CategoryDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
`;

const CategoryStats = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-top: auto;
`;

const FeaturedQuizContainer = styled.div`
  margin-bottom: 3rem;
`;

const FeaturedQuiz = styled.div`
  background-color: var(--glassmorphism);
  backdrop-filter: blur(15px);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-base) ease, box-shadow var(--transition-base) ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const FeaturedQuizImage = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  background-color: #141e2f;
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
  position: relative;
  
  @media (min-width: 768px) {
    width: 300px;
  }
`;

const QuizBadge = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
`;

const FeaturedQuizContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const QuizTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
`;

const QuizDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const QuizStats = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: auto;
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const QuizStat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuizButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  margin-top: 1.5rem;
  align-self: flex-start;
  box-shadow: var(--shadow-md);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg), var(--glow);
  }
  
  &:after {
    display: none;
  }
`;

const QuizList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const QuizCard = styled(Link)`
  background-color: var(--glassmorphism);
  backdrop-filter: blur(15px);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-base) ease, box-shadow var(--transition-base) ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
  
  &:after {
    display: none;
  }
`;

const QuizCardImage = styled.div`
  width: 100%;
  height: 160px;
  background-color: #141e2f;
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
  position: relative;
`;

const QuizCardContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const QuizCardCategory = styled.div`
  color: var(--accent-primary);
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
`;

const QuizCardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
`;

const QuizCardDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  flex: 1;
`;

const QuizCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  font-size: 0.85rem;
`;

const LeaderboardSection = styled.div`
  margin-bottom: 4rem;
`;

const LeaderboardContainer = styled.div`
  background-color: var(--glassmorphism);
  backdrop-filter: blur(15px);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
`;

const LeaderboardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeaderboardTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
`;

const LeaderboardTable = styled.div`
  padding: 0.5rem;
`;

const LeaderboardRow = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 2fr 1fr 1fr;
  padding: 1rem;
  align-items: center;
  border-bottom: 1px solid var(--border);
  transition: background-color 0.3s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const LeaderboardHeaderRow = styled(LeaderboardRow)`
  font-weight: 600;
  color: var(--text-primary);
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const RankNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-weight: bold;
  font-size: 0.875rem;
  background: ${props => {
    if (props.rank === 1) return 'linear-gradient(45deg, #FFD700, #FFA500)';
    if (props.rank === 2) return 'linear-gradient(45deg, #C0C0C0, #A9A9A9)';
    if (props.rank === 3) return 'linear-gradient(45deg, #CD7F32, #8B4513)';
    return 'rgba(255, 255, 255, 0.05)';
  }};
  color: ${props => props.rank <= 3 ? 'white' : 'var(--text-primary)'};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #141e2f;
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
`;

const UserName = styled.div`
  font-weight: 500;
`;

const Score = styled.div`
  font-weight: ${props => props.highlight ? '600' : '400'};
  color: ${props => props.highlight ? 'var(--accent-primary)' : 'var(--text-secondary)'};
`;

const QuizPage = () => {
  // Données pour les catégories de quiz
  const categories = [
    {
      id: 1,
      title: "Développement Web",
      description: "Testez vos connaissances en HTML, CSS, JavaScript et plus encore",
      icon: "🌐",
      quizCount: 15,
      completionRate: "72%"
    },
    {
      id: 2,
      title: "Développement Backend",
      description: "Quiz sur Node.js, Python, bases de données et architecture",
      icon: "⚙️",
      quizCount: 12,
      completionRate: "68%"
    },
    {
      id: 3,
      title: "DevOps & Cloud",
      description: "Évaluez vos compétences en Docker, Kubernetes, CI/CD et cloud",
      icon: "☁️",
      quizCount: 8,
      completionRate: "54%"
    },
    {
      id: 4,
      title: "Intelligence Artificielle",
      description: "Quiz sur le machine learning, deep learning et data science",
      icon: "🤖",
      quizCount: 10,
      completionRate: "63%"
    },
    {
      id: 5,
      title: "Sécurité Informatique",
      description: "Testez vos connaissances en cybersécurité et protection des données",
      icon: "🔒",
      quizCount: 9,
      completionRate: "59%"
    },
    {
      id: 6,
      title: "Développement Mobile",
      description: "Quiz sur React Native, Flutter, iOS et Android",
      icon: "📱",
      quizCount: 11,
      completionRate: "65%"
    }
  ];
  
  // Données pour les quiz en vedette
  const featuredQuizzes = [
    {
      id: 1,
      title: "Challenge React 2025",
      description: "Testez vos connaissances des dernières fonctionnalités de React avec ce quiz avancé. Couvrant les Hooks, le Context API, Suspense et les nouvelles optimisations de performance.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      questions: 25,
      duration: "30 min",
      difficulty: "Avancé",
      participants: 1842
    },
    {
      id: 2,
      title: "Quiz DevOps : Docker & Kubernetes",
      description: "Ce quiz couvre les concepts fondamentaux et avancés de Docker et Kubernetes. Idéal pour valider vos connaissances en conteneurisation et orchestration.",
      image: "https://images.unsplash.com/photo-1605496036008-b93c9c614517?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      questions: 20,
      duration: "25 min",
      difficulty: "Intermédiaire",
      participants: 1254
    }
  ];
  
  // Données pour les quiz populaires
  const popularQuizzes = [
    {
      id: 1,
      title: "Fondamentaux HTML/CSS",
      description: "Testez vos connaissances des bases du développement web.",
      category: "Développement Web",
      difficulty: "Débutant",
      questions: 15,
      time: "15 min",
      image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 2,
      title: "JavaScript Avancé",
      description: "Maîtrisez-vous les concepts avancés de JavaScript?",
      category: "Développement Web",
      difficulty: "Avancé",
      questions: 20,
      time: "25 min",
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 3,
      title: "Bases de données SQL",
      description: "Testez vos compétences en conception et requêtes SQL.",
      category: "Développement Backend",
      difficulty: "Intermédiaire",
      questions: 18,
      time: "20 min",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 4,
      title: "AWS Cloud Practitioner",
      description: "Préparez-vous pour la certification AWS avec ce quiz.",
      category: "DevOps & Cloud",
      difficulty: "Intermédiaire",
      questions: 25,
      time: "30 min",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 5,
      title: "Fondamentaux de Python",
      description: "Évaluez votre connaissance des bases de Python.",
      category: "Développement Backend",
      difficulty: "Débutant",
      questions: 15,
      time: "15 min",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 6,
      title: "React Hooks & Context",
      description: "Testez votre compréhension des hooks et du Context API.",
      category: "Développement Web",
      difficulty: "Intermédiaire",
      questions: 18,
      time: "20 min",
      image: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];
  
  // Données pour le leaderboard
  const leaderboardData = [
    { rank: 1, name: "AlexDev", avatar: "https://randomuser.me/api/portraits/men/32.jpg", score: 9850, quizCompleted: 42 },
    { rank: 2, name: "SophieTech", avatar: "https://randomuser.me/api/portraits/women/44.jpg", score: 9720, quizCompleted: 38 },
    { rank: 3, name: "CodeMaster", avatar: "https://randomuser.me/api/portraits/men/67.jpg", score: 9580, quizCompleted: 35 },
    { rank: 4, name: "WebWizard", avatar: "https://randomuser.me/api/portraits/women/28.jpg", score: 9430, quizCompleted: 39 },
    { rank: 5, name: "JohnDev", avatar: "https://randomuser.me/api/portraits/men/45.jpg", score: 9350, quizCompleted: 36 }
  ];

  return (
    <>
      <Header />
      <MainContainer>
        <PageTitle>Quiz & Défis</PageTitle> <br/>
        
        {/* Section des quiz en vedette */}
        <SectionTitle>Quiz à la une</SectionTitle>
        <FeaturedQuizContainer>
          {featuredQuizzes.map(quiz => (
            <FeaturedQuiz key={quiz.id}>
              <FeaturedQuizImage image={quiz.image}>
                <QuizBadge>Populaire</QuizBadge>
              </FeaturedQuizImage>
              <FeaturedQuizContent>
                <QuizTitle>{quiz.title}</QuizTitle>
                <QuizDescription>{quiz.description}</QuizDescription>
                <QuizStats>
                  <QuizStat>❓ {quiz.questions} questions</QuizStat>
                  <QuizStat>⏱️ {quiz.duration}</QuizStat>
                  <QuizStat>🏆 {quiz.difficulty}</QuizStat>
                  <QuizStat>👥 {quiz.participants} participants</QuizStat>
                </QuizStats>
                <QuizButton to={`/quiz/${quiz.id}`}>Commencer le quiz</QuizButton>
              </FeaturedQuizContent>
            </FeaturedQuiz>
          ))}
        </FeaturedQuizContainer>
        
        {/* Section des catégories de quiz */}
        <SectionTitle>Catégories de quiz</SectionTitle>
        <QuizCategoriesContainer>
          <CategoryGrid>
            {categories.map(category => (
              <CategoryCard key={category.id} to={`/quiz/category/${category.id}`}>
                <CategoryIcon>{category.icon}</CategoryIcon>
                <CategoryTitle>{category.title}</CategoryTitle>
                <CategoryDescription>{category.description}</CategoryDescription>
                <CategoryStats>
                  <span>{category.quizCount} quiz</span>
                  <span>Taux de réussite: {category.completionRate}</span>
                </CategoryStats>
              </CategoryCard>
            ))}
          </CategoryGrid>
        </QuizCategoriesContainer>
        
        {/* Section du leaderboard */}
        <SectionTitle>Classement global</SectionTitle>
        <LeaderboardSection>
          <LeaderboardContainer>
            <LeaderboardHeader>
              <LeaderboardTitle>Top 5 des meilleurs joueurs</LeaderboardTitle>
              <QuizButton to="/quiz/leaderboard">Voir le classement complet</QuizButton>
            </LeaderboardHeader>
            <LeaderboardTable>
              <LeaderboardHeaderRow>
                <div>Rang</div>
                <div>Joueur</div>
                <div>Score</div>
                <div>Quiz Complétés</div>
              </LeaderboardHeaderRow>
              {leaderboardData.map(player => (
                <LeaderboardRow key={player.rank}>
                  <RankNumber rank={player.rank}>{player.rank}</RankNumber>
                  <UserInfo>
                    <UserAvatar image={player.avatar} />
                    <UserName>{player.name}</UserName>
                  </UserInfo>
                  <Score highlight={player.rank === 1}>{player.score}</Score>
                  <div>{player.quizCompleted}</div>
                </LeaderboardRow>
              ))}
            </LeaderboardTable>
          </LeaderboardContainer>
        </LeaderboardSection>
        
        {/* Section des quiz populaires */}
        <SectionTitle>Quiz populaires</SectionTitle>
        <QuizList>
          {popularQuizzes.map(quiz => (
            <QuizCard key={quiz.id} to={`/quiz/${quiz.id}`}>
              <QuizCardImage image={quiz.image}>
                <QuizBadge>{quiz.difficulty}</QuizBadge>
              </QuizCardImage>
              <QuizCardContent>
                <QuizCardCategory>{quiz.category}</QuizCardCategory>
                <QuizCardTitle>{quiz.title}</QuizCardTitle>
                <QuizCardDescription>{quiz.description}</QuizCardDescription>
                <QuizCardFooter>
                  <span>❓ {quiz.questions} questions</span>
                  <span>⏱️ {quiz.time}</span>
                </QuizCardFooter>
              </QuizCardContent>
            </QuizCard>
          ))}
        </QuizList>
      </MainContainer>
      <Footer />
    </>
  );
};

export default QuizPage;