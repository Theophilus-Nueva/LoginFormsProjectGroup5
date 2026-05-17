// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './routes/Login';
import Signup from './routes/Signup';
import OtpVerification from './routes/OtpVerification'; 
import Dashboard from './routes/Dashboard';

import ProtectedRoute from './routes/ProtectedRoute';

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<OtpVerification />} />

        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;