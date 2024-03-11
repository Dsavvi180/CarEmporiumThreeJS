import React from "react";
import Stats from "./Stats";
import { Card } from "@tremor/react";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";

function StatsCard() {
  const [open, setOpen] = useState(false);
  const adjustStats = () => {
    setOpen(!open);
  };
  return (
    <Card
      decoration="top"
      decorationColor="amber"
      className={
        open
          ? "stats-card w-[300px] mt-[25px] absolute z-[50] flex flex-col gap-4 sm:ml-[57%] md:ml-[68%] lg:ml-[75%] xl:ml-[77%] 2xl:ml-[81%]"
          : "stats-card h-[20px] w-[300px] mt-[25px] absolute z-[50] flex flex-col gap-4 sm:ml-[57%] md:ml-[68%] lg:ml-[75%] xl:ml-[77%] 2xl:ml-[81%]"
      }
    >
      <div className="flex flex-direction justify-between mt-[-4%] ">
        <h1 className="text-xl font-medium">Statistics</h1>
        <button
          onClick={() => {
            adjustStats();
          }}
        >
          <IoIosArrowForward
            className="font-light"
            style={{ rotate: "90deg", alignSelf: "center" }}
          />
        </button>
      </div>
      {open ? (
        <ul className="flex flex-col gap-2">
          {" "}
          <Stats />
          <Stats />
          <Stats />
          <Stats />
        </ul>
      ) : null}
    </Card>
  );
}

export default StatsCard;
