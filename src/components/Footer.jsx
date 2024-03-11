import React from "react";
import { ImLinkedin } from "react-icons/im";

import { FaGithubSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

function Footer() {
  return (
    <div className="flex flex-col justify-start text-start h-[450px] bg-black text-white gap-[5] p-[90px]">
      <div className="flex flex-col justify-start  ">
        <h1 className="font-medium text-3xl  ">DamenSavvi.</h1>
        <p className="font-extralight  ">Web3 Innovator</p>
      </div>
      <div className="text-4xl font-light py-7 flex flex-row gap-4 justify-start">
        <FaSquareInstagram className="text-[37px]" />
        <ImLinkedin className="text-[32px] mt-[2px]" />
        <FaGithubSquare />
      </div>
      <div className="flex flex-row justify-between text-sm font-extralight ">
        <ul className="flex flex-col gap-3">
          <h2 className="font-light text-xl pb-2 ">Solutions</h2>
          <li>Analytics</li>
          <li>Marketing</li>
          <li>Commerce</li>
          <li>Insights</li>
        </ul>
        <ul className="flex flex-col gap-3">
          {" "}
          <h2 className="font-light text-xl pb-2 ">Support</h2>
          <li>Pricing</li>
          <li>Supporting</li>
          <li>Guides</li>
          <li>API Status</li>
        </ul>
        <ul className="flex flex-col gap-3">
          {" "}
          <h2 className="font-light text-xl pb-2 ">Company</h2>
          <li>About</li>
          <li>Blogs</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
