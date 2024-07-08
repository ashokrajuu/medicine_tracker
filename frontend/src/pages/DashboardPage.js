// frontend/src/pages/DashboardPage.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import PatientForm from '../components/PatientForm';
import MedicineForm from '../components/MedicineForm';
import PatientList from '../components/PatientList';
import MedicineList from '../components/MedicineList';
import LogoutButton from '../components/LogoutButton';
import styled from 'styled-components';
//import Homepage from './HomePage';

const DashboardPage = ({ onLogout }) => (
    <Router>
        <div>
            <h1>Dashboard</h1>
            <nav>
                <Button as={Link} to="/patient-form">Patient Form</Button>
                <Button as={Link} to="/medicine-form">Medicine Form</Button>
                <Button as={Link} to="/patient-list">Patient List</Button>
                <Button as={Link} to="/medicine-list">Medicine List</Button>
                <Button as={Link} to="/register">New User Register Form</Button>
            </nav>
            <LogoutButton onLogout={onLogout} />
            <Routes>
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/patient-form" element={<PatientForm />} />
                <Route path="/medicine-form" element={<MedicineForm />} />
                <Route path="/patient-list" element={<PatientList />} />
                <Route path="/medicine-list" element={<MedicineList />} />
            </Routes>
        </div>
    </Router>
);

export default DashboardPage;

// Styled components
const Container = styled.div`
    text-align: center;
    margin-top: 50px;
`;

const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Button = styled(Link)`
    display: block;
    padding: 10px 20px;
    margin: 10px 0;
    font-size: 18px;
    color: white;
    background-color: #007BFF;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;