import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import Login from './routes/Login';
import Signup from './routes/Signup';
import Success from './routes/Success'; 
import OtpVerification from './routes/OtpVerification'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route points to Login */}
          <Route path="/" element={<Login />} />
          
          {/* Route for the Signup page */}
          <Route path="/signup" element={<Signup />} />

          {/* Your new Success teleport destination */}
          <Route path="/success" element={<Success />} />

          {/* The MFA verification screen we will build next */}
          <Route path="/otp" element={<OtpVerification />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;