import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/auth/proctectedRoute';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import EditorialPage from './pages/EditorialPage';
import ViewBookPage from './pages/ViewBookPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1C1C24',
            color: '#F9FAFB',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#F9FAFB',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#F9FAFB',
            },
          },
        }}
      />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editor/:bookId"
          element={
            <ProtectedRoute>
              <EditorialPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/view-book/:bookId"
          element={
            <ProtectedRoute>
              <ViewBookPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;

