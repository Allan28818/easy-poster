import ChartDataProps from "./components/ChartDataProps";

interface docElementsProp {
  id: string;
  elementName: string;
  src?: string;
  alt?: string;
  textContent?: string;
  colors?: string[];
  labels?: string[];
  series?: number[];
  type: string;
  chartTitle?: string;
  graphicPrefix?: string;
  chartData?: ChartDataProps[];
  externalContent?: boolean;
}

export default docElementsProp;
