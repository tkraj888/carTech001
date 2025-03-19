
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
import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie";
import { toast, ToastContainer } from 'react-toastify';

const IspectorDetails = () => {
  const { id } = useParams();
  const { data: dealerID } = useGetDealerQuery(id);

  const token = Cookies.get("token");
  let jwtDecodes
  if(token){
     jwtDecodes = jwtDecode(token);
  }
  
  const userid = token ? jwtDecodes?.userId :null;
 
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
const navigate = useNavigate()
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
    // console.log(inputField);
    
    try {
      const res = await getEditDealer({ id: userid, inputField });
      // console.log(res);
    if(res.data.status ==='success'){
      toast.success(" Sucessfully Edit");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
    } catch (error) {
      // console.log(error);
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
    <div className="mx-auto container flex justify-center md:w-[50%] w-fit">
      <ToastContainer />
      <forms className="w-full border border-gray-500 px-2 py-2 rounded-md mt-2 mb-2">
        <div className="mt-5">
          <p className="text-3xl font-semibold">Edit Dealer Details </p>
        </div>
        <div className="mt-5">
          <Inputs
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
            label={"MobileNo"}
            onChange={onChangeFormhandler}
            value={inputField.mobileNo}
            defaultValue={dealerID?.dealerDto?.mobileNo || ""}
            type={"number"}
            name={"mobileNo"}
          />
        </div>
        <div className="mt-5">
          <Inputs
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
            onClick={onSubmitHandler}
            type="submit"
            className="py-2 px-2 bg-indigo-600 text-white"
          >
            Submit
          </Button>
        </div>
      </forms>
    </div>
  );
};

export default IspectorDetails;

