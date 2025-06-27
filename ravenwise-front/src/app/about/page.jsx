'use client';

import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#0c1524] text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#FDC758] to-amber-400 bg-clip-text text-transparent">
              À propos de RavenWise
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Une plateforme d'e-learning développée dans le cadre d'un projet étudiant, 
              alliant innovation technique et apprentissage moderne.
            </p>
          </div>

          {/* Projet Section */}
          <div className="bg-[#182b4a] rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-[#FDC758]">Notre Projet</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-gray-300 mb-4">
                  RavenWise est née d'un projet académique ambitieux mené dans le cadre du 
                  <strong className="text-[#FDC758]"> Bachelor 3 Développement</strong>. 
                  Cette plateforme illustre l'application pratique des compétences acquises 
                  en développement web moderne.
                </p>
                <p className="text-lg text-gray-300">
                  Le projet vise à démontrer notre capacité à concevoir et développer une 
                  application web complète, intégrant les meilleures pratiques du développement 
                  et une expérience utilisateur soignée.
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#FDC758] to-[#f4a23a] rounded-lg p-8 text-center">
                <div className="text-6xl mb-4">🎓</div>
                <h3 className="text-2xl font-bold text-[#0F1B2A] mb-2">Projet Étudiant</h3>
                <p className="text-[#0F1B2A] opacity-80">Bachelor 3 Développement</p>
              </div>
            </div>
          </div>

          {/* Équipe Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-[#FDC758]">L'Équipe de Développement</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-[#182b4a] p-8 rounded-xl text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-[#FDC758] to-[#f4a23a] rounded-full flex items-center justify-center text-[#0F1B2A] font-bold text-3xl mx-auto mb-6">
                  T
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-white">Théau Yapi</h3>
                <p className="text-[#FDC758] font-medium mb-4">Développeur Frontend</p>
                <p className="text-gray-300">
                  Étudiant en Bachelor 3 Développement, spécialisé dans le développement 
                  d'interfaces utilisateur avec React/Next.js et l'intégration frontend.
                </p>
              </div>

              <div className="bg-[#182b4a] p-8 rounded-xl text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-[#FDC758] to-[#f4a23a] rounded-full flex items-center justify-center text-[#0F1B2A] font-bold text-3xl mx-auto mb-6">
                  D
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-white">Dorian Blatière</h3>
                <p className="text-[#FDC758] font-medium mb-4">Développeur Backend</p>
                <p className="text-gray-300">
                  Étudiant en Bachelor 3 Développement, spécialisé dans le développement 
                  d'API avec NestJS et la gestion de base de données SQLite.
                </p>
              </div>
            </div>
          </div>

          {/* Technologies Section */}
          <div className="bg-[#182b4a] rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-[#FDC758]">Technologies Utilisées</h2>
            
            {/* Tech Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { name: "React", icon: "⚛️", desc: "Interface utilisateur" },
                { name: "Next.js", icon: "🚀", desc: "Framework React" },
                { name: "NestJS", icon: "🐈", desc: "API Backend" },
                { name: "SQLite", icon: "🗄️", desc: "Base de données" },
                { name: "Tailwind", icon: "🎨", desc: "Styling CSS" },
                { name: "Clerk", icon: "🔐", desc: "Authentification" },
                { name: "TypeScript", icon: "📘", desc: "Typage statique" },
                { name: "Prisma", icon: "🔧", desc: "ORM Database" }
              ].map((tech, index) => (
                <div key={index} className="bg-[#0c1524] p-4 rounded-lg text-center hover:bg-[#1a2332] transition-colors">
                  <div className="text-3xl mb-2">{tech.icon}</div>
                  <h3 className="font-bold text-lg mb-1 text-white">{tech.name}</h3>
                  <p className="text-sm text-gray-400">{tech.desc}</p>
                </div>
              ))}
            </div>

            {/* Architecture */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#0c1524] p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-[#FDC758]">Frontend (Théau)</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Interface utilisateur avec React & Next.js</li>
                  <li>• Design responsive avec Tailwind CSS</li>
                  <li>• Système d'authentification avec Clerk</li>
                  <li>• Gestion d'état et routage moderne</li>
                  <li>• Intégration API et composants réutilisables</li>
                </ul>
              </div>
              
              <div className="bg-[#0c1524] p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-[#FDC758]">Backend (Dorian)</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• API REST robuste avec NestJS</li>
                  <li>• Base de données SQLite avec Prisma ORM</li>
                  <li>• Authentification et autorisation sécurisées</li>
                  <li>• Gestion des utilisateurs et contenus</li>
                  <li>• Architecture modulaire et évolutive</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Objectifs Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8 text-[#FDC758]">Objectifs du Projet</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#182b4a] p-6 rounded-lg">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-bold mb-3 text-white">Innovation Technique</h3>
                <p className="text-gray-300">
                  Utiliser les technologies web modernes pour créer une expérience utilisateur optimale.
                </p>
              </div>
              
              <div className="bg-[#182b4a] p-6 rounded-lg">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-3 text-white">Apprentissage Pratique</h3>
                <p className="text-gray-300">
                  Appliquer les connaissances théoriques dans un projet concret et fonctionnel.
                </p>
              </div>
              
              <div className="bg-[#182b4a] p-6 rounded-lg">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-3 text-white">Développement Complet</h3>
                <p className="text-gray-300">
                  Maîtriser toute la chaîne de développement d'une application moderne.
                </p>
              </div>
            </div>
            
            <div className="mt-12 bg-[#182b4a] p-8 rounded-xl">
              <p className="text-lg text-gray-300">
                Ce projet a été réalisé dans le cadre du <strong className="text-[#FDC758]">projet annuel</strong> de 
                Bachelor 3 Développement, démontrant notre capacité à concevoir et développer 
                une application web complète et fonctionnelle répondant aux standards actuels de l'industrie.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}