// app/auth/components/AuthForm.js
import React from 'react';

const AuthForm = ({
  activeTab,
  formData,
  errors,
  isLoading,
  handleChange,
  handleSubmit,
  setActiveTab
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {activeTab === 'register' && (
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-gray-300">Nom complet</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Entrez votre nom complet"
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-800 border border-gray-600 rounded-md p-2 text-gray-300 focus:outline-none focus:border-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-gray-300">Adresse email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="exemple@email.com"
          value={formData.email}
          onChange={handleChange}
          className="bg-gray-800 border border-gray-600 rounded-md p-2 text-gray-300 focus:outline-none focus:border-blue-500"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-gray-300">Mot de passe</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Entrez votre mot de passe"
          value={formData.password}
          onChange={handleChange}
          className="bg-gray-800 border border-gray-600 rounded-md p-2 text-gray-300 focus:outline-none focus:border-blue-500"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

      {activeTab === 'register' && (
        <div className="flex flex-col gap-1">
          <label htmlFor="confirmPassword" className="text-gray-300">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirmez votre mot de passe"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="bg-gray-800 border border-gray-600 rounded-md p-2 text-gray-300 focus:outline-none focus:border-blue-500"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>
      )}

      {activeTab === 'login' && (
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="text-gray-300"
            />
            <label htmlFor="rememberMe" className="text-gray-300">Se souvenir de moi</label>
          </div>
          <a href="/forgot-password" className="text-blue-500 hover:underline">Mot de passe oublié ?</a>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-transform duration-300 hover:translate-y-[-2px]"
      >
        {isLoading ? 'Chargement...' : activeTab === 'login' ? 'Se connecter' : "S'inscrire"}
      </button>

      <div className="flex items-center justify-center gap-2 mt-4">
        <span className="text-gray-300">ou continuer avec</span>
        <button className="bg-gray-800 border border-gray-600 text-gray-300 rounded-md py-2 px-4 hover:bg-gray-700 transition-transform duration-300 hover:translate-y-[-2px]">
          Google
        </button>
        <button className="bg-gray-800 border border-gray-600 text-gray-300 rounded-md py-2 px-4 hover:bg-gray-700 transition-transform duration-300 hover:translate-y-[-2px]">
          Facebook
        </button>
      </div>

      {activeTab === 'login' ? (
        <p className="text-center mt-4 text-gray-300">
          Pas encore de compte ? <a href="#" onClick={() => setActiveTab('register')} className="text-blue-500 hover:underline">S'inscrire</a>
        </p>
      ) : (
        <p className="text-center mt-4 text-gray-300">
          Déjà inscrit ? <a href="#" onClick={() => setActiveTab('login')} className="text-blue-500 hover:underline">Se connecter</a>
        </p>
      )}
    </form>
  );
};

export default AuthForm;
