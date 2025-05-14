// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import TripsPage from "./pages/TripsPage"; // Create this page later
import ExpensesPage from "./pages/ExpensesPage"; // Create this page later
import NotFoundPage from "./pages/NotFoundPage"; // Create this
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { currentUser, loading } = useAuth(); // Get loading state

  if (loading) {
    return <div>Loading application...</div>; // Or a more sophisticated loading screen
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Public routes - redirect if logged in */}
        <Route
          path="/login"
          element={
            currentUser ? <Navigate to="/dashboard" replace /> : <LoginPage />
          }
        />
        <Route
          path="/register"
          element={
            currentUser ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <RegisterPage />
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trips"
          element={
            <ProtectedRoute>
              <TripsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expenses" // Or "/trips/:tripId/expenses" for context
          element={
            <ProtectedRoute>
              <ExpensesPage /> {/* This will be your main expenses page */}
            </ProtectedRoute>
          }
        />
        {/* You might want a specific route for trip details: /trips/:tripId */}
        {/* <Route 
          path="/trips/:tripId" 
          element={
            <ProtectedRoute>
              <TripDetailPage />
            </ProtectedRoute>
          } 
        /> */}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
