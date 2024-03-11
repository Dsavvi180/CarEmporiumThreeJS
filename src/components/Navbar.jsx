import React from "react";
import { useState, useEffect } from "react";
import { GoSearch } from "react-icons/go";
import { PiChatsFill } from "react-icons/pi";
import { MdOutlineMenu } from "react-icons/md";
import "../index.css";
import logo3 from "../images/logo3.png";

function Navbar() {
  //   const [offsetX, setOffsetX] = useState(0);
  //   const [widgetTop, setWidgetTop] = useState(0);
  //   const SCROLL_HEIGHT_PERCENT =
  //     (document.body.scrollHeight / window.scrollY) * 100;
  //   const handleScroll = () => {
  //     setOffsetX(window.scrollY);
  //     // Calculate the distance from the top of the screen
  //     setWidgetTop(2 + (widgetTop + SCROLL_HEIGHT_PERCENT)); // Adjust multiplier as needed
  //   };

  //   useEffect(() => {
  //     window.addEventListener("scroll", handleScroll);
  //     console.log(window.scrollY);

  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }, []);

  return (
    <div className="w-screen absolute h-[95px] flex flex-row justify-between font-extralight text-l bg-[#181818] text-white xs:px-[17px] sm:px-[35px]">
      <div className="xs:ml-[-25px] sm:flex flex-row pl-[20px] gap-[35px]">
        {" "}
        <img
          width="140px"
          style={{ rotate: "5deg", position: "fixed", zIndex: "99" }}
          className="h-[140px] mt-[-23px]"
          src={logo3}
        />
        <ul className="xs:hidden sm:hidden md:flex flex-row gap-4 my-auto ml-[40%] ">
          {/* <li className="pl-[25px] pr-[40px]">
          <img width="140px" src={logo2} />
        </li> */}
          <li className="nav-button my-auto">MODELS</li>
          <li className="nav-button my-auto">BEYOND</li>
          <li className="nav-button my-auto">OWNERSHIP</li>
          <li className="nav-button my-auto">MOTORSPORT</li>
        </ul>
      </div>

      <ul className=" flex flex-row gap-4 my-auto">
        <li className="xs:hidden md:hidden xl:flex nav-button  ">
          NFT DEVELOPMENT
        </li>
        <li className="xs:hidden md:hidden xl:flex nav-button  ">COLLECTION</li>
        <li className="xs:hidden md:hidden xl:flex nav-button  ">
          MARKETPLACE
        </li>
        <div className="flex flex-row m-auto gap-5 pl-[25px] font-thin text-3xl">
          <PiChatsFill />
          <GoSearch />
          <MdOutlineMenu />
        </div>
      </ul>
    </div>
  );
}

export default Navbar;
