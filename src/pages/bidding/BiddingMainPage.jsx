/* eslint-disable no-unused-vars */
import GridList2 from "../../components/buyCar/GridList2"
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useGetAllCarQuery } from "../../services/carAPI";
import { FiLoader } from 'react-icons/fi'; 
const BiddingMainPage = () => {
    
  const { data, error, isLoading } = useGetAllCarQuery()
  // console.log(data)

  const navigate = useNavigate();
 

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
      </div>
    );
  }

  // if (error?.status == 401) {
  //   Cookies.remove("token");
  //   navigate("/signin");
  // }
  return (
    <>
    <GridList2 data={data} />
      
    </>
  )
}

export default BiddingMainPage
