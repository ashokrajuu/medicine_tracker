// frontend/src/components/PatientList.js

import React, { useState, useEffect } from 'react';

const PatientList = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            const response = await fetch('http://127.0.0.1:5000/api/patients');
            const data = await response.json();
            setPatients(data);
        };
        fetchPatients();
    }, []);

    return (
        <div>
            <h2>Patients List</h2>
            <ul>
                {patients.map((patient) => (
                    <li key={patient.id}>
                        {patient.name} - {patient.age} - {patient.gender}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PatientList;
