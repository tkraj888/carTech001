// import { useState } from "react";
// import Inputs from "../../forms/Inputs";
import carGroup from "/cars/cars.webp";
import Mask2 from "/cars/Mask2.png";
import Mask from "/cars/Mask.png";
import Mask_group1 from "/cars/Mask_group1.png";
import Mask_group2 from "/cars/Mask_group2.png";

import { Button } from "@material-tailwind/react";
import { Carousel, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router";

const HeroSection = () => {
  // const [locationState, setLocation] = useState("");
  const navigate = useNavigate();
  // const [carBrandState, setCarBrand] = useState("");
  const submitHandler = (e) => {
    e.target.value;
    navigate("/carlist");
    // console.log(locationState, carBrandState);
  };
  return (
    // <div className="flex justify-between   ">
    //   <div className="md:p-12 p-4 h-auto bg-blue-100 w-full">
    //     <p className="flex justify-center items-center md:justify-start font-latto text-xs md:mt-8 md:text-base lg:text-lg opacity-0 animate-slidein [--slidein-delay:300ms]">
    //       Welcomes to CarTechIndia
    //     </p>
    //     <p className="flex justify-center items-center md:justify-start text-md md:mb-3 md:text-xl lg:text-4xl font-Merriweather animate-slidein [--slidein-delay:600ms] opacity-0 ">
    //       Your Journey to Exceptional
    //     </p>
    //     <p className="flex justify-center items-center md:justify-start text-md md:text-xl lg:text-4xl font-Merriweather animate-slidein [--slidein-delay:900ms] opacity-0 ">
    //       Cars Begins Here!
    //     </p>
    //     <div className=" flex right-0 items-center justify-center">
    //       <img
    //         alt="car"
    //         src={carGroup}
    //         className="w-[16rem] block md:w-[50rem] md:hidden"
    //       />
    //     </div>
    //     {/* <div className="w-[5rem] space-y-2 md:flex md:space-y-0 md:gap-2 mt-5 "> */}
    //     {/* <Inputs
    //         label="Location"
    //         placeholder="Search by location"
    //         name="location"
    //         onChange={(e) => setLocation(e.target.value)}
    //         value={locationState}
    //         type="text"
    //       />
    //       <Inputs
    //         label="Brand"
    //         placeholder="Search by location"
    //         name="brand"
    //         onChange={(e) => setCarBrand(e.target.value)}
    //         value={carBrandState}
    //         type="text"
    //       /> */}
    //     {/* </div> */}
    //     <div className="flex justify-center items-center md:justify-start">
    //       <Button
    //         onClick={submitHandler}
    //         className="mt-2 flex items-center gap-2 animate-slidein [--slidein-delay:950ms] opacity-0"
    //       >
    //         Get Started{" "}
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           strokeWidth={1.5}
    //           stroke="currentColor"
    //           className="w-6 h-6"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
    //           />
    //         </svg>
    //       </Button>
    //     </div>
    //   </div>

    //   <div className="absolute right-0 ">
    //     <img
    //       alt="car"
    //       src={carGroup}
    //       className="w-[16rem] hidden md:w-[30rem] lg:w-[50rem] md:block"
    //     />
    //   </div>
    // </div>

    <Carousel
      className=" overflow-hidden"
      autoplay
      autoplayDelay={5000}
      loop
    >
      <div className="flex justify-between overflow-hidden">
        <div className="lg:pl-28 md:pl-16 p-4 h-[400px] md:h-[300px] bg-blue-100 w-full">
          <p className="flex mb-1 justify-center items-center md:justify-start font-[latto] font-semibold text-2xl md:mt-1 md:text-4xl lg:text-4xl opacity-0 animate-slidein [--slidein-delay:300ms]">
            Welcomes to CarTechIndia
          </p>
          <p className="flex justify-center mb-1 items-center md:justify-start text-xl md:mb-3 md:text-2xl lg:text-2xl font-[latto] animate-slidein [--slidein-delay:600ms] opacity-0 ">
            Your Journey to Exceptional
          </p>
          <p className="flex justify-center items-center md:justify-start text-xl md:text-2xl lg:text-2xl font-[latto] animate-slidein [--slidein-delay:900ms] opacity-0 ">
            Cars Begins Here!
          </p>
          <div className=" flex right-0 items-center justify-center">
            <img
              alt="car"
              src={carGroup}
              className="w-[16rem] block md:w-[50rem] md:hidden"
            />
          </div>
          {/* <div className="w-[5rem] space-y-2 md:flex md:space-y-0 md:gap-2 mt-5 "> */}
          {/* <Inputs
            label="Location"
            placeholder="Search by location"
            name="location"
	       @@ -126,143 +49,40 @@ const HeroSection = () => {
            value={carBrandState}
            type="text"
          /> */}
          {/* </div> */}
          <div className="flex justify-center items-center md:justify-start">
            <Button
            color="indigo"
              onClick={submitHandler}
              className="mt-2 flex items-center gap-2 animate-slidein [--slidein-delay:950ms] opacity-0"
            >
              Get Started{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </div>
        </div>

        <div className="absolute right-0 ">
          <img
            alt="car"
            src={carGroup}
            className="w-[16rem] hidden md:mt-[5rem] lg:mt-0 md:w-[35rem] lg:w-[50rem] md:block"
          />
        </div>
      </div>

      <div className=" w-full h-[400px] overscroll-none">
        <img
          src={Mask2}
          alt="image 2"
          className="h-[400px] w-full hidden lg:block object-cover absolute"
        />
        <img
          src={Mask_group1}
          className="h-[400px] w-full object-cover block lg:hidden absolute"
        />
        <div className="absolute grid h-full w-full">
          <div className="w-full mt-4 md:ml-14 md:w-3/4 lg:ml-16 lg:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 lg:w-3/4 text-black font-[latto] px-7 md:px-2 text-3xl md:text-4xl lg:text-4xl"
            >
              The Best Cars For The Best Journey
            </Typography>
            {/* <Typography
              variant="lead"
              color="white"
              className="mb-4 w-3/4 lg:w-[68%] font-[latto] text-black text-sm md:mb-3 md:text-xl lg:text-xl"
            >
              We provide best cars with the best prices. We are expert in car
              rental. Enjoy your holiday with us. We make your drive memorable.
            </Typography> */}
            <Button
             color="indigo"
              onClick={submitHandler}
              className="mt-2 mx-7 md:mx-3 md:mt-5 lg:mt-12 flex items-center gap-2 animate-slidein [--slidein-delay:950ms] opacity-0"
            >
              Get Started{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      <div className=" w-full h-[400px] overscroll-none">
        <img
          src={Mask}
          alt="image 2"
          className="h-[400px] w-full hidden lg:block object-cover absolute"
        />
        <img
          src={Mask_group2}
          className="h-[400px] w-full object-cover block lg:hidden absolute"
        />
        <div className="absolute grid h-full w-full bg-black/50">
          <div className="w-full mt-4 md:ml-14 md:w-3/4 lg:ml-16 lg:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 lg:w-3/4 text-white font-[latto] px-7 text-3xl md:text-4xl lg:text-4xl"
            >
              The Best Cars For The Best Journey
            </Typography>
            {/* <Typography
              variant="lead"
              color="white"
              className="mb-4 w-3/4 lg:w-[68%] font-[latto] text-black text-sm md:mb-3 md:text-xl lg:text-xl"
            >
              We provide best cars with the best prices. We are expert in car
              rental. Enjoy your holiday with us. We make your drive memorable.
            </Typography> */}
            <Button
             color="indigo"
              onClick={submitHandler}
              className="mt-2 mx-7 md:mt-5 md:mx-3 lg:mt-12 flex items-center gap-2 animate-slidein [--slidein-delay:950ms] opacity-0"
            >
              Get Started{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default HeroSection;
