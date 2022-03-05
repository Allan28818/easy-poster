import React from "react";
import BarChart from "../components/Graphics/BarChart";
import DoughtnutChart from "../components/Graphics/DoughnutChart";
import LineChart from "../components/Graphics/LineChart";
import PieChart from "../components/Graphics/PieChart";
import RadarChart from "../components/Graphics/RadarChart";
import DatasetProps from "../models/components/core.dataset";

interface HandleSelectGraphicProps {
  type: string;
  title?: string;
  datasets?: DatasetProps[];
  backgroundColors?: string[];
  dataValues: number[];
  labels: string[];
}

function HandleSelectGraphic(props: HandleSelectGraphicProps) {
  const { type, title, datasets, labels, backgroundColors, dataValues } = props;
  const chartsModel: any = {
    pie: (
      <PieChart
        backgroundColors={backgroundColors ? backgroundColors : []}
        borderColors={backgroundColors ? backgroundColors : []}
        dataValues={dataValues}
        labels={labels}
      />
    ),
    doughnut: (
      <DoughtnutChart
        backgroundColors={backgroundColors ? backgroundColors : []}
        borderColors={backgroundColors ? backgroundColors : []}
        dataValues={dataValues}
        labels={labels}
      />
    ),
    bar: (
      <BarChart
        datasets={datasets ? datasets : []}
        labels={labels}
        title={title}
      />
    ),
    line: (
      <LineChart
        datasets={datasets ? datasets : []}
        labels={labels}
        title={title}
      />
    ),
    radar: <RadarChart datasets={datasets ? datasets : []} labels={labels} />,
  };

  return chartsModel[type];
}

export default HandleSelectGraphic;
