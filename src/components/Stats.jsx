import { Card, SparkAreaChart } from "@tremor/react";

const chartdata = [
  {
    month: "Jan 21",
    Performance: 4000,
  },
  {
    month: "Feb 21",
    Performance: 3000,
  },
  {
    month: "Mar 21",
    Performance: 2000,
  },
  {
    month: "Apr 21",
    Performance: 2780,
  },
  {
    month: "May 21",
    Performance: 1890,
  },
  {
    month: "Jun 21",
    Performance: 2390,
  },
  {
    month: "Jul 21",
    Performance: 3490,
  },
];

export default function Stats() {
  return (
    <Card className="flex max-w-xs items-center justify-between gap-2 px-4 py-3.5  ">
      <div className="flex items-center space-x-2.5">
        <p className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-light">
          APPL
        </p>
        {/* <span className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Apple Inc.
        </span> */}
      </div>
      <SparkAreaChart
        data={chartdata}
        categories={["Performance"]}
        index={"month"}
        colors={["yellow"]}
        className="h-8 w-20 sm:h-10 sm:w-36"
      />
      <div className="flex items-center space-x-2.5">
        <span className="font-light text-tremor-content-strong dark:text-dark-tremor-content-strong">
          179.26
        </span>
        <span className="rounded bg-[#c88921] px-2 py-1 text-tremor-default font-light text-white">
          +1.72%
        </span>
      </div>
    </Card>
  );
}
