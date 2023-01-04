import React, { Dispatch } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ChartUseStateStructure } from "../../models/components/ChartDataProps";
import convertToRGB from "../../utils/convertToRGB";

import styles from "../../styles/components/pop-ups/pop-up.module.scss";
import {
  ChartDataAction,
  ChartDataActionKind,
  ChartDataState,
} from "../../reducers/createAndEditAPost/chartDataReducer";

interface SelectColorsProps {
  chartDataState: ChartDataState;
  dispatchChartData: Dispatch<ChartDataAction>;
}

const SelectColors = (props: SelectColorsProps) => {
  const { chartDataState, dispatchChartData } = props;

  return (
    <div className={styles.formWrapper}>
      <label htmlFor="colors">Type your graphic colors</label>
      <input
        name="colors"
        type={"color"}
        onChange={(e: any) => {
          const rgbaColor = convertToRGB(e.target.value);

          dispatchChartData({
            type: ChartDataActionKind.SET_COLOR,
            chartCurrentColor: rgbaColor,
          });
        }}
        className={styles.colorInput}
        autoComplete="off"
      />
      <div className={styles.colorsWrapper}>
        {chartDataState.chartFinalFormat.graphicColors!.map(
          (currentColor, currentIndex) => {
            return (
              <div
                key={Math.floor(Math.random() * (10000 - 1)) + 1}
                className={styles.colorCard}
                style={{ backgroundColor: currentColor }}
              >
                <AiOutlineCloseCircle
                  className={styles.closeColorCard}
                  onClick={(e: any) => {
                    const filteredColors =
                      chartDataState.chartFinalFormat.graphicColors!.filter(
                        (_, colorIndex) => colorIndex !== currentIndex
                      );
                    dispatchChartData({
                      type: ChartDataActionKind.SET_FINAL_CHART_MODEL,
                      chartFinalFormat: {
                        ...chartDataState.chartFinalFormat,
                        graphicColors: filteredColors,
                      },
                    });
                  }}
                />
              </div>
            );
          }
        )}
      </div>

      <button
        className={styles.smallBtn}
        onClick={() => {
          {
            const newGraphicColors = [
              ...chartDataState.chartFinalFormat.graphicColors!,
              chartDataState.chartCurrentColor,
            ];

            dispatchChartData({
              type: ChartDataActionKind.SET_FINAL_CHART_MODEL,
              chartFinalFormat: {
                ...chartDataState.chartFinalFormat,
                graphicColors: newGraphicColors,
              },
            });
          }
        }}
      >
        Add Color
      </button>
    </div>
  );
};

export default SelectColors;
