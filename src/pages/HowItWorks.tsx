import React, { useState, useEffect } from "react";

function HowItWorks() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const backgroundStyle = {
    backgroundImage: "url('/cove.jpg')",
    backgroundSize: isMobile ? "100% 100%" : "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="relative" style={backgroundStyle}>
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      <div className="relative container mx-auto py-20 px-4 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-xl mb-12">
          We Offer Full Service Auto Repair &amp; Maintenance
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="bg-black bg-opacity-80 rounded-lg p-10 hover:shadow-xl transition transform hover:-translate-y-2">
            <div className="text-5xl font-bold mb-4">01</div>
            <h3 className="text-2xl font-semibold mb-2">Choose</h3>
            <p className="text-sm">
              Choose Your Service From Our Wide Range Of Offerings
            </p>
          </div>

          <div className="bg-black bg-opacity-80 rounded-lg p-10 hover:shadow-xl transition transform hover:-translate-y-2">
            <div className="text-5xl font-bold mb-4">02</div>
            <h3 className="text-2xl font-semibold mb-2">Book</h3>
            <p className="text-sm">Make An Appointment With Us</p>
          </div>

          <div className="bg-black bg-opacity-80 rounded-lg p-10 hover:shadow-xl transition transform hover:-translate-y-2">
            <div className="text-5xl font-bold mb-4">03</div>
            <h3 className="text-2xl font-semibold mb-2">Fair Pricing</h3>
            <p className="text-sm">Always Get a Fair Quote</p>
          </div>

          <div className="bg-black bg-opacity-80 rounded-lg p-10 hover:shadow-xl transition transform hover:-translate-y-2">
            <div className="text-5xl font-bold mb-4">04</div>
            <h3 className="text-2xl font-semibold mb-2">At Your Doorstep</h3>
            <p className="text-sm">
              Get a Door Step Pick up &amp; Drop Service
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
