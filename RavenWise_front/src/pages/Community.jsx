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

const IntroText = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
  font-size: 1.1rem;
  color: var(--text-secondary);
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid var(--border);
  margin-bottom: 2rem;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
`;

const Tab = styled.button`
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  color: ${props => props.active ? 'var(--accent-primary)' : 'var(--text-secondary)'};
  font-weight: ${props => props.active ? '600' : '400'};
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  transition: color 0.3s ease;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.active ? 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))' : 'transparent'};
    border-radius: 2px 2px 0 0;
  }
  
  &:hover {
    color: var(--accent-primary);
  }
`;

const SearchBar = styled.div`
  margin-bottom: 2rem;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background-color: var(--glassmorphism);
  backdrop-filter: blur(15px);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--accent-primary);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
`;

const DiscussionContainer = styled.div`
  margin-bottom: 3rem;
`;

const DiscussionCard = styled(Link)`
  display: block;
  background-color: var(--glassmorphism);
  backdrop-filter: blur(15px);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: transform var(--transition-base) ease, box-shadow var(--transition-base) ease;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
  
  &:after {
    display: none;
  }
`;

const DiscussionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const DiscussionAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const AuthorAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #141e2f;
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.div`
  font-weight: 600;
  color: var(--text-primary);
`;

const PostDate = styled.div`
  font-size: 0.85rem;
  color: var(--text-secondary);
`;

const DiscussionTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
`;

const DiscussionContent = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  line-height: 1.6;
`;

const DiscussionFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-secondary);
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-primary);
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ActiveMembersContainer = styled.div`
  margin-bottom: 3rem;
`;

const MembersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
`;

const MemberCard = styled(Link)`
  background-color: var(--glassmorphism);
  backdrop-filter: blur(15px);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform var(--transition-base) ease, box-shadow var(--transition-base) ease;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
  
  &:after {
    display: none;
  }
`;

const MemberAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 1rem;
  background-color: #141e2f;
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
  border: 2px solid var(--accent-primary);
`;

const MemberName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
`;

const MemberTitle = styled.div`
  color: var(--accent-primary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const MemberBio = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const MemberStats = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-top: auto;
`;

const EventsContainer = styled.div`
  margin-bottom: 3rem;
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const EventCard = styled(Link)`
  background-color: var(--glassmorphism);
  backdrop-filter: blur(15px);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform var(--transition-base) ease, box-shadow var(--transition-base) ease;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
  
  &:after {
    display: none;
  }
`;

const EventImage = styled.div`
  width: 100%;
  height: 160px;
  background-color: #141e2f;
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
  position: relative;
`;

const EventDate = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
`;

const EventContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const EventTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
`;

const EventDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  flex: 1;
`;

const EventFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  border-top: 1px solid var(--border);
  padding-top: 1rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const ProjectsContainer = styled.div`
  margin-bottom: 3rem;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(Link)`
  background-color: var(--glassmorphism);
  backdrop-filter: blur(15px);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform var(--transition-base) ease, box-shadow var(--transition-base) ease;
  text-decoration: none;
  padding: 1.5rem;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
  
  &:after {
    display: none;
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ProjectLogo = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background-color: #141e2f;
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
  margin-right: 1rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
`;

const ProjectStatus = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${props => {
    if (props.status === "En cours") return "rgba(37, 99, 235, 0.2)";
    if (props.status === "Terminé") return "rgba(16, 185, 129, 0.2)";
    if (props.status === "En planification") return "rgba(245, 158, 11, 0.2)";
    return "rgba(37, 99, 235, 0.2)";
  }};
  color: ${props => {
    if (props.status === "En cours") return "#60a5fa";
    if (props.status === "Terminé") return "#34d399";
    if (props.status === "En planification") return "#fbbf24";
    return "#60a5fa";
  }};
`;

const ProjectDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ProjectMemberList = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

const ProjectMember = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid var(--bg-primary);
  background-color: #141e2f;
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
  margin-left: -10px;
  
  &:first-child {
    margin-left: 0;
  }
`;

const ProjectMemberCount = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  margin-left: -10px;
`;

const ProjectTechList = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: auto;
`;

const TechTag = styled.span`
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-secondary);
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
`;

const Community = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  
  // Données pour les discussions
  const discussions = [
    {
      id: 1,
      title: "Comment optimiser les performances de React avec Suspense ?",
      content: "J'essaie d'améliorer les performances de mon application React et j'aimerais savoir si quelqu'un a des conseils sur l'utilisation de Suspense pour le lazy loading...",
      author: {
        name: "AlexDev",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      date: "Il y a 2 heures",
      tags: ["React", "Performance", "Frontend"],
      replies: 12,
      views: 243,
      likes: 28
    },
    {
      id: 2,
      title: "Meilleures pratiques pour la sécurité des API avec Node.js",
      content: "Je travaille sur une API RESTful avec Express et j'aimerais connaître les meilleures pratiques pour la sécuriser contre les attaques courantes comme XSS, CSRF, injections SQL...",
      author: {
        name: "SophieTech",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      date: "Hier",
      tags: ["Node.js", "Sécurité", "API", "Backend"],
      replies: 18,
      views: 356,
      likes: 45
    },
    {
      id: 3,
      title: "Retour d'expérience : Migration d'une app monolithique vers des microservices",
      content: "Notre équipe vient de terminer la migration d'une application monolithique vers une architecture microservices et je voulais partager notre expérience, les défis rencontrés...",
      author: {
        name: "DevOpsGuru",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg"
      },
      date: "Il y a 3 jours",
      tags: ["Microservices", "Architecture", "DevOps"],
      replies: 24,
      views: 512,
      likes: 78
    }
  ];
  
  // Données pour les membres actifs
  const activeMembers = [
    {
      id: 1,
      name: "AlexDev",
      title: "Expert Frontend",
      bio: "Développeur React passionné avec 5 ans d'expérience. Contribue activement aux projets open source.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      posts: 128,
      followers: 543
    },
    {
      id: 2,
      name: "SophieTech",
      title: "Architecte Backend",
      bio: "Spécialiste Node.js et bases de données. Aime partager ses connaissances sur l'optimisation des API.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      posts: 96,
      followers: 412
    },
    {
      id: 3,
      name: "DevOpsGuru",
      title: "Expert Cloud & DevOps",
      bio: "Passionné par l'automatisation, les conteneurs et l'infrastructure as code. AWS Certified Solutions Architect.",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      posts: 76,
      followers: 324
    },
    {
      id: 4,
      name: "AIResearcher",
      title: "Data Scientist",
      bio: "Spécialiste en machine learning et NLP. Travaille sur des projets innovants combinant IA et développement web.",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      posts: 64,
      followers: 287
    }
  ];
  
  // Données pour les événements
  const events = [
    {
      id: 1,
      title: "Workshop: Développement Web avec React 18",
      description: "Un atelier pratique pour découvrir les nouvelles fonctionnalités de React 18 et comment les intégrer dans vos projets.",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      date: "15 Avril 2025",
      time: "14h - 17h",
      location: "En ligne",
      participants: 64
    },
    {
      id: 2,
      title: "Meetup: DevOps & Cloud Native",
      description: "Échangez avec des experts sur les dernières tendances en matière de DevOps, Kubernetes et architecture cloud native.",
      image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      date: "22 Avril 2025",
      time: "18h30 - 21h",
      location: "Paris",
      participants: 48
    },
    {
      id: 3,
      title: "Hackathon: IA pour le Développement Durable",
      description: "48h pour créer des solutions innovantes utilisant l'IA au service des objectifs de développement durable.",
      image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      date: "5-7 Mai 2025",
      time: "Tout le weekend",
      location: "Lyon",
      participants: 120
    }
  ];
  
  // Données pour les projets
  const projects = [
    {
      id: 1,
      title: "EcoTrack",
      description: "Application de suivi d'empreinte carbone avec recommandations personnalisées pour réduire son impact environnemental.",
      logo: "https://via.placeholder.com/60",
      status: "En cours",
      members: [
        { avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
        { avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
        { avatar: "https://randomuser.me/api/portraits/men/67.jpg" }
      ],
      memberCount: 8,
      technologies: ["React", "Node.js", "MongoDB", "TensorFlow"]
    },
    {
      id: 2,
      title: "CodeMentor",
      description: "Plateforme de mentorat pour développeurs débutants, mettant en relation des mentors expérimentés avec des apprenants.",
      logo: "https://via.placeholder.com/60",
      status: "En planification",
      members: [
        { avatar: "https://randomuser.me/api/portraits/women/28.jpg" },
        { avatar: "https://randomuser.me/api/portraits/men/45.jpg" }
      ],
      memberCount: 5,
      technologies: ["Vue.js", "Express", "PostgreSQL", "WebRTC"]
    },
    {
      id: 3,
      title: "HealthTracker",
      description: "Système de suivi de santé open source avec intégration d'objets connectés et visualisation de données avancée.",
      logo: "https://via.placeholder.com/60",
      status: "Terminé",
      members: [
        { avatar: "https://randomuser.me/api/portraits/men/67.jpg" },
        { avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
        { avatar: "https://randomuser.me/api/portraits/men/32.jpg" }
      ],
      memberCount: 6,
      technologies: ["React Native", "GraphQL", "Firebase", "D3.js"]
    }
  ];

  // Affichage du contenu en fonction de l'onglet actif
  const renderContent = () => {
    switch(activeTab) {
      case 'discussions':
        return (
          <DiscussionContainer>
            {discussions.map(discussion => (
              <DiscussionCard key={discussion.id} to={`/community/discussions/${discussion.id}`}>
                <DiscussionHeader>
                  <DiscussionAuthor>
                    <AuthorAvatar image={discussion.author.avatar} />
                    <AuthorInfo>
                      <AuthorName>{discussion.author.name}</AuthorName>
                      <PostDate>{discussion.date}</PostDate>
                    </AuthorInfo>
                  </DiscussionAuthor>
                </DiscussionHeader>
                <DiscussionTitle>{discussion.title}</DiscussionTitle>
                <DiscussionContent>{discussion.content}</DiscussionContent>
                <DiscussionFooter>
                  <TagsContainer>
                    {discussion.tags.map((tag, index) => (
                      <Tag key={index}>{tag}</Tag>
                    ))}
                  </TagsContainer>
                  <StatsContainer>
                    <Stat>💬 {discussion.replies} réponses</Stat>
                    <Stat>👁️ {discussion.views} vues</Stat>
                    <Stat>❤️ {discussion.likes} likes</Stat>
                  </StatsContainer>
                </DiscussionFooter>
              </DiscussionCard>
            ))}
          </DiscussionContainer>
        );
      
      case 'members':
        return (
          <ActiveMembersContainer>
            <MembersGrid>
              {activeMembers.map(member => (
                <MemberCard key={member.id} to={`/community/members/${member.id}`}>
                  <MemberAvatar image={member.avatar} />
                  <MemberName>{member.name}</MemberName>
                  <MemberTitle>{member.title}</MemberTitle>
                  <MemberBio>{member.bio}</MemberBio>
                  <MemberStats>
                    <span>📝 {member.posts} posts</span>
                    <span>👥 {member.followers} abonnés</span>
                  </MemberStats>
                </MemberCard>
              ))}
            </MembersGrid>
          </ActiveMembersContainer>
        );
      
      case 'events':
        return (
          <EventsContainer>
            <EventsGrid>
              {events.map(event => (
                <EventCard key={event.id} to={`/community/events/${event.id}`}>
                  <EventImage image={event.image}>
                    <EventDate>{event.date}</EventDate>
                  </EventImage>
                  <EventContent>
                    <EventTitle>{event.title}</EventTitle>
                    <EventDescription>{event.description}</EventDescription>
                    <EventFooter>
                      <span>🕒 {event.time}</span>
                      <span>📍 {event.location}</span>
                      <span>👥 {event.participants} participants</span>
                    </EventFooter>
                  </EventContent>
                </EventCard>
              ))}
            </EventsGrid>
          </EventsContainer>
        );
      
      case 'projects':
        return (
          <ProjectsContainer>
            <ProjectsGrid>
              {projects.map(project => (
                <ProjectCard key={project.id} to={`/community/projects/${project.id}`}>
                  <ProjectHeader>
                    <div style={{ display: 'flex' }}>
                      <ProjectLogo image={project.logo} />
                      <div>
                        <ProjectTitle>{project.title}</ProjectTitle>
                        <ProjectStatus status={project.status}>{project.status}</ProjectStatus>
                      </div>
                    </div>
                  </ProjectHeader>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <ProjectMemberList>
                    {project.members.map((member, index) => (
                      <ProjectMember key={index} image={member.avatar} />
                    ))}
                    <ProjectMemberCount>+{project.memberCount - project.members.length}</ProjectMemberCount>
                  </ProjectMemberList>
                  <ProjectTechList>
                    {project.technologies.map((tech, index) => (
                      <TechTag key={index}>{tech}</TechTag>
                    ))}
                  </ProjectTechList>
                </ProjectCard>
              ))}
            </ProjectsGrid>
          </ProjectsContainer>
        );
      
      default:
        return <div>Contenu non disponible</div>;
    }
  };

  return (
    <>
      <Header />
      <MainContainer>
        <PageTitle>Communauté RavenWise</PageTitle>
        <IntroText>
          Rejoignez notre communauté dynamique de développeurs, partagez vos connaissances, posez vos questions, et collaborez sur des projets passionnants.
        </IntroText>
        
        <TabContainer>
          <Tab 
            active={activeTab === 'discussions'} 
            onClick={() => setActiveTab('discussions')}
          >
            Discussions
          </Tab>
          <Tab 
            active={activeTab === 'members'} 
            onClick={() => setActiveTab('members')}
          >
            Membres Actifs
          </Tab>
          <Tab 
            active={activeTab === 'events'} 
            onClick={() => setActiveTab('events')}
          >
            Événements
          </Tab>
          <Tab 
            active={activeTab === 'projects'} 
            onClick={() => setActiveTab('projects')}
          >
            Projets Collaboratifs
          </Tab>
        </TabContainer>
        
        <SearchBar>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput placeholder={`Rechercher des ${activeTab === 'discussions' ? 'discussions' : activeTab === 'members' ? 'membres' : activeTab === 'events' ? 'événements' : 'projets'}...`} />
        </SearchBar>
        
        {renderContent()}
      </MainContainer>
      <Footer />
    </>
  );
};

export default Community;