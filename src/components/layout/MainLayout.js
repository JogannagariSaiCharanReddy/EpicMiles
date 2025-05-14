// src/components/layout/MainLayout.js
import React from 'react';
import AuthenticatedNavbar from './AuthenticatedNavbar'; // We'll create this
import Footer from './Footer'; // Re-use the public footer or create a different one

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50"> {/* Slightly different bg for app area */}
      <AuthenticatedNavbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;