/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { CardDefault2 } from "../ui/UploadImageComponents/CardDefault2";

const FeaturedCars = ({ data, error }) => {
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
    <div className="text-3xl font-bold p-10 font-[latto]">Recently Added Cars</div>
        <div className="w-full lg:pl-0 ">
          <div className="md:grid md:grid-cols-4 mx-2">
            
            {posts?.slice(0,4).map((items, index) => {
              return (
                <div key={index}>
                  <div className="flex mb-5 mx-3 md:mb-0">
                    <CardDefault2 data={items} />
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>

    </>
  );
};

export default FeaturedCars;
