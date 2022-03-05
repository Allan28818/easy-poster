import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import DatasetProps from "../../models/components/core.dataset";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  title?: string;
  labels: string[];
  datasets: DatasetProps[];
}

function LineChart(props: LineChartProps) {
  const { title, labels, datasets } = props;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: !!title,
        text: title,
      },
    },
  };

  const data = {
    labels,
    datasets,
  };

  return <Line options={options} data={data} />;
}

export default LineChart;
