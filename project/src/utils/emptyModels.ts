import { ImageDataProps } from "../models/components/ImageDataProps";
import { ChartUseStateStructure } from "../models/components/ChartDataProps";
import { LinkDataModel } from "../models/components/LinkDataModel";

const emptyImageModel: ImageDataProps = {
  srcText: "",
  altText: "",
};

const emptyChartModel: ChartUseStateStructure = {
  chartTitle: "",
  graphicColors: [],
  graphicLabels: "",
  graphicSeries: "",
  graphicType: "pie",
  chartData: [],
};

const emptyLinkModel: LinkDataModel = {
  linkSrc: "",
  linkText: "",
};

export { emptyImageModel, emptyChartModel, emptyLinkModel };
