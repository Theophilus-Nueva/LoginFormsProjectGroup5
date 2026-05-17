import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function DashboardLogs({ token }) {
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get('https://loginformsprojectgroup5-backend-production.up.railway.app/api/dashboard/logs', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setLogs(response.data.logs);
            } catch (err) {
                setError(err.response?.data?.detail || "Failed to load Logs table.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchLogs();
    }, [token]);

    if (isLoading) return <p>Loading Logs...</p>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div style={{ overflowX: 'auto' }}>
            <h3>Authentication Logs Table</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
                        <th style={{ padding: '8px' }}>Log ID</th>
                        <th style={{ padding: '8px' }}>Email Attempted</th>
                        <th style={{ padding: '8px' }}>IP Address</th>
                        <th style={{ padding: '8px' }}>Event Type</th>
                        <th style={{ padding: '8px' }}>Attempted At</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr key={log.log_id} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '8px' }}>{log.log_id}</td>
                            <td style={{ padding: '8px' }}>{log.email_attempted}</td>
                            <td style={{ padding: '8px' }}>{log.ip_address}</td>
                            <td style={{ padding: '8px', fontWeight: 'bold', color: log.event_type.includes('FAIL') ? 'red' : 'green' }}>
                                {log.event_type}
                            </td>
                            <td style={{ padding: '8px' }}>{new Date(log.attempted_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}// src/components/DashboardLogs.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function DashboardLogs({ token }) {
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get('https://loginformsprojectgroup5-backend-production.up.railway.app/api/dashboard/logs', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setLogs(response.data.logs);
            } catch (err) {
                setError(err.response?.data?.detail || "Failed to load Logs table.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchLogs();
    }, [token]);

    if (isLoading) return <p>Loading Logs...</p>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div style={{ overflowX: 'auto' }}>
            <h3>Authentication Logs Table</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
                        <th style={{ padding: '8px' }}>Log ID</th>
                        <th style={{ padding: '8px' }}>Email Attempted</th>
                        <th style={{ padding: '8px' }}>IP Address</th>
                        <th style={{ padding: '8px' }}>Event Type</th>
                        <th style={{ padding: '8px' }}>Attempted At</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr key={log.log_id} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '8px' }}>{log.log_id}</td>
                            <td style={{ padding: '8px' }}>{log.email_attempted}</td>
                            <td style={{ padding: '8px' }}>{log.ip_address}</td>
                            <td style={{ padding: '8px', fontWeight: 'bold', color: log.event_type.includes('FAIL') ? 'red' : 'green' }}>
                                {log.event_type}
                            </td>
                            <td style={{ padding: '8px' }}>{new Date(log.attempted_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}