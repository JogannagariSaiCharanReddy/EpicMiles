// src/pages/HomePage.js
import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
// Ensure these are default imports
import HowItWorksSection from '../components/home/HowItWorksSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';
import PublicLayout from '../components/layout/PublicLayout';

const HomePage = () => {
  return (
    <PublicLayout>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </PublicLayout>
  );
};

export default HomePage;