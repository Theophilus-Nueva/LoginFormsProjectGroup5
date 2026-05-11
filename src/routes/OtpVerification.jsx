import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  
  // These hooks let us grab the data passed from the Login page and teleport the user
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the userId we passed over from the Login screen
  const userId = location.state?.userId;

  const handleVerify = (e) => {
    e.preventDefault();
    
    // We will wire this up to the live backend next!
    console.log("Verifying OTP:", otp, "for User ID:", userId);
    setMessage("OTP Submitted! (Backend connection coming next)");
    
    // Once the backend verifies the OTP, we will uncomment this to send them to the success page:
    // navigate('/success');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h2>Two-Factor Authentication</h2>
      
      {userId ? (
        <p style={{ color: '#555' }}>Please enter the 3-digit verification code sent to your email.</p>
      ) : (
        <p style={{ color: 'red' }}>Warning: No User ID detected. Did you log in first?</p>
      )}

      {message && (
        <div style={{ padding: '10px', margin: '15px 0', backgroundColor: '#e3f2fd', color: '#1565c0', borderRadius: '4px' }}>
          {message}
        </div>
      )}

      <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="e.g. 456"
          required
          maxLength="6"
          style={{ 
            padding: '12px', 
            fontSize: '18px', 
            textAlign: 'center', 
            letterSpacing: '5px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <button 
          type="submit" 
          disabled={!userId}
          style={{ 
            padding: '12px', 
            backgroundColor: userId ? '#007bff' : '#ccc', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: userId ? 'pointer' : 'not-allowed',
            fontWeight: 'bold'
          }}
        >
          Verify Code
        </button>
      </form>
    </div>
  );
};

export default OtpVerification;