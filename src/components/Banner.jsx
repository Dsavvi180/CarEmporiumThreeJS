import React, { useEffect, useState } from "react";

import bannerImage from "../images/banner.jpg"; // Your image path here
import widget from "../images/logo3.png";
import { Title } from "@tremor/react";

const Banner = () => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.scrollY);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-[75vh] relative ">
      <img
        src={bannerImage}
        alt="Banner"
        className="parallax-background"
        style={{
          transform: `translateY(-${offsetY * -0.3}px)`, // Adjust the multiplier as needed
        }}
      />
      <div
        style={{
          transform: `translateX(${offsetY * 1}px)`, // Adjust the multiplier as needed
        }}
        className="parallax-title "
      >
        {" "}
        <div className="flex flex-col gap-3 text-center ">
          {" "}
          <h1 className="font-extralight text-3xl">EMBRACE E-VOLUTION.</h1>
          <h2 className="font-extralight text-xl">Where Web3 Meets Luxury.</h2>
        </div>
      </div>

      {/* <img src={bannerImage} /> */}
    </div>
  );
};

export default Banner;
