import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import apiClient from "Services/apiService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CheckCircle, XCircle } from "lucide-react"; 

function BookAppointment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    appointmentDate: "",
    customerName: "",
    mobileNo: "",
    vehicleNo: "",
    vehicleMaker: "",
    vehicleModel: "",
    manufacturedYear: "",
    kilometerDriven: "",
    fuelType: "",
    workType: "",
    vehicleProblem: "",
    pickUpAndDropService: "false",
    userId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false); 

  const handleDateChange = (date: Date | null) => {
    setFormData({ ...formData, appointmentDate: date ? date.toISOString() : "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const now = new Date();
    const appointmentDateTime = new Date(formData.appointmentDate);
    appointmentDateTime.setHours(now.getHours(), now.getMinutes(), now.getSeconds());

    const payload = {
      ...formData,
      appointmentDate: appointmentDateTime.toISOString(),
    };

    try {
      const response = await apiClient.post("/appointments/add", payload);
      if (response.status === 200) {
        setShowSuccessModal(true); 
      }
    } catch (err) {
      setError("Failed to book appointment. Please try again.");
      console.error("Error booking appointment:", err);
    } finally {
      setLoading(false);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/"); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">
            Book Your Appointment
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Customer Name
              </label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vehicle Number
              </label>
              <input
                type="text"
                name="vehicleNo"
                value={formData.vehicleNo}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vehicle Maker
              </label>
              <input
                type="text"
                name="vehicleMaker"
                value={formData.vehicleMaker}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vehicle Model
              </label>
              <input
                type="text"
                name="vehicleModel"
                value={formData.vehicleModel}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Manufactured Year
              </label>
              <input
                type="number"
                name="manufacturedYear"
                value={formData.manufacturedYear}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Kilometer Driven
              </label>
              <input
                type="number"
                name="kilometerDriven"
                value={formData.kilometerDriven}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fuel Type
              </label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-gray-700"
              >
                <option value="">Select Fuel Type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="CNG">CNG</option>
                <option value="LPG">LPG</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Work Type
              </label>
              <input
                type="text"
                name="workType"
                value={formData.workType}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vehicle Problem
              </label>
              <textarea
                name="vehicleProblem"
                value={formData.vehicleProblem}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-gray-700"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pickup and Drop Service
              </label>
              <select
                name="pickUpAndDropService"
                value={formData.pickUpAndDropService}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-gray-700"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                User ID
              </label>
              <input
                type="number"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Appointment Date
              </label>
              <DatePicker
                selected={
                  formData.appointmentDate ? new Date(formData.appointmentDate) : null
                }
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-gray-700"
              />
            </div>

            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition duration-300 flex items-center"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : null}
                {loading ? "Booking..." : "Book Appointment"}
              </motion.button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Vehicle Servicing Tips
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-green-600 mb-2 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" /> Do's
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>Check your vehicle's manual for service intervals.</li>
                <li>Clean your vehicle before bringing it in for service.</li>
                <li>Inform the service center about any specific issues.</li>
                <li>Carry your vehicle's service history if available.</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-red-600 mb-2 flex items-center">
                <XCircle className="w-5 h-5 mr-2" /> Don'ts
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>Don't ignore warning lights on your dashboard.</li>
                <li>Avoid delaying regular maintenance.</li>
                <li>Don't leave valuables in your vehicle.</li>
                <li>Avoid overloading your vehicle before servicing.</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Appointment Booked Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Your appointment has been successfully booked. We will contact you
              shortly for confirmation.
            </p>
            <button
              onClick={closeSuccessModal}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition duration-300"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default BookAppointment;
