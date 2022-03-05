import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import DatasetProps from "../../models/components/core.dataset";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  labels: string[];
  datasets: DatasetProps[];
}

function RadarChart(props: RadarChartProps) {
  const { labels, datasets } = props;

  const data = {
    labels,
    datasets,
  };

  return <Radar data={data} />;
}

export default RadarChart;
