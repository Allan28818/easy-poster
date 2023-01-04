import { Dispatch } from "react";

import { AiOutlineCloseCircle } from "react-icons/ai";

import styles from "../../styles/components/pop-ups/pop-up.module.scss";
import {
  ChartDataAction,
  ChartDataActionKind,
  ChartDataState,
} from "../../reducers/createAndEditAPost/chartDataReducer";

interface SelectSeriesAndLabelsProps {
  chartDataState: ChartDataState;
  dispatchChartData: Dispatch<ChartDataAction>;
}

const SelectSeriesAndLabels = (props: SelectSeriesAndLabelsProps) => {
  const { chartDataState, dispatchChartData } = props;

  return (
    <div className={styles.formWrapper}>
      <label htmlFor="name-input">Type your label name</label>
      <input
        name="name-input"
        type="text"
        onChange={(e: any) => {
          dispatchChartData({
            type: ChartDataActionKind.SET_NAME,
            chartName: e.target.value,
          });
        }}
        value={chartDataState.chartName}
        autoComplete="off"
      />

      <label htmlFor="series-input">Type the series for your label</label>
      <input
        type="text"
        name="series-input"
        onChange={(e: any) => {
          dispatchChartData({
            type: ChartDataActionKind.SET_SERIES,
            chartSeries: e.target.value,
          });
        }}
        value={chartDataState.chartSeries}
        autoComplete="off"
      />
      <div className={styles.seriesWrapper}>
        {chartDataState.chartDataSet.map((currentData, currentIndex) => {
          return (
            <div
              key={Math.floor(Math.random() * (10000 - 1)) + 1}
              className={styles.chartDataCard}
            >
              <span title={currentData.data.toString()}>
                {currentData.name}
              </span>
              <AiOutlineCloseCircle
                className={styles.closeSeriesCard}
                onClick={(e: any) => {
                  dispatchChartData({
                    type: ChartDataActionKind.SET_DATA_SET,
                    chartDataSet: chartDataState.chartDataSet.filter(
                      (_, dataIndex) => dataIndex !== currentIndex
                    ),
                  });
                }}
              />
            </div>
          );
        })}
      </div>

      <button
        className={styles.smallBtn}
        onClick={() => {
          const currentChartData = {
            name: chartDataState.chartName,
            data: chartDataState.chartSeries
              .split(", ")
              .map((serie) => parseInt(serie.trim())),
          };

          dispatchChartData({
            type: ChartDataActionKind.SET_DATA_SET,
            chartDataSet: [...chartDataState.chartDataSet, currentChartData],
          });
          dispatchChartData({
            type: ChartDataActionKind.SET_NAME,
            chartName: "",
          });
          dispatchChartData({
            type: ChartDataActionKind.SET_SERIES,
            chartSeries: "",
          });
        }}
      >
        Add Data
      </button>
    </div>
  );
};

export default SelectSeriesAndLabels;
