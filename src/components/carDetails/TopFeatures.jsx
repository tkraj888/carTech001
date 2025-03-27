/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import CardUi from "../../ui/CardUi";
import { FaBluetooth } from "react-icons/fa6";
import { FaCameraRetro } from "react-icons/fa";
import { GiWindow } from "react-icons/gi";
import { IoRadioButtonOnSharp } from "react-icons/io5";
import { TbAirConditioning } from "react-icons/tb";
import { FaAirbnb } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { RiAnticlockwiseFill } from "react-icons/ri";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { IoSunnySharp } from "react-icons/io5";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const TopFeatures = ({
  abs,
  childSafetyLocks,
  buttonStart,
  sunroof,
  airbag,
  acFeature,
  musicFeature,
  powerWindowFeature,
  rearParkingCameraFeature,
}) => {
  const token = Cookies.get("token");

  let jwtDecodes;

  if (token) {
    jwtDecodes = jwtDecode(token);
  }

  const userRole = token ? jwtDecodes?.authorities[0] : null;

  return (
    <>
      <div className="text-2xl text-black font-bold mt-6 mb-3 md:ml-12 font-[Merriweather]">
        Top Features
      </div>
      <div className="border shadow-xl rounded-lg">
      <CardUi>
        {/* <div className="w-full md:w-full md:flex gap-7">
          <div className="w-full md:h-52 "> */}
            {/* <Carousel
              className="rounded-xl w-full"
              navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                  {new Array(length).fill("").map((_, i) => (
                    <span
                      key={i}
                      className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                        activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                      }`}
                      onClick={() => setActiveIndex(i)}
                    />
                  ))}
                </div>
              )}
            > */}
              {/* <div className="flex w-full h-full justify-center">
                <img
                  src="https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                  alt="image 1"
                  className="h-full w-1/2 object-cover rounded-2xl"
                />
              </div> */}
            {/* </Carousel> */}
          {/* </div>
        </div> */}
        <div className="w-full md:ml-5 md:grid md:grid-cols-3 mb-9 mt-5">
          {musicFeature ? (
            <div className="flex mt-5">
              <FaBluetooth className="w-[1.5rem] h-[1.5rem] ml-3 mr-5" />
              <div className="font-semibold text-black font-[latto] text-lg">
                Bluetooth Campatibility
              </div>
            </div>
          ) : null}
          {acFeature ? (
            <div className="flex mt-5">
              <TbAirConditioning className="w-[1.5rem] h-[1.5rem] ml-3 mr-5" />
              <div className="font-semibold text-black font-[latto] text-lg">
                Air Conditioning
              </div>
            </div>
          ) : null}
          {powerWindowFeature ? (
            <div className="flex mt-5">
              <GiWindow className="w-[1.5rem] h-[1.5rem] ml-3 mr-5" />
              <div className="font-semibold text-black font-[latto] text-lg">
                Power Windows
              </div>
            </div>
          ) : null}
          {rearParkingCameraFeature ? (
            <div className="flex mt-5">
              <FaCameraRetro className="w-[1.5rem] h-[1.5rem] ml-3 mr-5" />
              <div className="font-semibold text-black font-[latto] text-lg">
                Rear Parking Camera
              </div>
            </div>
          ) : null}
          {sunroof ? (
            <div className="flex mt-5">
              <IoSunnySharp className="w-[1.5rem] h-[1.5rem] ml-3 mr-5" />
              <div className="font-semibold text-black font-[latto] text-lg">
                Sunroof
              </div>
            </div>
          ) : null}
          {abs ? (
            <div className="flex mt-5">
              <RiAnticlockwiseFill className="w-[1.5rem] h-[1.5rem] ml-3 mr-5" />
              <div className="font-semibold text-black font-[latto] text-lg">
                ABS
              </div>
            </div>
          ) : null}
          {airbag ? (
            <div className="flex mt-5">
              <FaAirbnb className="w-[1.5rem] h-[1.5rem] ml-3 mr-5" />
              <div className="font-semibold text-black font-[latto] text-lg">
              Air Bag
              </div>
            </div>
          ) : null}
          {childSafetyLocks ? (
            <div className="flex mt-5">
              <MdOutlineHealthAndSafety className="w-[1.5rem] h-[1.5rem] ml-3 mr-5" />
              <div className="font-semibold text-black font-[latto] text-lg">
                Child Safety Locks
              </div>
            </div>
          ) : null}
          {buttonStart ? (
            <div className="flex mt-5">
              <IoRadioButtonOnSharp  className="w-[1.5rem] h-[1.5rem] ml-3 mr-5" />
              <div className="font-semibold text-black font-[latto] text-lg">
              Button Start
              </div>
            </div>
          ) : null}
        </div>

        {userRole === "Dealer" ? (
          <div className="flex w-3/4 justify-center items-center mt-12 md:w-full">
            <div className="flex gap-2 px-10 py-2 md:px-20 md:py-3 items-center bg-[#002441] text-white text-sm rounded-2xl uppercase font-[latto] ">
              <div>View Inspection Report</div>
              <div>
                <IoIosArrowForward
                  className="w-[1.2rem] h-[1.5rem]"
                  color="white"
                />
              </div>
            </div>
          </div>
        ) : null}
      </CardUi>
      </div>
    </>
  );
};

export default TopFeatures;
