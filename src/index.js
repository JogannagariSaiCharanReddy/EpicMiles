// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Your Tailwind imports
import App from './App';
import { AuthProvider } from './contexts/AuthContext'; // Import AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap App with AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);