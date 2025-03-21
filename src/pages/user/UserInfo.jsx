import { Link } from "react-router-dom";
import { useGetUserByIdQuery } from "../../services/userAPI";
import { useGetProfileImageByIdQuery } from "../../services/profilePhotoAPI";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { ToastContainer } from "react-toastify";
import { FiUser, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import PropTypes from "prop-types";

// InfoField component for displaying individual fields in the new design
const InfoField = ({ label, value, icon }) => (
  <div className="w-full">
    <p className="text-profile-label text-xs uppercase tracking-wide mb-2">
      {label}
    </p>
    <div className="flex items-center bg-white rounded-lg p-4 shadow-sm">
      <span className="text-profile-purple">{icon}</span>
      <span className="ml-3 text-profile-text">{value}</span>
    </div>
  </div>
);

InfoField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

const UserInfo = () => {
  const token = Cookies.get("token");
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }
  const userProfileId = token ? jwtDecodes?.userProfileId : null;
  const userId = token ? jwtDecodes?.userId : null;

  // Fetch user details
  const { data } = useGetUserByIdQuery(userProfileId);

  // Fetch user profile image
  const { data: profileImageData } = useGetProfileImageByIdQuery({ userId });
  const profileImageUrl =
    profileImageData?.object?.documentLink ||
    "https://tamilnaducouncil.ac.in/wp-content/uploads/2020/04/dummy-avatar.jpg";

  if (!data) {
    return (
      <div>
        <p>No Data Found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-profile-bg p-6">
      <div className="max-w-2xl mx-auto">
        <ToastContainer />
        {/* Header section with gradient background */}
        <div className="bg-gradient-profile rounded-2xl p-8 mb-8">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
              <img
                src={profileImageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-semibold text-profile-text">
                {data.firstName} {data.lastName}
              </h1>
              <p className="text-profile-label">Personal Information</p>
            </div>
          </div>
        </div>

        {/* Grid layout for user info fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoField
            label="First Name"
            value={data.firstName}
            icon={<FiUser />}
          />
          <InfoField label="Email" value={data.email} icon={<FiMail />} />
          <InfoField
            label="Last Name"
            value={data.lastName}
            icon={<FiUser />}
          />
          <InfoField label="City" value={data.city} icon={<FiMapPin />} />
          <InfoField
            label="Mobile Number"
            value={data.mobile_no}
            icon={<FiPhone />}
          />
        </div>

        {/* Address section */}
        <div className="mt-6">
          <p className="text-profile-label text-xs uppercase tracking-wide mb-2">
            Address
          </p>
          <div className="flex items-center bg-white rounded-lg p-4 shadow-sm">
            <span className="text-profile-purple">
              <FiMapPin />
            </span>
            <span className="ml-3 text-profile-text">{data.address}</span>
          </div>
        </div>

        {/* Edit Profile button */}
        <div className="mt-8 flex justify-end">
          <Link to={`/user/UserProfileUpdate/${userProfileId}`}>
            <button className="bg-profile-purple text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-colors">
              Edit Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

/* eslint-disable no-unused-vars */
