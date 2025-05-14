// src/components/layout/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you'll use react-router

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">EpicMiles</h1>
            </Link>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => navigate('/login')}
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Log In
            </button>
            <button
              onClick={() => navigate('/register')}
              className="ml-4 gradient-bg text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;