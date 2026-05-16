import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // We need axios to talk to FastAPI
import './OtpVerification.css'; 

export default function OtpVerification() {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const userId = location.state?.userId;
  useEffect(() => {
    if (!userId) {
      console.warn("Unauthorized access. Sending back to login.");
      navigate('/'); // Redirect to your login route
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

      setIsError(false);
      setMessage("Verification successful! Logging you in...");
      
      setTimeout(() => navigate('/dashboard'), 1500); 

    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.detail || "Connection error. Please try again.");
    }
  };

  if (!userId) return null;

  return (
    <div className="container">
      <h2>Two-Factor Authentication</h2>
      
      <p className="otp-subtitle">
        Please enter the 6-digit verification code sent to your email.
      </p>

      {message && (
        <div className={`alert-box ${isError ? 'alert-error' : 'alert-success'}`}>
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
          />
        </div>

        <button type="submit" className="btn-primary">
          Verify Code
        </button>
      </form>

      <div className="links">
        <Link to="/">Back to Login</Link>
      </div>
    </div>
  );
}