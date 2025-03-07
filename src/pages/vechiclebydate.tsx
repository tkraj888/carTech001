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
        <li><NavLink to="/vehicle-by-id" className="px-4 py-2"> Vehicle ID</NavLink></li>
        <li><NavLink to="/vehicle-by-date-range" className="px-4 py-2">Vehicle Date Range</NavLink></li>
        <li><NavLink to="/Vehiclestatus" className="px-4 py-2">Vehicle Status</NavLink></li>
        <li><NavLink to="/VehicleByAppointmentId" className="px-4 py-2">Vehicle AppointmentId</NavLink></li>
       </ul>
    </nav>
  );
};

const VehicleByDate: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const fetchVehiclesByDateRange = async () => {
    if (!startDate.trim() || !endDate.trim()) {
      alert('Please enter both start and end dates');
      return;
    }

    try {
      const response = await axios.get(`https://carauto01-production-8b0b.up.railway.app/vehicle-reg/date-range?startDate=${startDate}&endDate=${endDate}`);
      const vehicleData = response.data.data;

      if (vehicleData && vehicleData.length > 0) {
        setVehicles(vehicleData);
      } else {
        setVehicles([]);
        alert('No vehicles found for the given date range');
      }
    } catch (err: any) {
      console.error('Error response:', err.response);
      setVehicles([]);
      alert(err.response?.data?.message || 'Error fetching vehicle data');
    }
  };

  return (
    <div>
      <MenuBar />
      <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Find Vehicles By Date Range</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Start Date (YYYY-MM-DD)"
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="End Date (YYYY-MM-DD)"
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={fetchVehiclesByDateRange}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Fetch Vehicles
          </button>
        </div>

        {vehicles.length > 0 && (
          <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-full max-w-3xl">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Vehicle Details</h3>
            {vehicles.map((vehicle) => (
              <div key={vehicle.vehicleRegId} className="border-b border-gray-200 py-4">
                <p><strong>Vehicle Reg ID:</strong> {vehicle.vehicleRegId}</p>
                <p><strong>Appointment ID:</strong> {vehicle.appointmentId}</p>
                <p><strong>Chassis Number:</strong> {vehicle.chasisNumber}</p>
                <p><strong>Customer Address:</strong> {vehicle.customerAddress}</p>
                <p><strong>Status:</strong> {vehicle.status}</p>
                <p><strong>Date:</strong> {vehicle.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleByDate;