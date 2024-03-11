import { Card, Divider } from "@tremor/react";
import Iframe from "react-iframe";

export default function Cards() {
  return (
    <div className="flex flex-col justify-center align-middle z-10 mt-[200px]">
      <h1 className="font-extralight text-3xl border-b-[1px] pb-3 w-[400px] mx-auto text-center border-b-[#c88921] text-yellow">
        3D MODELS
      </h1>
      <div className="max-w-[1240px] max-h-[1250px] mx-auto grid md:grid-cols-3 gap-8">
        <a href={"MercedesG63"}>
          {" "}
          <Card
            className="shadow-xl h-[700px] mx-auto max-w-lg my-[100px] bg-[#F9F6EE] hover:scale-105 duration-300"
            //   style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
          >
            <Divider className="mt-[-5px]">Preview</Divider>
            <Iframe
              url="/Mercedesg63"
              width="346px"
              height="320px"
              id=""
              className=""
              display="block"
              position="relative"
              overflow="hidden"
            />
            <Divider>Model</Divider>
            <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              BMW M6 GT3 2018
            </p>
            <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              $34,743
            </p>
            <Divider>Description</Divider>
            <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              tempor lorem non est congue blandit. Praesent non lorem sodales,
              suscipit est sed, hendrerit dolor.
            </p>
          </Card>
        </a>
        <a href={"BMWM6"}>
          <Card
            className=" shadow-xl h-[715px] mx-auto max-w-lg  my-[100px] bg-[#F9F6EE] hover:scale-105 duration-300 "
            //   style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
          >
            <Divider className="mt-[-5px]">Preview</Divider>
            <Iframe
              url="/BMWM6"
              width="346px"
              height="320px"
              id=""
              className=""
              display="block"
              position="relative"
              overflow="hidden"
            />
            <Divider>Model</Divider>
            <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              BMW M5
            </p>
            <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              $34,743
            </p>
            <Divider>Description</Divider>
            <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              tempor lorem non est congue blandit. Praesent non lorem sodales,
              suscipit est sed, hendrerit dolor.
            </p>
          </Card>
        </a>
        <a href={"PorscheGT3"}>
          {" "}
          <Card
            className=" shadow-xl h-[700px] mx-auto max-w-lg my-[100px] bg-[#F9F6EE] hover:scale-105 duration-300"
            //   style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
          >
            <Divider className="mt-[-5px]">Preview</Divider>
            <Iframe
              url="/PorscheGT3"
              width="346px"
              height="320px"
              id=""
              className=""
              display="block"
              position="relative"
              overflow="hidden"
            />
            <Divider>Model</Divider>
            <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              BMW M5
            </p>
            <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              $34,743
            </p>
            <Divider>Description</Divider>
            <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              tempor lorem non est congue blandit. Praesent non lorem sodales,
              suscipit est sed, hendrerit dolor.
            </p>
          </Card>
        </a>
      </div>
    </div>
  );
}
