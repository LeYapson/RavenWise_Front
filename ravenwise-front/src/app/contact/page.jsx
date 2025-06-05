"use client";

import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Support général",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulation d'envoi du formulaire
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Formulaire soumis:", formData);
    setSubmitted(true);
    setLoading(false);
  };

  // Définition des réseaux sociaux
  const socialNetworks = [
    { name: "Twitter", icon: "twitter" },
    { name: "LinkedIn", icon: "linkedin" },
    { name: "GitHub", icon: "github" },
    { name: "Instagram", icon: "instagram" }
  ];

  // Définition des FAQs
  const faqs = [
    {
      q: "Comment débuter avec RavenWise ?",
      a: "Pour commencer, il vous suffit de créer un compte gratuit et de suivre notre guide d'intégration qui vous aidera à choisir les cours adaptés à votre niveau et à vos objectifs."
    },
    {
      q: "Proposez-vous des cours gratuits ?",
      a: "Oui, nous proposons plusieurs cours d'introduction gratuits pour vous permettre de découvrir notre plateforme sans engagement."
    },
    {
      q: "Comment fonctionne l'apprentissage adaptatif ?",
      a: "Notre plateforme analyse votre progression et adapte le contenu des cours à votre rythme d'apprentissage et à vos forces/faiblesses pour optimiser votre progression."
    },
    {
      q: "Puis-je obtenir un certificat à la fin d'un cours ?",
      a: "Absolument ! Tous nos cours complets sont accompagnés d'un certificat de réussite que vous pouvez partager sur votre CV ou sur LinkedIn."
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0c1524] text-white py-10">
        {/* Hero Banner */}
        <section className="bg-[#182b4a] py-16 mb-10">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez-nous</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Nous sommes là pour vous aider. Envoyez-nous un message et notre équipe vous répondra dans les plus brefs délais.
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Coordonnées et infos */}
            <div className="md:col-span-1">
              <div className="bg-[#182b4a] rounded-lg p-6 shadow-lg mb-6">
                <h2 className="text-2xl font-bold mb-6 text-[#FDC758]">Nos coordonnées</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-[#1D2D40] p-3 rounded-lg mr-4">
                      <svg className="w-5 h-5 text-[#FDC758]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-gray-300">contact@ravenwise.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#1D2D40] p-3 rounded-lg mr-4">
                      <svg className="w-5 h-5 text-[#FDC758]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Téléphone</h3>
                      <p className="text-gray-300">+33 1 23 45 67 89</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#1D2D40] p-3 rounded-lg mr-4">
                      <svg className="w-5 h-5 text-[#FDC758]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Adresse</h3>
                      <p className="text-gray-300">123 rue de la Tech</p>
                      <p className="text-gray-300">75001 Paris, France</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div className="bg-[#182b4a] rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-[#FDC758]">Suivez-nous</h2>
                <div className="flex space-x-4">
                  {socialNetworks.map((social, index) => (
                    <a href="#" key={index} className="bg-[#1D2D40] p-3 rounded-lg hover:bg-[#263c58] transition-colors">
                      <span className="sr-only">{social.name}</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <div className="md:col-span-2">
              <div className="bg-[#182b4a] rounded-lg p-6 shadow-lg">
                {submitted ? (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h2 className="text-2xl font-bold mb-2 text-[#FDC758]">Message envoyé !</h2>
                    <p className="text-lg text-gray-300">
                      Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="mt-6 px-4 py-2 bg-[#1D2D40] rounded-lg hover:bg-[#263c58] transition-colors"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-2 font-medium">Nom complet</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full p-3 bg-[#0c1524] border border-[#1D2D40] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDC758]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block mb-2 font-medium">Adresse email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full p-3 bg-[#0c1524] border border-[#1D2D40] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDC758]"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-medium">Sujet</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full p-3 bg-[#0c1524] border border-[#1D2D40] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDC758]"
                      >
                        <option value="Support général">Support général</option>
                        <option value="Question technique">Question technique</option>
                        <option value="Partenariat">Partenariat</option>
                        <option value="Facturation">Facturation</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-medium">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="6"
                        className="w-full p-3 bg-[#0c1524] border border-[#1D2D40] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDC758] resize-none"
                        required
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-3 px-4 bg-[#FDC758] text-[#0F1B2A] font-bold rounded-lg hover:bg-opacity-90 transition-colors flex justify-center items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#0F1B2A]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Envoi en cours...
                        </>
                      ) : 'Envoyer le message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="my-16">
            <h2 className="text-2xl font-bold mb-8 text-center text-[#FDC758]">Questions fréquentes</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-[#182b4a] p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-3">{faq.q}</h3>
                  <p className="text-gray-300">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}