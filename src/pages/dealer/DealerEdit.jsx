import { useParams } from "react-router-dom";
import {
  useGetDealerQuery,
  useGetEditDealerMutation,
} from "../../services/dealerAPI";
import Inputs from "../../forms/Inputs";
import React from "react";
import { useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";
import { toast, ToastContainer } from 'react-toastify';

const DealerEdit = () => {
  const { id } = useParams();
  const { data: dealerID } = useGetDealerQuery({ id });

  const token = Cookies.get("token");
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }

  const userid = token ? jwtDecodes?.userId : null;

  const [getEditDealer] = useGetEditDealerMutation(userid);
  const [inputField, setInputField] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    address: "",
    city: "",
    area: "",
    shopName: "",
    userid,
  });

  const navigate = useNavigate();

  const onChangeFormhandler = (e) => {
    const { name, value } = e.target;
    setInputField((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Check if any required field is empty
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "mobileNo",
      "address",
      "city",
      "area",
      "shopName",
    ];

    for (let field of requiredFields) {
      if (!inputField[field]) {
        toast.error(`Please fill out the ${field} field.`);
        return; // Stop the submission if any field is empty
      }
    }

    // console.log(inputField);
    
    try {
      const {data , error} = await getEditDealer({ id: userid, inputField });
      console.log(data);
      if(error?.status === 409){
        toast.error(error?.data?.message)
      }else{

        if (data?.status === 'success') {
          toast.success("Successfully Update!!!");
          setTimeout(() => {
            if (inputField.email !== dealerID.dealerDto.email) {
              navigate("/signin"); // Redirect to sign-in page if email is changed
            } else {
              navigate(-1); // Navigate back to the previous page for other fields
            }
          }, 1000);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to Edit");
    }
  };

  
  useEffect(() => {
    if (dealerID) {
      const { dealerDto } = dealerID;
      setInputField({
        firstName: dealerDto?.firstName || "",
        lastName: dealerDto?.lastName || "",
        email: dealerDto?.email || "",
        mobileNo: dealerDto?.mobileNo || "",
        address: dealerDto?.address || "",
        city: dealerDto?.city || "",
        area: dealerDto?.area || "",
        shopName: dealerDto?.shopName || "",
        userid,
      });
    }
  }, [dealerID, userid]);

  return (
    <div className="mx-auto container px-4 sm:px-6 lg:px-8 flex justify-center md:w-[50%] w-full mt-10">
      <ToastContainer />
      <form className="w-full border border-gray-500 px-2 py-2 rounded-md mt-2 mb-2" onSubmit={onSubmitHandler}>
        <div className="mt-3">
          <p className="text-3xl font-semibold">Edit Dealer Details</p>
        </div>
        <div className="mt-5">
          <Inputs
            required
            label={"First Name"}
            onChange={onChangeFormhandler}
            value={inputField.firstName}
            defaultValue={dealerID?.dealerDto?.firstName || ""}
            type={"text"}
            name={"firstName"}
          />
        </div>
        <div className="mt-5">
          <Inputs
            required
            label={"Last Name"}
            onChange={onChangeFormhandler}
            value={inputField.lastName}
            defaultValue={dealerID?.dealerDto?.lastName || ""}
            type={"text"}
            name={"lastName"}
          />
        </div>
        <div className="mt-5">
          <Inputs
            required
            label={"Email"}
            onChange={onChangeFormhandler}
            value={inputField.email}
            defaultValue={dealerID?.dealerDto?.email || ""}
            type={"email"}
            name={"email"}
          />
        </div>
        <div className="mt-5">
          <Inputs
            required
            label={"Mobile No"}
            onChange={onChangeFormhandler}
            value={inputField.mobileNo}
            defaultValue={dealerID?.dealerDto?.mobileNo || ""}
            type={"number"}
            name={"mobileNo"}
          />
        </div>
        <div className="mt-5">
          <Inputs
            required
            label={"Shop Name"}
            onChange={onChangeFormhandler}
            value={inputField.shopName}
            defaultValue={dealerID?.dealerDto?.shopName || ""}
            type={"text"}
            name={"shopName"}
          />
        </div>
        <div className="mt-5">
          <Inputs
            required
            label={"Address"}
            onChange={onChangeFormhandler}
            value={inputField.address}
            defaultValue={dealerID?.dealerDto?.address || ""}
            type={"text"}
            name={"address"}
          />
        </div>
        <div className="mt-5">
          <Inputs
            required
            label={"City"}
            onChange={onChangeFormhandler}
            value={inputField.city}
            defaultValue={dealerID?.dealerDto?.city || ""}
            type={"text"}
            name={"city"}
          />
        </div>
        <div className="mt-5">
          <Inputs
            required
            label={"Area"}
            onChange={onChangeFormhandler}
            value={inputField.area}
            defaultValue={dealerID?.dealerDto?.area || ""}
            type={"text"}
            name={"area"}
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
    </div>
  );
};

export default DealerEdit;
