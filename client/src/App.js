// client/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Auth/Login';
import HeroSection from './components/sections/HeroSection';
import PhotoGallery from './components/sections/PhotoGallery';
import VideoGallery from './components/sections/VideoGallery';
import MessagesSection from './components/sections/MessagesSection';
import MemoryTimeline from './components/sections/MemoryTimeline';
import FutureMessages from './components/sections/FutureMessages';
import SurprisePanel from './components/sections/SurprisePanel';
import FloatingHearts from './components/animations/FloatingHearts';
import ConfettiBurst from './components/animations/ConfettiBurst';
import AdminPanel from './components/admin/AdminPanel';
import AutoAnimationsController from './components/animations/AutoAnimationsController';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1a1a1a'
      }}>
        <div className="loading"></div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" />;
};

const MainApp = () => {
  return (
    <div style={{ 
      position: 'relative',
      background: '#1a1a1a',
      minHeight: '100vh'
    }}>
      {/* Auto Animations Controller */}
      <AutoAnimationsController />
      
      {/* Admin Panel */}
      <AdminPanel />
      
      {/* Background Animations */}
      <FloatingHearts />
      <ConfettiBurst />
      
      {/* Main Sections */}
      <HeroSection />
      <PhotoGallery />
      <VideoGallery />
      <MemoryTimeline />
      <FutureMessages />
      <MessagesSection />
      
      {/* Floating Buttons */}
      {/* <SurprisePanel /> */}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <MainApp />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;