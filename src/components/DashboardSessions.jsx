import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function DashboardSessions({ token }) {
    const [sessions, setSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await axios.get('https://loginformsprojectgroup5-backend-production.up.railway.app/api/dashboard/sessions', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSessions(response.data.sessions);
            } catch (err) {
                setError("Failed to load Sessions table.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchSessions();
    }, [token]);

    if (isLoading) return <p>Loading Sessions...</p>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="table-responsive">
            <h3>Active Sessions Table</h3>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Session ID</th>
                        <th>User ID</th>
                        <th>IP Address</th>
                        <th>Expires At</th>
                    </tr>
                </thead>
                <tbody>
                    {sessions.map((s) => (
                        <tr key={s.session_id}>
                            <td className="text-small">{s.session_id.substring(0, 8)}...</td>
                            <td className="text-small">{s.user_id.substring(0, 8)}...</td>
                            <td>{s.ip_address}</td>
                            <td>{new Date(s.expires_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}