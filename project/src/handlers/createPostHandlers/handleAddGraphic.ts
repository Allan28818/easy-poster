import { v4 as uuid } from "uuid";
import ChartDataProps from "../../models/components/ChartDataProps";

import docElementsProp from "../../models/DocElementsProp";

interface handleAddGraphicProps {
  graphicLabels: string;
  graphicSeries: string;
  graphicType: string;
  graphicColors: string[];
  chartTitle: string;
  chartData: ChartDataProps[];
  docElements: docElementsProp[];
  setDocElements: React.Dispatch<React.SetStateAction<docElementsProp[]>>;
  setStepsPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  setGraphicColors: React.Dispatch<React.SetStateAction<string[]>>;
  setGraphicLabels: React.Dispatch<React.SetStateAction<string>>;
  setGraphicSeries: React.Dispatch<React.SetStateAction<string>>;
  setGraphicType: React.Dispatch<React.SetStateAction<string>>;
  setChartTitle: React.Dispatch<React.SetStateAction<string>>;
  setShowGraphicPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

function handleAddGraphic(props: handleAddGraphicProps) {
  const {
    chartData,
    chartTitle,
    docElements,
    graphicColors,
    graphicLabels,
    graphicSeries,
    graphicType,
    setChartTitle,
    setDocElements,
    setGraphicLabels,
    setGraphicSeries,
    setGraphicColors,
    setGraphicType,
    setShowGraphicPopUp,
    setStepsPopUp,
  } = props;

  const graphicLabelsArray = graphicLabels
    ?.split(",")
    .map((label) => label.trim());
  const graphicSeriesArray = graphicSeries
    .split(",")
    .map((serie) => parseInt(serie.trim()));

  const graphicToAdd: docElementsProp = {
    id: uuid(),
    elementName: graphicType,
    type: graphicType,
    colors: graphicColors,
    labels: graphicLabelsArray,
    series: graphicSeriesArray,
    chartTitle,
    chartData,
  };

  const docElementRef = Array.from(docElements);

  docElementRef.push(graphicToAdd);

  setDocElements(docElementRef);
  setStepsPopUp(true);
  setGraphicColors([]);
  setGraphicLabels("");
  setGraphicSeries("");
  setGraphicType("");
  setChartTitle("");
  setShowGraphicPopUp(false);
}

export { handleAddGraphic };
