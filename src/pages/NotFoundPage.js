// src/pages/NotFoundPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout';

const NotFoundPage = () => {
  return (
    <PublicLayout>
      <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center text-center px-4"> {/* Adjust min-h based on nav/footer height */}
        <h1 className="text-6xl font-bold text-indigo-600">404</h1>
        <p className="text-2xl font-semibold text-gray-700 mt-4">Oops! Page Not Found.</p>
        <p className="text-gray-500 mt-2">The page you are looking for doesn't exist or has been moved.</p>
        <Link 
          to="/"
          className="mt-8 gradient-bg text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Go to Homepage
        </Link>
      </div>
    </PublicLayout>
  );
};

export default NotFoundPage;