import React from "react";
import Chart from "react-apexcharts";
import ChartDataProps from "../../models/components/ChartDataProps";

interface BarChartProps {
  title: string | undefined;
  xLabels: string[] | undefined;
  series: ChartDataProps[] | undefined;
  colors: string[] | undefined;
}

function BarChart(props: BarChartProps) {
  const chartData: any = {
    options: {
      chart: {
        height: 200,
        type: "bar",
        toolbar: {
          show: true,
          tools: {
            download: false,
          },
        },
      },
      colors: props.colors,
      title: {
        text: props.title,
        align: "left",
        style: {
          fontSize: "16px",
          color: "#666",
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      stroke: {
        show: true,
        width: 2,
        colors: props.colors,
      },
      xaxis: {
        categories: props.xLabels,
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return val;
          },
        },
      },
    },
    series: props.series,
  };

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height="275px"
      />
    </div>
  );
}

export default BarChart;
