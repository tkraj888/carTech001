import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

interface Vehicle {
  vehicleRegId: number;
  appointmentId: number;
  chasisNumber: string;
  customerAddress: string;
  customerAadharNo: string;
  customerGstin: string;
  superwiser: string;
  technician: string;
  worker: string;
  status: string;
  userId: number;
  date: string;
}

const MenuBar = () => {
  return (
    <nav className="bg-blue-900 text-white py-4">
      <ul className="flex justify-around">
        <li><NavLink to="/vehicle-registration" className={({ isActive }) => isActive ? 'bg-blue-700 px-4 py-2 rounded-lg' : 'px-4 py-2'}>Vehicles</NavLink></li>
        <li><NavLink to="/vehicle-regi" className="px-4 py-2">Vehicle Registration</NavLink></li>
        <li><NavLink to="/vehicle-by-id" className="px-4 py-2">Vehicle ID</NavLink></li>
        <li><NavLink to="/vehicle-by-date-range" className="px-4 py-2">Vehicle Date Range</NavLink></li>
        <li><NavLink to="/Vehiclestatus" className="px-4 py-2">Vehicle Status</NavLink></li>
        <li><NavLink to="/VehicleByAppointmentId" className="px-4 py-2">Vehicle AppointmentId</NavLink></li>
      </ul>
    </nav>
  );
};

const VehicleByAppointmentId: React.FC = () => {
  const [appointmentId, setAppointmentId] = useState<string>('');
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  const fetchVehicleByAppointmentId = async () => {
    if (!appointmentId.trim()) {
      alert('Please enter a valid Appointment ID');
      return;
    }

    try {
      const response = await axios.get(`https://carauto01-production-8b0b.up.railway.app/vehicle-reg/getByAppointmentId?appointmentId=${appointmentId}`);
      const vehicleData = response.data.data;

      if (vehicleData) {
        setVehicle(vehicleData);
      } else {
        setVehicle(null);
        alert(response.data.message || 'Vehicle not found');
      }
    } catch (err: any) {
      console.error('Error response:', err.response);
      setVehicle(null);
      alert(err.response?.data?.message || 'Vehicle not found or error fetching data');
    }
  };

  return (
    <div>
      <MenuBar />
      <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Find Vehicle by Appointment ID</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            value={appointmentId}
            onChange={(e) => setAppointmentId(e.target.value)}
            placeholder="Enter Appointment ID"
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={fetchVehicleByAppointmentId}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Fetch Vehicle
          </button>
        </div>

        {vehicle && (
          <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-full max-w-md">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Vehicle Details</h3>
            <p><strong>Vehicle Reg ID:</strong> {vehicle.vehicleRegId}</p>
            <p><strong>Appointment ID:</strong> {vehicle.appointmentId}</p>
            <p><strong>Chassis Number:</strong> {vehicle.chasisNumber}</p>
            <p><strong>Customer Address:</strong> {vehicle.customerAddress}</p>
            <p><strong>Customer Aadhar No:</strong> {vehicle.customerAadharNo}</p>
            <p><strong>Customer GSTIN:</strong> {vehicle.customerGstin}</p>
            <p><strong>Superwiser:</strong> {vehicle.superwiser}</p>
            <p><strong>Technician:</strong> {vehicle.technician}</p>
            <p><strong>Worker:</strong> {vehicle.worker}</p>
            <p><strong>Status:</strong> {vehicle.status}</p>
            <p><strong>User ID:</strong> {vehicle.userId}</p>
            <p><strong>Date:</strong> {vehicle.date}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleByAppointmentId;
