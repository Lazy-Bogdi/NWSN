import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleCallback: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const error = urlParams.get('error');

        if (token) {
            localStorage.setItem('jwt_token', token);
            console.log(token)
            navigate('/'); // Redirect to your desired route
        } else {
            console.error(error);
        }
    }, [navigate]);

    return <div>Loading...</div>;
};

export default GoogleCallback;
