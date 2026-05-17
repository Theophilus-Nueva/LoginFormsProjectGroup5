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
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="table-responsive">
            <h3>Authentication Logs Table</h3>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Log ID</th>
                        <th>Email Attempted</th>
                        <th>IP Address</th>
                        <th>Event Type</th>
                        <th>Attempted At</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr key={log.log_id}>
                            <td>{log.log_id}</td>
                            <td>{log.email_attempted}</td>
                            <td>{log.ip_address}</td>
                            <td className={log.event_type.includes('FAIL') ? 'text-danger' : 'text-success'}>
                                {log.event_type}
                            </td>
                            <td>{new Date(log.attempted_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}