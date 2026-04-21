// src/routes/Signup.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
    return (
        <div className="container">
            <h2>Create an account</h2>
            <form>
                <div className="form-group">
                    <label>Email <span className="required">*</span></label>
                    <input type="email" required />
                </div>
                
                <div className="form-group">
                    <label>Username <span className="required">*</span></label>
                    <input type="text" required />
                </div>

                <div className="form-group">
                    <label>Phone Number <span className="required">*</span></label>
                    <input type="tel" required />
                </div>
                
                <div className="form-group">
                    <label>Password <span className="required">*</span></label>
                    <input type="password" required />
                </div>
                
                <div className="form-group">
                    <label>Date of Birth <span className="required">*</span></label>
                    <div className="dob-selects">
                        <select required defaultValue="">
                            <option value="" disabled>Month</option>
                            <option value="01">January</option>
                            <option value="02">February</option>
                            {/* Add remaining months */}
                        </select>
                        <select required defaultValue="">
                            <option value="" disabled>Day</option>
                            <option value="01">1</option>
                            <option value="02">2</option>
                            {/* Add remaining days */}
                        </select>
                        <select required defaultValue="">
                            <option value="" disabled>Year</option>
                            <option value="2026">2026</option>
                            <option value="2025">2025</option>
                            {/* Add remaining years */}
                        </select>
                    </div>
                </div>
                
                <p className="terms">
                    By Clicking "Create Account", you agree to our <a href="#terms">Terms and Conditions</a> and have read the <a href="#privacy">Privacy Policy</a>.
                </p>
                
                <button type="submit" className="btn-primary">Create Account</button>
            </form>
            
            <div className="links" style={{ textAlign: 'left', marginTop: '16px' }}>
                <Link to="/">Already have an account? Log in</Link>
            </div>
        </div>
    );
}