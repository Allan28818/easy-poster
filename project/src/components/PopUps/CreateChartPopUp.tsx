import React, { Dispatch } from "react";

import { GrFormClose } from "react-icons/gr";
import ChartDataProps, {
  ChartUseStateStructure,
} from "../../models/components/ChartDataProps";

import BasicChartAddForm from "../Forms/BasicChartAddForm";
import LineChartAddForm from "../Forms/LineChartAddForm";

import styles from "../../styles/components/pop-ups/pop-up.module.scss";
import {
  VisualBooleanAction,
  VisualBooleanActionKind,
  VisualBooleanState,
} from "../../reducers/createAndEditAPost/visualBooleanReducer";
import {
  ChartDataAction,
  ChartDataActionKind,
  ChartDataState,
} from "../../reducers/createAndEditAPost/chartDataReducer";

interface CreateChartPopUpProps {
  booleanVisibilityState: VisualBooleanState;
  dispatchBooleanVisibility: Dispatch<VisualBooleanAction>;
  handleAddGraphic: () => void;
  chartDataState: ChartDataState;
  dispatchChartData: Dispatch<ChartDataAction>;
}

const CreateChartPopUp = (props: CreateChartPopUpProps) => {
  const {
    booleanVisibilityState,
    dispatchBooleanVisibility,
    chartDataState,
    dispatchChartData,
    handleAddGraphic,
  } = props;

  const lineTemplateCharts = ["line", "bar", "radar"];

  return (
    <div
      className={
        booleanVisibilityState.isGraphicPopUpVisible
          ? styles.graphicPopUp
          : "hidden"
      }
    >
      <GrFormClose
        className={styles.close}
        onClick={() =>
          dispatchBooleanVisibility({
            type: VisualBooleanActionKind.GRAPHIC_POP_UP,
            isGraphicPopUpVisible: false,
          })
        }
      />
      <div className={styles.card}>
        <h1>Type your graphic informations</h1>

        {booleanVisibilityState.isFirstGraphicStep ? (
          <>
            <div className={styles.formWrapper}>
              <label htmlFor="title">Type your title (optional)</label>
              <input
                name="title"
                placeholder="This is my graphic"
                onChange={(e: any) => {
                  dispatchChartData({
                    type: ChartDataActionKind.SET_FINAL_CHART_MODEL,
                    chartFinalFormat: {
                      ...chartDataState.chartFinalFormat,
                      chartTitle: e.target.value,
                    },
                  });
                }}
                value={chartDataState.chartFinalFormat.chartTitle || ""}
                autoComplete="off"
              />
            </div>

            <div className={styles.formWrapper}>
              <label htmlFor="graphicType">Select your graphic type</label>
              <select
                name="graphicType"
                onChange={(e: any) =>
                  dispatchChartData({
                    type: ChartDataActionKind.SET_FINAL_CHART_MODEL,
                    chartFinalFormat: {
                      ...chartDataState.chartFinalFormat,
                      graphicType: e.target.value,
                    },
                  })
                }
              >
                <option value="pie">Pie</option>
                <option value="donut">Donut</option>
                <option value="bar">Bar</option>
                <option value="line">Line</option>
                <option value="radar">Radar</option>
              </select>
            </div>
            <button
              onClick={() =>
                dispatchBooleanVisibility({
                  type: VisualBooleanActionKind.GRAPHIC_STEPS_POP_UP,
                })
              }
            >
              Next
            </button>
          </>
        ) : (
          <>
            {lineTemplateCharts.includes(
              chartDataState.chartFinalFormat.graphicType!
            ) ? (
              <LineChartAddForm
                chartDataState={chartDataState}
                dispatchChartData={dispatchChartData}
                handleAddGraphic={handleAddGraphic}
              />
            ) : (
              <BasicChartAddForm
                chartDataState={chartDataState}
                dispatchChartData={dispatchChartData}
                handleAddGraphic={handleAddGraphic}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CreateChartPopUp;
