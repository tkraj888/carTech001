import bmw from "/carslogo/bmw.png";
import honda from "/carslogo/honda.png";
import kia from "/carslogo/kia.png";
import mahindra from "/carslogo/mahindra.png";
import mercedes from "/carslogo/mercedes.png";
import suzuki from "/carslogo/suzuki.png";
import tata from "/carslogo/tata (1).png";
import volkswagen from "/carslogo/volkswagen.png";
import volvo from "/carslogo/volvo.png";
import Marquee from "react-fast-marquee";
const BrandList = () => {
  return (
    <div className="container mx-auto">
      <ul>
        <Marquee className="-mt-5 md:mt-8"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
           // marginTop: "2rem",
          }}
          autoFill
        >
          <li style={{ margin: "0 25px" }}>
            {" "}
            <img alt="bmw" src={bmw} className="w-[4rem] md:w-[5rem]" />
          </li>
          <li style={{ margin: "0 25px" }}>
            {" "}
            <img alt="honda" src={honda} className="w-[4rem] md:w-[5rem]" />
          </li>
          <li style={{ margin: "0 25px" }}>
            {" "}
            <img alt="kia" src={kia} className="w-[4rem] md:w-[5rem]" />
          </li>
          <li style={{ margin: "0 25px" }}>
            {" "}
            <img alt="mahindra" src={mahindra} className="w-[4rem] md:w-[5rem]" />
          </li>
          <li style={{ margin: "0 25px" }}>
            {" "}
            <img alt="mercedes" src={mercedes} className="w-[4rem] md:w-[5rem]" />
          </li>
          <li style={{ margin: "0 25px" }}>
            {" "}
            <img alt="suzuki" src={suzuki} className="w-[4rem] md:w-[5rem]" />
          </li>
          <li style={{ margin: "0 25px" }}>
            {" "}
            <img alt="tata" src={tata} className="w-[4rem] md:w-[5rem]" />
          </li>
          <li style={{ margin: "0 25px" }}>
            {" "}
            <img alt="volkswagen" src={volkswagen} className="w-[4rem] md:w-[5rem]" />
          </li>
          <li style={{ margin: "0 25px" }}>
            {" "}
            <img alt="volvo" src={volvo} className="w-[4rem] md:w-[5rem]" />
          </li>
        </Marquee>
      </ul>
    </div>
  );
};

export default BrandList;
