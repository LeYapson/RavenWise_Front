// app/auth/components/AuthLayout.js
import React from 'react';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
