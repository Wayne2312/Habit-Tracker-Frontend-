import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Separate LogActivityButton component
function LogActivityButton({ habitId, onLogged }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const logActivity = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/habits/${habitId}/log`,
                {},
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                }
            );
            onLogged(response.data.streak);
        } catch (err) {
            setError('Failed to log activity');
        } finally {
            setLoading(false);
        }
        };
    
        return (
            <div>
                <button onClick={logActivity} disabled={loading}>
                    {loading ? 'Logging...' : 'Log Activity'}
                </button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </div>
        );
    }
    
    export default LogActivityButton;