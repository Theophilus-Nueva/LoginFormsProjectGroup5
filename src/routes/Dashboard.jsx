import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import DashboardLogs from '../components/DashboardLogs';

import './Dashboard.css';

export default function Dashboard() {
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
        <div className="dashboard-page-wrapper">
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h2 className="dashboard-title">System Security Audit Logs</h2>
                    <button onClick={handleLogout} className="btn-primary logout-btn">
                        Secure Logout
                    </button>
                </div>
                <div className="tab-content">
                    <DashboardLogs token={token} />
                </div>
            </div>
        </div>
    );
}