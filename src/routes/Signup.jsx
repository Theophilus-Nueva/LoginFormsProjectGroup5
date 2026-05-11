// src/routes/Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import './Signup.css';

export default function Signup() {
    // --- STATE FOR BACKEND ---
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    // --- STATE FOR UI COMPLETENESS ---
    const [phone, setPhone] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');

    // --- UX STATES ---
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        setIsError(false);

        try {
            // Sending the 3 fields your Python backend currently expects
            await registerUser(username, email, password);
            
            // Show success message and redirect to login after 2 seconds
            setIsError(false);
            setMessage("Account created successfully! Redirecting to login...");
            
            setTimeout(() => {
                navigate('/');
            }, 2000);

        } catch (error) {
            setIsError(true);
            if (error.response && error.response.status === 400) {
                setMessage("That email is already registered.");
            } else {
                setMessage("Cannot connect to the server. Please try again.");
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
                
                <div className="form-group">
                    <label>Date of Birth <span className="required">*</span></label>
                    <div className="dob-selects">
                        <select required value={month} onChange={(e) => setMonth(e.target.value)} disabled={isLoading}>
                            <option value="" disabled>Month</option>
                            <option value="01">January</option>
                            <option value="02">February</option>
                            {/* Add remaining months */}
                        </select>
                        <select required value={day} onChange={(e) => setDay(e.target.value)} disabled={isLoading}>
                            <option value="" disabled>Day</option>
                            <option value="01">1</option>
                            <option value="02">2</option>
                            {/* Add remaining days */}
                        </select>
                        <select required value={year} onChange={(e) => setYear(e.target.value)} disabled={isLoading}>
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