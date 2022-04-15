import React from "react";
import ReactApexChart from "react-apexcharts";

interface PieChartProps {
  series: number[] | undefined;
  colors: string[] | undefined;
  labels: string[] | undefined;
}

function Piechart(props: PieChartProps) {
  const chartData: any = {
    series: props.series,
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      colors: props.colors,
      labels: props.labels,

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
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type="pie"
      height={300}
    />
  );
}
export default Piechart;
