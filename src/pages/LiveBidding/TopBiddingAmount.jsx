import { BsLightningFill } from "react-icons/bs";
import { RiInformationFill } from "react-icons/ri";
const TopBiddingAmount = () => {
    
    return(
        <>
             <div className="mt-4 md:-ml-2 -ml-3">
                <p className="flex text-[16px] line-clamp-1 text-black">
                    <span className="mr-1 md:-ml-1 mt-1"><BsLightningFill /></span>
                    Fair market value: ₹ 2,79,241
                    <span className="flex justify-between ml-auto mt-1"><RiInformationFill size={20} /></span>
                </p>
            </div>
        </>
    )
}

export default TopBiddingAmount;