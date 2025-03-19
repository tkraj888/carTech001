/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const DealerMiddleware = ({allowedRoles}) => {
    const location = useLocation();
    const token = Cookies.get("token");
  
    let jwtDecodes;
    if (token) {
      jwtDecodes = jwtDecode(token);
    }
  
      
        // Check if token is expired
        const tokenExpirationTime = jwtDecodes.exp * 1000; // Convert to milliseconds
        const currentTime = Date.now();
        
        if (currentTime > tokenExpirationTime) {
            // If token is expired, navigate to sign-in page
            return <Navigate to="/signin" />;
        }
    const userRole = token ? jwtDecodes.authorities[0] : null;
    
    useEffect(() => {
      if (!allowedRoles.includes(userRole)) {
        return alert("You must be an dealer to access this page.");
      }
    }, [allowedRoles, userRole]);
    let content = allowedRoles.includes(userRole) ? (
      <Outlet />
    ) : (
      <Navigate to="/signin" state={{ from: location }} replace />
    );
  
    return <div>{content}</div>;
}

export default DealerMiddleware
