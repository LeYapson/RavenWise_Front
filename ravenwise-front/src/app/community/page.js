"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

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
          <div className="mb-8">
            {discussions.map(discussion => (
              <Link key={discussion.id} href={`/community/discussions/${discussion.id}`} className="block bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg p-4 mb-6 shadow-md hover:shadow-lg transition-transform duration-300 hover:translate-y-[-5px]">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cover bg-center rounded-full" style={{ backgroundImage: `url(${discussion.author.avatar})` }}></div>
                    <div>
                      <div className="font-semibold text-white">{discussion.author.name}</div>
                      <div className="text-sm text-gray-400">{discussion.date}</div>
                    </div>
                  </div>
                </div>
                <div className="text-xl font-semibold mb-2 text-white">{discussion.title}</div>
                <p className="text-gray-300 mb-4">{discussion.content}</p>
                <div className="flex justify-between text-sm text-gray-300">
                  <div className="flex gap-2">
                    {discussion.tags.map((tag, index) => (
                      <span key={index} className="bg-white/10 text-gray-300 rounded-full px-3 py-1">{tag}</span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <span>💬 {discussion.replies}</span>
                    <span>👁️ {discussion.views}</span>
                    <span>❤️ {discussion.likes}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        );

      case 'members':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {activeMembers.map(member => (
              <Link key={member.id} href={`/community/members/${member.id}`} className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg p-4 text-decoration-none shadow-md hover:shadow-lg transition-transform duration-300 hover:translate-y-[-5px]">
                <div className="text-2xl mb-3 text-yellow-500 flex justify-center">👤</div>
                <h3 className="text-lg mb-2 text-white">{member.name}</h3>
                <p className="text-gray-300 mb-2">{member.title}</p>
                <p className="text-gray-300">{member.bio}</p>
                <div className="flex justify-between text-sm text-gray-300 mt-4">
                  <span>📝 {member.posts}</span>
                  <span>👥 {member.followers}</span>
                </div>
              </Link>
            ))}
          </div>
        );

      case 'events':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {events.map(event => (
              <Link key={event.id} href={`/community/events/${event.id}`} className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 hover:translate-y-[-5px]">
                <div className="w-full h-40 bg-cover bg-center" style={{ backgroundImage: `url(${event.image})` }}>
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-md">{event.date}</div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg mb-2 text-white">{event.title}</h3>
                  <p className="text-gray-300 mb-4">{event.description}</p>
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>🕒 {event.time}</span>
                    <span>📍 {event.location}</span>
                    <span>👥 {event.participants}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        );

      case 'projects':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {projects.map(project => (
              <Link key={project.id} href={`/community/projects/${project.id}`} className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-transform duration-300 hover:translate-y-[-5px]">
                <div className="flex justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-cover bg-center rounded-md" style={{ backgroundImage: `url(${project.logo})` }}></div>
                    <div>
                      <h3 className="text-lg mb-1 text-white">{project.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.status === "En cours" ? "bg-yellow-300 text-yellow-300" : project.status === "Terminé" ? "bg-green-500 text-green-500" : "bg-yellow-500 text-yellow-500"}`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex gap-2 mb-4">
                  {project.members.map((member, index) => (
                    <div key={index} className="w-9 h-9 bg-cover bg-center rounded-full border-2 border-white" style={{ backgroundImage: `url(${member.avatar})` }}></div>
                  ))}
                  <div className="w-9 h-9 bg-white/10 text-gray-300 flex items-center justify-center rounded-full border-2 border-white">+{project.memberCount - project.members.length}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="bg-white/10 text-gray-300 rounded-full px-3 py-1">{tech}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        );

      default:
        return <div>Contenu non disponible</div>;
    }
  };

  return (
    <>
      <Header />
      <div className="p-5 max-w-screen-xl mx-auto">
        <h1 className="text-4xl text-center mb-6">Communauté RavenWise</h1>
        <p className="text-center max-w-2xl mx-auto mb-8 text-lg text-gray-300">
          Rejoignez notre communauté dynamique de développeurs, partagez vos connaissances, posez vos questions, et collaborez sur des projets passionnants.
        </p>

        <div className="flex border-b border-gray-700 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('discussions')}
            className={`px-4 py-2 text-lg ${activeTab === 'discussions' ? 'text-yellow-300 font-semibold border-b-2 border-yellow-300' : 'text-gray-400'}`}
          >
            Discussions
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`px-4 py-2 text-lg ${activeTab === 'members' ? 'text-yellow-300 font-semibold border-b-2 border-yellow-300' : 'text-gray-400'}`}
          >
            Membres Actifs
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 text-lg ${activeTab === 'events' ? 'text-yellow-300 font-semibold border-b-2 border-yellow-300' : 'text-gray-400'}`}
          >
            Événements
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 text-lg ${activeTab === 'projects' ? 'text-yellow-300 font-semibold border-b-2 border-yellow-300' : 'text-gray-400'}`}
          >
            Projets Collaboratifs
          </button>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder={`Rechercher des ${activeTab === 'discussions' ? 'discussions' : activeTab === 'members' ? 'membres' : activeTab === 'events' ? 'événements' : 'projets'}...`}
            className="w-full p-3 bg-white/10 backdrop-blur-md border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:border-yellow-300"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</div>
        </div>

        {renderContent()}
      </div>
      <Footer />
    </>
  );
};

export default Community;
