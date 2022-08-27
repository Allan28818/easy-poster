import { v4 as uuid } from "uuid";
import ChartDataProps, {
  ChartUseStateStructure,
} from "../../models/components/ChartDataProps";

import docElementsProp from "../../models/DocElementsProp";
import { emptyChartModel } from "../../utils/emptyModels";

interface handleAddGraphicProps {
  chartDataStructure: ChartUseStateStructure;
  setChartDataStructure: React.Dispatch<
    React.SetStateAction<ChartUseStateStructure>
  >;
  chartData: ChartDataProps[];
  docElements: docElementsProp[];
  setDocElements: React.Dispatch<React.SetStateAction<docElementsProp[]>>;
  setStepsPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  setShowGraphicPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

function handleAddGraphic(props: handleAddGraphicProps) {
  const {
    chartDataStructure,
    chartData,
    docElements,
    setChartDataStructure,
    setDocElements,
    setShowGraphicPopUp,
    setStepsPopUp,
  } = props;

  const graphicLabelsArray = chartDataStructure.graphicLabels
    ?.split(",")
    .map((label) => label.trim());
  const graphicSeriesArray = chartDataStructure.graphicSeries
    ?.split(",")
    .map((serie) => parseInt(serie.trim()));

  const graphicToAdd: docElementsProp = {
    id: uuid(),
    elementName: chartDataStructure.graphicType || "",
    type: chartDataStructure.graphicType || "",
    colors: chartDataStructure.graphicColors || [],
    labels: graphicLabelsArray,
    series: graphicSeriesArray,
    chartTitle: chartDataStructure.chartTitle,
    chartData,
  };

  const docElementRef = Array.from(docElements);

  docElementRef.push(graphicToAdd);

  console.log("chartDataStructure", chartDataStructure);

  setDocElements(docElementRef);
  setStepsPopUp(true);

  setChartDataStructure(emptyChartModel);

  setShowGraphicPopUp(false);
}

export { handleAddGraphic };
