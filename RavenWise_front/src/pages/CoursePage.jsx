import React from 'react';
import styled from 'styled-components';
import Header from '../components/common/Header';
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

const FeaturedCoursesContainer = styled.div`
  margin-bottom: 3rem;
`;

const FeaturedCourse = styled.div`
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

const FeaturedCourseImage = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  background-color: #141e2f;
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
  
  @media (min-width: 768px) {
    width: 300px;
  }
`;

const FeaturedCourseContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const FeaturedBadge = styled.span`
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  display: inline-block;
  margin-bottom: 0.75rem;
  align-self: flex-start;
`;

const CourseTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
`;

const CourseDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const CourseStats = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: auto;
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const CourseStat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CourseButton = styled(Link)`
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

const CategoriesContainer = styled.div`
  margin-bottom: 3rem;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
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
  margin-bottom: 0;
`;

const CoursesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const CourseCard = styled(Link)`
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

const CourseCardImage = styled.div`
  width: 100%;
  height: 160px;
  background-color: #141e2f;
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
`;

const CourseCardContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CourseCardCategory = styled.div`
  color: var(--accent-primary);
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
`;

const CourseCardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
`;

const CourseCardDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  flex: 1;
`;

const CourseCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  font-size: 0.85rem;
`;

const CoursePage = () => {
  // Données pour les cours en vedette
  const featuredCourses = [
    {
      id: 1,
      title: "Maîtriser React avec les dernières fonctionnalités de 2025",
      description: "Apprenez à créer des applications React modernes avec les hooks, le context API, et les derniers patterns de développement recommandés par l'équipe React.",
      image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      duration: "12 heures",
      lessons: 48,
      level: "Intermédiaire",
      category: "Développement Web"
    },
    {
      id: 2,
      title: "DevOps Complet : Docker, Kubernetes et CI/CD",
      description: "Construisez un pipeline CI/CD complet en utilisant Docker, Kubernetes, GitLab CI, et apprenez les meilleures pratiques pour déployer vos applications en production.",
      image: "https://images.unsplash.com/photo-1605496036006-fa36378ca4ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      duration: "24 heures",
      lessons: 96,
      level: "Avancé",
      category: "DevOps"
    }
  ];
  
  // Données pour les catégories de cours
  const categories = [
    {
      id: 1,
      title: "Développement Web",
      description: "HTML, CSS, JavaScript, React, Vue, Angular, et plus",
      icon: "🌐",
      courses: 24
    },
    {
      id: 2,
      title: "Développement Backend",
      description: "Node.js, Python, PHP, Java, Spring, et plus",
      icon: "⚙️",
      courses: 18
    },
    {
      id: 3,
      title: "DevOps",
      description: "Docker, Kubernetes, CI/CD, AWS, Azure, et plus",
      icon: "🔄",
      courses: 12
    },
    {
      id: 4,
      title: "Data Science",
      description: "Python, R, Machine Learning, Data Visualization, et plus",
      icon: "📊",
      courses: 16
    },
    {
      id: 5,
      title: "Mobile",
      description: "React Native, Flutter, Swift, Kotlin, et plus",
      icon: "📱",
      courses: 14
    },
    {
      id: 6,
      title: "Sécurité",
      description: "Ethical Hacking, Cryptographie, Sécurité Web, et plus",
      icon: "🔒",
      courses: 10
    }
  ];
  
  // Données pour les cours populaires
  const popularCourses = [
    {
      id: 1,
      title: "Développement Web Fullstack",
      description: "Maîtrisez HTML, CSS, JavaScript et Node.js pour créer des applications web complètes.",
      category: "Développement Web",
      level: "Débutant",
      price: "Gratuit",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 2,
      title: "React: De Zéro à Expert",
      description: "Apprenez les bases et techniques avancées de React pour créer des interfaces modernes.",
      category: "Développement Web",
      level: "Intermédiaire",
      price: "Premium",
      image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 3,
      title: "API RESTful avec Node.js",
      description: "Créez des API robustes avec Express, MongoDB et les bonnes pratiques.",
      category: "Développement Backend",
      level: "Intermédiaire",
      price: "Premium",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 4,
      title: "Docker pour Développeurs",
      description: "Conteneurisez vos applications et maîtrisez l'écosystème Docker.",
      category: "DevOps",
      level: "Intermédiaire",
      price: "Premium",
      image: "https://images.unsplash.com/photo-1600267204091-5c1ab8b10c02?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 5,
      title: "Python pour la Data Science",
      description: "Manipulez et analysez des données avec pandas, numpy et matplotlib.",
      category: "Data Science",
      level: "Débutant",
      price: "Gratuit",
      image: "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 6,
      title: "Flutter: Développement Mobile",
      description: "Créez des applications mobiles natives pour iOS et Android avec Flutter.",
      category: "Mobile",
      level: "Intermédiaire",
      price: "Premium",
      image: "https://images.unsplash.com/photo-1610664921895-c5756b5b2817?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  return (
    <>
      <Header />
      <MainContainer>
        <PageTitle>Explorez nos cours</PageTitle>
        
        {/* Section des cours en vedette */}
        <SectionTitle>Cours du jour</SectionTitle>
        <FeaturedCoursesContainer>
          {featuredCourses.map(course => (
            <FeaturedCourse key={course.id}>
              <FeaturedCourseImage image={course.image} />
              <FeaturedCourseContent>
                <FeaturedBadge>En vedette</FeaturedBadge>
                <CourseTitle>{course.title}</CourseTitle>
                <CourseDescription>{course.description}</CourseDescription>
                <CourseStats>
                  <CourseStat>⏱️ {course.duration}</CourseStat>
                  <CourseStat>📚 {course.lessons} leçons</CourseStat>
                  <CourseStat>🏆 {course.level}</CourseStat>
                </CourseStats>
                <CourseButton to={`/courses/${course.id}`}>Commencer le cours</CourseButton>
              </FeaturedCourseContent>
            </FeaturedCourse>
          ))}
        </FeaturedCoursesContainer>
        
        {/* Section des catégories */}
        <SectionTitle>Explorez par univers</SectionTitle>
        <CategoriesContainer>
          <CategoryGrid>
            {categories.map(category => (
              <CategoryCard key={category.id} to={`/courses/category/${category.id}`}>
                <CategoryIcon>{category.icon}</CategoryIcon>
                <CategoryTitle>{category.title}</CategoryTitle>
                <CategoryDescription>{category.description}</CategoryDescription>
                <CategoryDescription>{category.courses} cours disponibles</CategoryDescription>
              </CategoryCard>
            ))}
          </CategoryGrid>
        </CategoriesContainer>
        
        {/* Section des cours populaires */}
        <SectionTitle>Cours populaires</SectionTitle>
        <CoursesList>
          {popularCourses.map(course => (
            <CourseCard key={course.id} to={`/courses/${course.id}`}>
              <CourseCardImage image={course.image} />
              <CourseCardContent>
                <CourseCardCategory>{course.category}</CourseCardCategory>
                <CourseCardTitle>{course.title}</CourseCardTitle>
                <CourseCardDescription>{course.description}</CourseCardDescription>
                <CourseCardFooter>
                  <span>🏆 {course.level}</span>
                  <span style={{ color: course.price === 'Gratuit' ? '#4ade80' : '#f59e0b' }}>
                    {course.price}
                  </span>
                </CourseCardFooter>
              </CourseCardContent>
            </CourseCard>
          ))}
        </CoursesList>
      </MainContainer>
    </>
  );
};

export default CoursePage;