import React from "react";

interface DoughnutProps {
  paletteColors: string | undefined;
  caption: string | undefined;
  subCaption?: string | undefined;
  numberPrefix?: string | undefined;
  defaultCenterLabel?: string | undefined;
  series: string[] | undefined;
  labels: string[] | undefined;
}

const Doughnut = (props: DoughnutProps) => {
  const {
    paletteColors,
    caption,
    subCaption,
    numberPrefix,
    defaultCenterLabel,
    series,
    labels,
  } = props;
  const dataSource = {
    chart: {
      caption,
      subCaption: !!subCaption ? subCaption : "",
      theme: "froala",
      paletteColors,
      numberPrefix: !!numberPrefix ? numberPrefix : "",
      defaultCenterLabel,
      centerlabel: "$label<br>$value",
      doughnutRadius: "60%",
    },
    data: series?.map((serie, index) => {
      return {
        label: !!labels ? labels[index] : [],
        value: serie,
      };
    }),
  };

  const chartConfigs = {
    type: "doughnut",
    width: 600,
    height: 400,
    dataFormat: "json",
    dataSource: dataSource,
  };

  const FroalaCharts = require("froalacharts");
  const FroalaTheme = require("froalacharts/themes/froalacharts.theme.froala.js");
  const { default: ReactFC } = require("react-froalacharts");

  ReactFC.fcRoot(FroalaCharts, FroalaTheme);

  return <ReactFC {...chartConfigs} />;
};

export default Doughnut;
