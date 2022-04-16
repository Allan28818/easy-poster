import React from "react";
import ReactApexChart from "react-apexcharts";

interface DonutProps {
  labels: string[];
  colors: string[];
  series: number;
}

function Donut(props: any) {
  const chartData: any = {
    options: {
      chart: {
        height: 250,
        type: "donut",
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        show: true,
      },
      colors: props.colors,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      labels: props.labels,
    },
    series: props.series,
  };

  return (
    <div>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        height="250px"
      />
    </div>
  );
}

export default Donut;
