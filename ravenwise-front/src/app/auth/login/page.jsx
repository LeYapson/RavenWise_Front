"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthLayout from '../../../components/auth/AuthLayout';
import AuthForm from '../../../components/auth/AuthForm';
import { useAuth } from '../../../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/dashboard';

  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

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
        await login(formData.email, formData.password);
        router.push(from);
      } catch (error) {
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