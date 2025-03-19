
import { useParams } from "react-router-dom";
import { useInspectorupdateMutation, useInspectorByIdQuery } from "../../services/inspectorapi";
import Inputs from "../../forms/Inputs";
import React, { useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiLoader } from 'react-icons/fi'; 
const   InspectorEdit = () => {
  const { userid, inspectorprofileid } = useParams();
  const userId = userid;
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useInspectorByIdQuery({ userId });
  // console.log(data)
  
  const [inspectorupdate] = useInspectorupdateMutation();
 
  const [inputField, setInputField] = React.useState({
    address: "",
    city: "",
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: ""
  });
 
  useEffect(() => {
    if (data && data.response) {
      const { response } = data;
      setInputField({
        inspectorProfileId: response.inspectorProfileId || 0,
        address: response.address || "",
        city: response.city || "",
        firstName: response.firstName || "",
        lastName: response.lastName || "",
        email: response.email || "",
        mobileNo: response.mobileNo || ""
      });
    }
  }, [data]);
 
  const onChangeFormhandler = (e) => {
    const { name, value } = e.target;
    setInputField((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));
  };
 
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const inspectordata = {
        inspectorProfileId: inputField.inspectorProfileId,
        address: inputField.address,
        city: inputField.city,
        firstName: inputField.firstName,
        lastName: inputField.lastName,
        email: inputField.email,
        mobileNo: inputField.mobileNo

        
    };
    try {
        const res = await inspectorupdate({ id: inspectorprofileid, inspectordata }).unwrap();
        
        console.log("Update Response:", res);
        if (res.status === 'success') {
            toast.success("Changes successful", {
             // autoClose: 2000,
            });
            setTimeout(() => {
                if (inspectordata.email !== data.response.email) {
                    navigate('/signin'); // Redirect to sign-in page if email is changed
                } else {
                    navigate(-1); // Navigate back to the previous page for other fields
                }
            }, 1000);
        } else {
            toast.error("Failed to update inspector", {
                autoClose: 2000, // 2 seconds
            });
        }
    } catch (error) {
        toast.error("Error updating inspector", {
            autoClose: 2000, // 2 seconds
        });
        // console.log("Error:", error);
    }
};


if (isLoading) {
  return (
    <div className="w-screen h-screen flex justify-center items-center p-8">
      <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
    </div>
  );
}
 
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
 
  return (
    <div className="mx-auto container px-4 sm:px-6 lg:px-8 flex justify-center w-full md:w-[50%] mt-10">
      <form className="w-full border border-gray-500 px-2 py-2 rounded-md mt-2 mb-2" onSubmit={onSubmitHandler}>
        <div className="mt-3">
          <p className="text-3xl font-semibold lg:mb-8 ">Edit Inspector Details</p>
        </div>
        <div className="mt-5">
          <Inputs
            label={"First Name"}
            onChange={onChangeFormhandler}
            value={inputField.firstName}
            type={"text"}
            name={"firstName"}
            required
          />
        </div>
        <div className="mt-5">
          <Inputs
            label={"Last Name"}
            onChange={onChangeFormhandler}
            value={inputField.lastName}
            type={"text"}
            name={"lastName"}
            required
          />
        </div>
        <div className="mt-5">
          <Inputs
            label={"Email"}
            onChange={onChangeFormhandler}
            value={inputField.email}
            type={"email"}
            name={"email"}
            required
          />
        </div>
        <div className="mt-5">
          <Inputs
            label={"MobileNo"}
            onChange={onChangeFormhandler}
            value={inputField.mobileNo}
            type={"number"}
            name={"mobileNo"}
            required
          />
        </div>
        <div className="mt-5">
          <Inputs
            label={"Address"}
            onChange={onChangeFormhandler}
            value={inputField.address}
            type={"text"}
            name={"address"}
            required
          />
        </div>
        <div className="mt-5">
          <Inputs
            label={"City"}
            onChange={onChangeFormhandler}
            value={inputField.city}
            type={"text"}
            name={"city"}
            required
          />
        </div>
        <div className="mt-5 ml-2">
          <Button
            type="submit"
            className="py-2 px-2 bg-indigo-600 text-white"
          >
            Submit
          </Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};
 
export default InspectorEdit;
 
 