import React from "react";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJs.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  labels: string[];
  backgroundColors: string[];
  borderColors: string[];
  dataValues: number[];
}

function PieChart(props: PieChartProps) {
  const { backgroundColors, borderColors, labels, dataValues } = props;

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
}

export default PieChart;
