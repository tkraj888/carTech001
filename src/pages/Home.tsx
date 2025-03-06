import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wrench, Settings, Zap, Shield, CheckCircle } from "lucide-react";
import Slider from "react-slick";
import { Award, Users } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import HowItWorks from "./HowItWorks";

function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const springTransition = { type: "spring", stiffness: 50, damping: 20 };

  const bounceVariant = {
    hover: {
      scale: 1.05,
      y: [0, -10, 0],
      transition: { type: "tween", duration: 0.4 },
    },
  };

  const continuousBounce = {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  interface ApproachItem {
    icon: React.ReactElement;
    title: string;
    description: string;
  }

  const OurApproach: React.FC = () => {
    const approachItems: ApproachItem[] = [
      {
        icon: <Award className="w-12 h-12 text-red-500 mb-4" />,
        title: "Cutting-Edge Equipment",
        description:
          "We use modern diagnostic tools and equipment to ensure accurate assessments and efficient repairs.",
      },
      {
        icon: <Users className="w-12 h-12 text-red-500 mb-4" />,
        title: "Expert Technicians",
        description:
          "Our certified mechanics have years of experience handling everything from routine checks to complex overhauls.",
      },
      {
        icon: <CheckCircle className="w-12 h-12 text-red-500 mb-4" />,
        title: "Transparent Pricing",
        description:
          "We believe in honest estimates and clear communication, so you always know exactly what you're paying for.",
      },
    ];

    return (
      <div className="bg-gray-200 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={springTransition}
            className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center"
          >
            Our Approach
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ ...springTransition, delay: 0.3 }}
            className="max-w-3xl mx-auto text-center text-gray-600 mb-12"
          >
            At AutoCarCarePoint, we combine the latest technology, skilled
            technicians, and transparent communication to ensure you receive the
            best service possible. Here’s how we stand out:
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {approachItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.3 }}
                transition={{ ...springTransition, delay: 0.2 * index }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{
                  scale: 0.95,
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
                className="p-6 rounded-lg shadow-md bg-gray-50 text-center"
              >
                <div className="flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 scroll-smooth">
      {/* Hero Section */}
      <div
        className="relative h-[300px] md:h-[600px] flex flex-col items-center justify-center bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/cover5.jpg')`,
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={springTransition}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Premium Car Servicing & Repairs
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ ...springTransition, delay: 0.5 }}
            className="text-lg md:text-xl mb-8"
          >
            Trusted by thousands of car owners. Book your service today!
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              variants={bounceVariant}
              animate={continuousBounce}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/book-service")}
              className="bg-gradient-to-r from-black to-red-600 text-white px-8 py-3 rounded-lg shadow-lg transition duration-300"
            >
              Book Appointment Now
            </motion.button>
            <motion.button
              variants={bounceVariant}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/services")}
              className="bg-transparent border border-white text-white px-8 py-3 rounded-lg shadow-lg transition duration-300"
            >
              Explore Services
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-black to-red-600 py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ ...springTransition, delay: 0.2 }}
              className="bg-white/20 p-6 rounded-lg shadow-md hover:scale-105 transition transform text-white"
            >
              <h3 className="text-4xl font-bold mb-2">4,000+</h3>
              <p className="text-xl">Happy Customers</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ ...springTransition, delay: 0.4 }}
              className="bg-white/20 p-6 rounded-lg shadow-md hover:scale-105 transition transform text-white"
            >
              <h3 className="text-4xl font-bold mb-2">50+</h3>
              <p className="text-xl">Services Offered</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ ...springTransition, delay: 0.6 }}
              className="bg-white/20 p-6 rounded-lg shadow-md hover:scale-105 transition transform text-white"
            >
              <h3 className="text-4xl font-bold mb-2">24/7</h3>
              <p className="text-xl">Customer Support</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ ...springTransition, delay: 0.8 }}
              className="bg-white/20 p-6 rounded-lg shadow-md hover:scale-105 transition transform text-white"
            >
              <h3 className="text-4xl font-bold mb-2">4.8</h3>
              <p className="text-xl">Average Rating</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12 text-center">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-200 p-6 rounded-lg shadow-md hover:shadow-xl transition transform"
            >
              <div className="flex justify-center mb-4">
                <service.icon className="w-12 h-12 text-red-600 animate-bounce" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 text-center">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <HowItWorks />

      <OurApproach />

      {/* Testimonials Section */}
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12 text-center">
          What Our Customers Say
        </h2>
        <Slider {...testimonialSettings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-4">
              <div className="bg-gray-200 p-6 rounded-lg shadow-md">
                <p className="text-gray-600 mb-4">{testimonial.feedback}</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="bg-gradient-to-r from-black to-red-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Service Your Car?
          </h2>
          <p className="text-lg mb-8">
            Book your service today and experience the best in car care.
          </p>
          <motion.button
            variants={bounceVariant}
            animate={continuousBounce}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/book-service")}
            className="bg-gradient-to-r from-black to-red-600 text-white px-8 py-3 rounded-lg shadow-lg"
          >
            Book Appointment Now
          </motion.button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* About Us */}
            <div>
              <h3 className="text-lg font-bold mb-4">About Us</h3>
              <p className="text-sm text-gray-400">
                AutoCarCarePoint is your trusted partner for high-quality car
                servicing and repairs. We are committed to keeping your vehicle in
                top condition.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="text-sm text-gray-400">
                <li className="mb-2">
                  <a href="/" className="hover:text-red-500 transition">
                    Home
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/services" className="hover:text-red-500 transition">
                    Services
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/contact" className="hover:text-red-500 transition">
                    Contact Us
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/privacy-policy" className="hover:text-red-500 transition">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <ul className="text-sm text-gray-400">
                <li className="mb-2">Email: autocarcarepoint@gmail.com</li>
                <li className="mb-2">Phone: +1 (123) 456-7890</li>
                <li className="mb-2">Address: 123 Auto Street, Car City, USA</li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  Facebook
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  Twitter
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} AutoCarCarePoint. All rights reserved.</p>
            <p className="mt-2">
              <a href="/cookie-policy" className="hover:text-red-500 transition">
                Cookie Policy
              </a>
              {" | "}
              <a href="/terms" className="hover:text-red-500 transition">
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const services = [
  {
    icon: Wrench,
    title: "Oil Change",
    description:
      "Keep your engine running smoothly with our premium oil change service.",
  },
  {
    icon: Settings,
    title: "Brake Repair",
    description:
      "Ensure your safety with our expert brake repair and maintenance.",
  },
  {
    icon: Zap,
    title: "Battery Replacement",
    description: "Get your car battery replaced quickly and efficiently.",
  },
  {
    icon: Shield,
    title: "Tire Rotation",
    description:
      "Extend the life of your tires with our professional tire rotation service.",
  },
];

const testimonials = [
  {
    feedback:
      "AutoCarCarePoint is the best! They fixed my car quickly and at a great price.",
    name: "John Doe",
    role: "Car Owner",
    avatar: "/avatar1.jpg",
  },
  {
    feedback:
      "Highly recommend their brake repair service. Very professional and reliable.",
    name: "Jane Smith",
    role: "Car Enthusiast",
    avatar: "/avatar2.jpg",
  },
  {
    feedback:
      "Excellent customer service and quick turnaround time. Will definitely return!",
    name: "Mike Johnson",
    role: "Business Owner",
    avatar: "/png3.avif",
  },
];

export default Home;
