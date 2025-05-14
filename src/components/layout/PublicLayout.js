// src/components/layout/PublicLayout.js
import React from 'react';
import Navbar from './Navbar'; // We'll create this next
import Footer from './Footer'; // And this

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;