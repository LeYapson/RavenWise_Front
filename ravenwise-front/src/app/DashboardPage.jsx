import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SideSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Card = styled.div`
  background: var(--glassmorphism);
  border-radius: 12px;
  border: 1px solid var(--border);
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const ProgressCard = styled(Card)`
  height: 100%;
`;

const ProgressOverview = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const ProgressStat = styled.div`
  text-align: center;
`;

const ProgressValue = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const ProgressLabel = styled.div`
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const ProgressBarContainer = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ProgressBarLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const ProgressBarTrack = styled.div`
  height: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  border-radius: 4px;
  width: ${props => props.progress}%;
`;

const RecommendationsCard = styled(Card)`
  margin-bottom: 2rem;
`;

const RecommendationItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border);
  text-decoration: none;
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  
  &:first-child {
    padding-top: 0;
  }
  
  &:hover {
    transform: translateX(5px);
  }
  
  &:after {
    display: none;
  }
`;

const RecommendationIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const RecommendationContent = styled.div`
  flex: 1;
`;

const RecommendationTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--text-primary);
`;

const RecommendationMeta = styled.div`
  font-size: 0.8rem;
  color: var(--text-secondary);
`;

const AchievementsSection = styled.div`
  margin-top: 2rem;
`;

const BadgesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
`;

const BadgeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const BadgeIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => props.unlocked 
    ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' 
    : 'rgba(255, 255, 255, 0.05)'};
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: ${props => props.unlocked ? 'white' : 'rgba(255, 255, 255, 0.3)'};
  position: relative;
  overflow: hidden;
  
  ${props => !props.unlocked && `
    &:after {
      content: '🔒';
      position: absolute;
      font-size: 1.2rem;
      bottom: 10px;
      right: 10px;
    }
  `}
`;

const BadgeName = styled.div`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${props => props.unlocked ? 'var(--text-primary)' : 'var(--text-secondary)'};
`;

const ActivityFeed = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActivityItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border);
  
  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: white;
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityText = styled.div`
  margin-bottom: 0.25rem;
`;

const ActivityTime = styled.div`
  font-size: 0.8rem;
  color: var(--text-secondary);
`;

const LevelInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
`;

const LevelBadge = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.5rem;
  color: white;
  flex-shrink: 0;
`;

const LevelContent = styled.div`
  flex: 1;
`;

const LevelTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const LevelProgress = styled.div`
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const DashboardPage = () => {
  // Données simulées
  const userData = {
    name: "Alex",
    level: 12,
    xpCurrent: 2450,
    xpToNextLevel: 3000,
    stats: {
      coursesCompleted: 8,
      quizzesTaken: 23,
      practiceHours: 42,
      streak: 7
    },
    skills: [
      { name: "JavaScript", progress: 78 },
      { name: "React", progress: 62 },
      { name: "CSS/SCSS", progress: 85 },
      { name: "Node.js", progress: 45 }
    ],
    badges: [
      { id: 1, name: "Débutant", icon: "🌱", unlocked: true },
      { id: 2, name: "Explorateur", icon: "🧭", unlocked: true },
      { id: 3, name: "Codeur Matinal", icon: "🌅", unlocked: true },
      { id: 4, name: "Curieux", icon: "🔍", unlocked: true },
      { id: 5, name: "Marathonien", icon: "🏃", unlocked: false },
      { id: 6, name: "Mentor", icon: "🧠", unlocked: false }
    ],
    recommendations: [
      { id: 1, title: "Advanced React Patterns", type: "Cours", icon: "📚", level: "Intermédiaire" },
      { id: 2, title: "JavaScript Async Mastery", type: "Quiz", icon: "❓", level: "Avancé" },
      { id: 3, title: "CSS Grid & Flexbox", type: "Tutoriel", icon: "📝", level: "Débutant" },
    ],
    recentActivity: [
      { id: 1, text: "Quiz complété : Fondamentaux JavaScript", icon: "🏆", time: "Il y a 2 heures" },
      { id: 2, text: "Obtenu le badge 'Explorateur'", icon: "🎖️", time: "Il y a 1 jour" },
      { id: 3, text: "Terminé le cours React Hooks", icon: "✅", time: "Il y a 3 jours" },
      { id: 4, text: "Nouvelle série de 5 jours consécutifs!", icon: "🔥", time: "Il y a 4 jours" }
    ]
  };

  return (
    <>
      <Header />
      <DashboardContainer>
        <DashboardGrid>
          <MainSection>
            <LevelInfo>
              <LevelBadge>{userData.level}</LevelBadge>
              <LevelContent>
                <LevelTitle>Niveau {userData.level} - Expert Junior</LevelTitle>
                <LevelProgress>
                  {userData.xpCurrent} / {userData.xpToNextLevel} XP vers le niveau {userData.level + 1}
                </LevelProgress>
                <ProgressBarTrack>
                  <ProgressBarFill progress={(userData.xpCurrent / userData.xpToNextLevel) * 100} />
                </ProgressBarTrack>
              </LevelContent>
            </LevelInfo>

            <ProgressCard>
              <CardHeader>
                <CardTitle>Ma Progression</CardTitle>
              </CardHeader>
              <CardContent>
                <ProgressOverview>
                  <ProgressStat>
                    <ProgressValue>{userData.stats.coursesCompleted}</ProgressValue>
                    <ProgressLabel>Cours Complétés</ProgressLabel>
                  </ProgressStat>
                  <ProgressStat>
                    <ProgressValue>{userData.stats.quizzesTaken}</ProgressValue>
                    <ProgressLabel>Quiz Réussis</ProgressLabel>
                  </ProgressStat>
                  <ProgressStat>
                    <ProgressValue>{userData.stats.practiceHours}</ProgressValue>
                    <ProgressLabel>Heures de Pratique</ProgressLabel>
                  </ProgressStat>
                  <ProgressStat>
                    <ProgressValue>{userData.stats.streak}</ProgressValue>
                    <ProgressLabel>Jours Consécutifs</ProgressLabel>
                  </ProgressStat>
                </ProgressOverview>

                <h4>Compétences</h4>
                {userData.skills.map((skill, index) => (
                  <ProgressBarContainer key={index}>
                    <ProgressBarLabel>
                      <span>{skill.name}</span>
                      <span>{skill.progress}%</span>
                    </ProgressBarLabel>
                    <ProgressBarTrack>
                      <ProgressBarFill progress={skill.progress} />
                    </ProgressBarTrack>
                  </ProgressBarContainer>
                ))}
              </CardContent>
            </ProgressCard>

            <AchievementsSection>
              <Card>
                <CardHeader>
                  <CardTitle>Badges & Réalisations</CardTitle>
                </CardHeader>
                <CardContent>
                  <BadgesGrid>
                    {userData.badges.map((badge) => (
                      <BadgeItem key={badge.id}>
                        <BadgeIcon unlocked={badge.unlocked}>{badge.icon}</BadgeIcon>
                        <BadgeName unlocked={badge.unlocked}>{badge.name}</BadgeName>
                      </BadgeItem>
                    ))}
                  </BadgesGrid>
                </CardContent>
              </Card>
            </AchievementsSection>
          </MainSection>

          <SideSection>
            <RecommendationsCard>
              <CardHeader>
                <CardTitle>Recommandé pour vous</CardTitle>
              </CardHeader>
              <CardContent>
                {userData.recommendations.map((item, index) => (
                  <RecommendationItem key={index} to="/courses/1">
                    <RecommendationIcon>{item.icon}</RecommendationIcon>
                    <RecommendationContent>
                      <RecommendationTitle>{item.title}</RecommendationTitle>
                      <RecommendationMeta>
                        {item.type} • {item.level}
                      </RecommendationMeta>
                    </RecommendationContent>
                  </RecommendationItem>
                ))}
              </CardContent>
            </RecommendationsCard>

            <Card>
              <CardHeader>
                <CardTitle>Activité Récente</CardTitle>
              </CardHeader>
              <CardContent>
                <ActivityFeed>
                  {userData.recentActivity.map((activity, index) => (
                    <ActivityItem key={index}>
                      <ActivityIcon>{activity.icon}</ActivityIcon>
                      <ActivityContent>
                        <ActivityText>{activity.text}</ActivityText>
                        <ActivityTime>{activity.time}</ActivityTime>
                      </ActivityContent>
                    </ActivityItem>
                  ))}
                </ActivityFeed>
              </CardContent>
            </Card>
          </SideSection>
        </DashboardGrid>
      </DashboardContainer>
      <Footer />
    </>
  );
};

export default DashboardPage;