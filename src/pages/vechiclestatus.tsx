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

const VehicleStatus: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [error, setError] = useState<string>('');

  const fetchVehiclesByStatus = async () => {
    try {
      const response = await axios.get<{ data: Vehicle[] }>(
        `https://carauto01-production-8b0b.up.railway.app/vehicle-reg/GetStatus?status=${encodeURIComponent(status)}`
      );
      if (response.data.data.length === 0) {
        setError('No vehicles found with the given status');
        setVehicles([]);
      } else {
        setVehicles(response.data.data);
        setError('');
      }
    } catch (err) {
      setError('Error fetching data or bad request');
      setVehicles([]);
    }
  };

  return (
    <div>
      <MenuBar />
      <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Find Vehicles By Status</h2>
        <div className="flex space-x-4">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Status</option>
            <option value="in progress">In Progress</option>
            <option value="waiting">Waiting</option>
            <option value="completed">Completed</option>
          </select>
          <button
            onClick={fetchVehiclesByStatus}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Fetch Vehicles
          </button>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg mt-4">
            {error}
          </div>
        )}

        {vehicles.length > 0 && (
          <div className="mt-6 w-full max-w-4xl">
            <table className="min-w-full bg-white shadow-lg rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Vehicle Reg ID</th>
                  <th className="py-2 px-4 border-b">Appointment ID</th>
                  <th className="py-2 px-4 border-b">Chassis Number</th>
                  <th className="py-2 px-4 border-b">Customer Address</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Date</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.vehicleRegId}>
                    <td className="py-2 px-4 border-b">{vehicle.vehicleRegId}</td>
                    <td className="py-2 px-4 border-b">{vehicle.appointmentId}</td>
                    <td className="py-2 px-4 border-b">{vehicle.chasisNumber}</td>
                    <td className="py-2 px-4 border-b">{vehicle.customerAddress}</td>
                    <td className="py-2 px-4 border-b">{vehicle.status}</td>
                    <td className="py-2 px-4 border-b">{vehicle.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleStatus;
