// src/routes/OtpVerification.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './OtpVerification.css'; 

export default function OtpVerification() {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // 1. FIXED: Matching the exact keys sent from Signup.jsx
  const userId = location.state?.user_id; 
  const email = location.state?.email;    

  // The Bouncer: Kicks you out if you try to bypass the login/signup screen
  useEffect(() => {
    if (!userId) {
      console.warn("Unauthorized access. Sending back to login.");
      navigate('/');
    }
  }, [userId, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsError(false);
    setMessage("Verifying code...");

    try {
      const response = await axios.post('https://loginformsprojectgroup5-backend-production.up.railway.app/api/auth/verify-otp', {
        user_id: userId,
        otp_code: otp
      });

      // 2. THE UPGRADE: Hand out the VIP Pass!
      // This checks if FastAPI sent a real JWT token. If it did, save it.
      if (response.data.access_token) {
          localStorage.setItem("authToken", response.data.access_token);
      } else {
          // Temporary fallback so you can test it right now before we upgrade FastAPI
          localStorage.setItem("authToken", "true");
      }

      setIsError(false);
      setMessage("Verification successful! Logging you in...");
      
      setTimeout(() => navigate('/dashboard'), 1500); 

    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.detail || "Connection error. Please try again.");
    }
  };

  // Prevent rendering the UI for a split second while redirecting an unauthorized user
  if (!userId) return null;

  return (
    <div className="container">
      <h2>Two-Factor Authentication</h2>
      
      {/* Upgraded to display the actual email passed from Signup! */}
      <p className="otp-subtitle">
        Please enter the 6-digit verification code sent to <br/>
        <strong>{email || "your email"}</strong>.
      </p>

      {message && (
        <div className={`alert-box ${isError ? 'alert-error' : 'alert-success'}`} style={{ marginBottom: '15px', padding: '10px', borderRadius: '4px', border: '1px solid', color: isError ? '#c62828' : '#2e7d32', backgroundColor: isError ? '#ffebee' : '#e8f5e9' }}>
          {message}
        </div>
      )}

      <form onSubmit={handleVerify}>
        <div className="form-group">
          <label>Verification Code <span className="required">*</span></label>
          <input
            type="text"
            className="otp-input"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="------" 
            required
            maxLength="6" 
            style={{ textAlign: 'center', letterSpacing: '4px', fontSize: '1.2rem' }}
          />
        </div>

        <button type="submit" className="btn-primary">
          Verify Code
        </button>
      </form>

      <div className="links" style={{ marginTop: '15px' }}>
        <Link to="/">Back to Login</Link>
      </div>
    </div>
  );
}