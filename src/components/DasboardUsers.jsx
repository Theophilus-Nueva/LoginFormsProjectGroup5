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
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="table-responsive">
            <h3>Users Table</h3>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Verified</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.user_id}>
                            <td className="text-small">{user.user_id.substring(0, 8)}...</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td className={user.is_email_verified ? 'text-success' : 'text-danger'}>
                                {user.is_email_verified ? 'Yes' : 'No'}
                            </td>
                            <td>{new Date(user.created_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}