
import { useParams } from "react-router-dom"
import { useGetDealerQuery } from "../../services/dealerAPI"
import {
  Card,
  CardHeader,
  CardBody
} from "@material-tailwind/react";

const TransactionByAccount = () => {
    const {id} = useParams()
    
    const {data,isLoading,isError,error} = useGetDealerQuery(id)
    data;
    isLoading;
    isError;
    error;
    // console.log(isLoading)
    // console.log(isError)
    // console.log(error)
    // console.log(data)

    // const {dealerDto:{transactionID,type,amount,closingbalance,status,lastupdateTime,accountID}={}} = data || {}
  return (
    <div className=" flex justify-center " >
      <div className="mt-5 ">

        <div>
          <p className="text-4xl font-semibold text-green-800">Transaction By Account</p>
        </div>

        <Card className="w-full max-w-[48rem] flex-row mt-10  shadow-md shadow-blue-gray-700">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none"
      >
        <img
          src="https://www.shutterstock.com/image-photo/smiling-friendly-car-seller-suit-600nw-2105619599.jpg"
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
      <table className="table w-full border-collapse border border-gray-200">
        <tbody>
          <tr>
            <th className="px-4 py-2 border border-gray-200 ">Transaction ID</th>
            <td className="px-4 py-2 border border-gray-200">101</td>
          </tr>
          <tr>
            <th className="px-4 py-2 border border-gray-200">Type</th>
            <td className="px-4 py-2 border border-gray-200">Saving</td>
          </tr>
          <tr>
            <th className="px-4 py-2 border border-gray-200">Amount</th>
            <td className="px-4 py-2 border border-gray-200">Bank Of India</td>
          </tr>
          <tr>
            <th className="px-4 py-2 border border-gray-200">Closing Balance</th>
            <td className="px-4 py-2 border border-gray-200">100000</td>
          </tr>
          <tr>
            <th className="px-4 py-2 border border-gray-200">Status</th>
            <td className="px-4 py-2 border border-gray-200">ON</td>
          </tr>
          <tr>
            <th className="px-4 py-2 border border-gray-200">Last Update Time</th>
            <td className="px-4 py-2 border border-gray-200">9.30AM</td>
          </tr>
          <tr>
            <th className="px-4 py-2 border border-gray-200">Account ID</th>
            <td className="px-4 py-2 border border-gray-200">102</td>
          </tr>
        </tbody>
      </table>
      </CardBody>
    </Card>
      </div>
    </div>
  )
}

export default TransactionByAccount
