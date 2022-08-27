import React from "react";

import ChartDataProps, {
  ChartUseStateStructure,
} from "../../models/components/ChartDataProps";

import SelectColors from "./SelectColors";
import SelectSeriesAndLabels from "./SelectSeriesAndLabels";

import styles from "../../styles/components/pop-ups/pop-up.module.scss";

interface LineChartAddFormProps {
  chartDataStructure: ChartUseStateStructure;
  setChartDataStructure: React.Dispatch<
    React.SetStateAction<ChartUseStateStructure>
  >;
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

const LineChartAddForm = (props: LineChartAddFormProps) => {
  const {
    chartDataStructure,
    setChartDataStructure,
    colorInput,
    setColorInput,
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
          onChange={(e: any) =>
            setChartDataStructure((oldValues) => {
              return { ...oldValues, graphicLabels: e.target.value };
            })
          }
          value={chartDataStructure.graphicLabels || ""}
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
        chartDataStructure={chartDataStructure}
        setChartDataStructure={setChartDataStructure}
        colorInput={colorInput}
        setColorInput={setColorInput}
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
