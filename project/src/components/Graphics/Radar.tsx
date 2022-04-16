import React from "react";
import ReactApexChart from "react-apexcharts";
import ChartDataProps from "../../models/components/ChartDataProps";

interface LineChartProps {
  title: string | undefined;
  xLabels: string[] | undefined;
  series: ChartDataProps[] | undefined;
  colors: string[] | undefined;
}

function Radar(props: LineChartProps) {
  const chartData: any = {
    options: {
      chart: {
        height: 350,
        type: "radar",
      },
      colors: props.colors,
      labels: props.xLabels,
      title: {
        text: props.title,
        align: "left",
        style: {
          fontSize: "16px",
          color: "#666",
        },
      },
    },
    series: props.series,
  };

  return (
    <div>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="radar"
        height="350px"
      />
    </div>
  );
}

export default Radar;
