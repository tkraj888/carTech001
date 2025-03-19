/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useInspectionReportMutation } from "../services/inspectorapi";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  TabPanel,
  Tab,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { useDealerIdByCarQuery } from "../services/carAPI";
import { useGetbeadingImgGetByIdQuery, useGetBidCarIdQuery } from "../services/biddingAPI";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  IoAddCircleOutline,
  IoCloseCircle,
  IoCheckmarkCircle,
} from "react-icons/io5";

function UploadImages3() {
  const [images, setImages] = useState([]);
  const [uploadStatus, setUploadStatus] = useState({}); // Track upload status for each image
  const { beadingCarId } = useParams();
  // console.log(beadingCarId);

  const token = Cookies.get("token");
  let jwtDecodes;

  if (token) {
    jwtDecodes = jwtDecode(token);
  }

  const UserID = jwtDecodes?.userId;
  const [inspectionReport] = useInspectionReportMutation();

  const readImages = async (event, categoryValue) => {
    const files = Array.from(event.target.files);
    const documentType =
      categoryValue === "coverimage" ? "coverImage" : "image";
    setImages(files);

    for (const file of files) {
      const formDataToSend = new FormData();
      formDataToSend.append("image", file);

      const inspectionData = {
        documentType: documentType,
        beadingCarId: beadingCarId,
        doc: "",
        doctype: documentType,
        subtype: categoryValue,
        comment: "ABCD", // Add relevant comments if necessary
      };

      try {
        const response = await inspectionReport({
          inspectionData,
          formDataToSend,
        });
        // console.log(response);
        toast.success("Uploaded Successfully");
        setUploadStatus((prevStatus) => ({
          ...prevStatus,
          [file.name]: "success",
        }));
      } catch (error) {
        // console.log("Error uploading the file:", error);
        toast.error("Upload Failed");
        setUploadStatus((prevStatus) => ({
          ...prevStatus,
          [file.name]: "error",
        }));
      }
    }

    setData((prevData) =>
      prevData.map((category) => {
        if (category.value === categoryValue) {
          const updatedImages =
            categoryValue === "coverimage"
              ? files
              : [...category.images, ...files];
          return {
            ...category,
            images: updatedImages,
            showAddSection: categoryValue !== "coverimage",
          };
        }
        return category;
      })
    );
  };

  const navigate = useNavigate();

  const initialData = [
    {
      label: "Cover Image",
      value: "coverimage",
      images: [],
      showAddSection: true,
    },
    {
      label: "Images",
      value: "images",
      images: [],
      showAddSection: true,
    },
  ];

  const [data1, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState(initialData[0].value);

  const handleBack = () => {
    navigate(-2); // Navigate back to the previous page
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-8xl p-4">
        <h2 className="text-3xl font-semibold mb-4">
          Upload Bidding Car Images
        </h2>
        <form>
          <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
            <TabsHeader>
              {data1.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody
              className="overflow-y-auto "
              style={{ maxHeight: "80vh" }}
            >
              {data1.map(({ value, images, showAddSection }) => (
                <TabPanel
                  key={value}
                  value={value}
                  className="grid grid-cols-1 gap-4"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {images.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Image ${index + 1}`}
                          className="object-cover w-full h-auto"
                          style={{
                            height: "200px",
                            margin: "5px",
                          }}
                        />
                        {uploadStatus[file.name] === "success" && (
                          <IoCheckmarkCircle className="absolute top-2 right-2 text-green-500 md:mr-6 md:h-8 md:w-8" />
                        )}
                        {uploadStatus[file.name] === "error" && (
                          <IoCloseCircle className="absolute top-2 right-2 text-red-500 md:mr-6 md:h-8 md:w-8" />
                        )}
                      </div>
                    ))}
                    {showAddSection && (
                      <div className="h-48 w-full flex items-center justify-center border-2 border-dashed border-gray-400 p-4">
                        <label className="cursor-pointer">
                          <IoAddCircleOutline className="h-16 w-16 text-gray-400" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => readImages(e, value)}
                            multiple={value !== "coverimage"}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
          <div className="mt-5 flex justify-between">
            <button
              type="button"
              className="p-3 bg-indigo-400 rounded-md w-28 text-white"
              onClick={handleBack}
            >
              Back
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UploadImages3;
