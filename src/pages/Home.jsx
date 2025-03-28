/*import React from "react";
import { AccordionCustom } from "../components/home/AccordionCustom";
import FooterF from "../components/Footer";
import BrandList from "../components/home/BrandList";
import HeroSection from "../components/home/HeroSection";
import { StickyNavbar } from "../components/navbars/StickyNavbar";
import FeaturedCars from "./FeaturedCars";
import { useFilterCarQuery } from "../services/carAPI";

const Home = () => {
  const { data, error } = useFilterCarQuery();

  return (
    <div>
      <StickyNavbar />
      <HeroSection />
      <div className="mt-[4rem] md:mt-[1rem] flex justify-center">
        <BrandList />
      </div>
      <div className="mt-2 md:my-5">
        <FeaturedCars data={data} error={error} />
      </div>
      <AccordionCustom />
      { <ContactUs/> }
      <FooterF />
    </div>
  );
}; 

export default Home;*/

// Removed: import React from "react"; // Not needed

import { AccordionCustom } from "../components/home/AccordionCustom";
import FooterF from "../components/Footer";
import BrandList from "../components/home/BrandList";
import HeroSection from "../components/home/HeroSection";
import { StickyNavbar } from "../components/navbars/StickyNavbar";
import FeaturedCars from "./FeaturedCars";
import { useFilterCarQuery } from "../services/carAPI";

// Import ContactUs if you want to use it, otherwise remove its JSX reference
// import ContactUs from "../components/home/ContactUs"; 

const Home = () => {
  const { data, error } = useFilterCarQuery();

  return (
    <div>
      <StickyNavbar />
      <HeroSection />
      <div className="mt-[4rem] md:mt-[1rem] flex justify-center">
        <BrandList />
      </div>
      <div className="mt-2 md:my-5">
        <FeaturedCars data={data} error={error} />
      </div>
      <AccordionCustom />
      {/* If you want to use ContactUs, uncomment the import above */}
      {/* <ContactUs /> */}
      <FooterF />
    </div>
  );
};

export default Home;


