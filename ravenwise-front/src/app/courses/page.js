// app/page.js
import React from 'react';
import Link from 'next/link';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

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
      image: "https://images.unsplash.com/photo-1605496036006-fa3601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
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
      <div className="p-5 max-w-screen-xl mx-auto">
        <h1 className="text-4xl text-center mb-6">Explorez nos cours</h1>

        {/* Section des cours en vedette */}
        <h2 className="text-2xl mb-4 relative after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-15 after:h-1 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:rounded-full">
          Cours du jour
        </h2>
        <div className="mb-8">
          {featuredCourses.map(course => (
            <div
              key={course.id}
              className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg p-5 mb-6 flex flex-col md:flex-row gap-6 shadow-md hover:shadow-lg transition-transform duration-300 hover:translate-y-[-5px]"
            >
              <div
                className="w-full md:w-64 h-48 md:h-40 bg-cover bg-center rounded-md flex-shrink-0"
                style={{ backgroundImage: `url(${course.image})` }}
              ></div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">
                    En vedette
                  </span>
                  <h3 className="text-xl mb-2">{course.title}</h3>
                  <p className="text-gray-300 mb-4">{course.description}</p>
                  <div className="flex gap-4 text-sm text-gray-300">
                    <span>⏱️ {course.duration}</span>
                    <span>📚 {course.lessons} leçons</span>
                    <span>🏆 {course.level}</span>
                  </div>
                </div>
                <Link href={`/courses/${course.id}`} className="mt-4 inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-md shadow-md hover:shadow-lg transition-transform duration-300 hover:translate-y-[-2px]">
                  Commencer le cours
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Section des catégories */}
        <h2 className="text-2xl mb-4 relative after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-15 after:h-1 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:rounded-full">
          Explorez par univers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {categories.map(category => (
            <Link
              key={category.id}
              href={`/courses/category/${category.id}`}
              className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg p-4 text-decoration-none shadow-md hover:shadow-lg transition-transform duration-300 hover:translate-y-[-5px] relative overflow-hidden"
            >
              <div className="text-2xl mb-3 text-blue-500">{category.icon}</div>
              <h3 className="text-lg mb-2 text-white">{category.title}</h3>
              <p className="text-gray-300 mb-2">{category.description}</p>
              <p className="text-gray-300">{category.courses} cours disponibles</p>
            </Link>
          ))}
        </div>

        {/* Section des cours populaires */}
        <h2 className="text-2xl mb-4 relative after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-15 after:h-1 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:rounded-full">
          Cours populaires
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularCourses.map(course => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 hover:translate-y-[-5px]"
            >
              <div
                className="w-full h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${course.image})` }}
              ></div>
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-purple-300 mb-2">{course.category}</p>
                  <h3 className="text-lg mb-2 text-white">{course.title}</h3>
                  <p className="text-gray-300 mb-4">{course.description}</p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                  <span className="text-sm text-gray-300">🏆 {course.level}</span>
                  <span className="text-sm" style={{ color: course.price === 'Gratuit' ? '#4ade80' : '#f59e0b' }}>
                    {course.price}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CoursePage;
