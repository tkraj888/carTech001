/* eslint-disable no-unused-vars */

// import { Link } from "react-router-dom";
// import lexus from "../../assets/lexus.jpg";
import { useEffect, useState } from "react";
import { useFilterCarPremiumQuery } from "../../services/carAPI";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteCars } from "../../pages/favoritesSlice";

import { FiLoader } from "react-icons/fi";
import GridPremiumCarList1 from "../buyCar/GridPremiumCarList1";
import FilterPremiumCars1 from "../buyCar/FilterPremiumCars1";

const PremiumCarList = () => {
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const [urlState, setUrllState] = useState(null);

  const emptyImage = "..\\..\\cars\\emptyfolder.png";

  const { data, isLoading, error, refetch } =
    useFilterCarPremiumQuery(urlState);
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }
  const UserId = jwtDecodes?.userId;
  const navigate = useNavigate();

  useEffect(() => {
    if (UserId) {
      dispatch(fetchFavoriteCars(UserId)); // dispatch the thunk function itself
    }
  }, [dispatch, UserId]);

  if (error?.status === 401) {
    Cookies.remove("token");
    navigate("/signin");
  }
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="w-full"></div>
      <div className="container mx-auto mt-12">
        <div className="mb-1">
          <div className="md:col-span-2 lg:col-span-1 top-0">
            <FilterPremiumCars1
              setUrlState={setUrllState}
              onFilterChange={refetch}
            />
          </div>
          <div className="lg:col-span-3 no-scrollbar mt-6">
            {error?.status === 404 ? (
              <div>
                <div className="flex justify-center mt-14">
                  <img className="w-40" src={emptyImage} alt="no data" />
                </div>
                <p className="flex justify-center text-2xl md:text-3xl font-semibold">
                  No Data Available
                </p>
              </div>
            ) : (
              <GridPremiumCarList1
                data={data}
                error={error}
                refetch={refetch}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumCarList;
