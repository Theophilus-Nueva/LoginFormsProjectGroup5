import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import { registerUser } from '../services/authService';
import './Signup.css';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const [criteria, setCriteria] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
    });
    
    const [captchaToken, setCaptchaToken] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    // --- NEW: Handle Password Change and Regex Testing ---
    const handlePasswordChange = (e) => {
        const val = e.target.value;
        setPassword(val);

        setCriteria({
            length: val.length >= 8,
            uppercase: /[A-Z]/.test(val),
            lowercase: /[a-z]/.test(val),
            number: /[0-9]/.test(val),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(val)
        });
    };

    // Check if ALL password criteria are met
    const isPasswordValid = Object.values(criteria).every(Boolean);

    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        // --- NEW: Block submission if password is weak ---
        if (!isPasswordValid) {
            setIsError(true);
            setMessage("Please make sure your password meets all requirements.");
            return;
        }

        if (!captchaToken) {
            setIsError(true);
            setMessage("Please check the 'I'm not a robot' box.");
            return;
        }

        setIsLoading(true);

        try {
            const data = await registerUser(username, email, password, captchaToken);
            
            if (data?.status === "pending_verification") {
                setIsError(false);
                setMessage("Check your email! Redirecting to verification...");
                
                setTimeout(() => {
                    navigate('/otp', {
                        state: {
                            user_id: data.user_id,
                            email: email
                        } });
                }, 1500);
            } else {
                setIsError(false);
                setMessage("Account created successfully! Redirecting...");
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }

        } catch (error) {
            setIsError(true);
            
            if (error.response?.status === 422) {
                const missingField = error.response.data.detail[0].loc[1];
                setMessage(`Missing or invalid field: ${missingField}`);
            } 
            else if (error.response?.status === 400) {
                setMessage("That email is already registered or CAPTCHA failed.");
            } 
            else {
                const errorDetail = error.response?.data?.detail;
                setMessage(
                    typeof errorDetail === 'string' 
                        ? errorDetail 
                        : "Cannot connect to the server. Please try again."
                );
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
                    fontWeight: 'bold',
                    padding: '10px',
                    backgroundColor: isError ? '#ffebee' : '#e8f5e9',
                    borderRadius: '4px',
                    border: `1px solid ${isError ? '#ef9a9a' : '#a5d6a7'}`
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
                    <label>Password <span className="required">*</span></label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={handlePasswordChange}
                        required 
                        disabled={isLoading}
                    />
                </div>

                {password.length > 0 && (
                    <div className="password-checklist" style={{ fontSize: '13px', margin: '10px 0', textAlign: 'left', backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
                        <p style={{ margin: '4px 0', color: criteria.length ? '#2e7d32' : '#c62828' }}>
                            {criteria.length ? '✅' : '❌'} At least 8 characters
                        </p>
                        <p style={{ margin: '4px 0', color: criteria.uppercase ? '#2e7d32' : '#c62828' }}>
                            {criteria.uppercase ? '✅' : '❌'} One uppercase letter
                        </p>
                        <p style={{ margin: '4px 0', color: criteria.lowercase ? '#2e7d32' : '#c62828' }}>
                            {criteria.lowercase ? '✅' : '❌'} One lowercase letter
                        </p>
                        <p style={{ margin: '4px 0', color: criteria.number ? '#2e7d32' : '#c62828' }}>
                            {criteria.number ? '✅' : '❌'} One number
                        </p>
                        <p style={{ margin: '4px 0', color: criteria.special ? '#2e7d32' : '#c62828' }}>
                            {criteria.special ? '✅' : '❌'} One special character
                        </p>
                    </div>
                )}

                <div className="form-group" style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                    <ReCAPTCHA
                        sitekey={import.meta.env.VITE_CAPTCHA_KEY || process.env.REACT_APP_CAPTCHA_KEY} 
                        onChange={(token) => setCaptchaToken(token)}
                    />
                </div>
                
                <p className="terms">
                    By Clicking "Create Account", you agree to our <a href="#terms">Terms and Conditions</a> and have read the <a href="#privacy">Privacy Policy</a>.
                </p>
                
                <button type="submit" className="btn-primary" disabled={isLoading || !isPasswordValid}>
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
            </form>
            
            <div className="links" style={{ textAlign: 'left', marginTop: '16px' }}>
                <Link to="/">Already have an account? Log in</Link>
            </div>
        </div>
    );
}