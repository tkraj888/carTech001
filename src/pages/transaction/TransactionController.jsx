import { useState } from "react";
import Inputs from "../../forms/Inputs";


export default function TransactionController() {
    const [formData, setFormData] = useState({
     
      // fields
      type: "",
      amount: "",
      closingBalance: "",
      status:"",
      lastUpdateTime:""
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const data = {
            type: formData.type,
    
            amount: formData.amount,
    
            closingBalance: formData.closingBalance,

            status: formData.status,

            lastUpdateTime: formData.lastUpdateTime,
          
        };
        data;
        // console.log(data);
}

return(
    <div className="flex justify-center ">
         <form onSubmit={handleSubmit} className="w-[25rem]">
          
          <div className="mt-5 space-y-5">
          <p className="text-2xl font-semibold m-4">Wallet</p>
    <Inputs
      label={"type"}
      type={"text"}
      name={"type"}
      value={formData.type}
      onChange={(event) =>
        setFormData({
          ...formData,
          type: event.target.value,
        })
      }
    />
     <Inputs
      label={"amount"}
      type={"text"}
      name={"amount"}
      value={formData.amount}
      onChange={(event) =>
        setFormData({
          ...formData,
          amount: event.target.value,
        })
      }
    />
     <Inputs
      label={"closingBalance"}
      type={"number"}
      name={"closingBalance"}
      value={formData.closingBalance}
      onChange={(event) =>
        setFormData({
          ...formData,
          closingBalance: event.target.value,
        })
      }
    />

<Inputs
      label={"status"}
      type={"number"}
      name={"status"}
      value={formData.status}
      onChange={(event) =>
        setFormData({
          ...formData,
          status: event.target.value,
        })
      }
    />

<Inputs
      label={"lastUpdateTime"}
      type={"number"}
      name={"lastUpdateTime"}
      value={formData.lastUpdateTime}
      onChange={(event) =>
        setFormData({
          ...formData,
          lastUpdateTime: event.target.value,
        })
      }
    />
      <button
            type="submit"
            className="p-3 bg-indigo-400 rounded-md w-28 text-white"
            value="Add  Car"
          >
            {" "}
            Submit
          </button>
    </div>
    </form>
  </div>

)
}