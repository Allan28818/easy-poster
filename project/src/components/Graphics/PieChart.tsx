import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface PieChartProps {
  colors: string[];
  series: number[];
  labels: string[];
}

function PieChart(props: PieChartProps) {
  const { colors, labels, series } = props;

  const state: any = {
    series,
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      colors,
      labels,

      stroke: {
        show: false,
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      legend: {
        position: "bottom",
        markers: {
          radius: 0,
        },
      },
    },
  };

  return (
    <ReactApexChart options={state.options} series={state.series} type="pie" />
  );
}

export default PieChart;
