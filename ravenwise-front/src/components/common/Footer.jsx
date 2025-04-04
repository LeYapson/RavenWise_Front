// components/common/Footer.js
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0c1524] border-t-2 border-[#334155] text-[#FDC758] p-6">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Logo and Description */}
        <div className="flex flex-col items-start mb-4">
          <div className="flex items-center mb-3">
            <span className="text-white font-bold text-3xl mr-1">Raven</span>
            <span className="text-[#FDC758] font-bold text-3xl">Wise</span>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            RavenWise est une plateforme d'apprentissage moderne qui combine l'IA et la pédagogie pour offrir des cours adaptés au rythme de chaque apprenant.
          </p>
          <div className="flex gap-3">
            {/* Social Links */}
            <a href="#" aria-label="Facebook" className="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" aria-label="Twitter" className="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="#" aria-label="GitHub" className="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-start mb-4">
          <h3 className="text-lg font-semibold mb-4 relative after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-10 after:h-[3px] after:bg-gradient-to-r after:from-[#FDC758] after:to-[#e0b347] after:rounded-full">
            Liens Rapides
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-gray-400 hover:text-[#FDC758] transition-colors duration-300">Accueil</Link>
            </li>
            <li>
              <Link href="/courses" className="text-gray-400 hover:text-[#FDC758] transition-colors duration-300">Cours</Link>
            </li>
            <li>
              <Link href="/quiz" className="text-gray-400 hover:text-[#FDC758] transition-colors duration-300">Quiz</Link>
            </li>
            <li>
              <Link href="/community" className="text-gray-400 hover:text-[#FDC758] transition-colors duration-300">Communauté</Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-400 hover:text-[#FDC758] transition-colors duration-300">À propos</Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-400 hover:text-[#FDC758] transition-colors duration-300">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-start mb-4">
          <h3 className="text-lg font-semibold mb-4 relative after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-10 after:h-[3px] after:bg-gradient-to-r after:from-[#FDC758] after:to-[#e0b347] after:rounded-full">
            Contact
          </h3>
          <div className="flex items-start gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span className="text-sm text-gray-400">
              123 Avenue de l'Innovation<br />
              75000 Paris, France
            </span>
          </div>
          <div className="flex items-start gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span className="text-sm text-gray-400">+33 (0)1 23 45 67 89</span>
          </div>
          <div className="flex items-start gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span className="text-sm text-gray-400">contact@ravenwise.com</span>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col items-start mb-4">
          <h3 className="text-lg font-semibold mb-4 relative after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-10 after:h-[3px] after:bg-gradient-to-r after:from-[#FDC758] after:to-[#e0b347] after:rounded-full">
            Newsletter
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Inscrivez-vous à notre newsletter pour recevoir les dernières actualités, cours et événements.
          </p>
          <form className="flex flex-col gap-2">
            <input type="email" placeholder="Votre adresse email" required className="bg-[#132238] border border-gray-600 text-gray-400 rounded-md p-2 focus:outline-none focus:border-[#FDC758]" />
            <button type="submit" className="bg-gradient-to-r from-[#FDC758] to-[#e0b347] text-white rounded-md p-2 hover:shadow-lg transition-transform duration-300 hover:translate-y-[-2px]">
              S'abonner
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between items-center gap-4 pt-8 border-t border-gray-700">
        <p className="text-sm text-gray-400">
          © {currentYear} RavenWise. Tous droits réservés.
        </p>
        <div className="flex gap-4">
          <Link href="/terms" className="text-sm text-gray-400 hover:text-[#FDC758] transition-colors duration-300">Conditions d'utilisation</Link>
          <Link href="/privacy" className="text-sm text-gray-400 hover:text-[#FDC758] transition-colors duration-300">Politique de confidentialité</Link>
          <Link href="/cookies" className="text-sm text-gray-400 hover:text-[#FDC758] transition-colors duration-300">Cookies</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
