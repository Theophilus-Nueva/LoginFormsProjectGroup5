// src/routes/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        
        navigate('/');
    };

    return (
        <div className="container" style={{ textAlign: 'center', padding: '40px' }}>
            <h1 style={{ color: '#2e7d32', marginBottom: '20px' }}>
                🎉 Welcome to the Vault! 🎉
            </h1>
            
            <p style={{ marginBottom: '30px', fontSize: '1.1rem', lineHeight: '1.6' }}>
                You have successfully bypassed the ReCAPTCHA, verified your credentials in the database, 
                and passed the Two-Factor Authentication email check.
            </p>
            
            <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', marginBottom: '30px', border: '1px solid #ddd' }}>
                <h3>Your Current Status:</h3>
                <p><strong>Authentication Level:</strong> Maximum</p>
                <p><strong>Session Token:</strong> Secured in Browser Storage</p>
            </div>

            <button 
                onClick={handleLogout} 
                className="btn-primary" 
                style={{ backgroundColor: '#c62828', maxWidth: '200px' }}
            >
                Secure Logout
            </button>
        </div>
    );
}