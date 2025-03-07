import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ChevronDown, User, LogOut, Menu, X } from "lucide-react";

const WebHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  let isLogin = false;
  let userRole = "";

  const storedDecodedToken = localStorage.getItem("userData");
  if (storedDecodedToken) {
    const parsedToken = JSON.parse(storedDecodedToken);
    userRole = parsedToken.authorities[0];
    isLogin = true;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    isLogin = false;
    navigate("/signIn");
  };

  return (
    <>
      <nav className="relative shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 animate-gradient-x"></div>

        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center relative z-10">
          <Link
            to="/"
            className="text-2xl font-bold text-white hover:text-gray-300 transition-all duration-300 transform hover:scale-105"
          >
            AutoCarCarePoint
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white focus:outline-none hover:bg-gray-700 rounded-lg p-2 transition-all"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div
            className={`lg:flex lg:space-x-4 ${
              isMobileMenuOpen ? "block" : "hidden"
            } lg:block absolute lg:relative top-16 lg:top-0 left-0 w-full lg:w-auto bg-gray-800 lg:bg-transparent z-20 transition-all duration-300 overflow-hidden`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center p-4 lg:p-0">
              <Link
                to="/"
                className="group relative text-white px-4 py-3 lg:py-2 transition-all duration-300 hover:bg-gray-700 lg:hover:bg-transparent"
              >
                Home
                <span className="absolute inset-0">
                  <span className="absolute top-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                  <span className="absolute top-0 right-0 w-0.5 h-0 bg-white transition-all duration-300 group-hover:h-full delay-100"></span>
                  <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full delay-200"></span>
                  <span className="absolute bottom-0 left-0 w-0.5 h-0 bg-white transition-all duration-300 group-hover:h-full delay-300"></span>
                </span>
              </Link>

              {userRole === "ADMIN" && (
                <Link
                  to="/add-part"
                  className="group relative text-white px-4 py-3 lg:py-2 transition-all duration-300 hover:bg-gray-700 lg:hover:bg-transparent"
                >
                  Add Parts
                  <span className="absolute inset-0">
                    <span className="absolute top-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    <span className="absolute top-0 right-0 w-0.5 h-0 bg-white transition-all duration-300 group-hover:h-full delay-100"></span>
                    <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full delay-200"></span>
                    <span className="absolute bottom-0 left-0 w-0.5 h-0 bg-white transition-all duration-300 group-hover:h-full delay-300"></span>
                  </span>
                </Link>
              )}

              <Link
                to="/getAll"
                className="group relative text-white px-4 py-3 lg:py-2 transition-all duration-300 hover:bg-gray-700 lg:hover:bg-transparent"
              >
                Buy Accessories
                <span className="absolute inset-0">
                  <span className="absolute top-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                  <span className="absolute top-0 right-0 w-0.5 h-0 bg-white transition-all duration-300 group-hover:h-full delay-100"></span>
                  <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full delay-200"></span>
                  <span className="absolute bottom-0 left-0 w-0.5 h-0 bg-white transition-all duration-300 group-hover:h-full delay-300"></span>
                </span>
              </Link>

              {userRole === "ADMIN" && (
  <>
    <Link
      to="/admin/dashboard"
      className="group relative text-white px-4 py-3 lg:py-2 transition-all duration-300 hover:bg-gray-700 lg:hover:bg-transparent"
    >
      Dashboard
      <span className="absolute inset-0">
        <span className="absolute top-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
        <span className="absolute top-0 right-0 w-0.5 h-0 bg-white transition-all duration-300 group-hover:h-full delay-100"></span>
        <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full delay-200"></span>
        <span className="absolute bottom-0 left-0 w-0.5 h-0 bg-white transition-all duration-300 group-hover:h-full delay-300"></span>
      </span>
    </Link>

    <Link
      to="/vehicle-registration"
      className="group relative text-white px-4 py-3 lg:py-2 transition-all duration-300 hover:bg-gray-700 lg:hover:bg-transparent"
    >
      Vehicle Registration
      <span className="absolute inset-0">
        <span className="absolute top-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
        <span className="absolute top-0 right-0 w-0.5 h-0 bg-white transition-all duration-300 group-hover:h-full delay-100"></span>
        <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full delay-200"></span>
        <span className="absolute bottom-0 left-0 w-0.5 h-0 bg-white transition-all duration-300 group-hover:h-full delay-300"></span>
      </span>
    </Link>
  </>
)}

              {!isLogin && (
                <>
                  <Link
                    to="/signIn"
                    className="group relative text-white px-4 py-3 lg:py-2 transition-all duration-300 hover:bg-gray-700 lg:hover:bg-transparent"
                  >
                    Sign In
                    <span className="absolute inset-0">
                      <span className="absolute top-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                      <span className="absolute top-0 right-0 w-0.5 h-0 bg-white transition-all duration-300 group-hover:h-full delay-100"></span>
                      <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full delay-200"></span>
                      <span className="absolute bottom-0 left-0 w-0.5 h-0 bg-white transition-all duration-300 group-hover:h-full delay-300"></span>
                    </span>
                  </Link>

                  <Link
                    to="/signup"
                    className="group relative text-white px-4 py-3 lg:py-2 transition-all duration-300 hover:bg-gray-700 lg:hover:bg-transparent"
                  >
                    Sign Up
                    <span className="absolute inset-0">
                      <span className="absolute top-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                      <span className="absolute top-0 right-0 w-0.5 h-0 bg-white transition-all duration-300 group-hover:h-full delay-100"></span>
                      <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full delay-200"></span>
                      <span className="absolute bottom-0 left-0 w-0.5 h-0 bg-white transition-all duration-300 group-hover:h-full delay-300"></span>
                    </span>
                  </Link>

                  
                </>
              )}
            </div>
          </div>

          {isLogin && (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <User size={20} />
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl z-50 overflow-hidden origin-top transition-all duration-300">
                  <Link
                    to="/profile"
                    className="block px-4 py-3 text-white hover:bg-gray-700 transition-colors duration-200"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-white hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:bg-gray-700"
                  >
                    <LogOut size={16} className="inline-block mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default WebHeader;