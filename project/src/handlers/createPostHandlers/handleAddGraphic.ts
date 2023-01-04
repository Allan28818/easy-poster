import { Dispatch } from "react";
import { v4 as uuid } from "uuid";
import ChartDataProps, {
  ChartUseStateStructure,
} from "../../models/components/ChartDataProps";

import docElementsProp from "../../models/DocElementsProp";
import {
  ChartDataAction,
  ChartDataActionKind,
  ChartDataState,
} from "../../reducers/createAndEditAPost/chartDataReducer";
import {
  VisualBooleanAction,
  VisualBooleanActionKind,
} from "../../reducers/createAndEditAPost/visualBooleanReducer";
import { emptyChartModel } from "../../utils/emptyModels";

interface handleAddGraphicProps {
  // chartDataStructure: ChartUseStateStructure;
  // setChartDataStructure: React.Dispatch<
  //   React.SetStateAction<ChartUseStateStructure>
  // >;
  // chartData: ChartDataProps[];
  docElements: docElementsProp[];
  chartDataState: ChartDataState;
  dispatchChartData: Dispatch<ChartDataAction>;
  setDocElements: React.Dispatch<React.SetStateAction<docElementsProp[]>>;
  dispatchBooleanVisibility: Dispatch<VisualBooleanAction>;
}

function handleAddGraphic(props: handleAddGraphicProps) {
  const {
    chartDataState,
    dispatchChartData,
    docElements,
    setDocElements,
    dispatchBooleanVisibility,
  } = props;

  const graphicLabelsArray = chartDataState.chartFinalFormat.graphicLabels
    ?.split(",")
    .map((label) => label.trim());

  const graphicSeriesArray = chartDataState.chartFinalFormat.graphicSeries
    ?.split(",")
    .map((serie) => parseInt(serie.trim()));

  const graphicToAdd: docElementsProp = {
    id: uuid(),
    elementName: chartDataState.chartFinalFormat.graphicType || "",
    type: chartDataState.chartFinalFormat.graphicType || "",
    colors: chartDataState.chartFinalFormat.graphicColors || [],
    labels: graphicLabelsArray,
    series: graphicSeriesArray,
    chartTitle: chartDataState.chartFinalFormat.chartTitle,
    chartData: chartDataState.chartDataSet,
  };

  const docElementRef = Array.from(docElements);

  docElementRef.push(graphicToAdd);

  setDocElements(docElementRef);

  dispatchChartData({
    type: ChartDataActionKind.SET_FINAL_CHART_MODEL,
    chartFinalFormat: emptyChartModel,
  });

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
