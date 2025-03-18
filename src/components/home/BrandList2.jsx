// import React from 'react';
import bmw from "/carlogo/bmw.png";
import mercedes from "/carlogo/mercedes.png";
import volkswagen from "/carlogo/volkswagen.png";
import volvo from "/carlogo/volvo.png";
import audi from "/carlogo/audi.png";
import jaguar from "/carlogo/Jaguar.png";
import lamborghini from "/carlogo/lamborghini.png";
import landrover from "/carlogo/landrover.jpg";
import mg1 from "/carlogo/mg1.png";
import porsche from "/carlogo/porsche.png";
import {  CardBody } from "@material-tailwind/react";

const carBrands = [
  { name: "BMW", logo: bmw },
  { name: "Porsche", logo: porsche },
  { name: "MG", logo: mg1 },
  { name: "Land Rover", logo: landrover },
  { name: "Mercedes", logo: mercedes },
  { name: "Audi", logo: audi },
  { name: "Lamborghini", logo: lamborghini },
  { name: "Jaguar", logo: jaguar },
  { name: "Volkswagen", logo: volkswagen },
  { name: "Volvo", logo: volvo },
];

const BrandList2 = () => {
  return (
    <div className="grid grid-cols-3 mx-5 gap-2 mt-5 mb-4 md:grid md:grid-cols-4 xl:grid xl:grid-cols-5 text-center ">
      
      {carBrands.map((brand, index) => (
        <div className="border w-full rounded-lg shadow-lg flex justify-center" key={index}>
        <div>
          <div
            style={{ minWidth: "120px" }}
            className="hover:scale-110 flex justify-center"
          >
            <CardBody>
              <div className="animate-pulse  [--slidein-delay:900ms]">
                <img
                  alt={brand.name.toLowerCase()}
                  src={brand.logo}
                  className="w-[5rem] lg:w-[8rem] h-[5rem] lg:h-[8rem] p-[10px]"
                />
                <div className="">{brand.name}</div>
              </div>
            </CardBody>
          </div>
        </div>
        </div>
      ))}
    </div>
  );
};

export default BrandList2;
