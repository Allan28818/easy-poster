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

interface CreateChartPopUpProps {
  chartDataStructure: ChartUseStateStructure;
  setChartDataStructure: React.Dispatch<
    React.SetStateAction<ChartUseStateStructure>
  >;
  booleanVisibilityState: VisualBooleanState;
  dispatchBooleanVisibility: Dispatch<VisualBooleanAction>;
  colorInput: string;
  setColorInput: React.Dispatch<React.SetStateAction<string>>;
  nameInput: string;
  setNameInput: React.Dispatch<React.SetStateAction<string>>;
  seriesInput: string;
  setSeriesInput: React.Dispatch<React.SetStateAction<string>>;
  chartData: ChartDataProps[];
  setChartData: React.Dispatch<React.SetStateAction<ChartDataProps[]>>;
  handleAddGraphic: () => void;
}

const CreateChartPopUp = (props: CreateChartPopUpProps) => {
  const {
    chartDataStructure,
    setChartDataStructure,
    booleanVisibilityState,
    dispatchBooleanVisibility,
    colorInput,
    setColorInput,
    nameInput,
    setNameInput,
    seriesInput,
    setSeriesInput,
    chartData,
    setChartData,
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
                  setChartDataStructure((oldValues) => {
                    return { ...oldValues, chartTitle: e.target.value };
                  });
                }}
                value={chartDataStructure.chartTitle || ""}
                autoComplete="off"
              />
            </div>

            <div className={styles.formWrapper}>
              <label htmlFor="graphicType">Select your graphic type</label>
              <select
                name="graphicType"
                onChange={(e: any) =>
                  setChartDataStructure((oldValues) => {
                    return { ...oldValues, graphicType: e.target.value };
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
            {lineTemplateCharts.includes(chartDataStructure.graphicType!) ? (
              <LineChartAddForm
                chartDataStructure={chartDataStructure}
                setChartDataStructure={setChartDataStructure}
                colorInput={colorInput}
                setColorInput={setColorInput}
                nameInput={nameInput}
                setNameInput={setNameInput}
                seriesInput={seriesInput}
                setSeriesInput={setSeriesInput}
                chartData={chartData}
                setChartData={setChartData}
                handleAddGraphic={handleAddGraphic}
              />
            ) : (
              <BasicChartAddForm
                chartDataStructure={chartDataStructure}
                setChartDataStructure={setChartDataStructure}
                colorInput={colorInput}
                setColorInput={setColorInput}
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
