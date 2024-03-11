import React from "react";
import { NavLink } from "react-router-dom";

import "../index.css";

// <!-- component -->
export default function Navbar() {
  return (
    <div className="sticky top-0 z-10 flex flex-row justify-between mx-11 navbar bg-black">
      <header className="my-auto text-xl text-black nav-button-logo">
        Car Emporium
      </header>
      {/* <img width="95px" src={logo} className="my-auto" /> */}

      <ul className="flex flex-row gap-[20px] my-auto">
        <li>
          <button className="nav-button">Home</button>
        </li>
        <li>
          <button className="nav-button">About</button>
        </li>
        <li>
          <button className="nav-button">Contact</button>
        </li>
      </ul>
    </div>
  );
}
