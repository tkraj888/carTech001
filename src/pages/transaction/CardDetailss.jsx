import { useState } from "react";
import Inputs from "../../forms/Inputs";

function CardDetailss() {
    const [formData, setFormData] = useState({
     
      // fields
      status: "",
      panCard: "",
      openingBalance: "",
      lastUpdateTime: "",
      accountId: "",
    });
 
    const handleSubmit = async (event) => {
        event.preventDefault();
   
        const data = {
          panCard: formData.panCard,
   
          status: formData.status,
   
          openingBalance: formData.openingBalance,

          lastUpdateTime: formData.lastUpdateTime,

          accountId: formData.accountId,
         
        };
        data;
        // console.log(data)
}
 
return(
    <div className="flex justify-center mt-5">
         <form onSubmit={handleSubmit} className="w-[25rem] gap-4">
          <div className="space-y-5">
          <div className="flex justify-center">
            <p className="text-3xl font-semibold m-4">Transaction</p>
          </div>
    <Inputs
      label={"panCard"}
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
      label={"status"}
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
      label={"openingBalance"}
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
    <Inputs
      label={"accountId"}
      type={"number"}
      name={"accountId"}
      value={formData.accountId}
      onChange={(event) =>
        setFormData({
          ...formData,
          accountId: event.target.value,
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

export default CardDetailss;