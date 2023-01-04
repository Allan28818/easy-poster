import ChartDataProps, {
  ChartUseStateStructure,
} from "../../models/components/ChartDataProps";

enum ChartDataActionKind {
  SET_NAME = "SET_NAME",
  SET_COLOR = "SET_COLOR",
  SET_SERIES = "SET_SERIES",
  SET_DATA_SET = "SET_DATA_SET",
  SET_FINAL_CHART_MODEL = "SET_FINAL_CHART_MODEL",
}

export interface ChartDataAction {
  type: ChartDataActionKind;
  chartName?: string;
  chartCurrentColor?: string;
  chartSeries?: string;
  chartDataSet?: ChartDataProps[];
  chartFinalFormat?: ChartUseStateStructure;
}

export interface ChartDataState {
  chartName: string;
  chartCurrentColor: string;
  chartSeries: string;
  chartDataSet: ChartDataProps[];
  chartFinalFormat: ChartUseStateStructure;
}

const initialChartData: ChartDataState = {
  chartName: "",
  chartCurrentColor: "",
  chartSeries: "",
  chartDataSet: [],
  chartFinalFormat: {
    chartTitle: "",
    graphicColors: [],
    chartData: [],
    graphicLabels: "",
    graphicSeries: "",
    graphicType: "",
  },
};

function chartDataReducer(
  state: ChartDataState,
  action: ChartDataAction
): ChartDataState {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        chartName: action.chartName || "",
      };
    case "SET_COLOR":
      return {
        ...state,
        chartCurrentColor: action.chartCurrentColor!,
      };
    case "SET_SERIES":
      return {
        ...state,
        chartSeries: action.chartSeries!,
      };
    case "SET_DATA_SET":
      return {
        ...state,
        chartDataSet: action.chartDataSet!,
      };
    case "SET_FINAL_CHART_MODEL":
      return {
        ...state,
        chartFinalFormat: action.chartFinalFormat!,
      };
    default:
      return state;
  }
}

export { chartDataReducer, initialChartData, ChartDataActionKind };
