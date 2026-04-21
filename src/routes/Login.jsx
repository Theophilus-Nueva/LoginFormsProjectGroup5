// src/routes/Login.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

import logo_google from '../assets/logo_google.png';

export default function Login() {
    return (
        <div className="container">
            <h2>Sign In</h2>
            <form>
                <div className="form-group">
                    <label>Email or mobile number <span className="required">*</span></label>
                    <input type="text" required />
                </div>
                
                <div className="form-group">
                    <label>Password <span className="required">*</span></label>
                    <input type="password" required />
                </div>
                
                <div className="form-group">
                    <label>Captcha <span className="required">*</span></label>
                    <div className="captcha-container">
                        <div className="captcha-box"></div>
                        <input type="text" placeholder="Enter Code" required />
                    </div>
                </div>
                
                <button type="submit" className="btn-primary">Sign In</button>
                
                <button type="button" className="btn-secondary">
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