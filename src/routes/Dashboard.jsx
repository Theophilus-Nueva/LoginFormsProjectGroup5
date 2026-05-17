// src/routes/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import your new modular components
import DashboardUsers from '../components/DashboardUsers';
import DashboardLogs from '../components/DashboardLogs';
import DashboardTokens from '../components/DashboardTokens';
import DashboardSessions from '../components/DashboardSessions';
import DashboardMFA from '../components/DashboardMFA';

import './Dashboard.css'; // Optional: if you want to move the inline styles to CSS later

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('users');
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    // 1. The Bouncer Check
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (!storedToken) {
            navigate('/');
        } else {
            setToken(storedToken);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
    };

    if (!token) return null; // Prevent UI flash before redirect

    return (
        <div
            className="container"
            style={{ maxWidth: '1000px', width: '95%', margin: '40px auto' }}>
            {/* Header */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}>
                <h2 style={{ color: '#2e7d32', margin: 0 }}>
                    System Database Overview
                </h2>
                <button
                    onClick={handleLogout}
                    className="btn-primary"
                    style={{
                        backgroundColor: '#c62828',
                        width: 'auto',
                        padding: '10px 20px',
                        margin: 0,
                    }}>
                    Secure Logout
                </button>
            </div>

            {/* Tab Navigation Menu */}
            <div
                style={{
                    display: 'flex',
                    gap: '10px',
                    marginBottom: '20px',
                    borderBottom: '2px solid #ddd',
                    paddingBottom: '10px',
                }}>
                <button
                    onClick={() => setActiveTab('users')}
                    style={{
                        padding: '8px 16px',
                        cursor: 'pointer',
                        backgroundColor:
                            activeTab === 'users' ? '#2e7d32' : '#f5f5f5',
                        color: activeTab === 'users' ? 'white' : '#333',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                    }}>
                    Users
                </button>
                <button
                    onClick={() => setActiveTab('logs')}
                    style={{
                        padding: '8px 16px',
                        cursor: 'pointer',
                        backgroundColor:
                            activeTab === 'logs' ? '#2e7d32' : '#f5f5f5',
                        color: activeTab === 'logs' ? 'white' : '#333',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                    }}>
                    Auth Logs
                </button>
                {/* Add these back when you create the files! */}
                {/* <button onClick={() => setActiveTab('tokens')}>Verification Tokens</button> */}
                {/* <button onClick={() => setActiveTab('sessions')}>Sessions</button> */}
                {/* <button onClick={() => setActiveTab('mfa')}>MFA Codes</button> */}
            </div>

            {/* Dynamic Component Rendering */}
            <div
                className="tab-content"
                style={{
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                }}>
                {activeTab === 'users' && <DashboardUsers token={token} />}
                {activeTab === 'logs' && <DashboardLogs token={token} />}

                {/* {activeTab === 'tokens' && <DashboardTokens token={token} />} */}
                {/* {activeTab === 'sessions' && <DashboardSessions token={token} />} */}
                {/* {activeTab === 'mfa' && <DashboardMFA token={token} />} */}
            </div>
        </div>
    );
}
