/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const CarSummary = ({
  fuelType,
  registration,
  ownerSerial,
  transmission,
  year,
  carInsurance,
  kmDriven,
  insurancedate,
  carInsuranceType,
  abs,
  childSafetyLocks,
  sunroof,
  buttonStart,
  airbag,
  acFeature,
  musicFeature,
  powerWindowFeature,
  rearParkingCameraFeature,
}) => {
  const features = [
    { label: "Reg. State", value: registration || "N/A", icon: "🗺️" },
    { label: "Vehicle Type", value: "Premium Car", icon: "🚗" }, // example static value
    { label: "Registration Year", value: year || "N/A", icon: "📅" },
    { label: "Engine", value: "3996cc, Turbocharged, V8, DOHC", icon: "🔧" }, // static value
    {
      label: "Transmission",
      value: transmission || "N/A",
      icon: "⚙️",
    },
    { label: "Ownership", value: ownerSerial || "N/A", icon: "👤" },
    { label: "Kms done", value: kmDriven || "N/A", icon: "🛣️" },
    { label: "Fuel", value: fuelType || "N/A", icon: "⛽" },
    { label: "Insurance", value: carInsuranceType || "N/A", icon: "📋" },
    { label: "Sunroof", value: sunroof ? "Yes" : "No", icon: "☀️" },
    {
      label: "Child Safety Locks",
      value: childSafetyLocks ? "Yes" : "No",
      icon: "🔒",
    },
    { label: "Button Start", value: buttonStart ? "Yes" : "No", icon: "🔘" },
    { label: "Airbag", value: airbag ? "Yes" : "No", icon: "🎈" },
    { label: "AC", value: acFeature ? "Yes" : "No", icon: "❄️" },
    { label: "Music System", value: musicFeature ? "Yes" : "No", icon: "🎵" },
    {
      label: "Power Window",
      value: powerWindowFeature ? "Yes" : "No",
      icon: "🚪",
    },
    {
      label: "Rear Parking Camera",
      value: rearParkingCameraFeature ? "Yes" : "No",
      icon: "📷",
    },
  ];

  return (
    <div className=" w-full p-16">
      <h2 className="text-2xl font-semibold mb-6">CAR SUMMARY</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md"
          >
            <div className="text-3xl mb-2">{feature.icon}</div>
            <p className="text-sm text-gray-600 mb-1">{feature.label}</p>
            <p className="text-lg font-bold text-gray-800 text-center">
              {feature.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarSummary;
