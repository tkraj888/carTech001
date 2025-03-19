/* eslint-disable react/prop-types */
// import CardUi from "../../ui/CardUi";
import { useEffect, useState } from "react";
// import { PremiumCardDefault } from "../../ui/PremiumCardDefault";
import { PremiumCardDefault1 } from "../../ui/PremiumCardDefault1";

const GridPremiumCarList1 = ({ data, error, refetch }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (data?.list && Array.isArray(data.list)) {
      setPosts(data.list);
    } else if (error) {
      // console.error("Data not Found");
    }
  }, [data, error]);

  return (
    <>
      <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-10 md:gap-y-6 lg:grid-cols-3 lg:gap-x-4 lg:gap-y-4 hover:">
        {posts?.map((items, index) => {
          return (
            <div key={index}>
              <div className="flex">
                <PremiumCardDefault1
                  data={items}
                  Carid={items.carId}
                  refetch={refetch}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default GridPremiumCarList1;
