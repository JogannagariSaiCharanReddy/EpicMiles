// src/components/auth/RegisterForm.js
import React, { useState } from 'react';

const RegisterForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    onSubmit({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="register-name">
          Full Name
        </label>
        <input
          id="register-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="John Doe"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="register-email">
          Email
        </label>
        <input
          id="register-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="your@email.com"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="register-password">
          Password
        </label>
        <input
          id="register-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="••••••••"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="register-confirm">
          Confirm Password
        </label>
        <input
          id="register-confirm"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="••••••••"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full gradient-bg text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity"
      >
        Create Account
      </button>
    </form>
  );
};

export default RegisterForm;