// src/routes/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha"; 
import { loginUser } from '../services/authService';
import './Login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captchaToken, setCaptchaToken] = useState(null); 
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        if (!captchaToken) {
            setIsError(true);
            setMessage("Please check the 'I'm not a robot' box.");
            return;
        }

        setIsLoading(true);

        try {
            const data = await loginUser(email, password, captchaToken);

            // FIXED: Passing the exact state keys the OTP bouncer expects
            if (data.status === "mfa_required" || data.status === "pending_verification") {
                setMessage("Please check your email for the OTP.");
                setTimeout(() => {
                    navigate('/otp', { 
                        state: { 
                            user_id: data.user_id, 
                            email: email 
                        } 
                    });
                }, 1500);
            }
        } catch (error) {
            setIsError(true);
            if (error.response && error.response.status === 401) {
                setMessage("Invalid email or password.");
            } else {
                setMessage(error.response?.data?.detail || "Cannot connect to the server. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <h2>Sign In</h2>

            {message && (
                <div style={{ 
                    color: isError ? '#c62828' : '#2e7d32', 
                    marginBottom: '15px', 
                    fontSize: '14px',
                    fontWeight: 'bold',
                    padding: '10px',
                    backgroundColor: isError ? '#ffebee' : '#e8f5e9',
                    borderRadius: '4px',
                    border: `1px solid ${isError ? '#ef9a9a' : '#a5d6a7'}`
                }}>
                    {message}
                </div>
            )}

            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email <span className="required">*</span></label>
                    <input 
                        type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                        disabled={isLoading}
                    />
                </div>
                
                <div className="form-group">
                    <label>Password <span className="required">*</span></label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                        disabled={isLoading}
                    />
                </div>
                
                <div className="form-group">
                    <div className="captcha-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <ReCAPTCHA
                            sitekey={import.meta.env.VITE_CAPTCHA_KEY || process.env.REACT_APP_CAPTCHA_KEY} 
                            onChange={(token) => setCaptchaToken(token)}
                        />
                    </div>
                </div>
                
                <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading ? 'Authenticating...' : 'Sign In'}
                </button>
            </form>
            
            <div className="links">
                <div style={{ marginTop: '8px' }}>
                    Don't have an account? <Link to="/signup">Register</Link>
                </div>
            </div>
        </div>
    );
}