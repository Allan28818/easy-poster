import React from "react";

import ChartDataProps from "../../models/components/ChartDataProps";

import SelectColors from "./SelectColors";
import SelectSeriesAndLabels from "./SelectSeriesAndLabels";

import styles from "../../styles/components/pop-ups/pop-up.module.scss";

interface LineChartAddFormProps {
  graphicSeries: string;
  setGraphicSeries: React.Dispatch<React.SetStateAction<string>>;
  colorInput: string;
  setColorInput: React.Dispatch<React.SetStateAction<string>>;
  graphicColors: string[];
  setGraphicColors: React.Dispatch<React.SetStateAction<string[]>>;
  graphicLabels: string;
  setGraphicLabels: React.Dispatch<React.SetStateAction<string>>;
  nameInput: string;
  setNameInput: React.Dispatch<React.SetStateAction<string>>;
  seriesInput: string;
  setSeriesInput: React.Dispatch<React.SetStateAction<string>>;
  chartData: ChartDataProps[];
  setChartData: React.Dispatch<React.SetStateAction<ChartDataProps[]>>;
  handleAddGraphic: () => void;
}

const LineChartAddForm = (props: LineChartAddFormProps) => {
  const {
    graphicSeries,
    setGraphicSeries,
    colorInput,
    setColorInput,
    graphicColors,
    setGraphicColors,
    graphicLabels,
    setGraphicLabels,
    handleAddGraphic,
    nameInput,
    setNameInput,
    seriesInput,
    setSeriesInput,
    chartData,
    setChartData,
  } = props;

  return (
    <>
      <div className={styles.formWrapper}>
        <label htmlFor="labels">Type your graphic x labels</label>
        <input
          name="labels"
          placeholder="dogs, cats, birds..."
          onChange={(e: any) => setGraphicLabels(e.target.value)}
          value={graphicLabels}
          autoComplete="off"
        />
      </div>

      <SelectSeriesAndLabels
        nameInput={nameInput}
        setNameInput={setNameInput}
        seriesInput={seriesInput}
        setSeriesInput={setSeriesInput}
        chartData={chartData}
        setChartData={setChartData}
      />

      <SelectColors
        colorInput={colorInput}
        setColorInput={setColorInput}
        graphicColors={graphicColors}
        setGraphicColors={setGraphicColors}
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
