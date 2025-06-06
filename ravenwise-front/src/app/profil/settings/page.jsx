"use client";

import { useState, useEffect } from "react";
import { useClerkAuth } from "../../../context/clerkContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiUser, FiBell, FiLock, FiMonitor, FiLink, FiTrash2, FiChevronLeft, FiUpload, FiCheck } from "react-icons/fi";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { useUser } from "@clerk/nextjs";
import { userService } from "@/services/api";

export default function ProfileSettingsPage() {
  const { currentUser, loading } = useClerkAuth();
  const { user: clerkUser, isLoaded: clerkIsLoaded } = useUser();
  const [activeSection, setActiveSection] = useState("profile");
  const router = useRouter();
  const [forceDisplay, setForceDisplay] = useState(false);
  
  // États pour les formulaires
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    title: "",
    street: "",
    city: "",
    zipCode: "",
    country: "",
    website: "",
    github: "",
    linkedin: "",
    twitter: "",
  });
  
  // États pour les notifications
  const [emailNotifications, setEmailNotifications] = useState({
    courseUpdates: true,
    newBadges: true,
    weeklyDigest: true,
    recommendations: true,
    promotions: false,
  });
  
  // États pour les préférences
  const [preferences, setPreferences] = useState({
    darkMode: true,
    showProgress: true,
    showStreak: true,
    language: "fr",
    difficulty: "intermediate",
  });
  
  // État pour le chargement des formulaires
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  // Force l'affichage après un certain délai pour éviter une attente infinie
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading && clerkIsLoaded) {
        console.log("Affichage forcé après le timeout");
        setForceDisplay(true);
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [loading, clerkIsLoaded]);
  
  // Charger les données utilisateur lorsqu'elles sont disponibles
  useEffect(() => {
    // Si nous avons des données utilisateur depuis le contexte Clerk
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        email: currentUser.email || "",
        bio: currentUser.bio || "",
        title: currentUser.title || "",
        street: currentUser.address?.street || "",
        city: currentUser.address?.city || "",
        zipCode: currentUser.address?.zipCode || "",
        country: currentUser.address?.country || "",
        website: currentUser.website || "",
        github: currentUser.github || "",
        linkedin: currentUser.linkedin || "",
        twitter: currentUser.twitter || "",
      });
      
      // Récupérer également les préférences de notifications et les préférences générales
      if (currentUser.preferences) {
        setPreferences(prev => ({
          ...prev,
          ...currentUser.preferences
        }));
      }
      
      if (currentUser.notifications) {
        setEmailNotifications(prev => ({
          ...prev,
          ...currentUser.notifications
        }));
      }
    } 
    // Si currentUser est null mais que l'utilisateur Clerk est chargé, utiliser les données de base de Clerk
    else if (!currentUser && clerkIsLoaded && clerkUser) {
      setFormData(prev => ({
        ...prev,
        firstName: clerkUser.firstName || "",
        lastName: clerkUser.lastName || "",
        email: clerkUser.primaryEmailAddress?.emailAddress || "",
      }));
    }
  }, [currentUser, clerkUser, clerkIsLoaded]);
  
  // Fonction pour gérer les changements dans le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Fonction pour gérer les changements dans les notifications
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setEmailNotifications({ ...emailNotifications, [name]: checked });
  };
  
  // Fonction pour gérer les changements dans les préférences
  const handlePreferenceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences({ 
      ...preferences, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };
  
  // Soumission du formulaire de profil
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Préparer l'objet de données pour la mise à jour du profil
      const profileData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        bio: formData.bio,
        title: formData.title,
        website: formData.website,
        github: formData.github,
        linkedin: formData.linkedin,
        twitter: formData.twitter,
      };

      // Mettre à jour le profil via l'API
      const updatedUser = await userService.updateProfile(profileData);
      
      // Mettre à jour l'état local avec les données retournées
      if (updatedUser) {
        console.log("Profil mis à jour avec succès:", updatedUser);
        // Mettre à jour le contexte si nécessaire
      }
      
      setSuccessMessage("Profil mis à jour avec succès");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      setSuccessMessage("Erreur lors de la mise à jour du profil. Veuillez réessayer.");
    } finally {
      setSaving(false);
    }
  };
  
  // Soumission du formulaire d'adresse
  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const addressData = {
        street: formData.street,
        city: formData.city,
        zipCode: formData.zipCode,
        country: formData.country,
      };
      
      // Mettre à jour l'adresse via l'API
      const updatedUser = await userService.updateAddress(addressData);
      
      // Mettre à jour l'état local avec les données retournées
      if (updatedUser) {
        console.log("Adresse mise à jour avec succès:", updatedUser);
      }
      
      setSuccessMessage("Adresse mise à jour avec succès");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'adresse:", error);
      setSuccessMessage("Erreur lors de la mise à jour de l'adresse. Veuillez réessayer.");
    } finally {
      setSaving(false);
    }
  };
  
  // Soumission des paramètres de notifications
  const handleNotificationsSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Appel API pour sauvegarder les préférences de notification
      const updatedUser = await userService.updateNotificationPreferences(emailNotifications);
      
      if (updatedUser) {
        console.log("Préférences de notification mises à jour:", updatedUser);
      }
      
      setSuccessMessage("Préférences de notification mises à jour");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Erreur:", error);
      setSuccessMessage("Erreur lors de la mise à jour des notifications. Veuillez réessayer.");
    } finally {
      setSaving(false);
    }
  };
  
  // Soumission des préférences
  const handlePreferencesSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Appel API pour sauvegarder les préférences
      const updatedUser = await userService.updatePreferences(preferences);
      
      if (updatedUser) {
        console.log("Préférences mises à jour avec succès:", updatedUser);
      }
      
      setSuccessMessage("Préférences mises à jour avec succès");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Erreur:", error);
      setSuccessMessage("Erreur lors de la mise à jour des préférences. Veuillez réessayer.");
    } finally {
      setSaving(false);
    }
  };
  
  // Fonction pour la demande de suppression de compte
  const handleDeleteAccount = async () => {
    const confirmText = document.getElementById('deleteConfirmInput')?.value;
    const confirmCheckbox = document.getElementById('confirmDelete')?.checked;
    
    if (confirmText !== 'SUPPRIMER' || !confirmCheckbox) {
      alert("Veuillez confirmer la suppression en tapant 'SUPPRIMER' et en cochant la case de confirmation.");
      return;
    }
    
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
      try {
        // Appel API pour supprimer le compte utilisateur
        await userService.deleteAccount();
        
        // Redirection vers la page d'accueil après déconnexion
        router.push('/');
      } catch (error) {
        console.error("Erreur lors de la suppression du compte:", error);
        alert("Une erreur est survenue lors de la suppression du compte. Veuillez réessayer.");
      }
    }
  };
  
  // Affichage du chargement avec solution anti-blocage
  if (loading && !forceDisplay) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#0c1524] flex flex-col items-center justify-center p-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FDC758] mb-4"></div>
          <div className="text-white text-lg">Chargement des paramètres...</div>
        </div>
        <Footer />
      </>
    );
  }
  
  // Déterminer les données utilisateur à afficher (currentUser ou clerkUser)
  const userDisplayData = currentUser || {
    firstName: clerkUser?.firstName || "Utilisateur",
    lastName: clerkUser?.lastName || "",
    email: clerkUser?.primaryEmailAddress?.emailAddress || "Non disponible",
    imageUrl: clerkUser?.imageUrl
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-[#0c1524] text-white pt-20 pb-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <button 
            onClick={() => router.push('/profil')}
            className="flex items-center text-gray-400 hover:text-white mb-4"
          >
            <FiChevronLeft className="mr-1" /> Retour au profil
          </button>
          <h1 className="text-2xl font-bold mb-2">Paramètres du compte</h1>
          <p className="text-gray-400">Gérer vos informations personnelles et préférences</p>
        </div>
        
        {/* Conteneur principal */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Barre latérale de navigation */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-[#182b4a] rounded-xl p-4">
              <button 
                className={`w-full text-left px-4 py-3 rounded-lg mb-1 flex items-center ${activeSection === 'profile' ? 'bg-[#253A52] text-[#FDC758]' : 'hover:bg-[#1D2D40]'}`}
                onClick={() => setActiveSection('profile')}
              >
                <FiUser className="mr-3" /> Informations personnelles
              </button>
              <button 
                className={`w-full text-left px-4 py-3 rounded-lg mb-1 flex items-center ${activeSection === 'address' ? 'bg-[#253A52] text-[#FDC758]' : 'hover:bg-[#1D2D40]'}`}
                onClick={() => setActiveSection('address')}
              >
                <FiUser className="mr-3" /> Adresse
              </button>
              <button 
                className={`w-full text-left px-4 py-3 rounded-lg mb-1 flex items-center ${activeSection === 'security' ? 'bg-[#253A52] text-[#FDC758]' : 'hover:bg-[#1D2D40]'}`}
                onClick={() => setActiveSection('security')}
              >
                <FiLock className="mr-3" /> Sécurité
              </button>
              <button 
                className={`w-full text-left px-4 py-3 rounded-lg mb-1 flex items-center ${activeSection === 'notifications' ? 'bg-[#253A52] text-[#FDC758]' : 'hover:bg-[#1D2D40]'}`}
                onClick={() => setActiveSection('notifications')}
              >
                <FiBell className="mr-3" /> Notifications
              </button>
              <button 
                className={`w-full text-left px-4 py-3 rounded-lg mb-1 flex items-center ${activeSection === 'preferences' ? 'bg-[#253A52] text-[#FDC758]' : 'hover:bg-[#1D2D40]'}`}
                onClick={() => setActiveSection('preferences')}
              >
                <FiMonitor className="mr-3" /> Préférences
              </button>
              <button 
                className={`w-full text-left px-4 py-3 rounded-lg mb-1 flex items-center ${activeSection === 'connections' ? 'bg-[#253A52] text-[#FDC758]' : 'hover:bg-[#1D2D40]'}`}
                onClick={() => setActiveSection('connections')}
              >
                <FiLink className="mr-3" /> Connexions
              </button>
              <button 
                className={`w-full text-left px-4 py-3 rounded-lg mb-1 flex items-center text-red-400 hover:text-red-300 hover:bg-red-900/20`}
                onClick={() => setActiveSection('delete')}
              >
                <FiTrash2 className="mr-3" /> Supprimer le compte
              </button>
            </div>
          </div>
          
          {/* Contenu principal */}
          <div className="flex-1">
            {/* Message de succès */}
            {successMessage && (
              <div className="mb-6 bg-green-900/30 border border-green-500 text-green-200 px-4 py-3 rounded-lg flex items-center">
                <FiCheck className="mr-2" /> {successMessage}
              </div>
            )}
            
            {/* Section Informations personnelles */}
            {activeSection === 'profile' && (
              <div className="bg-[#182b4a] rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-6">Informations personnelles</h2>
                
                {/* Photo de profil */}
                <div className="mb-8 flex items-center">
                  <div className="mr-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden">
                      <Image 
                        src={userDisplayData.imageUrl || clerkUser?.imageUrl || "/default-avatar.svg"} 
                        alt="Avatar" 
                        width={80} 
                        height={80} 
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Photo de profil</h3>
                    <button 
                      className="bg-[#1D2D40] hover:bg-[#253A52] text-white px-4 py-2 rounded-lg flex items-center text-sm mr-2"
                      onClick={() => window.open('https://accounts.clerk.dev/user/settings/account', '_blank')}
                    >
                      <FiUpload className="mr-2" /> Changer de photo via Clerk
                    </button>
                  </div>
                </div>
                
                {/* Formulaire d'informations */}
                <form onSubmit={handleProfileSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="firstName">Prénom</label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-[#1D2D40] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#FDC758]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="lastName">Nom</label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-[#1D2D40] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#FDC758]"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled
                      className="w-full px-4 py-3 rounded-lg bg-[#1D2D40] border border-gray-700 text-gray-400 focus:outline-none"
                    />
                    <p className="text-xs text-gray-400 mt-1">L'email ne peut être modifié qu'au niveau des paramètres de Clerk</p>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" htmlFor="title">Titre / Fonction</label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Ex: Développeur Web, Étudiant..."
                      className="w-full px-4 py-3 rounded-lg bg-[#1D2D40] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#FDC758]"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" htmlFor="bio">Biographie</label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Parlez-nous de vous..."
                      className="w-full px-4 py-3 rounded-lg bg-[#1D2D40] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#FDC758]"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-[#FDC758] text-[#0F1B2A] py-2 px-6 rounded-lg font-medium transition-colors hover:bg-opacity-90 disabled:opacity-50"
                    >
                      {saving ? "Enregistrement..." : "Enregistrer les modifications"}
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Section Adresse */}
            {activeSection === 'address' && (
              <div className="bg-[#182b4a] rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-6">Adresse</h2>
                <form onSubmit={handleAddressSubmit}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" htmlFor="street">Rue</label>
                    <input
                      id="street"
                      name="street"
                      type="text"
                      value={formData.street}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-[#1D2D40] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#FDC758]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="city">Ville</label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-[#1D2D40] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#FDC758]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="zipCode">Code postal</label>
                      <input
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-[#1D2D40] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#FDC758]"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" htmlFor="country">Pays</label>
                    <input
                      id="country"
                      name="country"
                      type="text"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-[#1D2D40] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#FDC758]"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-[#FDC758] text-[#0F1B2A] py-2 px-6 rounded-lg font-medium transition-colors hover:bg-opacity-90 disabled:opacity-50"
                    >
                      {saving ? "Enregistrement..." : "Enregistrer l'adresse"}
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Section Sécurité */}
            {activeSection === 'security' && (
              <div className="bg-[#182b4a] rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-6">Paramètres de sécurité</h2>
                
                <div className="mb-8">
                  <h3 className="text-md font-medium mb-3">Mot de passe</h3>
                  <p className="text-gray-400 mb-4">La gestion des mots de passe est gérée par Clerk.</p>
                  <button 
                    onClick={() => alert("Cette fonctionnalité utilise l'UI de Clerk pour la gestion des mots de passe")}
                    className="bg-[#1D2D40] hover:bg-[#253A52] text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Changer mon mot de passe
                  </button>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-md font-medium mb-3">Authentification à deux facteurs (2FA)</h3>
                  <p className="text-gray-400 mb-4">Ajoutez une couche de sécurité supplémentaire à votre compte.</p>
                  <button 
                    onClick={() => alert("Cette fonctionnalité utilise l'UI de Clerk pour la gestion de la 2FA")}
                    className="bg-[#1D2D40] hover:bg-[#253A52] text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Configurer l'authentification à deux facteurs
                  </button>
                </div>
                
                <div>
                  <h3 className="text-md font-medium mb-3">Sessions actives</h3>
                  <p className="text-gray-400 mb-4">Gérez les appareils connectés à votre compte.</p>
                  <button 
                    onClick={() => alert("Cette fonctionnalité utilise l'UI de Clerk pour la gestion des sessions")}
                    className="bg-[#1D2D40] hover:bg-[#253A52] text-white px-4 py-2 rounded-lg text-sm mr-4"
                  >
                    Voir les sessions actives
                  </button>
                  <button 
                    onClick={() => {
                      if(confirm("Voulez-vous vraiment vous déconnecter de toutes les sessions ?")) {
                        logout();
                        router.push('/sign-in');
                      }
                    }}
                    className="bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-lg text-sm mt-2 md:mt-0"
                  >
                    Déconnexion de tous les appareils
                  </button>
                </div>
              </div>
            )}
            
            {/* Section Notifications */}
            {activeSection === 'notifications' && (
              <div className="bg-[#182b4a] rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-6">Préférences de notification</h2>
                
                <form onSubmit={handleNotificationsSubmit}>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between py-3 border-b border-gray-700">
                      <div>
                        <h4 className="font-medium">Mises à jour des cours</h4>
                        <p className="text-sm text-gray-400">Recevoir des notifications quand les cours sont mis à jour</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="courseUpdates"
                          checked={emailNotifications.courseUpdates} 
                          onChange={handleNotificationChange}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FDC758]"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b border-gray-700">
                      <div>
                        <h4 className="font-medium">Nouveaux badges</h4>
                        <p className="text-sm text-gray-400">Recevoir des notifications quand vous gagnez un badge</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="newBadges"
                          checked={emailNotifications.newBadges} 
                          onChange={handleNotificationChange}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FDC758]"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b border-gray-700">
                      <div>
                        <h4 className="font-medium">Résumé hebdomadaire</h4>
                        <p className="text-sm text-gray-400">Recevoir un résumé hebdomadaire de votre progression</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="weeklyDigest"
                          checked={emailNotifications.weeklyDigest} 
                          onChange={handleNotificationChange}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FDC758]"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b border-gray-700">
                      <div>
                        <h4 className="font-medium">Recommandations personnalisées</h4>
                        <p className="text-sm text-gray-400">Recevoir des recommandations de cours basées sur vos intérêts</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="recommendations"
                          checked={emailNotifications.recommendations} 
                          onChange={handleNotificationChange}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FDC758]"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b border-gray-700">
                      <div>
                        <h4 className="font-medium">Promotions et offres</h4>
                        <p className="text-sm text-gray-400">Recevoir des offres spéciales et des promotions</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="promotions"
                          checked={emailNotifications.promotions} 
                          onChange={handleNotificationChange}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FDC758]"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-[#FDC758] text-[#0F1B2A] py-2 px-6 rounded-lg font-medium transition-colors hover:bg-opacity-90 disabled:opacity-50"
                    >
                      {saving ? "Enregistrement..." : "Enregistrer les préférences"}
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Section Préférences */}
            {activeSection === 'preferences' && (
              <div className="bg-[#182b4a] rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-6">Préférences générales</h2>
                
                <form onSubmit={handlePreferencesSubmit}>
                  <div className="mb-6">
                    <h3 className="text-md font-medium mb-3">Apparence</h3>
                    <div className="flex items-center space-x-4">
                      <label className={`cursor-pointer rounded-lg p-4 border ${preferences.darkMode ? 'border-[#FDC758] bg-[#253A52]' : 'border-gray-700 bg-[#1D2D40]'}`}>
                        <input
                          type="radio"
                          name="darkMode"
                          checked={preferences.darkMode}
                          onChange={() => setPreferences({...preferences, darkMode: true})}
                          className="sr-only"
                        />
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 mb-2 rounded-full bg-gray-900 flex items-center justify-center">
                            <span className="text-xl">🌙</span>
                          </div>
                          <span>Mode sombre</span>
                        </div>
                      </label>
                      
                      <label className={`cursor-pointer rounded-lg p-4 border ${!preferences.darkMode ? 'border-[#FDC758] bg-[#253A52]' : 'border-gray-700 bg-[#1D2D40]'}`}>
                        <input
                          type="radio"
                          name="darkMode"
                          checked={!preferences.darkMode}
                          onChange={() => setPreferences({...preferences, darkMode: false})}
                          className="sr-only"
                        />
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 mb-2 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xl">☀️</span>
                          </div>
                          <span>Mode clair</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-md font-medium mb-3">Langue</h3>
                    <select
                      name="language"
                      value={preferences.language}
                      onChange={handlePreferenceChange}
                      className="w-full md:w-1/3 px-4 py-3 rounded-lg bg-[#1D2D40] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#FDC758]"
                    >
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="de">Deutsch</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-md font-medium mb-3">Niveau de difficulté recommandé</h3>
                    <select
                      name="difficulty"
                      value={preferences.difficulty}
                      onChange={handlePreferenceChange}
                      className="w-full md:w-1/3 px-4 py-3 rounded-lg bg-[#1D2D40] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#FDC758]"
                    >
                      <option value="beginner">Débutant</option>
                      <option value="intermediate">Intermédiaire</option>
                      <option value="advanced">Avancé</option>
                    </select>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-md font-medium mb-3">Options d'affichage</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="showProgress"
                          name="showProgress"
                          checked={preferences.showProgress}
                          onChange={handlePreferenceChange}
                          className="w-5 h-5 rounded bg-[#1D2D40] border-gray-700 text-[#FDC758] focus:ring-[#FDC758] focus:ring-opacity-25"
                        />
                        <label htmlFor="showProgress" className="ml-3 text-sm">
                          Afficher ma progression sur mon profil public
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="showStreak"
                          name="showStreak"
                          checked={preferences.showStreak}
                          onChange={handlePreferenceChange}
                          className="w-5 h-5 rounded bg-[#1D2D40] border-gray-700 text-[#FDC758] focus:ring-[#FDC758] focus:ring-opacity-25"
                        />
                        <label htmlFor="showStreak" className="ml-3 text-sm">
                          Afficher mon streak d'apprentissage sur mon profil
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-[#FDC758] text-[#0F1B2A] py-2 px-6 rounded-lg font-medium transition-colors hover:bg-opacity-90 disabled:opacity-50"
                    >
                      {saving ? "Enregistrement..." : "Enregistrer les préférences"}
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Section Connexions */}
            {activeSection === 'connections' && (
              <div className="bg-[#182b4a] rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-6">Connexions externes</h2>
                
                <div className="mb-8">
                  <h3 className="text-md font-medium mb-4">Réseaux sociaux</h3>
                  
                  <form>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2" htmlFor="website">Site Web personnel</label>
                      <input
                        id="website"
                        name="website"
                        type="url"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="https://monsite.com"
                        className="w-full px-4 py-3 rounded-lg bg-[#1D2D40] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#FDC758]"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2" htmlFor="github">GitHub</label>
                      <input
                        id="github"
                        name="github"
                        type="url"
                        value={formData.github}
                        onChange={handleInputChange}
                        placeholder="https://github.com/username"
                        className="w-full px-4 py-3 rounded-lg bg-[#1D2D40] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#FDC758]"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2" htmlFor="linkedin">LinkedIn</label>
                      <input
                        id="linkedin"
                        name="linkedin"
                        type="url"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full px-4 py-3 rounded-lg bg-[#1D2D40] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#FDC758]"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2" htmlFor="twitter">Twitter</label>
                      <input
                        id="twitter"
                        name="twitter"
                        type="url"
                        value={formData.twitter}
                        onChange={handleInputChange}
                        placeholder="https://twitter.com/username"
                        className="w-full px-4 py-3 rounded-lg bg-[#1D2D40] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#FDC758]"
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={handleProfileSubmit}
                        disabled={saving}
                        className="bg-[#FDC758] text-[#0F1B2A] py-2 px-6 rounded-lg font-medium transition-colors hover:bg-opacity-90 disabled:opacity-50"
                      >
                        {saving ? "Enregistrement..." : "Enregistrer les connexions"}
                      </button>
                    </div>
                  </form>
                </div>
                
                <div className="mt-10">
                  <h3 className="text-md font-medium mb-4">Services connectés</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-[#1D2D40] p-4 rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4">
                          <svg className="w-6 h-6" viewBox="0 0 24 24">
                            <path
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              fill="#4285F4"
                            />
                            <path
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              fill="#34A853"
                            />
                            <path
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              fill="#FBBC05"
                            />
                            <path
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              fill="#EA4335"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">Google</h4>
                          <p className="text-sm text-gray-400">Connexion via Google activée</p>
                        </div>
                      </div>
                      <button className="text-sm text-red-400 hover:text-red-300">Déconnecter</button>
                    </div>
                    
                    <div className="bg-[#1D2D40] p-4 rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-[#1D1D1D] flex items-center justify-center mr-4">
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">GitHub</h4>
                          <p className="text-sm text-gray-400">Non connecté</p>
                        </div>
                      </div>
                      <button className="text-sm text-[#FDC758]">Connecter</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Section Supprimer le compte */}
            {activeSection === 'delete' && (
              <div className="bg-[#182b4a] rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4 text-red-400">Supprimer le compte</h2>
                <p className="text-gray-400 mb-8">Attention : cette action est irréversible. Toutes vos données seront définitivement supprimées.</p>
                
                <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-6">
                  <h3 className="text-red-400 font-medium mb-2">Conséquences de la suppression :</h3>
                  <ul className="text-gray-300 space-y-2 list-disc pl-6">
                    <li>Perte de tous vos badges et progrès</li>
                    <li>Perte d'accès à tous vos cours achetés</li>
                    <li>Suppression de toutes vos données personnelles</li>
                    <li>Perte des statistiques et séries d'apprentissage</li>
                  </ul>
                </div>
                
                <div className="mb-6">
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Pour confirmer, tapez "SUPPRIMER" ci-dessous</label>
                    <input
                      id="deleteConfirmInput"
                      type="text"
                      placeholder="SUPPRIMER"
                      className="w-full px-4 py-3 rounded-lg bg-[#1D2D40] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  
                  <div className="flex items-center mb-8">
                    <input
                      type="checkbox"
                      id="confirmDelete"
                      className="w-5 h-5 rounded bg-[#1D2D40] border-gray-700 text-red-500 focus:ring-red-500 focus:ring-opacity-25"
                    />
                    <label htmlFor="confirmDelete" className="ml-3 text-sm">
                      Je comprends que cette action est irréversible
                    </label>
                  </div>
                </div>
                
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg font-medium transition-colors"
                >
                  Supprimer définitivement mon compte
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}