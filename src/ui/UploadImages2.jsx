/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useAddCarImagesMutation } from "../services/dealerAPI";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  TabPanel,
  Tab,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { useDealerIdByCarQuery } from "../services/carAPI";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  IoAddCircleOutline,
  IoCloseCircle,
  IoCheckmarkCircle,
} from "react-icons/io5";
import imageCompression from "browser-image-compression";

function UploadImages2() {
  const [images, setImages] = useState([]);
  const [uploadStatus, setUploadStatus] = useState({});
  const { id ,carId } = useParams();
  const token = Cookies.get("token");
  let jwtDecodes;

  if (token) {
    jwtDecodes = jwtDecode(token);
  }

  const UserID = jwtDecodes?.userId;
  const { data } = useDealerIdByCarQuery({ id, pageNo: 0, status: "Active" });
  // console.log(data);
  // const firstCarId = data?.list?.length > 0 ? data?.list[0].carId : null;
  const firstCarId = carId;
  // console.log(firstCarId);

  const [addCarImages] = useAddCarImagesMutation();

  const readImages = async (event, categoryValue) => {
    const files = Array.from(event.target.files);
    const documentType = categoryValue === "coverimage" ? "coverImage" : "image";

    const compressedFiles = await Promise.all(
      files.map(async (file) => {
        try {
          const compressedFile = await imageCompression(file, {
            maxSizeMB: 1, // Maximum file size (MB)
            maxWidthOrHeight: 1920, // Max width or height
            useWebWorker: true, // Use multi-threading for faster compression
          });
          return compressedFile;
        } catch (error) {
          // console.error(error);
          toast.error("Image Compression Failed");
          return null;
        }
      })
    );

    const validCompressedFiles = compressedFiles.filter(file => file !== null);

    setImages(validCompressedFiles);

    for (const file of validCompressedFiles) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("document", documentType);
      // console.log(file, documentType, 'Rishi');

      try {
        const response = await addCarImages({
          formData,
          document: documentType,
          firstCarId,
          UserID,
        }).unwrap();
        // console.log(response);
        toast.success("Uploaded Successfully");
        setUploadStatus((prevStatus) => ({
          ...prevStatus,
          [file.name]: "success",
        }));
      } catch (error) {
        // console.error(error);
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
            categoryValue === "coverimage" ? files : [...category.images, ...files];
          return {
            ...category,
            images: updatedImages,
            showAddSection: categoryValue !== "coverimage",
          };
        }
        return category;
      })
    );
  }

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
    navigate(-2);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-8xl p-4">
        <h2 className="text-3xl font-semibold mb-4">Upload Car Images</h2>
        <form>
          <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
            <TabsHeader>
              {data1.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody className="" style={{ maxHeight: "80vh" }}>
              {data1.map(({ value, images, showAddSection }) => (
                <TabPanel key={value} value={value} className="grid grid-cols-1 gap-4">
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
                            multiple={value !== "coverimage"}
                            className="hidden"
                            onChange={(e) => readImages(e, value)}
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

export default UploadImages2;
