import React from 'react';
import Image from 'next/image';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0c1524] text-white pb-20">
        {/* Hero Section */}
        <section className="bg-[#182b4a] py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image 
              src="/images/pattern-bg.svg" 
              alt="Background pattern"
              fill
              className="object-cover"
            />
          </div>
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#FDC758] to-amber-400 bg-clip-text text-transparent">Notre Mission</h1>
            <p className="text-2xl text-gray-300 max-w-3xl leading-relaxed">
              Nous transformons l'éducation grâce à l'intelligence artificielle, 
              permettant à chaque apprenant de progresser à son propre rythme tout 
              en maîtrisant les compétences essentielles du numérique.
            </p>
          </div>
        </section>

        {/* Notre Vision */}
        <section className="py-16 max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#FDC758]">Notre Vision</h2>
              <p className="text-lg mb-6 text-gray-300">
                Chez RavenWise, nous croyons en un futur où l'éducation est personnalisée, 
                accessible et engageante pour tous. Notre plateforme d'apprentissage adaptatif 
                utilise les dernières avancées en IA pour s'adapter aux besoins individuels 
                de chaque utilisateur.
              </p>
              <p className="text-lg text-gray-300">
                Notre objectif est de devenir la référence en matière d'apprentissage 
                personnalisé des compétences numériques, en accompagnant efficacement 
                les apprenants du niveau débutant jusqu'à l'expertise.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl h-80 relative">
              <Image 
                src="/images/about-vision.jpg" 
                alt="Notre vision" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className="py-16 bg-[#121f30]">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-[#FDC758]">Nos Valeurs</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Innovation",
                  icon: "🚀",
                  description: "Nous repoussons constamment les limites de la technologie pour améliorer l'expérience d'apprentissage."
                },
                {
                  title: "Accessibilité",
                  icon: "🌍",
                  description: "Notre plateforme est conçue pour être accessible à tous, quels que soient leur niveau ou leur parcours."
                },
                {
                  title: "Excellence",
                  icon: "✨",
                  description: "Nous nous engageons à fournir des contenus de la plus haute qualité et une expérience utilisateur exceptionnelle."
                }
              ].map((value, index) => (
                <div key={index} className="bg-[#182b4a] p-6 rounded-xl shadow-lg">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Notre Équipe */}
        <section className="py-16 max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#FDC758]">L'Équipe Derrière RavenWise</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "Emma Dubois", role: "CEO & Fondatrice", image: "/images/team/emma.jpg" },
              { name: "Thomas Martin", role: "CTO", image: "/images/team/thomas.jpg" },
              { name: "Sophie Chen", role: "Lead Designer", image: "/images/team/sophie.jpg" },
              { name: "Lucas Fournier", role: "Data Scientist", image: "/images/team/lucas.jpg" }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-4 relative">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-[#FDC758]">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Notre Histoire */}
        <section className="py-16 bg-[#121f30]">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-[#FDC758]">Notre Parcours</h2>
            <div className="space-y-12 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-0.5 before:-ml-px before:h-full before:bg-[#FDC758]">
              {[
                { year: 2021, title: "Naissance de l'idée", description: "Fondation de RavenWise avec l'ambition de révolutionner l'éducation numérique." },
                { year: 2022, title: "Lancement de la version bêta", description: "Premier accès à notre plateforme pour un groupe sélectionné d'utilisateurs." },
                { year: 2023, title: "Expansion et croissance", description: "Élargissement de notre catalogue de cours et amélioration de notre algorithme d'apprentissage adaptatif." },
                { year: 2024, title: "Aujourd'hui", description: "Plus de 10,000 utilisateurs actifs et une communauté grandissante d'apprenants passionnés." }
              ].map((milestone, index) => (
                <div key={index} className="relative pl-10 md:pl-0">
                  <div className="flex flex-col md:flex-row items-start md:items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FDC758] text-[#0c1524] font-bold absolute left-0 md:left-1/2 md:-ml-4 z-10">
                      {index + 1}
                    </div>
                    <div className="md:w-1/2 md:pr-8 md:text-right md:mr-4">
                      {index % 2 === 0 ? (
                        <>
                          <h3 className="text-xl font-bold">{milestone.year}</h3>
                          <h4 className="text-[#FDC758] font-semibold mb-2">{milestone.title}</h4>
                          <p className="text-gray-300">{milestone.description}</p>
                        </>
                      ) : (
                        <div className="md:hidden">
                          <h3 className="text-xl font-bold">{milestone.year}</h3>
                          <h4 className="text-[#FDC758] font-semibold mb-2">{milestone.title}</h4>
                          <p className="text-gray-300">{milestone.description}</p>
                        </div>
                      )}
                    </div>
                    <div className="md:w-1/2 md:pl-12">
                      {index % 2 === 1 ? (
                        <>
                          <h3 className="text-xl font-bold">{milestone.year}</h3>
                          <h4 className="text-[#FDC758] font-semibold mb-2">{milestone.title}</h4>
                          <p className="text-gray-300">{milestone.description}</p>
                        </>
                      ) : (
                        <div className="md:hidden">
                          <h3 className="text-xl font-bold">{milestone.year}</h3>
                          <h4 className="text-[#FDC758] font-semibold mb-2">{milestone.title}</h4>
                          <p className="text-gray-300">{milestone.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}