/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useGetbyUserCarIdQuery } from "../services/carAPI";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const FavoritesCarList = () => {
    const token = Cookies.get("token");
    let jwtDecodes;
    if (token) {
      jwtDecodes = jwtDecode(token);
    }
    const UserId = jwtDecodes?.userId;

    const {
        data: userCars,
        error :favError,
        isLoading,
    } = useGetbyUserCarIdQuery({ UserId });
    // console.log("I have check the data",userCars);

    if(userCars?.list){
        return [userCars?.list]
    }else{
        return [];
    }

}