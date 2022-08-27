import React from "react";

import SelectColors from "./SelectColors";

import styles from "../../styles/components/pop-ups/pop-up.module.scss";
import { ChartUseStateStructure } from "../../models/components/ChartDataProps";

interface BasicChartAddFormProps {
  chartDataStructure: ChartUseStateStructure;
  setChartDataStructure: React.Dispatch<
    React.SetStateAction<ChartUseStateStructure>
  >;
  colorInput: string;
  setColorInput: React.Dispatch<React.SetStateAction<string>>;
  handleAddGraphic: () => void;
}

const BasicChartAddForm = (props: BasicChartAddFormProps) => {
  const {
    chartDataStructure,
    setChartDataStructure,
    colorInput,
    setColorInput,
    handleAddGraphic,
  } = props;

  return (
    <>
      <div className={styles.formWrapper}>
        <label htmlFor="series">Type your series</label>
        <input
          name="series"
          placeholder="1, 2, 3, ..."
          onChange={(e: any) =>
            setChartDataStructure((oldValues) => {
              return { ...oldValues, graphicSeries: e.target.value };
            })
          }
          value={chartDataStructure.graphicSeries || ""}
          autoComplete="off"
        />
      </div>
      <SelectColors
        chartDataStructure={chartDataStructure}
        setChartDataStructure={setChartDataStructure}
        colorInput={colorInput}
        setColorInput={setColorInput}
      />
      <div className={styles.formWrapper}>
        <label htmlFor="labels">Type your graphic labels</label>
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

export default BasicChartAddForm;
