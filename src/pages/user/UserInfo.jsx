/* eslint-disable no-unused-vars */

// import { Link, useParams } from "react-router-dom";
// import { useGetUserByIdQuery } from "../../services/userAPI";
// import { IoChevronBack } from "react-icons/io5";
// import { Button } from "@material-tailwind/react";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";
// import { useState, useEffect, useRef } from "react";
// import {
//   useAddProfileImagesMutation,
//   useGetProfileImageByIdQuery,
//   useDeleteProfileImageByIdMutation,
// } from "../../services/profilePhotoAPI";
// import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer

// const UserInfo = () => {
//   const [selectedFile, setSelectedFile] = useState(null); // State to manage selected file
//   const [uploadedImageUrl, setUploadedImageUrl] = useState(""); // State to store uploaded image URL
//   const fileInputRef = useRef(null);

//   const token = Cookies.get("token");

//   let jwtDecodes;

//   if (token) {
//     jwtDecodes = jwtDecode(token);
//   }
//   const userProfileId = token ? jwtDecodes?.userProfileId : null;
//   const userId = token ? jwtDecodes?.userId : null;

//   const { data } = useGetUserByIdQuery(userProfileId);
//   console.log(data);

//   // API hooks
//   const [addProfileImages, { isLoading: isAddingImage }] =
//     useAddProfileImagesMutation({ userId });
//   const { data: profileImageData, refetch: refetchProfileImage } =
//     useGetProfileImageByIdQuery({ userId }); // Adjusted to use userId directly
//   const [deleteProfileImage, { isLoading: isDeletingImage }] =
//     useDeleteProfileImageByIdMutation();

//   // Update uploadedImageUrl when profileImageData changes
//   useEffect(() => {
//     if (profileImageData?.object?.documentLink) {
//       console.log(
//         "Setting uploaded image URL:",
//         profileImageData.object.documentLink
//       ); // Debugging
//       setUploadedImageUrl(profileImageData.object.documentLink);
//     }
//   }, [profileImageData]);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       handleAddImage(file); // Directly add the image after selecting it
//     }
//   };

//   const handleAddImage = async (file) => {
//     const imageToUpload = file || selectedFile;
//     if (!imageToUpload) {
//       console.error("No file selected");
//       fileInputRef.current.click(); // Trigger click event on file input
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", imageToUpload);

//     try {
//       const response = await addProfileImages({ formData, userId }).unwrap();
//       console.log("Image uploaded successfully", response);
//       refetchProfileImage();
//       setSelectedFile(null);
//       toast.success("Image uploaded successfully!"); // Show success toast
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       toast.error("Error uploading image."); // Show error toast
//     }
//   };

//   const handleDeleteImage = async () => {
//     try {
//       const response = await deleteProfileImage({ userId }).unwrap();
//       console.log("Image deleted successfully", response);
//       setUploadedImageUrl("");
//       refetchProfileImage();
//       toast.success("Image deleted successfully!"); // Show success toast
//     } catch (error) {
//       console.error("Error deleting image:", error);
//       toast.error("Error deleting image."); // Show error toast
//     }
//   };

