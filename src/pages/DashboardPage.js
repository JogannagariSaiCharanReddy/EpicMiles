// src/pages/DashboardPage.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../components/layout/MainLayout'; // We'll create this

const DashboardPage = () => {
  const { currentUser } = useAuth();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-800">Welcome to your Dashboard, {currentUser?.name || currentUser?.email}!</h2>
        <p className="mt-4 text-lg text-gray-600">
          This is where your trips and expenses will be managed.
        </p>
        {/* Content for Trips or Expenses overview will go here */}
      </div>
    </MainLayout>
  );
};

export default DashboardPage;