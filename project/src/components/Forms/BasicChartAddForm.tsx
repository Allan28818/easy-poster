import { Dispatch, SetStateAction } from "react";

import SelectColors from "./SelectColors";

import {
  ChartDataAction,
  ChartDataActionKind,
  ChartDataState,
} from "../../reducers/createAndEditAPost/chartDataReducer";
import styles from "../../styles/components/pop-ups/pop-up.module.scss";
import { handleChangeProps } from "../PopUps/CreateChartPopUp";

interface BasicChartAddFormProps {
  chartDataState: ChartDataState;
  dispatchChartData: Dispatch<ChartDataAction>;
  handleAddGraphic: () => void;
  invalidFields: string[];
  setInvalidFields: Dispatch<SetStateAction<string[]>>;
  handleInputChange: (props: handleChangeProps) => void;
}

const BasicChartAddForm = (props: BasicChartAddFormProps) => {
  const {
    chartDataState,
    dispatchChartData,
    handleAddGraphic,
    handleInputChange,
    invalidFields,
    setInvalidFields,
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
        invalidFieldsList.push("series");
        setInvalidFields(invalidFieldsList);
      }

      return;
    }

    return handleAddGraphic();
  }

  return (
    <>
      <div className={styles.formWrapper}>
        <label htmlFor="series">Type your series</label>
        <input
          name="series"
          placeholder="1, 2, 3, ..."
          onChange={(e: any) => {
            const dispatch = () =>
              dispatchChartData({
                type: ChartDataActionKind.SET_FINAL_CHART_MODEL,
                chartFinalFormat: {
                  ...chartDataState.chartFinalFormat,
                  graphicSeries: e.target.value,
                },
              });

            handleInputChange({
              callBackDispatch: dispatch,
              currentFieldName: "series",
            });
          }}
          value={chartDataState.chartFinalFormat.graphicSeries || ""}
          autoComplete="off"
          className={
            invalidFields.includes("series") ? styles.invalidInput : ""
          }
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
          className={
            invalidFields.includes("labels") ? styles.invalidInput : ""
          }
        />
      </div>

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

export default BasicChartAddForm;
