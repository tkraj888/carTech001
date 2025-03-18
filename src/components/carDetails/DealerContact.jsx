/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { FaLocationDot } from 'react-icons/fa6';
import { IoLogoWhatsapp } from 'react-icons/io';
import { MdEmail, MdPerson } from 'react-icons/md';
import { useGetDealerQuery } from "../../services/dealerAPI";
import CardUi from '../../ui/CardUi';
import { FiLoader } from 'react-icons/fi'; 
const DealerContact = ({ dealer_id }) => {
  const { data, isLoading, isError, error } = useGetDealerQuery({ id: dealer_id });

  const {
    dealerDto: {
      mobileNo,
      firstName,
      lastName,
      email,
      city,
      address,
    } = {},
  } = data || {};

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
      </div>
    );
  }

  return (
    <div className="w-full md:w-full rounded-lg shadow-xl w mt-6">
      <CardUi>
        <div className="p-4 overflow ">
          <h2 className="text-xl font-semibold text-gray-800">Dealer Contact</h2>
          <div className="space-y-4 mt-4 overflow-x-auto  " >
            
            <div className="flex items-start md:flex-col lg:flex-row">
              <div className='md:flex'> 
                <div className='hidden sm:flex'>
                  <MdPerson className="w-5 h-5 text-gray-600 flex-shrink-0" />
                </div>
                <div className="ml-3">
                  <p className="text-black font-semibold font-[latto]">Name:</p>
                </div>
              </div>
              <div className="flex-1 ml-7 md:ml-0">
                <p className="text-gray-600 font-[latto] lg:ml-6 md:ml-2">{firstName} {lastName}</p>
              </div>
            </div>

            <div className="flex items-start md:flex-col lg:flex-row">
              <div className='md:flex'> 
                <div className='hidden sm:flex'>
                  <FaLocationDot className="w-5 h-5 text-gray-600 flex-shrink-0" />
                </div>
                <div className="ml-3">
                  <p className="text-black font-semibold font-[latto]">Address:</p>
                </div>
              </div>
              <div className="flex-1 ml-3 md:ml-0 flex-wrap">
                <p className="text-gray-600 font-[latto] lg:ml-2 md:ml-2">{address}, {city}</p>
              </div>
            </div>

            <div className="flex items-start md:flex-col lg:flex-row max-w-px">
              <div className='md:flex'>   
                <div className='hidden sm:flex'>
                  <MdEmail className="w-5 h-5 text-gray-600 flex-shrink-0" />
                </div>
                <div className="ml-3">
                  <p className="text-black font-semibold font-[latto]">Email:</p>
                </div>
              </div>
              <div className="flex-1 ml-5 md:ml-0 ">
                <p className="text-gray-600 font-[latto] ml-2 lg:ml-6 whitespace-nowrap">{email}</p>
              </div>
            </div>

            <div className="flex items-start md:flex-col lg:flex-row">
              <div className='md:flex'>
                <div className='hidden sm:flex'>
                  <IoLogoWhatsapp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                </div>
                <div className="ml-3">
                  <p className="text-black font-semibold font-[latto]">Phone:</p>
                </div>
              </div>
              <div className="flex-1 ml-5 md:ml-0">
                <p className="text-gray-600 font-[latto] ml-1 lg:ml-5 md:ml-2">{mobileNo}</p>
              </div>
            </div>
          </div>
        </div>
      </CardUi>
    </div>
  );
};

export default DealerContact;
