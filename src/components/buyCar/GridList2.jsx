/* eslint-disable react/prop-types */
import { CardDefault } from "../../ui/CardDefault";
import CardUi from "../../ui/CardUi";
import { useEffect, useState } from "react";

const GridCarList = ({ data, error }) => {
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
      <CardUi>
        <div className="grid md:grid-cols-3 md:grid-rows-1 gap-4 justify-center">
          {posts?.map((items, index) => {
            return (
              <div key={index}>
                <div className="flex">
                  <CardDefault data={items} />
                </div>
              </div>
            );
          })}
        </div>
      </CardUi>
    </>
  );
};

export default GridCarList;
