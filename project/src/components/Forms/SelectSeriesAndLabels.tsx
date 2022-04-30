import React from "react";
import ChartDataProps from "../../models/components/ChartDataProps";

import { AiOutlineCloseCircle } from "react-icons/ai";

import styles from "../../styles/components/pop-up.module.scss";

interface SelectSeriesAndLabelsProps {
  nameInput: string;
  setNameInput: React.Dispatch<React.SetStateAction<string>>;
  seriesInput: string;
  setSeriesInput: React.Dispatch<React.SetStateAction<string>>;
  chartData: ChartDataProps[];
  setChartData: React.Dispatch<React.SetStateAction<ChartDataProps[]>>;
}

const SelectSeriesAndLabels = (props: SelectSeriesAndLabelsProps) => {
  const {
    nameInput,
    setNameInput,
    seriesInput,
    setSeriesInput,
    chartData,
    setChartData,
  } = props;

  return (
    <div className={styles.formWrapper}>
      <label htmlFor="name-input">Type your label name</label>
      <input
        name="name-input"
        type="text"
        onChange={(e: any) => {
          setNameInput(e.target.value);
        }}
        value={nameInput}
        autoComplete="off"
      />

      <label htmlFor="series-input">Type the series for your label</label>
      <input
        type="text"
        name="series-input"
        onChange={(e: any) => {
          setSeriesInput(e.target.value);
        }}
        value={seriesInput}
        autoComplete="off"
      />
      <div className={styles.seriesWrapper}>
        {chartData.map((currentData, currentIndex) => {
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
                  setChartData(
                    chartData.filter(
                      (_, dataIndex) => dataIndex !== currentIndex
                    )
                  );
                }}
              />
            </div>
          );
        })}
      </div>

      <button
        className={styles.smallBtn}
        onClick={() => {
          setChartData((oldValues) => {
            const currentData = {
              name: nameInput,
              data: seriesInput
                .split(", ")
                .map((serie) => parseInt(serie.trim())),
            };

            return [...oldValues, currentData];
          });
          setNameInput("");
          setSeriesInput("");
        }}
      >
        Add Data
      </button>
    </div>
  );
};

export default SelectSeriesAndLabels;
