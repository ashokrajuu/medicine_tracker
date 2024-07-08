// frontend/src/pages/HomePage.js
import React from 'react';
import LoginForm from '../components/LoginForm';
//import RegisterForm from '../components/RegisterForm';

const HomePage = ({ onLogin }) => (
    <div>
        <h1><center>Medicine Tracker for Orphan Homes</center></h1>
        <h1>Home Page</h1>
        <LoginForm onLogin={onLogin} />
    </div>
);

export default HomePage;
