/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useState, useRef, useEffect } from "react";
import { IoCameraOutline, IoChevronBack } from "react-icons/io5";
import { Button } from "@material-tailwind/react";

const UploadImage4 = ({ onClose, handleCaptureImage, selectfiled }) => {
  const [image, setImage] = useState(null);
  const [cameraStream, setCameraStream] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      setCameraStream(stream);
      setPreviewMode(false); // Ensure previewMode is false when starting the camera
    } catch (err) {
      console.error("Error accessing the camera:", err);
    }
  };

  const captureImage = () => {
    if (cameraStream) {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg");
      setImage(dataUrl);
      setPreviewMode(true); // Switch to preview mode after capturing the image
    }
  };

  const handleUpload = () => {
    if (image) {
      const blob = dataURLtoBlob(image);
      const file = new File([blob], "captured_image.jpg", { type: blob.type });
      handleCaptureImage(file, selectfiled, image);
    }
  };

  const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleBackClick = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setImage(null);
    setPreviewMode(false);
    onClose(); // Close the window
  };

  const handleRecapture = () => {
    setImage(null);
    setPreviewMode(false);
    startCamera();
  };

  useEffect(() => {
    if (cameraStream && videoRef.current) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen -mt-4 -ml-8 min-w-[100vw] bg-white">
      {!cameraStream && !image ? (
        <div className="cursor-pointer flex flex-col items-center">
          <IoCameraOutline className="w-16 h-16 mb-4 text-gray-600" />
          <Button className="mt-2" onClick={startCamera}>
            Open Camera
          </Button>
        </div>
      ) : previewMode ? (
        <div className="flex flex-col items-center">
          <img
            src={image}
            alt="Preview"
            className="object-cover w-full h-full max-w-xs mt-4"
          />
          <div className="flex space-x-4 mt-4">
            <Button size="md" onClick={handleRecapture}>
              Recapture
            </Button>
            <Button size="md" onClick={handleUpload}>
              Upload Image
            </Button>
          </div>
          <Button
            size="md"
            className="mt-4 cursor-pointer flex items-center"
            onClick={handleBackClick}
          >
            <IoChevronBack className="w-5 h-5" /> Back
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <video
            ref={videoRef}
            autoPlay
            className="object-cover w-full h-full max-w-xs"
          />
          <Button size="md" className="mt-4" onClick={captureImage}>
            Capture Photo
          </Button>
          <Button
            size="md"
            className="mt-4 cursor-pointer flex items-center"
            onClick={handleBackClick}
          >
            <IoChevronBack className="w-5 h-5" /> Back
          </Button>
        </div>
      )}
    </div>
  );
};

export default UploadImage4;
