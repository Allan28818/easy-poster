import React, { Dispatch } from "react";

import ChartDataProps, {
  ChartUseStateStructure,
} from "../../models/components/ChartDataProps";

import SelectColors from "./SelectColors";
import SelectSeriesAndLabels from "./SelectSeriesAndLabels";

import styles from "../../styles/components/pop-ups/pop-up.module.scss";
import {
  ChartDataAction,
  ChartDataActionKind,
  ChartDataState,
} from "../../reducers/createAndEditAPost/chartDataReducer";

interface LineChartAddFormProps {
  chartDataState: ChartDataState;
  dispatchChartData: Dispatch<ChartDataAction>;
  handleAddGraphic: () => void;
}

const LineChartAddForm = (props: LineChartAddFormProps) => {
  const { chartDataState, dispatchChartData, handleAddGraphic } = props;

  return (
    <>
      <div className={styles.formWrapper}>
        <label htmlFor="labels">Type your graphic x labels</label>
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

      <SelectSeriesAndLabels
        chartDataState={chartDataState}
        dispatchChartData={dispatchChartData}
      />

      <SelectColors
        chartDataState={chartDataState}
        dispatchChartData={dispatchChartData}
      />

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

export default LineChartAddForm;
