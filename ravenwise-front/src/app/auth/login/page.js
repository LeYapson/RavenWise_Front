"use client";
import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import AuthForm from '../components/authForm';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        router.push('/dashboard');
      }, 1500);
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
      />
    </AuthLayout>
  );
};

export default LoginPage;
