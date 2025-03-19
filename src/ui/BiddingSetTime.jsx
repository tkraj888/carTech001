import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Corrected the import
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import {
  useCreateBiddingMutation,
  useStartBiddingSetTimeMutation,
} from "../services/biddingAPI";

dayjs.extend(utc);
dayjs.extend(timezone);
const TIME_ZONE = "Asia/Kolkata";

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function BiddingSetTime({ userid, biddingcarid }) {
  const token = Cookies.get("token");
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }
  const UserId = token ? jwtDecodes?.userId : null;

  const [open, setOpen] = useState(false);
  const [basePriceError, setBasePriceError] = useState("");
  const [durationMinutesError, setDurationMinutesError] = useState("");
  const [settime, setSettime] = useState({
    beadingCarId: "",
    userId: 0,
    basePrice: "",
    durationMinutes: "",
  });
  const [startBiddingSetTime] = useStartBiddingSetTimeMutation();
  const [createBidding] = useCreateBiddingMutation();

  const handleOpen = () => setOpen(!open);

  const handleDurationMinutesChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setSettime({
        ...settime,
        durationMinutes: e.target.value,
      });
    }
  };

  const handleBasePriceChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setSettime({
        ...settime,
        basePrice: e.target.value,
      });
    }
  };

  const formSubmit = async () => {
    try {
      let flag = 0;
      if (settime.basePrice === "") {
        flag = 1;
        setBasePriceError("Please enter base price");
      } else {
        setBasePriceError("");
      }
      if (settime.durationMinutes === "") {
        flag = 1;
        setDurationMinutesError("Please enter minutes");
      } else {
        setDurationMinutesError("");
      }
      if (flag === 0) {
        const setTimeData = {
          beadingCarId: biddingcarid,
          userId: UserId,
          basePrice: Number(settime.basePrice),
          durationMinutes: Number(settime.durationMinutes),
        };
        const res1 = await startBiddingSetTime(setTimeData);
        res1;
        // console.log(res1);
        const now = dayjs().tz(TIME_ZONE);
        const newTime = now.add(Number(settime.durationMinutes), "minutes");
        const formattedTime = newTime.format("YYYY-MM-DDTHH:mm:ss");
        // console.log("formattedTime", formattedTime);

        const createdAt = {
          bidCarId: 0,
          beadingCarId: biddingcarid,
          createdAt: formattedTime,
          basePrice: Number(settime.basePrice),
          userId: UserId,
        };

        const resCreatedAt = await createBidding(createdAt);
        resCreatedAt;
        // console.log(resCreatedAt);
        setOpen(!open);
      }
    } catch (error) {
      // console.log("Error", error);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient" color="indigo">
        Set Time
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Set Bidding Time</DialogHeader>
        <DialogBody>
          <div className="mt-5">
            <Input
              label="Base Price"
              value={settime.basePrice}
              onChange={handleBasePriceChange}
              type="text"
            />
          </div>
          <span className="text-red-500">{basePriceError}</span>
          <div className="mt-5">
            <Input
              label="Set time (minutes)"
              value={settime.durationMinutes}
              onChange={handleDurationMinutesChange}
              type="text"
              required
            />
          </div>
          <span className="text-red-500">{durationMinutesError}</span>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={formSubmit}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
