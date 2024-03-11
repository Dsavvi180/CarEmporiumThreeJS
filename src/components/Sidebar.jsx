import React from "react";

import { useState, useEffect } from "react";
import { MdDashboardCustomize } from "react-icons/md";
import { SiMarketo } from "react-icons/si";
import { IoIosAnalytics } from "react-icons/io";
import { FaCar } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaCube } from "react-icons/fa6";
import { IoExitOutline } from "react-icons/io5";
import { IoMdAnalytics } from "react-icons/io";

const SIDEBAR_CATEGORIES = {
  DASHBOARD: {
    icon: (
      <MdDashboardCustomize
        style={{ fontSize: "30px", color: "#343434", fontWeight: "300" }}
      />
    ),
    title: "Dashboard",
  },
  MARKET_OVERVIEW: {
    icon: (
      <SiMarketo
        style={{ fontSize: "30px", color: "#343434", fontWeight: "300" }}
      />
    ),
    title: "Market Overview",
  },
  ANALYTICS: {
    icon: (
      <IoMdAnalytics
        style={{ fontSize: "30px", color: "#343434", fontWeight: "300" }}
      />
    ),
    title: "Analytics",
  },
  INDUSTRIES: {
    icon: (
      <FaCar
        style={{ fontSize: "30px", color: "#343434", fontWeight: "300" }}
      />
    ),
    title: "Industries",
  },
  SETTINGS: {
    icon: (
      <VscSettings
        style={{ fontSize: "30px", color: "#343434", fontWeight: "300" }}
      />
    ),
    title: "Setting",
  },
  NOTIFICATIONS: {
    icon: (
      <IoNotificationsCircleOutline
        style={{ fontSize: "30px", color: "#343434", fontWeight: "300" }}
      />
    ),
    title: "Notifications",
  },
};

function SideBar() {
  const [sidebar, setSidebar] = useState(false);
  const [unravel, setUnravel] = useState(true);
  const [inIframe, setInIframe] = useState(false);

  useEffect(() => {
    if (window.location !== window.parent.location) {
      setInIframe(true);
    }
  }, [window.onload]);

  function adjustSidebar() {
    setSidebar(!sidebar);
  }
  const [isHovered, setIsHovered] = useState(false);

  // Event handler for mouse enter
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Event handler for mouse leave
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      className={
        !inIframe
          ? unravel == true
            ? sidebar
              ? "w-[330px] h-[90vh] mx-[30px] my-[20px] p-[20px] bg-white  sidebar "
              : "w-[90px] h-[90vh] mx-[30px] my-[20px] p-[20px] bg-white sidebar  "
            : "w-[90px] h-[11%vh] mx-[30px] my-[20px] p-[20px] bg-white sidebar "
          : "hidden"
      }
    >
      <div className="relative">
        <div
          className={
            sidebar
              ? "flex flex-row pl-1 py-1 pr-[50px] gap-5 rounded-[12px] "
              : "flex flex-row pl-1 py-1  gap-5 rounded-[12px] "
          }
        >
          {/* <img width={45} src={cube} /> */}
          <button
            onClick={() => {
              setUnravel(!unravel);
              if (sidebar) {
                adjustSidebar();
              }
            }}
          >
            <FaCube style={{ fontSize: "43px", color: "#c88921" }} />
          </button>

          {sidebar ? (
            <button
              onClick={() => {
                adjustSidebar();
              }}
            >
              <h1 className="text-xl font-medium mt-auto ml-[5px]">
                CAR EMPORIUM
              </h1>
            </button>
          ) : null}
        </div>
        <button
          className="bg-[#c88921] p-2 rounded-[100%] absolute top-[-5px] right-[-30px]"
          onClick={() => {
            if (unravel === false) {
              setUnravel(true);
              adjustSidebar();
            } else {
              adjustSidebar();
            }
          }}
        >
          {sidebar ? (
            <IoIosArrowForward style={{ transform: "rotate(180deg)" }} />
          ) : (
            <IoIosArrowForward />
          )}
        </button>
      </div>
      {unravel ? (
        <div
          className="flex flex-col justify-between 3xsHeight:gap-[3.6vh] 2xsHeight:gap-[10vh] xsHeight:gap-[20vh] smHeight:gap-[27vh] mdHeight:gap-[33vh] lgHeight:gap-[38vh] sm:gap-[38vh] md:gap-[38vh] lg:gap-[38vh] xl:gap-[36vh] 2xl:gap-[38vh] "
          // style={{
          //   // position: "relative",
          //   display: "flex",
          //   flexDirection: "column",
          //   gap: "40vh",

          //   justifyContent: "space-between",
          // }}
        >
          <ul className={sidebar ? "pt-[20px] ml-[-6px]" : "pt-[20px]"}>
            {Object.keys(SIDEBAR_CATEGORIES).map((category, index) => (
              <li
                key={index}
                className={
                  sidebar
                    ? "px-[15px] py-[10px] text-l sidebar-categories flex flex-row items-center rounded-[12px]"
                    : "pl-[9px] py-[10px] text-l sidebar-categories flex flex-row items-center rounded-[12px]"
                }
              >
                {SIDEBAR_CATEGORIES[category].icon}
                {sidebar ? (
                  <h2 className="text-black font-light pl-[35px] my-auto">
                    {SIDEBAR_CATEGORIES[category].title}
                  </h2>
                ) : null}
              </li>
            ))}
          </ul>
          <button className=" ml-[7px]">
            <li className="text-l flex flex-row items-center rounded-[12px]">
              <CgProfile
                style={{
                  fontSize: "40px",
                  color: "#c88921",
                }}
              />
              {sidebar ? (
                <div className="flex flex-row gap-[35px] pl-[20px]">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "left",
                      margin: "auto",
                    }}
                  >
                    <h1 className="text-black font-medium text-lg ">
                      Damen Savvi
                    </h1>
                    <h3 style={{ color: "#c88921" }} className="text-xs">
                      dsavvasavvi18@gmail.com
                    </h3>
                  </div>
                  <a href={"/"}>
                    <IoExitOutline
                      style={{
                        fontSize: "30px",
                        marginRight: "3px",
                        color: "#343434",
                      }}
                    />
                  </a>
                </div>
              ) : null}
            </li>
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default SideBar;
