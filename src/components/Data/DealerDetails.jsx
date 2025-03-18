import { useGetDealerQuery } from "../../services/dealerAPI"

const {data,isLoading,isError,error} = useGetDealerQuery(id)
const {dealerDto:{firstName,lastName,mobileNo,shopName,area,email,city,address}={}} = data || {}

export const TABLE_HEAD = ["Name", "Job", "Employed", ""];
 
export const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];