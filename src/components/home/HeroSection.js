// src/components/home/HeroSection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative gradient-bg text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">Travel Together, Split Expenses Easily</h2>
            <p className="mt-6 text-lg md:text-xl opacity-90">EpicMiles makes group travel finances simple. Track expenses, split costs fairly, and focus on creating memories.</p>
            <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => navigate('/register')}
                className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-opacity"
              >
                Get Started - It's Free
              </button>
              <button
                onClick={handleLearnMore}
                className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-all"
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              {/* Decorative SVGs */}
              <svg className="absolute -top-16 -right-16 text-indigo-400 opacity-20" width="204" height="204" viewBox="0 0 204 204" fill="none">
                <path d="M102 204C158.333 204 204 158.333 204 102C204 45.6669 158.333 0 102 0C45.6669 0 0 45.6669 0 102C0 158.333 45.6669 204 102 204Z" fill="currentColor"></path>
              </svg>
              <svg className="absolute -bottom-16 -left-16 text-indigo-400 opacity-20" width="204" height="204" viewBox="0 0 204 204" fill="none">
                <path d="M102 204C158.333 204 204 158.333 204 102C204 45.6669 158.333 0 102 0C45.6669 0 0 45.6669 0 102C0 158.333 45.6669 204 102 204Z" fill="currentColor"></path>
              </svg>
              {/* Example UI Card */}
              <div className="bg-white p-4 rounded-xl shadow-lg">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Beach Trip Balance</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">John</span>
                      <span className="text-green-600 font-medium">gets back $120.50</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Sarah</span>
                      <span className="text-red-600 font-medium">owes $85.25</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Mike</span>
                      <span className="text-red-600 font-medium">owes $35.25</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-md font-medium text-gray-800">Dinner at Seafood Place</h4>
                          <p className="text-gray-600 text-sm mt-1">Paid by John • Jun 15, 2023</p>
                        </div>
                        <div className="text-lg font-semibold text-gray-800">$180.00</div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-md font-medium text-gray-800">Hotel Booking</h4>
                          <p className="text-gray-600 text-sm mt-1">Paid by Sarah • Jun 14, 2023</p>
                        </div>
                        <div className="text-lg font-semibold text-gray-800">$450.00</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Hero Wave SVG */}
      <div className="hero-wave absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;