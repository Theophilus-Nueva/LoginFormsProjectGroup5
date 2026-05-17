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
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="table-responsive">
            <h3>MFA Codes Table</h3>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Code ID</th>
                        <th>User ID</th>
                        <th>OTP Code</th>
                        <th>Expires At</th>
                    </tr>
                </thead>
                <tbody>
                    {mfa.map((m) => (
                        <tr key={m.code_id}>
                            <td>{m.code_id}</td>
                            <td className="text-small">{m.user_id.substring(0, 8)}...</td>
                            <td className="text-bold letter-spacing">{m.code}</td>
                            <td>{new Date(m.expires_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}