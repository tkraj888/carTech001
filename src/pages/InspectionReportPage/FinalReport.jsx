/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from "react";
import { Link, Element, animateScroll as scroll } from "react-scroll";
import ExteriorSection from "./ExteriorSection";
import InteriorSection from "./InteriorSection";
import EngineSection from "./EngineSection";
import AcSection from "./AcSection";
import ElectricalSection from "./ElectricalSection";
import SteeringSection from "./SteeringSection";
import CarDocumentSection from "./CarDocumentSection";
import {useFinalInspectionQuery} from "../../services/inspectorapi"
import { useParams } from "react-router-dom";

export default function FinalReport() {
const {beadingCarId} = useParams()

  const {data : inspData} = useFinalInspectionQuery(beadingCarId);

  const [activeTab, setActiveTab] = React.useState("important documen");
  const data = [
    {
      label: " Document",
      value: "important document",
      component: <CarDocumentSection inspData={inspData} />,
    },
    {
      label: "Exterior",
      value: "exterior",
      component: <ExteriorSection />,
    },
    {
      label: "Interior",
      value: "interior",
      component: <InteriorSection />,
    },
    {
      label: "Engine",
      value: "engine",
      component: <EngineSection />,
    },
    {
      label: "AC",
      value: "ac",
      component: <AcSection />,
    },
    {
      label: "Electricals",
      value: "electricals",
      component: <ElectricalSection />,
    },
    {
      label: "Steering",
      value: "steering",
      component: <SteeringSection />,
    },
  ];
 
  return (
    <div className="">
      
      {/* Tabs at the top */}
      <div className="w-full px-7 sticky lg:top-[94px]  md:top-16 top-16 bg-gray-200 z-10 md:p-2.5 shadow-sm border-2 xl:space-x-30 lg:space-x-28 md:space-x-14 space-x-8 cursor-pointer pt-2 pb-2 overflow-x-auto md:overflow-x-visible lg:overflow-x-visible  " value={activeTab}>
        {data.map(({ label, value }) => (
          <Link
          
            key={value}
            to={value}
            smooth={true}
            duration={500}
            offset={-145}
            onClick={() => setActiveTab(value)}
            className={activeTab === value ? "md:px-2 lg:px-3 xl:px-14 md:py-2.5 text-black md:text-xl bg-transparent border-b-2 border-indigo-900 shadow-none rounded-none text-base py-2.5 " :''}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Sections */}
      {data.map(({ value, component }, index) => (
        <Element name={value} key={index} className="my-3">
          {component}
        </Element>
      ))}
    </div>
    
  );
}
