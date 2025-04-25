import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Marie Dupont",
      role: "Étudiante en informatique",
      avatar: "MD",
      text: "RavenWise a complètement transformé ma façon d'apprendre. Les parcours personnalisés m'ont vraiment aidée à progresser à mon rythme."
    },
    {
      name: "Thomas Martin",
      role: "Développeur web",
      avatar: "TM",
      text: "Ce qui me plaît le plus c'est la communauté et les défis. Cela me pousse à me dépasser et à toujours aller plus loin."
    },
    {
      name: "Sophie Leroux",
      role: "Professeur de sciences",
      avatar: "SL",
      text: "En tant qu'enseignante, je recommande RavenWise à tous mes élèves. La plateforme s'adapte vraiment aux besoins de chacun."
    }
  ];

  return (
    <section className="py-16 bg-[#0F1B2A]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          Ce que disent nos utilisateurs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-[#1B2A3B] p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#FDC758] flex items-center justify-center text-[#0F1B2A] font-bold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{testimonial.name}</h3>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;