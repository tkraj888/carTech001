
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import SellForCar from "./SellForCar";
import BiddingDealer from "./BiddingDealer";

export default function DealerDashboard() {
  const data = [
    {
      label: "Cars",
      value: "dashboard",
     
    
      desc: <SellForCar/>
    },
    {
      label: "Bidding Car",
      value: "profile",
    
      desc:<BiddingDealer/>,
    },
    
  ];
  return (
    
    <Tabs value="dashboard">
      <TabsHeader className="sticky">
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
          
             
              {label}
           
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
