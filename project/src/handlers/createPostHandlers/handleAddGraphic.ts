import { Dispatch } from "react";
import { v4 as uuid } from "uuid";
import ChartDataProps, {
  ChartUseStateStructure,
} from "../../models/components/ChartDataProps";

import docElementsProp from "../../models/DocElementsProp";
import {
  VisualBooleanAction,
  VisualBooleanActionKind,
} from "../../reducers/createAndEditAPost/visualBooleanReducer";
import { emptyChartModel } from "../../utils/emptyModels";

interface handleAddGraphicProps {
  chartDataStructure: ChartUseStateStructure;
  setChartDataStructure: React.Dispatch<
    React.SetStateAction<ChartUseStateStructure>
  >;
  chartData: ChartDataProps[];
  docElements: docElementsProp[];
  setDocElements: React.Dispatch<React.SetStateAction<docElementsProp[]>>;
  dispatchBooleanVisibility: Dispatch<VisualBooleanAction>;
}

function handleAddGraphic(props: handleAddGraphicProps) {
  const {
    chartDataStructure,
    chartData,
    docElements,
    setChartDataStructure,
    setDocElements,
    dispatchBooleanVisibility,
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

  setDocElements(docElementRef);

  setChartDataStructure(emptyChartModel);

  dispatchBooleanVisibility({
    type: VisualBooleanActionKind.GRAPHIC_POP_UP,
    isGraphicPopUpVisible: false,
  });
  dispatchBooleanVisibility({
    type: VisualBooleanActionKind.GRAPHIC_STEPS_POP_UP,
    isFirstGraphicStep: true,
  });
}

export { handleAddGraphic };
