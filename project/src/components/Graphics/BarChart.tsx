import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import DatasetProps from "../../models/components/core.dataset";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  title?: string;
  labels: string[];
  datasets: DatasetProps[];
}

function BarChart(props: BarChartProps) {
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

  return <Bar options={options} data={data} />;
}

export default BarChart;
