import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "Services/apiService";

import {
  ArrowLeft,
  ShoppingCart,
  CreditCard,
  Truck,
  X,
  Trash2,
  Edit,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


type SparePartType = {
  id: string;
  partName: string;
  photo: string[];
  price: number;
  replacementPrice?: number;
  seller?: string;
  partNumber?: string;
  manufacturer?: string;
  description?: string;
};

function SparePartDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sparePart, setSparePart] = useState<SparePartType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPincodePopup, setShowPincodePopup] = useState(true);
  const [pincode, setPincode] = useState("");
  const [deliveryMessage, setDeliveryMessage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  let userRole = '' ;
  

  const storedDecodedToken = localStorage.getItem("userData");
  if (storedDecodedToken) {
    const parsedToken = JSON.parse(storedDecodedToken);
    userRole = parsedToken.authorities[0];
  }

  useEffect(() => {
    if (!id) {
      setError("Invalid Spare Part ID");
      setLoading(false);
      return;
    }

    apiClient
      .get(`sparePartManagement/getPartById/${id}`)
      .then((response) => {
        setSparePart(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching details:", err);
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, [id]);

  const handlePincodeSubmit = () => {
    if (pincode) {
      setDeliveryMessage(`Delivering to ${pincode}`);
      setShowPincodePopup(false);
    }
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleDelete = () => {
    alert("Delete functionality to be implemented.");
  };

  const handleEdit = () => {
    navigate(`/edit-spare-part/${id}`);
  };

  const handleFullScreen = () => {
    setIsFullScreen(true);
  };

  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="rounded-full h-32 w-32 border-4 border-blue-500 border-t-transparent"
        ></motion.div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-red-500 text-xl p-6 bg-white rounded-lg shadow-md"
        >
          {error}
        </motion.p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-4 lg:p-6 relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-700 hover:text-black mb-4 lg:mb-6 transition duration-300"
      >
        <ArrowLeft size={24} />
        <span className="text-lg font-medium">Back</span>
      </motion.button>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-4">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex lg:flex-col gap-2 overflow-hidden"
            >
              {sparePart?.photo &&
                sparePart.photo.map((photo, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    className={`w-20 h-20 lg:w-24 lg:h-24 border-2 rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 ${
                      index === currentImageIndex
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <img
                      src={`data:image/jpeg;base64,${photo}`}
                      alt={`Thumbnail ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 h-[300px] lg:h-[400px] border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden relative bg-white flex items-center justify-center"
            >
              {sparePart && sparePart.photo?.length > 0 ? (
                <motion.img
                  src={`data:image/jpeg;base64,${sparePart.photo[currentImageIndex]}`}
                  alt={sparePart.partName || "Spare Part"}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={handleFullScreen}
                  whileHover={{ scale: 1.02 }}
                />
              ) : (
                <img
                  src="/placeholder.jpg"
                  alt="Placeholder"
                  className="w-full h-full object-cover"
                />
              )}

              <motion.button
                whileHover={{ scale: 1.1 }}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition duration-300"
                onClick={handleEdit}
              >
                <Edit size={20} className="text-gray-700" />
              </motion.button>
            </motion.div>
          </div>

          {deliveryMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-gray-700 text-lg mt-4"
            >
              <Truck size={20} />
              <span>{deliveryMessage}</span>
            </motion.div>
          )}
        </div>

        <div className="w-full lg:w-1/2">
          <div className="flex items-center justify-between mb-4">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl lg:text-3xl font-bold text-gray-800"
            >
              {sparePart!.partName}
            </motion.h1>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition duration-300"
              onClick={handleEdit}
            >
              <Edit size={20} className="text-gray-700" />
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              Free Delivery
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              Fulfilled by {sparePart!.seller || "AutoCarCare"}
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
              Best Offer
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4"
          >
            <p className="text-4xl font-mono font-bold text-gray-800">
              ₹{sparePart!.price}
            </p>
            <p className="text-gray-600 text-sm">Incl. of all taxes</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4 mb-6"
          >
            <p className="text-gray-700 text-lg">
              <strong>Part Number:</strong> {sparePart?.partNumber}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>Origin:</strong> {sparePart?.manufacturer ?? "N/A"}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>Replacement Price:</strong> ₹{sparePart?.replacementPrice}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2">Description</h2>
            <p className="text-gray-700 text-lg break-words">
              {sparePart?.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col lg:flex-row gap-4"
          >
            {userRole === 'USER' ? (
              <>
              <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-3 rounded-lg transition duration-300 shadow-md"
              >
              <ShoppingCart size={20} />
              <span className="text-lg">Add to Cart</span>
            </motion.button>
            <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 bg-blue-500 text-white px-8 py-3 rounded-lg transition duration-300 shadow-md"
            >
              <CreditCard size={20} />
              <span className="text-lg">Buy Now</span>
            </motion.button>
            </>
            ) : <></>}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDelete}
              className="flex items-center justify-center gap-2 bg-red-500 text-white px-8 py-3 rounded-lg transition duration-300 shadow-md"
            >
              <Trash2 size={20} />
              <span className="text-lg">Delete</span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
          >
            <motion.div className="relative max-w-full max-h-full">
              <motion.img
                src={
                  sparePart?.photo?.[currentImageIndex]
                    ? `data:image/jpeg;base64,${sparePart.photo[currentImageIndex]}`
                    : "/placeholder.jpg"
                }
                alt={sparePart?.partNumber ?? "N/A"}
                className="max-w-full max-h-full"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition duration-300"
                onClick={handleCloseFullScreen}
              >
                <X size={24} className="text-gray-700" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPincodePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-6 rounded-lg shadow-lg text-gray-800 w-11/12 max-w-md"
            >
              <h2 className="text-xl font-bold mb-4">Enter Pincode</h2>
              <input
                type="text"
                placeholder="Enter your pincode"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 text-gray-800 bg-white"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePincodeSubmit}
                  className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-300"
                >
                  Submit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPincodePopup(false)}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition duration-300"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SparePartDetails;
