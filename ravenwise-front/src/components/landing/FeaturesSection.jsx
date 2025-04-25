import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      icon: "🧠",
      title: "Apprentissage adaptatif",
      description: "Notre IA analyse votre progression et adapte le contenu pour optimiser votre apprentissage."
    },
    {
      icon: "📊",
      title: "Suivi de progression",
      description: "Visualisez votre évolution à travers des statistiques détaillées et des graphiques intuitifs."
    },
    {
      icon: "👥",
      title: "Communauté active",
      description: "Échangez avec d'autres apprenants, participez à des défis et collaborez sur des projets."
    },
    {
      icon: "🏆",
      title: "Système de récompenses",
      description: "Gagnez des badges et des points d'expérience pour rester motivé dans votre parcours."
    }
  ];

  return (
    <section className="py-16 bg-[#131F2E]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Fonctionnalités adaptées à votre apprentissage
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Découvrez comment RavenWise transforme l'expérience d'apprentissage grâce à ses fonctionnalités innovantes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-[#1B2A3B] p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;