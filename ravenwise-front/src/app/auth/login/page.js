"use client";
import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import AuthForm from '../components/authForm';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (validateForm()) {
      setIsLoading(true);
      
      try {
        // Connexion avec Firebase
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        
        // Redirection vers la page dashboard après connexion réussie
        router.push('/dashboard');
      } catch (error) {
        // Gestion des erreurs de Firebase
        let errorMessage = "Une erreur s'est produite lors de la connexion.";
        
        switch (error.code) {
          case 'auth/invalid-credential':
            errorMessage = "Identifiants invalides. Veuillez vérifier votre email et mot de passe.";
            break;
          case 'auth/user-not-found':
            errorMessage = "Aucun utilisateur trouvé avec cet email.";
            break;
          case 'auth/wrong-password':
            errorMessage = "Mot de passe incorrect.";
            break;
          case 'auth/too-many-requests':
            errorMessage = "Trop de tentatives. Veuillez réessayer plus tard.";
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
      />
    </AuthLayout>
  );
};

export default LoginPage;