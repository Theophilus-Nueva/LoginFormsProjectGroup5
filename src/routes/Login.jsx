// src/routes/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha"; // 1. Import the component
import { loginUser } from '../services/authService';
import './Login.css';

import logo_google from '../assets/logo_google.png';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captchaToken, setCaptchaToken] = useState(null); // 2. State to hold the token
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        // 3. Strict Check: Require reCAPTCHA verification before hitting the database
        if (!captchaToken) {
            setIsError(true);
            setMessage("Please check the 'I'm not a robot' box.");
            return;
        }

        setIsLoading(true);
        console.log("EXACT EMAIL BEING SENT TO SERVICE:", `"${email}"`);

        try {
            // 4. Pass captchaToken to the backend service call
            const data = await loginUser(email, password, captchaToken);

            if (data.status === "mfa_required") {
                navigate('/otp', { state: { userId: data.user_id } });
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
                    fontWeight: 'bold'
                }}>
                    {message}
                </div>
            )}

            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email or mobile number <span className="required">*</span></label>
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
                    <label>Captcha <span className="required">*</span></label>
                    <div className="captcha-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        {/* 5. Live Google reCAPTCHA widget instead of the fake code box */}
                        <ReCAPTCHA
                            sitekey={import.meta.env.VITE_CAPTCHA_KEY || process.env.REACT_APP_CAPTCHA_KEY} 
                            onChange={(token) => setCaptchaToken(token)}
                        />
                    </div>
                </div>
                
                <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading ? 'Authenticating...' : 'Sign In'}
                </button>
                
                <button type="button" className="btn-secondary" disabled={isLoading}>
                    <img 
                      src={logo_google}
                      alt="Google logo" 
                      width="18" 
                    />
                    Sign In with Google
                </button>
            </form>
            
            <div className="links">
                <a href="#forgot">Forgot your password?</a>
                <div style={{ marginTop: '8px' }}>
                    Don't have an account? <Link to="/signup">Register</Link>
                </div>
            </div>
        </div>
    );
}