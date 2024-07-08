// frontend/src/components/PatientList.js

import React, { useState, useEffect } from 'react';

const MedicineList = () => {
    const [medicines, setMedicines] = useState([]);

    useEffect(() => {
        const fetchMedicines = async () => {
            const response = await fetch('http://127.0.0.1:5000/api/medicines');
            const data = await response.json();
            setMedicines(data);
        };
        fetchMedicines();
    }, []);

    return (
        <div>
            <h2>Medicine List</h2>
            <ul>
                {medicines.map((medicines) => (
                    <li key={medicines.id}>
                        {medicines.name} - {medicines.dosage} - {medicines.patient_name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MedicineList;
