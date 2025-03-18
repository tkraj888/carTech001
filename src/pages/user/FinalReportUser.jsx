

/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from "react";
import { Link, Element, animateScroll as scroll } from "react-scroll";
import {useFinalInspectionQuery, useInspectorByIdQuery} from "../../services/inspectorapi"
import { useParams } from "react-router-dom";
import CarDocumentSectionUser from "./CarDocumentSectionUser";
import ExteriorSectionUser from "./ExteriorSectionUser";
import InteriorSectionUser from "./InteriorSectionUser";
import EngineSectionUser from "./EngineSectionUser";
import AcSectionUser from "./AcSectionUser";
import ElectricalSectionUser from "./ElectricalSectionUser";
import SteeringSectionUser from "./SteeringSectionUser";
import SalePersonInformationUser from "./SalePersonInformationUser";
import { useGetUserRequestDataByIdQuery } from "../../services/userAPI";
import { useSellerByIdQuery } from "../../services/salesAPI";

export default function FinalReportUser() {
const {beadingCarId , userFormId} = useParams()

  const {data : inspData} = useFinalInspectionQuery(beadingCarId);
  const {data : formData } = useGetUserRequestDataByIdQuery(userFormId);
  const salesPersonId = formData?.object?.salesPersonId;
  const inspectorId = formData?.object?.inspectorId;
  const {data : saler} = useSellerByIdQuery({userId : salesPersonId});
  
  
  
  const {data : Inspector } = useInspectorByIdQuery({userId :inspectorId });
  console.log(Inspector?.response?.firstName)

  const [activeTab, setActiveTab] = React.useState("salePerson");
  const data = [
    {
        label: "SalePerson",
        value: "salePerson",
        component: <SalePersonInformationUser formData={formData} saler={saler} Inspector={Inspector}/>,
   },
    // {
    //   label: " Document",
    //   value: "important document",
    //   component: <CarDocumentSectionUser inspData={inspData} />,
    // },
    // {
    //   label: "Exterior",
    //   value: "exterior",
    //   component: <ExteriorSectionUser />,
    // },
    // {
    //   label: "Interior",
    //   value: "interior",
    //   component: <InteriorSectionUser />,
    // },
    // {
    //   label: "Engine",
    //   value: "engine",
    //   component: <EngineSectionUser />,
    // },
    // {
    //   label: "AC",
    //   value: "ac",
    //   component: <AcSectionUser />,
    // },
    // {
    //   label: "Electricals",
    //   value: "electricals",
    //   component: <ElectricalSectionUser />,
    // },
    // {
    //   label: "Steering",
    //   value: "steering",
    //   component: <SteeringSectionUser />,
    // },
      
  
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
            className={activeTab === value ? "" :''}
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
