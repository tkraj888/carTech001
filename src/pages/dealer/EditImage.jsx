/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoAddCircleOutline, IoCloseCircle } from "react-icons/io5";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import {  useGetCarImageByIdQuery, useDeleteCarImageByIdMutation } from "../../services/carAPI";
import { useAddCarImagesMutation } from '../../services/dealerAPI';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditImage = () => {
  const navigate = useNavigate();
  const { carId } = useParams();

  const [trigger, setTrigger] = useState(0); // State to trigger re-fetch
  const { data: imagess } = useGetCarImageByIdQuery({ carId, trigger }); // Pass trigger to re-fetch data
  const [deleteCarImageById] = useDeleteCarImageByIdMutation();

  // console.log(imagess);
  const [addCarImages] = useAddCarImagesMutation();
  const [uploadStatus, setUploadStatus] = useState({}); 

  const token = Cookies.get('token');
  let jwtDecodes;

  if (token) {
    jwtDecodes = jwtDecode(token);
  }

  const UserID = jwtDecodes?.userId;

  const [data, setData] = useState([
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
    }
  ]);

  useEffect(() => {
    if (imagess) {
      const coverImg = imagess.object
        .filter(img => img.documentType === 'coverImage')
        .map(img => ({ documentLink: img.documentLink, documentId: img.documentId }));
      
      const imgs = imagess.object
        .filter(img => img.documentType === 'image')
        .map(img => ({ documentLink: img.documentLink, documentId: img.documentId }));

      setData(prevData => prevData.map(category => {
        if (category.value === 'coverimage') {
          return { ...category, images: coverImg, showAddSection: coverImg.length === 0 };
        }
        if (category.value === 'images') {
          return { ...category, images: imgs };
        }
        return category;
      }));
    }
  }, [imagess]);

  const [activeTab, setActiveTab] = useState('coverimage');

  const handleBack = () => {
    navigate(-2); // Navigate back to the previous page
  };

  const handleAddImage = async (event, categoryValue) => {
    const files = Array.from(event.target.files);
    const documentType = categoryValue === 'coverimage' ? 'coverImage' : 'image';

    if (categoryValue === 'coverimage' && files.length > 1) {
      toast.error("Only one cover image can be added");
      return;
    }

    const previewImages = files.map(file => URL.createObjectURL(file));
    
    for (const file of files) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('document', documentType);

      try {
        const response = await addCarImages({
          formData,
          document: documentType,
          firstCarId : carId,
          UserID,
        }).unwrap();
        toast.success("Uploaded Successfully");
        setData((prevData) =>
          prevData.map((category) => {
            if (category.value === categoryValue) {
              const updatedImages = category.images.map(img => {
                if (previewImages.includes(img.documentLink)) {
                  return { documentLink: response.imageUrl, documentId: img.documentId }; // Assuming response.imageUrl contains the URL of the uploaded image
                }
                return img;
              });
              return {
                ...category,
                images: updatedImages,
                showAddSection: categoryValue === 'coverimage' ? updatedImages.length === 0 : category.showAddSection,
              };
            }
            return category;
          })
        );

        setUploadStatus((prevStatus) => ({
          ...prevStatus,
          [file.name]: 'success',
        }));
        setTrigger(prev => prev + 1); // Trigger re-fetch after successful upload
      } catch (error) {
        // console.error(error);
        toast.error("Upload Failed");
        setUploadStatus((prevStatus) => ({
          ...prevStatus,
          [file.name]: 'error',
        }));
      }
    }
  };

  const handleDeleteImage = async (categoryValue, index, imageId) => {
    // console.log(imageId)
    try {
    const res =  await deleteCarImageById({ id: imageId }).unwrap();
    // console.log(res)
      toast.success("Image Deleted Successfully");

      setData((prevData) => {
        const newData = prevData.map((category) => {
          if (category.value === categoryValue) {
            const updatedImages = category.images.filter((_, i) => i !== index);
            return {
              ...category,
              images: updatedImages,
              showAddSection: categoryValue === 'coverimage' ? updatedImages.length === 0 : category.showAddSection,
            };
          }
          return category;
        });
        return newData;
      });
      setTrigger(prev => prev + 1); // Trigger re-fetch after successful deletion
    } catch (error) {
      // console.error(error);
      toast.error("Failed to Delete Image");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-8xl p-4">
        <h2 className="text-3xl font-semibold mb-4">Edit Images</h2>
        <form>
          <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
            <TabsHeader>
              {data.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody className="overflow-y-auto" style={{ maxHeight: '80vh' }}>
              {data.map(({ value, images, showAddSection }) => (
                <TabPanel key={value} value={value} className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {images.map(({ documentLink, documentId }, index) => (
                      <div key={index} className="relative">
                        <img
                          src={documentLink}
                          alt={`Image ${index + 1}`}
                          className="object-cover w-full h-auto"
                          style={{
                            height: '200px',
                            margin: '5px',
                          }}
                        />
                        <IoCloseCircle
                          className="absolute top-2 right-2 cursor-pointer text-red-500 md:mr-6 md:h-8 md:w-8"
                          onClick={() => handleDeleteImage(value, index, documentId)}
                        />
                      </div>
                    ))}
                    {showAddSection && (
                      <div className="h-48 w-full flex items-center justify-center border-2 border-dashed border-gray-400 p-4">
                        <label className="cursor-pointer">
                          <IoAddCircleOutline className="h-16 w-16 text-gray-400" />
                          <input
                            type="file"
                            accept="image/*"
                            multiple={value !== 'coverimage'}
                            className="hidden"
                            onChange={(e) => handleAddImage(e, value)}
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
              Submit
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EditImage;
