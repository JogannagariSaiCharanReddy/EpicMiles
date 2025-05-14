// src/hooks/useAuth.js
// This is just a re-export if you prefer this pattern,
// otherwise `useAuth` is already exported from AuthContext.js
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Adjust path if AuthContext is elsewhere

export const useAuth = () => {
  return useContext(AuthContext);
};