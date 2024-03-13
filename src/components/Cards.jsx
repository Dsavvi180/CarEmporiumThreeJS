import { Card, Divider } from "@tremor/react";
import Iframe from "react-iframe";
import { BiJoystickButton } from "react-icons/bi";

export default function Cards() {
  return (
    <div className="flex flex-col justify-center align-middle z-10  mb-[60px] xs:mt-[100px] sm:mt-[200px] ov ">
      <h1 className="font-extralight text-3xl pb-3 border-b-[1px] mx-auto text-center border-b-[#c88921] xs:w-[250px] sm:w-[400px]">
        3D MODELS
      </h1>
      <div className="w-auto mx-auto grid xs:h-auto sm:h-auto md:flex flex-row flex-wrap justify-center px-8 gap-8 md:w-auto ">
        <a href={"MercedesG63"}>
          {" "}
          <Card
            className="shadow-xl h-[700px] mx-auto  bg-[#F9F6EE] hover:scale-105 duration-300 xs:w-[335px] xs:h-[755px] xs:mb-[10px] sm:w-[393px] my-[100px]"
            //   style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
          >
            <Divider className="mt-[-5px]">Preview</Divider>
            <Iframe
              url="/Mercedesg63"
              width="346px"
              height="320px"
              id=""
              className="xs:w-[292px] sm:w-[346px]"
              display="block"
              position="relative"
              overflow="hidden"
            />
            <Divider>Model</Divider>
            <div className="flex flex-row justify-between">
              <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                MERCEDES BENZ G63
              </p>

              <a href={"MercedesG63"}>
                {" "}
                <BiJoystickButton className="text-4xl my-auto mx-[5px]" />
              </a>
            </div>

            <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              $44,670
            </p>
            <Divider>Description</Divider>
            <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              tempor lorem non est congue blandit. Praesent non lorem sodales,
              suscipit est sed, hendrerit dolor.
            </p>
            <a href="MercedesG63">
              <div className="text-xs font-light mt-4 w-[69px] click-here">
                CLICK HERE
              </div>
            </a>
          </Card>
        </a>
        <a href={"BMWM6"}>
          <Card className=" shadow-xl mx-auto bg-[#F9F6EE] hover:scale-105 duration-300 xs:w-[335px] xs:my-[10px] xs:h-[755px] sm:sm:w-[393px] md:mt-[100px] xl:h-[745px] ">
            <Divider className="mt-[-5px]">Preview</Divider>
            <Iframe
              url="/BMWM6"
              width="346px"
              height="320px"
              id=""
              className="xs:w-[292px] sm:w-[346px]"
              display="block"
              position="relative"
              overflow="hidden"
            />
            <Divider>Model</Divider>

            <div className="flex flex-row justify-between">
              <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                BMW M5
              </p>
              <a href={"BMWM6"}>
                {" "}
                <BiJoystickButton className="text-4xl my-auto mx-[5px]" />
              </a>
            </div>
            <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              $34,743
            </p>
            <Divider>Description</Divider>
            <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              tempor lorem non est congue blandit. Praesent non lorem sodales,
              suscipit est sed, hendrerit dolor.
            </p>
            <a href="BMWM6">
              <div className="text-xs font-light mt-4 w-[69px] click-here sm:mt-4">
                CLICK HERE
              </div>
            </a>
          </Card>
        </a>
        <a href={"PorscheGT3"}>
          {" "}
          <Card
            className=" shadow-xl h-[700px] mx-auto bg-[#F9F6EE] hover:scale-105 duration-300 xs:w-[335px] xs:h-[755px] xs:my-[10px] sm:w-[393px] my-[100px] md:w-[775px] xl:w-[393px] xl:my-[100px]"
            //   style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
          >
            <Divider className="mt-[-5px]">Preview</Divider>
            <Iframe
              url="/PorscheGT3"
              width="346px"
              height="320px"
              id=""
              className="xs:w-[292px] sm:w-[346px] md:w-[720px] xl:w-[346px] mx-auto"
              display="block"
              position="relative"
              overflow="hidden"
            />
            <Divider>Model</Divider>

            <div className="flex flex-row justify-between">
              <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                PORSCHE GT3
              </p>
              <a href={"PorscheGT3"}>
                {" "}
                <BiJoystickButton className="text-4xl my-auto mx-[5px]" />
              </a>
            </div>
            <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              $54,450
            </p>
            <Divider>Description</Divider>
            <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              tempor lorem non est congue blandit. Praesent non lorem sodales,
              suscipit est sed, hendrerit dolor.
            </p>
            <a href="PorscheGT3">
              <div className="text-xs font-light mt-4 w-[69px] click-here">
                CLICK HERE
              </div>
            </a>
          </Card>
        </a>
      </div>
    </div>
  );
}
