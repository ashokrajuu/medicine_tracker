// frontend/src/components/LogoutButton.js

import React from 'react';
//import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ onLogout }) => {
//    const history = useNavigate();

    const handleLogout = async () => {
        const response = await fetch('http://127.0.0.1:5000/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // to include cookies in the request
        });

        if (response.ok) {
            onLogout();
            window.location.href = '/';
//            history.push('/'); // navigate to homepage
        } else {
            const data = await response.json();
            alert(data.message);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default LogoutButton;
