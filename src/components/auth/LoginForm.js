// src/components/auth/LoginForm.js
import React, { useState } from 'react';

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="login-email">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="your@email.com"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="login-password">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="••••••••"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full gradient-bg text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;