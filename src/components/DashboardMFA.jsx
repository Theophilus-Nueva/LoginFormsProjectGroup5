import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function DashboardMFA({ token }) {
    const [mfa, setMfa] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMFA = async () => {
            try {
                const response = await axios.get('https://loginformsprojectgroup5-backend-production.up.railway.app/api/dashboard/mfa', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMfa(response.data.mfa);
            } catch (err) {
                setError("Failed to load MFA table.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchMFA();
    }, [token]);

    if (isLoading) return <p>Loading MFA Codes...</p>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div style={{ overflowX: 'auto' }}>
            <h3>MFA Codes Table</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
                        <th style={{ padding: '8px' }}>Code ID</th>
                        <th style={{ padding: '8px' }}>User ID</th>
                        <th style={{ padding: '8px' }}>OTP Code</th>
                        <th style={{ padding: '8px' }}>Expires At</th>
                    </tr>
                </thead>
                <tbody>
                    {mfa.map((m) => (
                        <tr key={m.code_id} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '8px' }}>{m.code_id}</td>
                            <td style={{ padding: '8px', fontSize: '0.85rem' }}>{m.user_id.substring(0, 8)}...</td>
                            <td style={{ padding: '8px', fontWeight: 'bold', letterSpacing: '2px' }}>{m.code}</td>
                            <td style={{ padding: '8px' }}>{new Date(m.expires_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}