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
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="table-responsive">
            <h3>Verification Tokens Table</h3>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Token</th>
                        <th>User ID</th>
                        <th>Expires At</th>
                    </tr>
                </thead>
                <tbody>
                    {tokens.map((t) => (
                        <tr key={t.token}>
                            <td className="text-small">{t.token.substring(0, 15)}...</td>
                            <td className="text-small">{t.user_id.substring(0, 8)}...</td>
                            <td>{new Date(t.expires_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}