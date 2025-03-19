import { useState } from 'react';
import { IoCameraOutline, IoChevronBack } from 'react-icons/io5';
import { Button } from '@material-tailwind/react';

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      setPreviewMode(true);
    } catch (err) {
      // console.error('Error accessing the camera:', err);
    }
  };

  const captureImage = () => {
    if (cameraStream) {
      const videoTrack = cameraStream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(videoTrack);
      imageCapture.takePhoto()
        .then(blob => {
          setImage(URL.createObjectURL(blob));
          setPreviewMode(true);
        })
        .catch(error => error);
    }
  };

  const handleBackClick = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setPreviewMode(false);
    setImage(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      {!previewMode ? (
        <label className="cursor-pointer flex flex-col items-center">
          <IoCameraOutline className="w-16 h-16 mb-4 text-gray-600" />
          <Button className="mt-2" onClick={startCamera}>
            Open Camera
          </Button>
        </label>
      ) : (
        <div className="flex flex-col items-center">
          <video
            ref={(videoRef) => { if (videoRef) videoRef.srcObject = cameraStream; }}
            autoPlay
            className="object-cover w-full h-full max-w-xs"
          />
          <Button size="md" className="mt-4" onClick={captureImage}>
            Capture Photo
          </Button>
          {image && (
            <>
              <img
                src={image}
                alt="Preview"
                className="object-cover w-full h-full max-w-xs mt-4"
              />
              <Button
                size="md"
                className="mt-4 cursor-pointer flex items-center"
                onClick={handleBackClick}
              >
                <IoChevronBack className="w-5 h-5" /> Back
              </Button>
            </>
            
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
