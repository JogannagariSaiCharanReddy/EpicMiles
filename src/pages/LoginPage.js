// src/pages/LoginPage.js
import React from 'react'; // Make sure React is imported
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../contexts/AuthContext'; // <<< ENSURE THIS IS IMPORTED

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, currentUser } = useAuth(); // <<< ENSURE login IS FROM useAuth

  // Optional: If already logged in, redirect from login page
  React.useEffect(() => {
    if (currentUser) {
      console.log("LoginPage: currentUser exists, navigating to /dashboard from useEffect");
      navigate('/dashboard', { replace: true });
    }
  }, [currentUser, navigate]);

  const handleLogin = async (credentials) => {
    console.log('LoginPage: Attempting to log in with (using AuthContext):', credentials);
    try {
      await login(credentials.email, credentials.password); // <<< THIS IS THE KEY CHANGE
      // AuthContext's login now handles setCurrentUser and localStorage
      console.log('LoginPage: AuthContext login successful, navigating to /dashboard...');
      navigate('/dashboard');
      console.log('LoginPage: Navigation call to /dashboard complete.');
    } catch (error) {
      console.error("Login failed in LoginPage:", error.message);
      alert(error.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="text-3xl font-bold text-indigo-600">EpicMiles</h1>
          </Link>
          <p className="text-gray-600 mt-2">Track trips and split expenses with friends</p>
        </div>
        <LoginForm onSubmit={handleLogin} />
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;