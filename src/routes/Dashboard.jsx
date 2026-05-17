import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import DashboardUsers from '../components/DasboardUsers';
import DashboardLogs from '../components/DashboardLogs';
import DashboardTokens from '../components/DashboardTokens';
import DashboardSessions from '../components/DashboardSessions';
import DashboardMFA from '../components/DashboardMFA';

import './Dashboard.css';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('users');
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        if (!storedToken) {
            navigate('/');
        } else {
            setToken(storedToken);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate('/');
    };

    if (!token) return null;

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2 className="dashboard-title">System Database Overview</h2>
                <button onClick={handleLogout} className="btn-primary logout-btn">
                    Secure Logout
                </button>
            </div>

            <div className="tab-menu">
                <button className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>Users</button>
                <button className={`tab-btn ${activeTab === 'logs' ? 'active' : ''}`} onClick={() => setActiveTab('logs')}>Auth Logs</button>
                <button className={`tab-btn ${activeTab === 'tokens' ? 'active' : ''}`} onClick={() => setActiveTab('tokens')}>Verification Tokens</button>
                <button className={`tab-btn ${activeTab === 'sessions' ? 'active' : ''}`} onClick={() => setActiveTab('sessions')}>Sessions</button>
                <button className={`tab-btn ${activeTab === 'mfa' ? 'active' : ''}`} onClick={() => setActiveTab('mfa')}>MFA Codes</button>
            </div>

            <div className="tab-content">
                {activeTab === 'users' && <DashboardUsers token={token} />}
                {activeTab === 'logs' && <DashboardLogs token={token} />}
                {activeTab === 'tokens' && <DashboardTokens token={token} />}
                {activeTab === 'sessions' && <DashboardSessions token={token} />}
                {activeTab === 'mfa' && <DashboardMFA token={token} />}
            </div>
        </div>
    );
}