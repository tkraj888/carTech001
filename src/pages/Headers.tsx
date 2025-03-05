import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ChevronDown, User, LogOut, Menu } from "lucide-react";

const WebHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  let isLogin = false;
  let userRole = '' ;
  

  const storedDecodedToken = localStorage.getItem("userData");
  if (storedDecodedToken) {
    const parsedToken = JSON.parse(storedDecodedToken);
    userRole = parsedToken.authorities[0];
    isLogin = true;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    isLogin = false; // Reset login state
    navigate("/signIn"); // Redirect to Sign In page
  };

  return (
    <>
   <nav className="relative">
  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 animate-gradient-x"></div>

  <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center relative z-10">
    <Link
      to="/"
      className="text-2xl font-bold text-white hover:text-gray-200 transition duration-300 transform hover:scale-105"
    >
      AutoCarCarePoint
    </Link>

    <button
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      className="lg:hidden text-white focus:outline-none"
    >
      <Menu size={24} />
    </button>

    <div
      className={`lg:flex lg:space-x-4 lg:overflow-x-auto ${
        isMobileMenuOpen ? "block" : "hidden"
      } lg:block absolute lg:relative top-16 lg:top-0 left-0 w-full lg:w-auto bg-purple-500 lg:bg-transparent z-20`}
    >
      <Link
        to="/"
        className="block lg:inline-block relative text-white hover:text-gray-200 transition duration-300 px-4 py-2 group"
      >
        Home
      </Link>
      {
        userRole === 'ADMIN' ? (
      <Link
        to="/add-part"
        className="block lg:inline-block relative text-white hover:text-gray-200 transition duration-300 px-4 py-2 group"
      >
        Add Parts
      </Link>
       ) : <></>
      }
      <Link
        to="/getAll"
        className="block lg:inline-block relative text-white hover:text-gray-200 transition duration-300 px-4 py-2 group"
      >
        Buy Accessories
      </Link>
      {
        userRole === 'ADMIN' ? (
          <Link
          to="/admin/dashboard"
          className="block lg:inline-block relative text-white hover:text-gray-200 transition duration-300 px-4 py-2 group"
        >
        Dashboard
      </Link>
        ) : <></>
      }
      {
        !isLogin? (<>
        <Link
          to="/signIn"
          className="block lg:inline-block relative text-white hover:text-gray-200 transition duration-300 px-4 py-2 group"
        >
          Sign In
        </Link>

        <Link
          to="/signup"
          className="block lg:inline-block relative text-white hover:text-gray-200 transition duration-300 px-4 py-2 group"
        >
          Sign Up
        </Link>
        </>) : <></>
      }
    </div>

    {/* User Authentication Dropdown */}
    {isLogin ? (
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105"
        >
          <User size={20} />
          <ChevronDown size={16} />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
            <Link
              to="/signIn"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Profile
            </Link>
            <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut size={16} className="inline-block mr-2" />
                    Logout
                  </button>
          </div>
        )}
      </div>
    ) : <></>}
  </div>
</nav>

<Outlet />

    </>
  );
};

export default WebHeader;