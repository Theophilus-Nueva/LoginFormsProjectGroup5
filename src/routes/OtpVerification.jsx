import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './OtpVerification.css'; 

export default function OtpVerification() {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;

  const handleVerify = (e) => {
    e.preventDefault();
    
    console.log("Verifying OTP:", otp, "for User ID:", userId);
    setIsError(false);
    setMessage("OTP Submitted! (Backend connection next)");
  };

  return (
    <div className="container">
      <h2>Two-Factor Authentication</h2>
      
      {userId ? (
        <p className="otp-subtitle">
          Please enter the 3-digit verification code sent to your email.
        </p>
      ) : (
        <p className="otp-subtitle required" style={{ fontWeight: 'bold' }}>
          Warning: No User ID detected. Did you log in first?
        </p>
      )}

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
            placeholder="---"
            required
            maxLength="3"
            disabled={!userId}
          />
        </div>

        <button 
          type="submit" 
          className="btn-primary"
          disabled={!userId}
        >
          Verify Code
        </button>
      </form>

      <div className="links">
        <Link to="/">Back to Login</Link>
      </div>
    </div>
  );
}