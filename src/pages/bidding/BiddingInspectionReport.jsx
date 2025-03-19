/* eslint-disable no-unused-vars */
import CardUi from "../../ui/CardUi";
import forwardarrow from "/carslogo/forwardarrow.png";
import { FaCar } from "react-icons/fa";
import { SlSpeedometer } from "react-icons/sl";
import { MdFlood } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TbAlertOctagonFilled } from "react-icons/tb";
import { IoMdColorPalette } from "react-icons/io";
import { GiTyre } from "react-icons/gi";
import { IoIosArrowForward } from "react-icons/io";

const BiddingInspectionReport = () => {
  return (
    <>
      <div className="text-2xl text-black font-bold my-6 ml-12 font-[Merriweather]">
        Inspection Report
      </div>
      <CardUi>
        <div className="px-5 flex flex-col md:flex md:flex-row md:justify-between md:w-full gap-4">
          <div className="w-3/4 md:w-1/2 text-lg font-[latto]">
            We aim to provide our customers with a reliable drive. Every car we
            sell is refurbished by experts at our Mega Refurbishment Labs.
          </div>
          <div className="flex gap-5 ">
            <div className="flex flex-col items-center text-center">
              <FaCar className="w-6 h-6" />
              <div className="text-sm mt-3 font-semibold text-black font-[latto]">
                Non <br /> Accidental
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <SlSpeedometer className="w-6 h-6" />
              <div className="text-sm mt-3 font-semibold text-black font-[latto]">
                Non <br /> Tempered
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <MdFlood className="w-6 h-6" />
              <div className="text-sm mt-3 font-semibold text-black font-[latto]">
                Non <br /> Flooded
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <IoMdCheckmarkCircleOutline className="w-6 h-6" />
              <div className="text-sm mt-3 font-semibold text-black font-[latto]">
                Quality <br /> Checks
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-5 md:w-full w-full p-1">
          <div className="mt-5">
            <CardUi>
              <div className="flex justify-between w-full align-middle items-center">
                <div className="flex">
                  <TbAlertOctagonFilled className="w-[1.5rem] h-[1.5rem] ml-3 mr-5" />
                  <div className="text-black font-bold font-[latto] text-xl">
                    Imperfections
                  </div>
                </div>
                <div>
                  <img
                    alt="medal"
                    src={forwardarrow}
                    className="w-[1rem] ml-3 mr-5"
                  />
                </div>
              </div>
              <div className="mt-4 px-4 font-[latto] text-lg p-2">
                {" "}
                Minor cosmetic imperfection are not repared as they do not
                affect performance, and educe the cost of ownership
              </div>
            </CardUi>
          </div>
          <div className="mt-5"></div>
          <CardUi>
            <div className="flex justify-between w-full align-middle items-center">
              <div className="flex">
                <IoMdColorPalette className="w-[1.5rem] h-[1.5rem] ml-3 mr-5" />
                <div className="text-black font-bold font-[latto] text-xl">
                  Repainted Parts
                </div>
              </div>
              <div>
                <img
                  alt="medal"
                  src={forwardarrow}
                  className="w-[1rem] ml-3 mr-5"
                />
              </div>
            </div>
            <div className="mt-4 px-4 font-[latto] text-lg p-2">
              {" "}
              Minor cosmetic imperfection are not repared as they do not affect
              performance, and educe the cost of ownership
            </div>
          </CardUi>
          <div className="mt-5"></div>
          <CardUi>
            <div className="flex justify-between w-full align-middle items-center">
              <div className="flex">
                <IoMdCheckmarkCircleOutline className="w-[1.5rem] h-[1.5rem] ml-3 mr-5" />
                <div className="text-black font-bold font-[latto] text-xl">
                  Perfect Parts
                </div>
              </div>
              <div>
                <img
                  alt="medal"
                  src={forwardarrow}
                  className="w-[1rem] ml-3 mr-5"
                />
              </div>
            </div>
            <div className="mt-4 px-4 font-[latto] text-lg p-2">
              {" "}
              Minor cosmetic imperfection are not repared as they do not affect
              performance, and educe the cost of ownership
            </div>
          </CardUi>
          <div className="mt-5"></div>
          <CardUi>
            <div className="flex justify-between w-full align-middle items-center">
              <div className="flex">
                <GiTyre className="w-[1.5rem] h-[1.5rem] ml-3 mr-5" />
                <div className="text-black font-bold font-[latto] text-xl">
                  Tyres (Life Remaining)
                </div>
              </div>
              <div>
                <img
                  alt="medal"
                  src={forwardarrow}
                  className="w-[1rem] ml-3 mr-5"
                />
              </div>
            </div>
            <div className="mt-4 px-4 font-[latto] text-lg p-2">
              {" "}
              Minor cosmetic imperfection are not repared as they do not affect
              performance, and educe the cost of ownership
            </div>
          </CardUi>
        </div>
        <div className="flex w-3/4 justify-center items-center mt-12 md:w-full">
          {/* <div className="flex gap-2 px-10 py-2 md:px-20 md:py-3 items-center bg-[#002441] text-white text-sm rounded-2xl uppercase font-[latto] ">
            <div>View Inspection Report</div>
            <div>
              <IoIosArrowForward
                className="w-[1.2rem] h-[1.5rem]"
                color="white"
              />
            </div>
          </div> */}
        </div>
      </CardUi>
    </>
  );
};

export default BiddingInspectionReport;
