import { Link, useNavigate, useParams } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { Button } from "@material-tailwind/react";
import { useSellerByIdQuery } from "../../services/salesAPI";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { FiLoader } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import {
  useAddProfileImagesMutation,
  useGetProfileImageByIdQuery,
  useDeleteProfileImageByIdMutation,
} from "../../services/profilePhotoAPI";
import { Typography } from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer


const AdminSalesInfo = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null); // State to manage selected file
  const [uploadedImageUrl, setUploadedImageUrl] = useState(""); // State to store uploaded image URL
  const fileInputRef = useRef(null); // Create a ref for the file input

  const token = Cookies.get("token");

  let jwtDecodes;

  if (token) {
    jwtDecodes = jwtDecode(token);
  }

  const salesPersonId = token ? jwtDecodes?.salesPersonId : null;
  const userRole = token ? jwtDecodes?.authorities[0] : null;
  const DealerId = token ? jwtDecodes?.dealerId : null;
  DealerId;
  // console.log(DealerId)
  // console.log(DealerId);

  const { data, isLoading, isError, error } = useSellerByIdQuery({ userId });
  isLoading;
  isError;
  error;
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
      console.log(
        "Setting uploaded image URL:",
        profileImageData.object.documentLink
      ); // Debugging
      setUploadedImageUrl(profileImageData.object.documentLink);
    }
  }, [profileImageData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      handleAddImage(file); // Directly add the image after selecting it
    }
  };

  const handleAddImage = async (file) => {
    const imageToUpload = file || selectedFile;
    if (!imageToUpload) {
      console.error("No file selected");
      fileInputRef.current.click(); // Trigger click event on file input
      return;
    }

    const formData = new FormData();
    formData.append("image", imageToUpload);

    try {
      const response = await addProfileImages({ formData, userId }).unwrap();
      console.log("Image uploaded successfully", response);
      refetchProfileImage();
      setSelectedFile(null);
      toast.success("Image uploaded successfully!"); // Show success toast
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image."); // Show error toast
    }
  };

  const handleDeleteImage = async () => {
    try {
      const response = await deleteProfileImage({ userId }).unwrap();
      console.log("Image deleted successfully", response);
      setUploadedImageUrl("");
      refetchProfileImage();
      toast.success("Image deleted successfully!"); // Show success toast
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Error deleting image."); // Show error toast
    }
  };
  const {
    response: {
      firstName,
      lastName,
      mobileNo,
      area,
      email,
      city,
      address,
    } = {},
  } = data || {};
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
      </div>
    );
  }

  return (
    <>
      <ToastContainer /> {/* Add ToastContainer here */}
      <div className="text-3xl font-bold mt-5 mb-8 ml-4 md:ml-12 xl:mb-[-2rem] md:mb-8">
        Profile Information
      </div>
      {userRole === "ADMIN" ? (
        <Typography className=" xl:mt-7 ml-4 hidden xl:block xl:ml-12 xl:mb-[-5rem]">
          <div className="flex">
            <Link to={"/"}>
              <p className="hover:text-blue-900"> Home </p>
            </Link>
            /
            <Link to={"/admin/salesuser"}>
              <p className="hover:text-blue-900">Seller</p>
            </Link>
            /<p>Info</p>
          </div>
        </Typography>
      ) : (
        <Typography className=" xl:mt-7 ml-4 hidden xl:block xl:ml-12 xl:mb-[-5rem]">
          <div className="flex">
            <Link to={"/"}>
              <p className="hover:text-blue-900"> Home </p>
            </Link>
            /<p>Info</p>
          </div>
        </Typography>
      )}
      <div className="flex justify-center items-center xl:h-screen">
        <div className="w-full max-w-4xl flex flex-col mx-2 md:flex-row shadow-xl">
          <div className="w-full md:w-1/2 lg:w-1/3 md:h-2/3 flex flex-col lg:mt-8 md:mt-8">
            <div>
              <img
                src={
                  uploadedImageUrl ||
                  "https://tamilnaducouncil.ac.in/wp-content/uploads/2020/04/dummy-avatar.jpg"
                }
                alt="Inspector"
                className="md:w-72 md:h-60 px-7"
              />
            </div>
            <div className="flex mt-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                size="md"
                className="mt-2 ml-2 cursor-pointer flex items-center"
                onClick={() => {
                  if (!selectedFile) fileInputRef.current.click();
                  else handleAddImage(selectedFile);
                }}
                disabled={isAddingImage}
              >
                {isAddingImage ? "Uploading..." : "Add Image"}
              </Button>
              <Button
                color="red"
                size="md"
                className="mt-2 ml-2 cursor-pointer flex items-center"
                onClick={handleDeleteImage}
                disabled={!uploadedImageUrl || isDeletingImage}
              >
                {isDeletingImage ? "Deleting..." : "Delete Image"}
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-2/3 p-8 flex flex-col justify-between">
            <div className="overflow-x-auto lg:overflow-visible">
              <div className="overflow-x-auto lg:overflow-visible">
                <table className="table w-full ml-2 mb-5 border-collapse border border-gray-200">
                  <tbody>
                    <tr>
                      <th className="px-4 py-2 border border-gray-200">
                        First Name
                      </th>
                      <td className="px-4 py-2 border border-gray-200">
                        {firstName}
                      </td>
                    </tr>
                    <tr>
                      <th className="px-4 py-2 border border-gray-200">
                        Last Name
                      </th>
                      <td className="px-4 py-2 border border-gray-200">
                        {lastName}
                      </td>
                    </tr>
                    <tr>
                      <th className="px-4 py-2 border border-gray-200">
                        Mobile Number
                      </th>
                      <td className="px-4 py-2 border border-gray-200">
                        {mobileNo}
                      </td>
                    </tr>
                    <tr>
                      <th className="px-4 py-2 border border-gray-200">Area</th>
                      <td className="px-4 py-2 border border-gray-200">
                        {area}
                      </td>
                    </tr>
                    <tr>
                      <th className="px-4 py-2 border border-gray-200">
                        Email
                      </th>
                      <td className="px-4 py-2 border border-gray-200">
                        <div className="email-content">{email}</div>
                      </td>
                    </tr>
                    <tr>
                      <th className="px-4 py-2 border border-gray-200">City</th>
                      <td className="px-4 py-2 border border-gray-200">
                        {city}
                      </td>
                    </tr>
                    <tr>
                      <th className="px-4 py-2 border border-gray-200">
                        Address
                      </th>
                      <td className="px-4 py-2 border border-gray-200">
                        {address}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-center items-center mt-4 md:mt-0">
              <span className="flex items-center">
                {userRole === "ADMIN" ? (
                  <Button
                    size="md"
                    className="mt-2 ml-2 cursor-pointer flex items-center"
                    onClick={() => navigate(-1)}
                  >
                    <IoChevronBack className="w-5 h-5" /> Back
                  </Button>
                ) : null}

                {userRole === "SALESPERSON" ? (
                  <Link to={`/seller/edit/${userId}/${salesPersonId}`}>
                    <Button
                      size="md"
                      className="mt-2 ml-2 cursor-pointer flex items-center"
                    >
                      Edit Profile
                    </Button>
                  </Link>
                ) : null}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSalesInfo;
