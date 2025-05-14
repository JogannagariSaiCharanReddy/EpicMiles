// src/pages/RegisterPage.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
// import { useAuth } from '../contexts/AuthContext'; // Uncomment when AuthContext is ready

const RegisterPage = () => {
  const navigate = useNavigate();
  // const { register } = useAuth(); // Uncomment when AuthContext is ready

  const handleRegister = async (userData) => {
    // Replace with actual API call
    console.log('Registering user:', userData);
    try {
      // await register(userData.name, userData.email, userData.password); // Use actual register from AuthContext
      // For now, simulate successful registration:
      localStorage.setItem('user', JSON.stringify({ email: userData.email, name: userData.name })); // Temporary
      navigate('/dashboard'); // Or wherever you want to redirect after registration
    } catch (error) {
      console.error("Registration failed:", error);
      alert('Registration failed. Please try again.'); // Show error to user
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
           <Link to="/">
            <h1 className="text-3xl font-bold text-indigo-600">Join EpicMiles</h1>
          </Link>
          <p className="text-gray-600 mt-2">Create your account to get started</p>
        </div>
        <RegisterForm onSubmit={handleRegister} />
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 font-medium hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;