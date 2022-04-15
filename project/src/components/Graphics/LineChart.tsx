import React from "react";
import Chart from "react-apexcharts";
import ChartDataProps from "../../models/components/ChartDataProps";

interface LineChartProps {
  xLabels: string[] | undefined;
  series: ChartDataProps[] | undefined;
  colors: string[] | undefined;
}

function LineChart(props: LineChartProps) {
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
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
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
            return val + " funcionários";
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

export default LineChart;