//   if (!data) {
//     return (
//       <div>
//         <p>No Data Found</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <ToastContainer /> {/* Add ToastContainer here */}
//       <div className="text-3xl font-bold mt-5 mb-4 ml-4 md:ml-12 xl:mb-[-5rem] md:mb-8">
//         Personal Information
//       </div>
//       <div className="flex justify-center items-center xl:h-screen">
//         <div className="w-full max-w-4xl flex flex-col mx-2 md:flex-row shadow-xl">
//           <div className="w-full md:w-1/2 lg:w-1/3 md:h-2/3 flex flex-col lg:mt-8 md:mt-8">
//             <div>
//               <img
//                 src={
//                   uploadedImageUrl ||
//                   "https://tamilnaducouncil.ac.in/wp-content/uploads/2020/04/dummy-avatar.jpg"
//                 }
//                 alt="Inspector"
//                 className="md:w-72 md:h-60 px-7"
//               />
//             </div>
//             <div className="flex mt-2">
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 className="hidden"
//               />
//               <Button
//                 size="md"
//                 className="mt-2 ml-2 cursor-pointer flex items-center"
//                 onClick={() => {
//                   if (!selectedFile) fileInputRef.current.click();
//                   else handleAddImage(selectedFile);
//                 }}
//                 disabled={isAddingImage}
//               >
//                 {isAddingImage ? "Uploading..." : "Add Image"}
//               </Button>
//               <Button
//                 color="red"
//                 size="md"
//                 className="mt-2 ml-2 cursor-pointer flex items-center"
//                 onClick={handleDeleteImage}
//                 disabled={!uploadedImageUrl || isDeletingImage}
//               >
//                 {isDeletingImage ? "Deleting..." : "Delete Image"}
//               </Button>
//             </div>
//           </div>
//           <div className="w-full md:w-2/3 p-8 flex flex-col justify-between">
//             <div className="overflow-x-auto lg:overflow-x-visible">
//               <table className="table w-full mb-5 ml-2 border-collapse border border-gray-200">
//                 <tbody>
//                   <tr>
//                     <th className="px-4 py-2 border border-gray-200">
//                       First Name
//                     </th>
//                     <td className="px-4 py-2 border border-gray-200">
//                       {data.firstName}
//                     </td>
//                   </tr>
//                   <tr>
//                     <th className="px-4 py-2 border border-gray-200">
//                       Last Name
//                     </th>
//                     <td className="px-4 py-2 border border-gray-200">
//                       {data.lastName}
//                     </td>
//                   </tr>
//                   <tr>
//                     <th className="px-4 py-2 border border-gray-200">
//                       Mobile Number
//                     </th>
//                     <td className="px-4 py-2 border border-gray-200">
//                       {data.mobile_no}
//                     </td>
//                   </tr>
//                   <tr>
//                     <th className="px-4 py-2 border border-gray-200">Email</th>
//                     <td className="px-4 py-2 border border-gray-200">
//                       {data.email}
//                     </td>
//                   </tr>
//                   <tr>
//                     <th className="px-4 py-2 border border-gray-200">City</th>
//                     <td className="px-4 py-2 border border-gray-200">
//                       {data.city}
//                     </td>
//                   </tr>
//                   <tr>
//                     <th className="px-4 py-2 border border-gray-200">
//                       Address
//                     </th>
//                     <td className="px-4 py-2 border border-gray-200">
//                       {data.address}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//             <div className="flex justify-center items-center mt-4 md:mt-0">
//               <Link to={`/user/UserProfileUpdate/${userProfileId}`}>
//                 <div className="flex items-center mt-5">
//                   <Button>Update Profile</Button>
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserInfo;

/* eslint-disable no-unused-vars */

/* eslint-disable no-unused-vars */

import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../../services/userAPI";
import { FiUser, FiMail, FiMapPin, FiPhone, FiUpload } from "react-icons/fi";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import {
  useAddProfileImagesMutation,
  useGetProfileImageByIdQuery,
  useDeleteProfileImageByIdMutation,
} from "../../services/profilePhotoAPI";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer

