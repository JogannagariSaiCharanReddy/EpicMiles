// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
// Import your actual auth service when ready
// import { loginUser, registerUser, logoutUser, getCurrentUser } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle initial check

  // Mock getCurrentUser - replace with actual check (e.g., token in localStorage)
  const checkCurrentUser = () => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  };

  useEffect(() => {
    // On component mount, check if a user is already logged in (e.g., from localStorage or a token)
    checkCurrentUser();
    // Example: const user = getCurrentUser(); // from authService
    // if (user) setCurrentUser(user);
    // setLoading(false);
  }, []);

  // Mock login - replace with actual API call
  const login = async (email, password) => {
    console.log("AuthContext: login function called with:", email, password);
    // Add a mock check here
    if (email === "user@example.com" && password === "password") {
      const mockUser = { email, name: "Test User Logged In", id: email }; // Ensure user has an ID
      localStorage.setItem('user', JSON.stringify(mockUser));
      setCurrentUser(mockUser); // <<< THIS updates the context state
      console.log("AuthContext: currentUser SET by login function to:", mockUser);
      return mockUser;
    } else {
      console.log("AuthContext: Invalid credentials for mock login.");
      // Optional: Clear user state on failed attempt if you want to be strict
      // setCurrentUser(null);
      // localStorage.removeItem('user');
      throw new Error("Invalid credentials. Please use user@example.com and password.");
    }
  };

  // Mock register - replace with actual API call
  const register = async (name, email, password) => {
    // const userData = await registerUser(name, email, password); // from authService
    // setCurrentUser(userData);
    // return userData;
    console.log("AuthContext register:", name, email, password);
    const mockUser = { name, email };
    localStorage.setItem('user', JSON.stringify(mockUser));
    setCurrentUser(mockUser);
    return mockUser;
  };

  // Mock logout - replace with actual API call
  const logout = async () => {
    // await logoutUser(); // from authService
    console.log("AuthContext logout");
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading // Expose loading state
  };

  // Don't render children until loading is false to prevent flicker or rendering protected routes prematurely
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};