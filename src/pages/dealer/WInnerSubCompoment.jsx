/* eslint-disable react/prop-types */

import { useBiddingCarByIdQuery, useGetbeadingCarImageQuery } from '../../services/biddingAPI';
import { WinnerSectionCarDefault } from '../../ui/WinnerSectionCarDefault';
import { FiLoader } from 'react-icons/fi'; 
export default function WInnerSubCompoment({ carId }) {
  
  // console.log(carId)
  const { data, isLoading: isLoadingCar } = useBiddingCarByIdQuery(carId?.beadingCarId);
  
  // console.log(data)
  const beadingCarId = data?.beadingCarId;
 
  // console.log(beadingCarId)
  const { data: Image, isLoading: isLoadingImage } = useGetbeadingCarImageQuery({beadingCarId});
  
  // console.log(Image)
  if (isLoadingCar || (beadingCarId && isLoadingImage)) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
      </div>
    );
  }
  
  if (!data) {
    return null;
  }
  
  return (
    <div className=''>
      <div className=''>
        <WinnerSectionCarDefault data={data} beadingCarId={data.beadingCarId} Image={Image} />
      </div>
    </div>
  );
}
