import { useState } from "react";
import Inputs from "../../forms/Inputs";


export default function Wallet() {
    const [formData, setFormData] = useState({
     
      // fields
      panCard: "",
      status: "",
      openingBalance: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const data = {
          panCard: formData.panCard,
    
          status: formData.status,
    
          openingBalance: formData.openingBalance,
          
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
      label={"PanCard"}
      type={"text"}
      name={"panCard"}
      value={formData.panCard}
      onChange={(event) =>
        setFormData({
          ...formData,
          panCard: event.target.value,
        })
      }
    />
     <Inputs
      label={"Status"}
      type={"text"}
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
      label={"OpeningBalance"}
      type={"number"}
      name={"openingBalance"}
      value={formData.openingBalance}
      onChange={(event) =>
        setFormData({
          ...formData,
          openingBalance: event.target.value,
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