import { Dispatch } from "react";

import SelectColors from "./SelectColors";

import {
  ChartDataAction,
  ChartDataActionKind,
  ChartDataState,
} from "../../reducers/createAndEditAPost/chartDataReducer";
import styles from "../../styles/components/pop-ups/pop-up.module.scss";

interface BasicChartAddFormProps {
  chartDataState: ChartDataState;
  dispatchChartData: Dispatch<ChartDataAction>;
  handleAddGraphic: () => void;
}

const BasicChartAddForm = (props: BasicChartAddFormProps) => {
  const { chartDataState, dispatchChartData, handleAddGraphic } = props;

  return (
    <>
      <div className={styles.formWrapper}>
        <label htmlFor="series">Type your series</label>
        <input
          name="series"
          placeholder="1, 2, 3, ..."
          onChange={(e: any) =>
            dispatchChartData({
              type: ChartDataActionKind.SET_FINAL_CHART_MODEL,
              chartFinalFormat: {
                ...chartDataState.chartFinalFormat,
                graphicSeries: e.target.value,
              },
            })
          }
          value={chartDataState.chartFinalFormat.graphicSeries || ""}
          autoComplete="off"
        />
      </div>
      <SelectColors
        chartDataState={chartDataState}
        dispatchChartData={dispatchChartData}
      />
      <div className={styles.formWrapper}>
        <label htmlFor="labels">Type your graphic labels</label>
        <input
          name="labels"
          placeholder="dogs, cats, birds..."
          onChange={(e: any) =>
            dispatchChartData({
              type: ChartDataActionKind.SET_FINAL_CHART_MODEL,
              chartFinalFormat: {
                ...chartDataState.chartFinalFormat,
                graphicLabels: e.target.value,
              },
            })
          }
          value={chartDataState.chartFinalFormat.graphicLabels || ""}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        onClick={() => {
          handleAddGraphic();
        }}
      >
        Create
      </button>
    </>
  );
};

export default BasicChartAddForm;
