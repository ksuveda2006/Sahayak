import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import DashboardPage from './pages/DashboardPage';
import ContentGeneratorPage from './pages/ContentGeneratorPage';
import WorksheetGeneratorPage from './pages/WorksheetGeneratorPage';
import VisualAidGeneratorPage from './pages/VisualAidGeneratorPage';
import VoiceAssessmentPage from './pages/VoiceAssessmentPage';
import ImageAnalyzerPage from './pages/ImageAnalyzerPage';
import VideoCreatorPage from './pages/VideoCreatorPage';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/" />;
};

// Landing Page Component
const LandingPage = () => {
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />
            
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
              path="/content-generator" 
              element={
                <ProtectedRoute>
                  <ContentGeneratorPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/worksheet-generator" 
              element={
                <ProtectedRoute>
                  <WorksheetGeneratorPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/visual-aid-generator" 
              element={
                <ProtectedRoute>
                  <VisualAidGeneratorPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/voice-assessment" 
              element={
                <ProtectedRoute>
                  <VoiceAssessmentPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/image-analyzer" 
              element={
                <ProtectedRoute>
                  <ImageAnalyzerPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/video-creator" 
              element={
                <ProtectedRoute>
                  <VideoCreatorPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: {
                  primary: 'green',
                  secondary: 'black',
                },
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

