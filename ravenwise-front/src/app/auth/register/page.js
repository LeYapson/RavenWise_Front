"use client";
import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import AuthForm from '../components/authForm';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../../firebase';

const RegisterPage = () => {
  const [activeTab, setActiveTab] = useState('register');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }

    if (!formData.name) {
      newErrors.name = "Le nom est requis";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "La confirmation du mot de passe est requise";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (validateForm()) {
      setIsLoading(true);
      
      try {
        // Création du compte avec Firebase
        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          formData.email, 
          formData.password
        );
        
        // Mise à jour du profil pour ajouter le nom d'utilisateur
        await updateProfile(userCredential.user, {
          displayName: formData.name
        });
        
        // Succès de l'inscription
        setRegistrationSuccess(true);
        
        // Rediriger vers login après un court délai
        setTimeout(() => {
          setActiveTab('login');
          setFormData({
            ...formData,
            confirmPassword: '',
            password: ''
          });
        }, 2000);
        
      } catch (error) {
        // Gestion des erreurs Firebase
        let errorMessage = "Une erreur s'est produite lors de l'inscription.";
        
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = "Cet email est déjà utilisé par un autre compte.";
            break;
          case 'auth/invalid-email':
            errorMessage = "Format d'email invalide.";
            break;
          case 'auth/weak-password':
            errorMessage = "Le mot de passe est trop faible.";
            break;
        }
        
        setAuthError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <AuthLayout>
      <AuthForm
        activeTab={activeTab}
        formData={formData}
        errors={errors}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        setActiveTab={setActiveTab}
        authError={authError}
        registrationSuccess={registrationSuccess}
      />
    </AuthLayout>
  );
};

export default RegisterPage;