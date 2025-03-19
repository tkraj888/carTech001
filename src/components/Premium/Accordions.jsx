import { useState } from 'react';

const Accordions = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const accordions = [
    {
      title: 'Overview',
      content: <div className="pl-4 pb-4 text-gray-700 ">
      <div className="py-2 flex justify-between bg-gray-100 p-2">
        <span className='md:text-lg text-sm'>Vehicle Type :</span>
        <span className='md:text-lg text-sm'>SUV</span>
      </div>
      <div className="py-2 flex justify-between p-2 ">
        <span className='md:text-lg text-sm'>Engine:</span>
        <span className='md:text-lg text-sm'>2995cc, Turbocharged, V6, DOHC</span>
      </div>
      <div className="py-2 flex justify-between  bg-gray-100 p-2">
        <span className='md:text-lg text-sm'>Fuel :</span>
        <span className='md:text-lg text-sm'>Petrol</span>
      </div>
      <div className="py-2 flex justify-between  p-2">
        <span className='md:text-lg text-sm'>Peak Power :</span>
        <span className='md:text-lg text-sm'>340PS / 335BHP @ 5000 RPM</span>
      </div>
    </div>
    },
    {
      title: 'Engine & Transmission',
      content: <div className="pl-4 pb-4 text-gray-700">
      <div className="py-2 flex justify-between p-2 bg-gray-100">
        <span className='md:text-lg text-sm'>Engine Displacement:</span>
        <span className='md:text-lg text-sm'>2995cc, Turbocharged, V6, DOHC</span>
      </div>
      <div className="py-2 flex justify-between p-2">
        <span className='md:text-lg text-sm'>Power Figure   :</span>
        <span className='md:text-lg text-sm'>340PS / 335BHP @ 5000 RPM</span>
      </div>
      <div className="py-2 flex justify-between p-2 bg-gray-100">
        <span className='md:text-lg text-sm'>Torque Figure  :</span>
        <span className='md:text-lg text-sm'>500 Nm @ 1370 - 4500 RPM</span>
      </div>
      <div className="py-2 flex justify-between p-2">
        <span className='md:text-lg text-sm'>Drivetrain   :</span>
        <span className='md:text-lg text-sm'>Quattro permanent all-wheel drive</span>
      </div>
      <div className="py-2 flex justify-between p-2 bg-gray-100">
        <span className='md:text-lg text-sm'>Transmission:</span>
        <span className='md:text-lg text-sm'>Automatic Transmission</span>
      </div>
    </div>
    },
    {
      title: 'Hybrid System',
      content: <div className="pl-4 pb-4 text-gray-700">
      <div className="py-2 flex justify-between p-2 bg-gray-100">
        <span className='md:text-lg text-sm'>E-Motor Type/Size  :</span>
        <span className='md:text-lg text-sm'>NA</span>
      </div>
      <div className="py-2 flex justify-between p-2">
        <span className='md:text-lg text-sm'>Power Figure   :</span>
        <span className='md:text-lg text-sm'>NA</span>
      </div>
      <div className="py-2 flex justify-between p-2 bg-gray-100">
        <span className='md:text-lg text-sm'>Torque Figure  :</span>
        <span className='md:text-lg text-sm'>NA</span>
      </div>
      <div className="py-2 flex justify-between p-2">
        <span className='md:text-lg text-sm'>Combined Power & Torque  :</span>
        <span className='md:text-lg text-sm'>NA</span>
      </div>
    </div>
    },
    {
      title: 'Performance & Efficiency',
      content: <div className="pl-4 pb-4 text-gray-700">
      <div className="py-2 flex justify-between p-2 bg-gray-100">
        <span className='md:text-lg text-sm'>Eco Start/Stop System  :</span>
        <span className='md:text-lg text-sm'>Yes</span>
      </div>
      <div className="py-2 flex justify-between p-2">
        <span className='md:text-lg text-sm'>Driving Modes  :</span>
        <span className='md:text-lg text-sm'>Audi drive select</span>
      </div>
      <div className="py-2 flex justify-between p-2 bg-gray-100">
        <span className='md:text-lg text-sm'>Terrain Response Mode  :</span>
        <span className='md:text-lg text-sm'>NA</span>
      </div>
      <div className="py-2 flex justify-between p-2">
        <span className='md:text-lg text-sm'>Active Aerodynamics  :</span>
        <span className='md:text-lg text-sm'>NA</span>
      </div>
      <div className="py-2 flex justify-between p-2 bg-gray-100">
        <span className='md:text-lg text-sm'>Exhaust System/Type  :</span>
        <span className='md:text-lg text-sm'>NA</span>
      </div><div className="py-2 flex justify-between p-2">
        <span className='md:text-lg text-sm'>Rear Axle Steering :</span>
        <span className='md:text-lg text-sm'>NA</span>
      </div><div className="py-2 flex justify-between p-2 bg-gray-100">
        <span className='md:text-lg text-sm'>Acceleration 0-100kmph   :</span>
        <span className='md:text-lg text-sm'>5.9sec</span>
      </div><div className="py-2 flex justify-between p-2">
        <span className='md:text-lg text-sm'>TopSpeed :</span>
        <span className='md:text-lg text-sm'>250kmph</span>
      </div><div className="py-2 flex justify-between p-2 bg-gray-100">
        <span className='md:text-lg text-sm'>Fuel Type  :</span>
        <span className='md:text-lg text-sm'>Petrol</span>
      </div><div className="py-2 flex justify-between p-2">
        <span className='md:text-lg text-sm'>Fuel Consumption :</span>
        <span className='md:text-lg text-sm'>9.7kmpl</span>
      </div><div className="py-2 flex justify-between p-2 bg-gray-100">
        <span className='md:text-lg text-sm'>Emission Std :</span>
        <span className='md:text-lg text-sm'>BS6</span>
      </div>
    </div>
    },
    {
      title: 'Exterior Equipment',
      content: <div className="pl-4 pb-4 text-gray-700">
      <div className="py-2 flex justify-between p-2 bg-gray-100">
        <span className='md:text-lg text-sm'>Head Lamps   :</span>
        <span className='md:text-lg text-sm'>HD Matrix LED Automatic Headlights w/ Auto-high beam assist</span>
      </div>
      <div className="py-2 flex justify-between p-2">
        <span className='md:text-lg text-sm'>Head Lamp Washer :</span>
        <span className='md:text-lg text-sm'>Yes</span>
      </div>
      <div className="py-2 flex justify-between p-2 bg-gray-100">
        <span className='md:text-lg text-sm'>DRLs :</span>
        <span className='md:text-lg text-sm'>LED</span>
      </div>
      <div className="py-2 flex justify-between p-2">
        <span className='md:text-lg text-sm'>Fog Lamps  :</span>
        <span className='md:text-lg text-sm'>NA</span>
      </div>
    </div>
    },

    {
      title: 'Interior Equipment',
      content: <div className="pl-4 pb-4 text-gray-700">
      <div className="py-2 flex justify-between p-2 bg-gray-100">
        <span className='md:text-lg text-sm'>Interior   :</span>
        <span className='md:text-lg text-sm'>Mono Tone</span>
      </div>
      <div className="py-2 flex justify-between p-2">
        <span className='md:text-lg text-sm'>Interior Trim  :</span>
        <span className='md:text-lg text-sm'>Decorative inserts in Meshed Aluminium & Piano Black</span>
      </div>
      <div className="py-2 flex justify-between p-2 bg-gray-100">
        <span className='md:text-lg text-sm'>Gear Knob  :</span>
        <span className='md:text-lg text-sm'>Leather</span>
      </div>
      <div className="py-2 flex justify-between p-2">
        <span className='md:text-lg text-sm'>Side Sill Moulding  :</span>
        <span className='md:text-lg text-sm'>In Aluminium</span>
      </div>
    </div>
    },
    {
      title: 'Seats & Upholstery',
      content: <div className="pl-4 pb-4 text-gray-700">
      <div className="py-2 flex justify-between p-2 bg-gray-100">
        <span className='md:text-lg text-sm'>Front Seats:</span>
        <span className='md:text-lg text-sm'>12-Way Electrically adjustable front seats</span>
      </div>
      <div className="py-2 flex justify-between p-2">
        <span className='md:text-lg text-sm'>Comfort Driver Seat :</span>
        <span className='md:text-lg text-sm'>Yes w/ 2 Pre-Set Memory</span>
      </div>
      <div className="py-2 flex justify-between p-2 bg-gray-100">
        <span className='md:text-lg text-sm'>Comfort Co-Driver Seat  :</span>
        <span className='md:text-lg text-sm'>Yes</span>
      </div>
      <div className="py-2 flex justify-between p-2">
        <span className='md:text-lg text-sm'>Electric Lumbar Support Driver Seat  :</span>
        <span className='md:text-lg text-sm'>Yes</span>
      </div>
    </div>
    },
    {
      title: 'Entertaintment Front',
      content: <div className="pl-4 pb-4 text-gray-700">
      <div className="py-2 flex justify-between p-1 bg-gray-100">
        <span className='md:text-lg text-sm'>HD Colour Display  :</span>
        <span className='md:text-lg text-sm'>high-resolution 25.65 cms (10.1) touch colour display</span>
      </div>
      <div className="py-2 flex justify-between p-2">
        <span className='md:text-lg text-sm'>In-Built Hard Drive  :</span>
        <span className='md:text-lg text-sm'>NA</span>
      </div>
      <div className="py-2 flex justify-between p-2 bg-gray-100">
        <span className='md:text-lg text-sm'>CD/DVD Player  :</span>
        <span className='md:text-lg text-sm'>Yes</span>
      </div>
      <div className="py-2 flex justify-between p-2">
        <span className='md:text-lg text-sm'>AM/FM Radio  :</span>
        <span className='md:text-lg text-sm'>Yes</span>
      </div>
    </div>
    },
    {
      title: 'Entertaintment Rear',
      content: <div className="pl-4 pb-4 text-gray-700">
      <div className="py-2 flex justify-between p-2 bg-gray-100">
        <span className='md:text-lg text-sm'>Screens  :</span>
        <span className='md:text-lg text-sm'>NA</span>
      </div>
      <div className="py-2 flex justify-between p-2">
        <span className='md:text-lg text-sm'>Input ports :</span>
        <span className='md:text-lg text-sm'>NA</span>
      </div>
      <div className="py-2 flex justify-between p-2 bg-gray-100">
        <span className='md:text-lg text-sm'>Other Equipments   :</span>
        <span className='md:text-lg text-sm'>NA</span>
      </div>
      
    </div>
    },
    {    
      title: 'Safety Equipment',
      content: <div className="pl-4 pb-4 text-gray-700">
      <div className="py-2 flex justify-between p-2 bg-gray-100">
        <span className='md:text-lg text-sm'>Airbags  :</span>
        <span className='md:text-lg text-sm'>8</span>
      </div>
      <div className="py-2 flex justify-between p-2">
        <span className='md:text-lg text-sm'>ABS  :</span>
        <span className='md:text-lg text-sm'>Yes</span>
      </div>
      <div className="py-2 flex justify-between p-2 bg-gray-100">
        <span className='md:text-lg text-sm'>EBD  :</span>
        <span className='md:text-lg text-sm'>Yes</span>
      </div>
      <div className="py-2 flex justify-between p-2">
        <span className='md:text-lg text-sm'>BA :</span>
        <span className='md:text-lg text-sm'>Yes</span>
      </div>
    </div>
    },
    {
      title: 'Suspensions , Brakes , Wheels & Tyres',
      content: <div className="pl-4 pb-4 text-gray-700">
      <div className="py-2 flex justify-between p-1 bg-gray-100">
        <span className='md:text-lg text-sm'>Front Suspension :</span>
        <span className='md:text-lg text-sm text-wrap'>Adaptive Air Suspension</span>
      </div>
      <div className="py-2 flex justify-between p-1">
        <span className='md:text-lg text-sm'>Rear Suspension  :</span>
        <span className='md:text-lg text-sm'>Adaptive Air Suspension</span>
      </div>
      <div className="py-2 flex justify-between p-2 bg-gray-100">
        <span className='md:text-lg text-sm'>Front Brakes :</span>
        <span className='md:text-lg text-sm'>Ventilated Disc</span>
      </div>
      <div className="py-2 flex justify-between p-2">
        <span className='md:text-lg text-sm'>Rear Brakes  :</span>
        <span className='md:text-lg text-sm'>Ventilated Disc</span>
      </div>
    </div>
    },
    {
      title: 'Dimensions , Weight , Storage , Capacity ',
      content: <div className="pl-4 pb-4 text-gray-700">
      <div className="py-2 flex justify-between p-2 bg-gray-100">
        <span className='md:text-lg text-sm'>Length :</span>
        <span className='md:text-lg text-sm'>4986mm</span>
      </div>
      <div className="py-2 flex justify-between p-2">
        <span className='md:text-lg text-sm'>Width  :</span>
        <span className='md:text-lg text-sm'>4986mm</span>
      </div>
      <div className="py-2 flex justify-between p-2 bg-gray-100">
        <span className='md:text-lg text-sm'>Height  :</span>
        <span className='md:text-lg text-sm'>705mm</span>
      </div>
      <div className="py-2 flex justify-between p-2">
        <span className='md:text-lg text-sm'>Wheelbase    :</span>
        <span className='md:text-lg text-sm'>2995mm</span>
      </div>
    </div>
    },
    {
      title: 'Warranty & Service Package ',
      content: <div className="pl-4 pb-4 text-gray-700">
      <div className="py-2 flex justify-between p-2 bg-gray-100">
        <span className='md:text-lg text-sm'>Warranty   :</span>
        <span className='md:text-lg text-sm'>NA</span>
      </div>
      <div className="py-2 flex justify-between p-2">
        <span className='md:text-lg text-sm'>Service Package w/ Details   :</span>
        <span className='md:text-lg text-sm'>NA</span>
      </div>
    </div>
    },
    {
      title: 'Exterior Colours',
      content: <div className="pl-4 pb-4 text-gray-700">
      <div className="py-2 flex justify-between p-1 bg-gray-100">
        <span className='md:text-lg text-sm'>Exterior Colours :</span>
        <span className='md:text-lg text-sm'>Orca Black</span>
      </div>
    </div>
    },
  ];

  return (
    <div className="w-full lg:p-16 p-4">
    <h2 className="text-2xl font-semibold mb-6 text-center lg:text-left">FULL SPECIFICATION</h2>
    {accordions.map((accordion, index) => (
      <div key={index} className="border-b w-full">
        <button
          onClick={() => toggleAccordion(index)}
          className="w-full text-left py-3 font-semibold text-lg lg:text-xl"
        >
          {accordion.title}
        </button>
        {activeIndex === index && (
          <div className="w-full text-left lg:text-right py-3 lg:py-4">
            <div className="text-gray-600">{accordion.content}</div>
          </div>
        )}
      </div>
    ))}
  </div>
  );
};

export default Accordions;
