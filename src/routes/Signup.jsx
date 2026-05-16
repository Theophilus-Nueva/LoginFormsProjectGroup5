// src/routes/Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha"; // 1. Import the component
import { registerUser } from '../services/authService';
import './Signup.css';

export default function Signup() {
    // --- STATE FOR BACKEND ---
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    // --- STATE FOR UI COMPLETENESS ---
    const [phone, setPhone] = useState('');
    const [captchaToken, setCaptchaToken] = useState(null); // 2. State to hold the token

    // --- UX STATES ---
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        // 3. Strict Check: Require reCAPTCHA verification before submitting
        if (!captchaToken) {
            setIsError(true);
            setMessage("Please check the 'I'm not a robot' box.");
            return;
        }

        setIsLoading(true);

        try {
            // 4. Pass captchaToken to your authService register function
            const data = await registerUser(username, email, password, captchaToken);
            
            // If backend handles the strict flow and requests OTP verification
            if (data?.status === "pending_verification") {
                navigate('/otp', { state: { email: email } });
            } else {
                setIsError(false);
                setMessage("Account created successfully! Redirecting to login...");
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }

        } catch (error) {
            setIsError(true);
            if (error.response && error.response.status === 400) {
                setMessage("That email or username is already registered.");
            } else {
                setMessage(error.response?.data?.detail || "Cannot connect to the server. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <h2>Create an account</h2>

            {/* Dynamic Message Box */}
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

            <form onSubmit={handleSignup}>
                <div className="form-group">
                    <label>Email <span className="required">*</span></label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                        disabled={isLoading}
                    />
                </div>
                
                <div className="form-group">
                    <label>Username <span className="required">*</span></label>
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required 
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group">
                    <label>Phone Number <span className="required">*</span></label>
                    <input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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
                        minLength="8"
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group" style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                    <ReCAPTCHA
                        sitekey={import.meta.env.VITE_CAPTCHA_KEY || process.env.REACT_APP_CAPTCHA_KEY} 
                        onChange={(token) => setCaptchaToken(token)}
                    />
                </div>
                
                <p className="terms">
                    By Clicking "Create Account", you agree to our <a href="#terms">Terms and Conditions</a> and have read the <a href="#privacy">Privacy Policy</a>.
                </p>
                
                <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
            </form>
            
            <div className="links" style={{ textAlign: 'left', marginTop: '16px' }}>
                <Link to="/">Already have an account? Log in</Link>
            </div>
        </div>
    );
}