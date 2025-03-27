import { Carousel } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import pre4 from "/cars/pre4.jpg";
import pre5 from "/cars/pre5.jpg";
import pre6 from "/cars/pre6.jpg";
import BrandList2 from "./BrandList2";
import  {PrimiumNavbar} from "../navbars/PrimiumNavbar";
import FooterF from "../Footer";

const PremiumCars = () => {
    
  return (
    <div>
      <PrimiumNavbar></PrimiumNavbar>
      <Carousel
        className=" overflow-hidden "
        autoplay
        autoplayDelay={5000}
        loop
      >
        <div className="relative overflow-hidden lg:h-[42rem] ">
          <img
            src={pre4}
            alt="Image 1"
            className="object w-full md:h-full h-[200px]  lg:mt-0 md:mt-5 mt-10  "
          />
          <div className="absolute grid inset-0 bg-black/40">
            <div className=" mt-2 md:mt-4 xl:mt-8 md:ml-10 mx-5 ">
              <div className="text-white text-lg md:text-xl lg:text-4xl  mb-2  font-bold  rounded xl:mt-[70px] lg:mt-[80px] mt-14 ">
                Premium Cars Collection...
              </div>
              <p className="text-white font-bold mb-5  text-xs lg:w-2/3 md:text-xl rounded">
                            Car Is Where Early Adopters And Innovation Seekers Lively Imaginative Tech Before It Hits The Mainstream
                        </p>
                         <Link to="/PremiumCarList">
                        <button className="p-1 md:p-3 rounded-md bg-white">
                            <h1 className="text-center text-xs md:text-sm font-semibold"> GO TO LISTING </h1>
                        </button>
                    </Link>
            </div>
          </div>
        </div>

        <div className="relative lg:h-[42rem] ">
          <img
            src={pre5}
            alt="Image 1"
            className="object-cover w-full md:h-full h-[200px] lg:mt-0 md:mt-5 mt-10 "
          />
          <div className="absolute grid inset-0 bg-black/40">
            <div className=" mt-2 md:mt-4 xl:mt-8 ml-10">
              <div className="text-white  text-md md:text-xl lg:text-4xl mb-2 font-bold  rounded xl:mt-[70px] lg:mt-[80px] mt-[16px] md:mt-[35px]">
                Redefining The Standards Of Luxury
              </div>
              {/* <p className="text-white font-bold mb-5 rounded">
              Quick Approval
               </p> */}
                <Link to="/PremiumCarList">
                        <button className="p-1 md:p-3 ml-2 rounded-md bg-white">
                            <h1 className="text-center text-xs md:text-sm font-semibold"> GO TO LISTING </h1>
                        </button>
                    </Link>
            </div>
          </div>
        </div>

        <div className="relative lg:h-[42rem] ">
          <img
            src={pre6}
            alt="Image 1"
            className="object-cover w-full md:h-full h-[200px] lg:mt-0 md:mt-5 mt-10"
          />
          <div className="absolute grid inset-0 bg-black/30">
            <div className="mt-2 md:mt-4 xl:mt-8 ml-10">
              <div className="text-white  text-md md:text-xl lg:text-4xl mb-2  font-bold  rounded xl:mt-[70px] lg:mt-[80px] mt-4 md:mt-[30px]">
                Drive the Dream. Live the Luxury
              </div>
              <Link to="/PremiumCarList">
                        <button className="p-1 md:p-3 rounded-md ml-2 bg-white">
                            <h1 className="text-center text-xs md:text-sm font-semibold"> GO TO LISTING </h1>
                        </button>
                    </Link>
              {/* <p className="text-white font-bold mb-5 rounded">
               Car Is Where Early Adopters And Innovation Seekers Lively Imaginative Tech Before It Hits The Mainstream
               </p> */}
            </div>
          </div>
        </div>
      </Carousel>
      <BrandList2 />
      <FooterF></FooterF>
    </div>
  );
};

export default PremiumCars;
