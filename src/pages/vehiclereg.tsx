import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

interface VehicleRegistrationData {
    appointmentId: number | null;
    chasisNumber: string;
    customerAddress: string;
    customerAadharNo: string;
    customerGstin: string;
    supervisor: string;
    technician: string;
    worker: string;
    status: string;
    userId: number | null;
    date: string;
}

const MenuBar = () => {
    return (
        <nav className="bg-blue-900 text-white py-4">
            <ul className="flex justify-around">
                <li><NavLink to="/vehicle-registration" className={({ isActive }) => isActive ? 'bg-blue-700 px-4 py-2 rounded-lg' : 'px-4 py-2'}>Vehicles</NavLink></li>
                <li><NavLink to="/vehicle-regi" className="px-4 py-2">Vehicle Registration</NavLink></li>
                <li><NavLink to="/vehicle-by-id" className="px-4 py-2"> Vehicle ID</NavLink></li>
                <li><NavLink to="/vehicle-by-date-range" className="px-4 py-2">Vehicle Date Range</NavLink></li>
                <li><NavLink to="/Vehiclestatus" className="px-4 py-2">Vehicle Status</NavLink></li>
                <li><NavLink to="/VehicleByAppointmentId" className="px-4 py-2">Vehicle AppointmentId</NavLink></li>
                     </ul>
        </nav>
    );
};

const VehicleRegistrationForm: React.FC = () => {
    const [formData, setFormData] = useState<VehicleRegistrationData>({
        appointmentId: null,
        chasisNumber: '',
        customerAddress: '',
        customerAadharNo: '',
        customerGstin: '',
        supervisor: '',
        technician: '',
        worker: '',
        status: 'in process',
        userId: null,
        date: ''
    });

    const [errors, setErrors] = useState<{ customerAadharNo?: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'customerAadharNo') {
            if (!/^[0-9]{12}$/.test(value)) {
                setErrors({ ...errors, customerAadharNo: 'Aadhar number must be exactly 12 digits' });
            } else {
                const { customerAadharNo, ...rest } = errors;
                setErrors(rest);
            }
        }

        if (name === 'appointmentId' || name === 'userId') {
            setFormData({ ...formData, [name]: value === '' ? null : Number(value) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (errors.customerAadharNo) {
            alert('Please fix the errors before submitting.');
            return;
        }

        try {
            const response = await fetch('https://carauto01-production-8b0b.up.railway.app/vehicle-reg/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            alert('Form submitted successfully!');
            console.log('Form submitted successfully:', result);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit form');
        }
    };

    return (
        <div>
            <MenuBar />
            <h1 className="text-center font-bold text-2xl">Vehicle Registration</h1>
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <form onSubmit={handleSubmit} className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {Object.keys(formData).map((key) => (
                        <div key={key} className="flex items-center gap-1 relative">
                            {key === 'status' ? (
                                <select
                                    id={key}
                                    name={key}
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="p-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <option value="" disabled>Select Status</option>
                                    <option value="in process">In Process</option>
                                    <option value="complete">Complete</option>
                                    <option value="waiting">Waiting</option>
                                </select>
                            ) : (
                                <input
                                    type={key === 'appointmentId' || key === 'userId' ? 'number' : 'text'}
                                    id={key}
                                    name={key}
                                    value={formData[key as keyof VehicleRegistrationData] ?? ''}
                                    onChange={handleChange}
                                    className="p-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
                                />
                            )}
                            {key === 'customerAadharNo' && errors.customerAadharNo && (
                                <span className="text-red-500 text-sm">{errors.customerAadharNo}</span>
                            )}
                        </div>
                    ))}
                    <button type="submit" className="col-span-1 md:col-span-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default VehicleRegistrationForm;
