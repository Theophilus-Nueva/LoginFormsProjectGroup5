import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function DashboardUsers({ token }) {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://loginformsprojectgroup5-backend-production.up.railway.app/api/dashboard/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(response.data.users);
            } catch (err) {
                setError(err.response?.data?.detail || "Failed to load Users table.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, [token]);

    if (isLoading) return <p>Loading Users...</p>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div style={{ overflowX: 'auto' }}>
            <h3>Users Table</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
                        <th style={{ padding: '8px' }}>User ID</th>
                        <th style={{ padding: '8px' }}>Username</th>
                        <th style={{ padding: '8px' }}>Email</th>
                        <th style={{ padding: '8px' }}>Verified</th>
                        <th style={{ padding: '8px' }}>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.user_id} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '8px', fontSize: '0.85rem' }}>{user.user_id.substring(0, 8)}...</td>
                            <td style={{ padding: '8px' }}>{user.username}</td>
                            <td style={{ padding: '8px' }}>{user.email}</td>
                            <td style={{ padding: '8px', color: user.is_email_verified ? 'green' : 'red' }}>
                                {user.is_email_verified ? 'Yes' : 'No'}
                            </td>
                            <td style={{ padding: '8px' }}>{new Date(user.created_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}