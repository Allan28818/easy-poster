import React from "react";
import ReactApexChart from "react-apexcharts";
import ChartDataProps from "../../models/components/ChartDataProps";

interface LineChartProps {
  title: string | undefined;
  xLabels: string[] | undefined;
  series: ChartDataProps[] | undefined;
  colors: string[] | undefined;
}

function LineChart(props: LineChartProps) {
  const chartData: any = {
    series: props.series,
    options: {
      chart: {
        height: 350,
        type: "line",
        toolbar: false,
      },
      colors: props.colors,
      forecastDataPoints: {
        count: 7,
      },
      stroke: {
        width: 5,
        curve: "smooth",
      },
      xaxis: {
        categories: props.xLabels,
      },
      title: {
        text: props.title,
        align: "left",
        style: {
          fontSize: "16px",
          color: "#666",
        },
      },
      fill: {
        opacity: 1,
      },
      yaxis: {
        min: -10,
        max: 40,
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
}

export default LineChart;
