/**
 * Composant AuthForm - Formulaire d'authentification réutilisable
 * Gère à la fois la connexion et l'inscription
 * 
 * @param {string} activeTab - Onglet actif ('login' ou 'register')
 * @param {object} formData - Données du formulaire
 * @param {object} errors - Erreurs de validation
 * @param {boolean} isLoading - État de chargement
 * @param {function} handleChange - Gestionnaire de changement des champs
 * @param {function} handleSubmit - Gestionnaire de soumission du formulaire
 * @param {function} setActiveTab - Fonction pour changer d'onglet
 * @param {string} authError - Message d'erreur d'authentification
 * @param {boolean} registrationSuccess - Indique si l'inscription a réussi
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';
import Link from 'next/link';

const AuthForm = ({
  activeTab,
  formData,
  errors,
  isLoading,
  handleChange,
  handleSubmit,
  setActiveTab,
  authError,
  registrationSuccess
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="space-y-6">
      {/* Onglets */}
      <div className="flex border-b border-gray-700">
        <button
          className={`pb-3 px-4 text-lg font-medium relative ${
            activeTab === 'login'
            ? 'text-[#ca9e46]'
            : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('login')}
        >
          Connexion
          {activeTab === 'login' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-1 bg-[#ca9e46] rounded-t-md"
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </button>
        
        <button
          className={`pb-3 px-4 text-lg font-medium relative ${
            activeTab === 'register'
            ? 'text-[#ca9e46]'
            : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('register')}
        >
          Inscription
          {activeTab === 'register' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-1 bg-[#ca9e46] rounded-t-md"
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </button>
      </div>

      {/* Message de succès d'inscription */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {registrationSuccess && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-lg mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            Inscription réussie ! Vous allez être redirigé vers la connexion.
          </div>
        )}
        
        {authError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
            </svg>
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Champ nom pour l'inscription */}
          {activeTab === 'register' && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Entrez votre nom"
                className={`w-full bg-[#182133] border ${
                  errors.name ? 'border-red-500' : 'border-gray-700'
                } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ca9e46] transition-all duration-300`}
              />
              {errors.name && (
                <p className="mt-1.5 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
          )}

          {/* Champ email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
              Adresse email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemple@email.com"
              className={`w-full bg-[#182133] border ${
                errors.email ? 'border-red-500' : 'border-gray-700'
              } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ca9e46] transition-all duration-300`}
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Champ mot de passe */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1.5">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Entrez votre mot de passe"
                className={`w-full bg-[#182133] border ${
                  errors.password ? 'border-red-500' : 'border-gray-700'
                } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ca9e46] transition-all duration-300`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirmation de mot de passe pour l'inscription */}
          {activeTab === 'register' && (
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1.5">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirmez votre mot de passe"
                  className={`w-full bg-[#182133] border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-700'
                  } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ca9e46] transition-all duration-300`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
                >
                  {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          {/* Option "Se souvenir de moi" et mot de passe oublié pour la connexion */}
          {activeTab === 'login' && (
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-700 bg-[#182133] text-[#ca9e46] focus:ring-[#ca9e46] focus:ring-offset-[#182133]"
                />
                <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-400">
                  Se souvenir de moi
                </label>
              </div>
              <Link href="/auth/forgot-password" className="text-sm text-[#ca9e46] hover:underline">
                Mot de passe oublié?
              </Link>
            </div>
          )}

          {/* Bouton de soumission */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#ca9e46] to-[#d4af61] text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-[#ca9e46]/20 transform transition-all duration-300 hover:translate-y-[-2px] hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed mt-6"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Chargement...
              </div>
            ) : (
              activeTab === 'login' ? 'Se connecter' : "S'inscrire"
            )}
          </button>
        </form>

        {/* Séparateur */}
        <div className="my-6 flex items-center">
          <div className="flex-grow h-px bg-gray-700"></div>
          <span className="px-4 text-sm text-gray-400">ou continuer avec</span>
          <div className="flex-grow h-px bg-gray-700"></div>
        </div>

        {/* Boutons des réseaux sociaux */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="flex items-center justify-center px-4 py-3 border border-gray-700 rounded-lg bg-[#182133] hover:bg-[#1e2942] transition-all duration-300"
          >
            <FaGoogle className="text-red-500 mr-2" />
            <span className="text-gray-300">Google</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center px-4 py-3 border border-gray-700 rounded-lg bg-[#182133] hover:bg-[#1e2942] transition-all duration-300"
          >
            <FaFacebook className="text-blue-500 mr-2" />
            <span className="text-gray-300">Facebook</span>
          </button>
        </div>

        {/* Message de changement de mode */}
        {activeTab === 'login' ? (
          <p className="mt-6 text-center text-gray-400">
            Pas encore inscrit?{' '}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('register');
              }}
              className="text-[#ca9e46] hover:underline"
            >
              Créer un compte
            </a>
          </p>
        ) : (
          <p className="mt-6 text-center text-gray-400">
            Déjà inscrit?{' '}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('login');
              }}
              className="text-[#ca9e46] hover:underline"
            >
              Se connecter
            </a>
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default AuthForm;