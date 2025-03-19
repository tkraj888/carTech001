import { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { useGetCarImageByIdQuery } from "../../services/carAPI";
import fallbackImage from "../../../public/cars/no-image-available.png"; // Add a fallback image path

// eslint-disable-next-line react/prop-types
const CarImageCarousel = ({ carId }) => {
  const [activeImage, setActiveImage] = useState(null); // To display the selected image
  const [imageURLs, setImageURLs] = useState([]);

  const { data, isLoading, error } = useGetCarImageByIdQuery({ carId });

  useEffect(() => {
    if (data?.object && Array.isArray(data.object)) {
      const urls = data.object.map((item) => item.documentLink);
      setImageURLs(urls);
      setActiveImage(urls[0] || fallbackImage); // Set the first image as active by default
    } else {
      setImageURLs([fallbackImage]); // Handle case when no valid image
      setActiveImage(fallbackImage);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-[Merriweather] md:text-center text-center">
        Image not available{" "}
        <div className="flex justify-center">
          <img
            className=" md:w-[12rem] w-[10rem] opacity-50 "
            src={fallbackImage}
            alt="no image"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      {/* Active image with blurred background */}
      <div className="relative mt-10 flex justify-center items-center">
        {/* Blurred background */}
        <div
          className="absolute top-0 left-0 w-full h-full" // Set z-index to keep it behind the active image
          style={{
            backgroundImage: `url(${activeImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(20px)", // Apply blur to the background
            transform: "scale(1)", // Slightly enlarge the background to avoid edges being visible
            transition: "all ease-in-out", // Smooth transition when active image changes
          }}
        />

        {/* Active image */}
        <img
          className="relative h-auto lg:w-4/5 w-4/5 rounded-lg object-center md:h-[400px]"
          src={activeImage}
          alt="Active Car"
        />
      </div>

      {/* Thumbnail images */}
      <div className="grid grid-cols-5 m-3 gap-2 md:grid-cols-10 md:ml-5">
        {imageURLs.map((url, index) => (
          <div key={index}>
            <img
              onClick={() => setActiveImage(url)} // Clicking a thumbnail sets it as active image
              src={url}
              className="lg:h-14 h-14 w-20 cursor-pointer rounded-lg object-cover object-center"
              alt={`Car Thumbnail ${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarImageCarousel;
