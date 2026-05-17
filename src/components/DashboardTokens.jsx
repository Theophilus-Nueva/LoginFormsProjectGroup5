// src/components/DashboardTokens.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function DashboardTokens({ token }) {
    const [tokens, setTokens] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTokens = async () => {
            try {
                const response = await axios.get('https://loginformsprojectgroup5-backend-production.up.railway.app/api/dashboard/tokens', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTokens(response.data.tokens);
            } catch (err) {
                setError("Failed to load Tokens table.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchTokens();
    }, [token]);

    if (isLoading) return <p>Loading Tokens...</p>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div style={{ overflowX: 'auto' }}>
            <h3>Verification Tokens Table</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
                        <th style={{ padding: '8px' }}>Token</th>
                        <th style={{ padding: '8px' }}>User ID</th>
                        <th style={{ padding: '8px' }}>Expires At</th>
                    </tr>
                </thead>
                <tbody>
                    {tokens.map((t) => (
                        <tr key={t.token} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '8px', fontSize: '0.85rem' }}>{t.token.substring(0, 15)}...</td>
                            <td style={{ padding: '8px', fontSize: '0.85rem' }}>{t.user_id.substring(0, 8)}...</td>
                            <td style={{ padding: '8px' }}>{new Date(t.expires_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}