// frontend/src/components/MedicineForm.js

import React, { useState, useEffect } from 'react';

const MedicineForm = () => {
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [patientId, setPatientId] = useState('');
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            const response = await fetch('http://127.0.0.1:5000/api/patients');
            const data = await response.json();
            setPatients(data);
        };
        fetchPatients();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:5000/api/medicines', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, dosage, patient_id: patientId }),
        });
        const data = await response.json();
        if (response.ok) {
            alert('Medicine added successfully');
        } else {
            alert(data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Medicine Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Dosage"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                required
            />
            <select value={patientId} onChange={(e) => setPatientId(e.target.value)} required>
                <option value="">Select Patient</option>
                {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                        {patient.name}
                    </option>
                ))}
            </select>
            <button type="submit">Add Medicine</button>
        </form>
    );
};

export default MedicineForm;
