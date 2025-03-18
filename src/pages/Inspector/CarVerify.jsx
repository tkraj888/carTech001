/* eslint-disable no-unused-vars */
import React from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import InspectionReport from "./InspectionReport";
import Exterior from "./Exterior";
import Interior from "./Interior";
import Engine from "./Engine";
import Steering from "./Steering";
import AC from "./Ac";
import Electrical from "./Electrical";
import { useParams } from "react-router-dom";
import { useFinalInspectionQuery } from "../../services/inspectorapi";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CarVerify() {
  const { beadingCarId } = useParams();
  const [checkstep, setCheckstep] = React.useState(false);
  const { data: inspData } = useFinalInspectionQuery(beadingCarId);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(true);
  

  const steps = [
    {
      label: "Exterior",
      component: <Exterior setCheckstep={setCheckstep} />,
    },
    {
      label: "Interior",
      component: <Interior setCheckstep={setCheckstep} />,
    },
    {
      label: "Engine",
      component: <Engine setCheckstep={setCheckstep} />,
    },
    {
      label: "AC",
      component: <AC setCheckstep={setCheckstep} />,
    },
    {
      label: "Electricals",
      component: <Electrical setCheckstep={setCheckstep} />,
    },
    {
      label: "Steering",
      component: <Steering setCheckstep={setCheckstep} />,
    },
    {
      label: "Inspection Report",
      component: <InspectionReport inspData={inspData} />,
    },
  ];

  const handleNext = () => {
    // Only move to the next step if checkstep is true
    if (checkstep && activeStep < steps.length - 1) {
      setActiveStep((cur) => cur + 1);
      setIsFirstStep(false);
      setCheckstep(false); // Reset checkstep for the next step
      if (activeStep + 1 === steps.length - 1) {
        setIsLastStep(true);
      }
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep((cur) => cur - 1);
      setIsLastStep(false);
      if (activeStep - 1 === 0) {
        setIsFirstStep(true);
      }
    }
  };

  return (
    <div className="w-full md:py-4 md:px-8 overflow-scroll md:mt-0 mt-5 px-2">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
        activeClassName="ring-0 !bg-green-500 text-green-500"
        completedClassName="!bg-green-300 text-green-500"
        className="bg-white "
      >
        {steps.map((step, index) => (
          <Step
            key={index}
            onClick={() => {
              // Only allow moving to the clicked step if it's the immediate next step
              if (index === activeStep + 1 && checkstep) {
                setActiveStep(index);
                setCheckstep(false); // Reset checkstep after moving to the next step
              }
            }}
            className={`cursor-pointer ${index <= activeStep ? 'text-green-500' : 'text-gray-500'}`}
          >
            {index + 1}
          </Step>
        ))}
      </Stepper>
      <div className="mt-16">
        {steps[activeStep].component}
      </div>
      <div className="mt-16 flex md:justify-between p-4">
        <div>
          <Button onClick={handlePrev} disabled={isFirstStep}>
            Prev
          </Button>
        </div>
        <div className="md:ml-0 ml-auto">
          <Button onClick={handleNext} disabled={!checkstep}>
            Next
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
