"use client";
import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import AuthForm from '../components/authForm';

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setActiveTab('login');
        setFormData({
          ...formData,
          confirmPassword: '',
          name: ''
        });
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

export default RegisterPage;
