import React from "react";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJs.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  labels: string[];
  backgroundColors: string[];
  borderColors: string[];
  dataValues: number[];
}

function DoughtnutChart(props: DoughnutChartProps) {
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

  return <Doughnut data={data} />;
}

export default DoughtnutChart;
