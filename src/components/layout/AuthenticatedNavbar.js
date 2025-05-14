// src/components/layout/AuthenticatedNavbar.js
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'; // Import NavLink
import { useAuth } from '../../contexts/AuthContext';

const AuthenticatedNavbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const navLinkClasses = ({ isActive }) =>
    isActive
      ? "tab-active px-1 py-4 text-sm font-medium" // Applied from index.css
      : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent px-1 py-4 text-sm font-medium";


  return (
    <header className="bg-white shadow-sm">
      {/* Top bar for logo and user actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">EpicMiles</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">
              Hi, {currentUser?.name || currentUser?.email}
            </span>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-indigo-600 transition-colors"
              title="Logout"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="flex space-x-8" aria-label="Tabs">
                  <NavLink
                    to="/trips" // Changed from /dashboard/trips
                    className={navLinkClasses}
                  >
                      My Trips
                  </NavLink>
                  <NavLink
                    to="/expenses" // Changed from /dashboard/expenses
                    className={navLinkClasses}
                  >
                      Expenses
                  </NavLink>
                  {/* Add more tabs as needed */}
              </nav>
          </div>
      </div>
    </header>
  );
};

export default AuthenticatedNavbar;