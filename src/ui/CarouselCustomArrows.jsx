/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useGetCarImageByIdQuery } from "../services/carAPI";
import { FiLoader } from 'react-icons/fi'; 
// eslint-disable-next-line react/prop-types
export function CarouselCustomArrows({ carId }) {
  const [coverImageURL, setCoverImageURL] = useState(null);
  const { data, isLoading, error } = useGetCarImageByIdQuery({ carId });

  const fallbackImage = "..\\..\\cars\\no-image-available-update.png";

  const checkIfImage = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url); // Return the original URL if the image loads
      img.onerror = () => resolve(fallbackImage); // Return the fallback image if the image fails to load
      img.src = url;
    });
  };

  useEffect(() => {
    if (data && data.object && typeof data.object === 'object') {
      // Find the cover image from the data
      const coverImage = data.object.find((item) => item.documentType === "coverImage");

      if (coverImage) {
        checkIfImage(coverImage.documentLink)
          .then((validatedURL) => setCoverImageURL(validatedURL));
      } else {
        setCoverImageURL(fallbackImage); // If no cover image, set fallback image
      }
    } else {
      // Handle case where `data.object` is an error message or invalid structure
      setCoverImageURL(fallbackImage);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
      </div>
    );
  }

  if (data?.message === "unsuccess")
    return (
      <div className="text-center mt-5">
        <img
          className="h-[11rem] w-[19rem] p-[20px] opacity-50"
          src={fallbackImage}
          alt="no image"
        />
      </div>
    );

  return (
    <div className="flex justify-center">
      {coverImageURL && (
        <img
          src={coverImageURL}
          alt="Car Cover Image"
          className="rounded-lg h-[15rem] w-[24rem] "
        />
      )}
    </div>
  );
}
