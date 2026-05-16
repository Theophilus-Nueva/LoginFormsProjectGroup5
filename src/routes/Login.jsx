// src/routes/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import './Login.css';

import logo_google from '../assets/logo_google.png';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        setIsError(false);

        console.log("EXACT EMAIL BEING SENT TO SERVICE:", `"${email}"`);

        try {
            const data = await loginUser(email, password);

            if (data.status === "mfa_required") {
                // Teleport to the OTP screen upon successful password check!
                navigate('/otp', { state: { userId: data.user_id } });
            }
        } catch (error) {
            setIsError(true);
            if (error.response && error.response.status === 401) {
                setMessage("Invalid email or password.");
            } else {
                setMessage("Cannot connect to the server. Please try again.");
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
                    <div className="captcha-container">
                        <div className="captcha-box"></div>
                        <input 
                            type="text" 
                            placeholder="Enter Code" 
                            disabled={isLoading}
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