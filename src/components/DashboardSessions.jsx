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
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div style={{ overflowX: 'auto' }}>
            <h3>Active Sessions Table</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
                        <th style={{ padding: '8px' }}>Session ID</th>
                        <th style={{ padding: '8px' }}>User ID</th>
                        <th style={{ padding: '8px' }}>IP Address</th>
                        <th style={{ padding: '8px' }}>Expires At</th>
                    </tr>
                </thead>
                <tbody>
                    {sessions.map((s) => (
                        <tr key={s.session_id} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '8px', fontSize: '0.85rem' }}>{s.session_id.substring(0, 8)}...</td>
                            <td style={{ padding: '8px', fontSize: '0.85rem' }}>{s.user_id.substring(0, 8)}...</td>
                            <td style={{ padding: '8px' }}>{s.ip_address}</td>
                            <td style={{ padding: '8px' }}>{new Date(s.expires_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}