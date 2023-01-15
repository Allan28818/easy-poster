import React, { Dispatch, SetStateAction, useState } from "react";

import SelectColors from "./SelectColors";
import SelectSeriesAndLabels from "./SelectSeriesAndLabels";

import styles from "../../styles/components/pop-ups/pop-up.module.scss";
import {
  ChartDataAction,
  ChartDataActionKind,
  ChartDataState,
} from "../../reducers/createAndEditAPost/chartDataReducer";
import { handleChangeProps } from "../PopUps/CreateChartPopUp";

interface LineChartAddFormProps {
  chartDataState: ChartDataState;
  dispatchChartData: Dispatch<ChartDataAction>;
  handleAddGraphic: () => void;
  invalidFields: string[];
  setInvalidFields: Dispatch<SetStateAction<string[]>>;
  handleInputChange: (props: handleChangeProps) => void;
}

const LineChartAddForm = (props: LineChartAddFormProps) => {
  const {
    chartDataState,
    dispatchChartData,
    handleAddGraphic,
    invalidFields,
    setInvalidFields,
    handleInputChange,
  } = props;

  function checkIsAbleToAdd() {
    const containsEmptyField =
      !chartDataState.chartFinalFormat.graphicLabels ||
      !chartDataState.chartSeries ||
      !chartDataState.chartName;

    const invalidFieldsList = [...invalidFields];

    if (containsEmptyField) {
      if (!chartDataState.chartFinalFormat.graphicLabels) {
        invalidFieldsList.push("labels");
        setInvalidFields(invalidFieldsList);
      }
      if (!chartDataState.chartSeries) {
        invalidFieldsList.push("series-input");
        setInvalidFields(invalidFieldsList);
      }
      if (!chartDataState.chartName) {
        invalidFieldsList.push("name-input");
        setInvalidFields(invalidFieldsList);
      }

      return;
    }

    return handleAddGraphic();
  }

  return (
    <>
      <div className={styles.formWrapper}>
        <label htmlFor="labels">Type your graphic x labels</label>
        <input
          name="labels"
          placeholder="dogs, cats, birds..."
          className={
            invalidFields.includes("labels") ? styles.invalidInput : ""
          }
          onChange={(e: any) => {
            const dispatch = () =>
              dispatchChartData({
                type: ChartDataActionKind.SET_FINAL_CHART_MODEL,
                chartFinalFormat: {
                  ...chartDataState.chartFinalFormat,
                  graphicLabels: e.target.value,
                },
              });

            handleInputChange({
              callBackDispatch: dispatch,
              currentFieldName: "labels",
            });
          }}
          value={chartDataState.chartFinalFormat.graphicLabels || ""}
          autoComplete="off"
        />
      </div>

      <SelectSeriesAndLabels
        chartDataState={chartDataState}
        dispatchChartData={dispatchChartData}
        handleInputChange={handleInputChange}
        invalidFields={invalidFields}
      />

      <SelectColors
        chartDataState={chartDataState}
        dispatchChartData={dispatchChartData}
      />

      <button
        type="submit"
        onClick={() => {
          checkIsAbleToAdd();
        }}
      >
        Create
      </button>
    </>
  );
};

export default LineChartAddForm;