const UserInfo = () => {
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    mobile: "",
    postalCode: "",
    address: "",
  });

  const token = Cookies.get("token");

  let jwtDecodes;

  if (token) {
    jwtDecodes = jwtDecode(token);
  }
  const userProfileId = token ? jwtDecodes?.userProfileId : null;
  const userId = token ? jwtDecodes?.userId : null;

  const { data } = useGetUserByIdQuery(userProfileId);

  // API hooks
  const [addProfileImages, { isLoading: isAddingImage }] =
    useAddProfileImagesMutation({ userId });
  const { data: profileImageData, refetch: refetchProfileImage } =
    useGetProfileImageByIdQuery({ userId }); // Adjusted to use userId directly
  const [deleteProfileImage, { isLoading: isDeletingImage }] =
    useDeleteProfileImageByIdMutation();

  // Update uploadedImageUrl when profileImageData changes
  useEffect(() => {
    if (profileImageData?.object?.documentLink) {
      setProfileImage(profileImageData.object.documentLink);
    }
  }, [profileImageData]);

  useEffect(() => {
    if (data && !isEditing) {
      setProfileData({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        city: data.city,
        mobile: data.mobile_no,
        postalCode: data.postalCode,
        address: data.address,
      });
    }
  }, [data, isEditing]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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

  const EditField = ({ label, name, value, onChange, icon }) => (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm text-profile-text mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-profile-purple">
          {icon}
        </div>
        <input
          type="text"
          id={name}
          name={name}
          value={value || ""}
          onChange={(e) => onChange(e)}
          className="w-full pl-12 pr-4 py-4 bg-white rounded-lg shadow-sm border border-gray-200 focus:border-profile-purple focus:ring-1 focus:ring-profile-purple outline-none"
        />
      </div>
    </div>
  );

  EditField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    icon: PropTypes.element.isRequired,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add logic to save the updated profile data
  };

  const ViewProfile = () => (
    <>
      <div className="bg-gradient-profile rounded-2xl p-8 mb-8">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
            {profileImage && (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-semibold text-profile-text">
              {profileData.firstName} {profileData.lastName}
            </h1>
            <p className="text-profile-label">Personal Information</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoField
          label="First Name"
          value={profileData.firstName}
          icon={<FiUser />}
        />
        <InfoField label="Email" value={profileData.email} icon={<FiMail />} />
        <InfoField
          label="Last Name"
          value={profileData.lastName}
          icon={<FiUser />}
        />
        <InfoField label="City" value={profileData.city} icon={<FiMapPin />} />
        <InfoField
          label="Mobile Number"
          value={profileData.mobile}
          icon={<FiPhone />}
        />
        <InfoField
          label="Postal Code"
          value={profileData.postalCode}
          icon={<FiMapPin />}
        />
      </div>

      <div className="mt-6">
        <p className="text-profile-label text-xs uppercase tracking-wide mb-2">
          Address
        </p>
        <div className="flex items-center bg-white rounded-lg p-4 shadow-sm">
          <span className="text-profile-purple">
            <FiMapPin />
          </span>
          <span className="ml-3 text-profile-text">{profileData.address}</span>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-profile-purple text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
        >
          Edit Profile
        </button>
      </div>
    </>
  );

  const EditProfile = () => (
    <>
      <div className="bg-gradient-profile rounded-2xl p-8 mb-8">
        <h1 className="text-2xl font-semibold text-profile-text">
          Edit Profile
        </h1>
        <p className="text-profile-label">Update your personal information</p>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 relative">
          {profileImage && (
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
            accept="image/*"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-1 right-1 bg-profile-purple text-white p-2.5 rounded-full shadow-lg hover:bg-indigo-600 transition-colors z-10"
          >
            <FiUpload size={16} />
          </button>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="text-profile-purple text-sm"
        >
          Change Photo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EditField
          label="First Name"
          name="firstName"
          value={profileData.firstName}
          onChange={handleInputChange}
          icon={<FiUser />}
        />
        <EditField
          label="Last Name"
          name="lastName"
          value={profileData.lastName}
          onChange={handleInputChange}
          icon={<FiUser />}
        />
        <EditField
          label="Email"
          name="email"
          value={profileData.email}
          onChange={handleInputChange}
          icon={<FiMail />}
        />
        <EditField
          label="City"
          name="city"
          value={profileData.city}
          onChange={handleInputChange}
          icon={<FiMapPin />}
        />
        <EditField
          label="Mobile Number"
          name="mobile"
          value={profileData.mobile}
          onChange={handleInputChange}
          icon={<FiPhone />}
        />
        <EditField
          label="Postal Code"
          name="postalCode"
          value={profileData.postalCode}
          onChange={handleInputChange}
          icon={<FiMapPin />}
        />
      </div>

      <div className="mt-6">
        <EditField
          label="Address"
          name="address"
          value={profileData.address}
          onChange={handleInputChange}
          icon={<FiMapPin />}
        />
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <button
          onClick={() => setIsEditing(false)}
          className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-profile-purple text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-profile-bg p-6">
      <ToastContainer /> {/* Add ToastContainer here */}
      <div className="max-w-2xl mx-auto">
        {isEditing ? <EditProfile /> : <ViewProfile />}
      </div>
    </div>
  );
};

export default UserInfo;
