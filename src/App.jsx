import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import Login from './routes/Login';
import Signup from './routes/Signup';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route points to Login */}
          <Route path="/" element={<Login />} />
          
          {/* Route for the Signup page */}
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;