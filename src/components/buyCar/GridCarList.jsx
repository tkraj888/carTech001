/* eslint-disable react/prop-types */
import { CardDefault } from "../../ui/CardDefault";
import { useEffect, useState } from "react";

const GridCarList = ({ data, error, refetch, sortCriteria }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (data?.list && Array.isArray(data.list)) {
      setPosts(data.list);
    } else if (error) {
      // console.error("Data not Found");
    }
  }, [data, error]);

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortCriteria === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortCriteria === "price") {
      return a.price - b.price;
    }
    return 0; // Default case
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {sortedPosts?.map((items, index) => {
          return (
            <div key={index}>
              <div className="flex">
                <CardDefault data={items} Carid={items.carId} refetch={refetch} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default GridCarList;
