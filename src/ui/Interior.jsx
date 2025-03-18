import { useState } from 'react';
import { useAddCarImagesMutation } from '../services/dealerAPI';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import { useParams } from 'react-router-dom';
import { useDealerIdByCarQuery } from '../services/carAPI';
import { jwtDecode } from 'jwt-decode'; // Use named import
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Interior() {
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog display
  const [images, setImages] = useState([]);
  const [document, setDocument] = useState('Interior');
  // eslint-disable-next-line no-unused-vars
  // const navigate = useNavigate();
  const { id } = useParams();
  const token = Cookies.get('token');
  let jwtDecodes;

  if (token) {
    jwtDecodes = jwtDecode(token);
  }

  const UserID = jwtDecodes?.userId;
  const { data } = useDealerIdByCarQuery({ id, pageNo: 0 });

 // const lastCarId = data?.list?.length > 0 ? data?.list[data?.list.length - 1].carId : null;
 const firstCarId = data?.list?.length > 0 ? data?.list[0].carId : null;
  // console.log(firstCarId)

  const [addCarImages] = useAddCarImagesMutation();

  const readImages = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!firstCarId || !images.length) {
      // console.error('lastCarId or images is not defined');
      return;
    }
  
    const formData = new FormData();
    for (const image of images) {
      formData.append('image', image);
    }
  
    try {
      const response = await addCarImages({
        formData,
        document,
        firstCarId,
        UserID,
      }).unwrap();
      // console.log(response);
      response;
      toast.success("Uploaded Successfully");
      setImages([]); // Clear images after successful upload
    } catch (error) {
      // console.error(error);
      toast.error("Upload Failed");
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true); // Show the dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
  };

  return (
    <div className="">
      <Button
        type="button"
        className="bg-indigo-500 w-64 h-10 text-white"
        onClick={handleOpenDialog}
      >
        Upload Interior Car Images
      </Button>
      <Dialog open={openDialog} handler={setOpenDialog} size="md" dismiss={{ backdrop: false }}>
      <ToastContainer />
        <DialogHeader>Upload Interior Car Images</DialogHeader>
        <DialogBody>
          <form
            onSubmit={(e) => {
              setDocument('Interior');
              handleSubmit(e);
            }}
            className="flex flex-col space-y-2"
          >

              <div className="flex space-x-2">
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={readImages}
                />
                <Button type="submit" className="bg-indigo-500 w-40 h-10 text-white">
                  Upload
                </Button>
              </div>
            
          </form>
          <form
            onSubmit={(e) => {
              setDocument('Interior');
              handleSubmit(e);
            }}
            className="flex flex-col space-y-2"
          >
           
              <div className="flex space-x-2 space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={readImages}
                />
                <Button type="submit" className="bg-indigo-500 w-40 h-10 text-white">
                  Upload
                </Button>
              </div>
           
          </form>
          <form
            onSubmit={(e) => {
              setDocument('Interior');
              handleSubmit(e);
            }}
            className="flex flex-col space-y-2"
          >
           
              <div className="flex space-x-2 space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={readImages}
                />
                <Button type="submit" className="bg-indigo-500 w-40 h-10 text-white">
                  Upload
                </Button>
              </div>
           
          </form>
          <form
            onSubmit={(e) => {
              setDocument('Interior');
              handleSubmit(e);
            }}
            className="flex flex-col space-y-2"
          >
           
              <div className="flex space-x-2 space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={readImages}
                />
                <Button type="submit" className="bg-indigo-500 w-40 h-10 text-white">
                  Upload
                </Button>
              </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            type="button"
            className="bg-red-500 w-40 h-10 mr-[7rem] text-white"
            onClick={handleCloseDialog}
          >
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
