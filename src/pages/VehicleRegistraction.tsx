import React, { useState, useEffect } from 'react';

interface VehicleRegistrationData {
    appointmentId: number;
    chasisNumber: string;
    customerAddress: string;
    customerAadharNo: string;
    customerGstin: string;
    supervisor: string;
    technician: string;
    worker: string;
    status: string;
    userId: number;
    date: string;
}

const VehicleRegistrationForm: React.FC = () => {
    const [formData, setFormData] = useState<VehicleRegistrationData>({
        appointmentId: 0,
        chasisNumber: '',
        customerAddress: '',
        customerAadharNo: '',
        customerGstin: '',
        supervisor: '',
        technician: '',
        worker: '',
        status: 'in process',
        userId: 0,
        date: ''
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [vehicleData, setVehicleData] = useState<VehicleRegistrationData[]>([]);

    useEffect(() => {
        const fetchAllVehicleData = async () => {
            try {
                const response = await fetch('https://carauto01-production-8b0b.up.railway.app/vehicle-reg/getAll');
                const data = await response.json();
                setVehicleData(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching all vehicle data:', error);
                alert('Failed to fetch all vehicle data');
            }
        };

        fetchAllVehicleData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (value.trim() === '') {
            setErrors({ ...errors, [name]: 'This field is required' });
        } else {
            const { [name]: removed, ...rest } = errors;
            setErrors(rest);
        }

        if (name === 'customerAadharNo' && !/^[0-9]{12}$/.test(value)) {
            setErrors({ ...errors, customerAadharNo: 'Aadhar number must be exactly 12 digits' });
        } else {
            const { customerAadharNo, ...rest } = errors;
            setErrors(rest);
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: { [key: string]: string } = {};
        Object.keys(formData).forEach(key => {
            if (!formData[key as keyof VehicleRegistrationData].toString().trim()) {
                newErrors[key] = 'This field is required';
            }
        });

        if (Object.keys(newErrors).length > 0 || errors.customerAadharNo) {
            setErrors({ ...errors, ...newErrors });
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
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Vehicle Registration Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {Object.keys(formData).map((key) => (
                    <div key={key} className="flex flex-col">
                        <label htmlFor={key} className="text-sm font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                        {key === 'status' ? (
                            <select
                                id={key}
                                name={key}
                                value={formData.status}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            >
                                <option value="in process">In Process</option>
                                <option value="complete">Complete</option>
                                <option value="waiting">Waiting</option>
                            </select>
                        ) : (
                            <input
                                type="text"
                                id={key}
                                name={key}
                                value={(formData as any)[key]}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        )}
                        {errors[key] && (
                            <span className="text-red-500 text-sm">{errors[key]}</span>
                        )}
                    </div>
                ))}
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Submit</button>
            </form>
        </div>
    );
};

export default VehicleRegistrationForm;
