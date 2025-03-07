import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

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

const GetAllVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    axios.get('https://carauto01-production-8b0b.up.railway.app/vehicle-reg/getAll')
      .then(response => setVehicles(response.data.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = async (vehicleRegId: number) => {
    try {
      const response = await axios.delete(`https://carauto01-production-8b0b.up.railway.app/vehicle-reg/delete?vehicleRegId=${vehicleRegId}`);
      if (response.status === 200) {
        alert('Vehicle record deleted successfully!');
        setVehicles(vehicles.filter(vehicle => vehicle.vehicleRegId !== vehicleRegId));
      }
    } catch (error) {
      console.error('Error deleting record:', error);
      alert('Failed to delete vehicle record');
    }
  };

  const handleEdit = async (vehicleRegId: number) => {
    try {
      const vehicleToUpdate = vehicles.find(vehicle => vehicle.vehicleRegId === vehicleRegId);
      if (!vehicleToUpdate) {
        alert('Vehicle not found!');
        return;
      }

      const payload = {
        vehicleRegId: vehicleToUpdate.vehicleRegId,
        appointmentId: vehicleToUpdate.appointmentId,
        chasisNumber: vehicleToUpdate.chasisNumber,
        customerAddress: vehicleToUpdate.customerAddress,
        customerAadharNo: vehicleToUpdate.customerAadharNo,
        customerGstin: vehicleToUpdate.customerGstin,
        superwiser: vehicleToUpdate.superwiser,
        technician: vehicleToUpdate.technician,
        worker: vehicleToUpdate.worker,
        status: vehicleToUpdate.status,
        userId: vehicleToUpdate.userId,
        date: vehicleToUpdate.date
      };

      console.log('Sending vehicle data:', JSON.stringify(payload, null, 2));

      const response = await axios.put(
        `https://carauto01-production-8b0b.up.railway.app/vehicle-reg/update?vehicleRegId=${vehicleRegId}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('API Response:', response);

      if (response.status === 200) {
        alert('Vehicle record updated successfully!');
      } else {
        alert(`Failed to update vehicle record: ${response.statusText}`);
      }
    } catch (error: any) {
      console.error('Full error response:', error.response);
      console.error('Error details:', error.response ? error.response.data : error.message);
      alert(`Failed to update vehicle record: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
    }
  };

  return (
    <div>
      <MenuBar />
      <h2 className="text-center text-2xl font-bold text-black my-4">All Vehicles</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">Vehicle Reg ID</th>
              <th className="py-2 px-4">Appointment ID</th>
              <th className="py-2 px-4">Chasis Number</th>
              <th className="py-2 px-4">Customer Address</th>
              <th className="py-2 px-4">Customer Aadhar No</th>
              <th className="py-2 px-4">Customer GSTIN</th>
              <th className="py-2 px-4">Superwiser</th>
              <th className="py-2 px-4">Technician</th>
              <th className="py-2 px-4">Worker</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">User ID</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(vehicles) && vehicles.map(vehicle => (
              <tr key={vehicle.vehicleRegId} className="border-t hover:bg-gray-100">
                <td className="py-2 px-4">{vehicle.vehicleRegId}</td>
                <td className="py-2 px-4">{vehicle.appointmentId}</td>
                <td className="py-2 px-4">{vehicle.chasisNumber}</td>
                <td className="py-2 px-4">{vehicle.customerAddress}</td>
                <td className="py-2 px-4">{vehicle.customerAadharNo}</td>
                <td className="py-2 px-4">{vehicle.customerGstin}</td>
                <td className="py-2 px-4">{vehicle.superwiser}</td>
                <td className="py-2 px-4">{vehicle.technician}</td>
                <td className="py-2 px-4">{vehicle.worker}</td>
                <td className="py-2 px-4">{vehicle.status}</td>
                <td className="py-2 px-4">{vehicle.userId}</td>
                <td className="py-2 px-4">{vehicle.date}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button type="button" onClick={() => handleEdit(vehicle.vehicleRegId)} className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600 transition">Edit</button>
                  <button type="button" onClick={() => handleDelete(vehicle.vehicleRegId)} className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetAllVehicles;
