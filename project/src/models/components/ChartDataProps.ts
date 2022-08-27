interface ChartDataProps {
  name: string;
  data: number[];
}

export interface ChartUseStateStructure {
  graphicLabels?: string;
  graphicSeries?: string;
  graphicType?: string;
  graphicColors?: string[];
  chartTitle?: string;
  chartData?: ChartDataProps[];
}

export default ChartDataProps;
