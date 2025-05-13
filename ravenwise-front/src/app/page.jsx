"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useClerkAuth } from '../context/clerkContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';

export default function HomePage() {
  const { currentUser, loading, isAuthenticated, logout } = useClerkAuth();
  const router = useRouter();
  
  // Redirection vers le dashboard si l'utilisateur est connecté
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, loading, router]);
  
  // Afficher la page d'accueil uniquement pour les utilisateurs non authentifiés
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
}
