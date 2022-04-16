import React from "react";

import SelectColors from "./SelectColors";
import styles from "../../styles/components/pop-up.module.scss";

interface BasicChartAddFormProps {
  graphicSeries: string;
  setGraphicSeries: React.Dispatch<React.SetStateAction<string>>;
  colorInput: string;
  setColorInput: React.Dispatch<React.SetStateAction<string>>;
  graphicColors: string[];
  setGraphicColors: React.Dispatch<React.SetStateAction<string[]>>;
  graphicLabels: string;
  setGraphicLabels: React.Dispatch<React.SetStateAction<string>>;
  handleAddGraphic: () => void;
}

const BasicChartAddForm = (props: BasicChartAddFormProps) => {
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
  } = props;

  return (
    <>
      <div className={styles.formWrapper}>
        <label htmlFor="series">Type your series</label>
        <input
          name="series"
          placeholder="1, 2, 3, ..."
          onChange={(e: any) => setGraphicSeries(e.target.value)}
          value={graphicSeries}
          autoComplete="off"
        />
      </div>
      <SelectColors
        colorInput={colorInput}
        setColorInput={setColorInput}
        graphicColors={graphicColors}
        setGraphicColors={setGraphicColors}
      />
      <div className={styles.formWrapper}>
        <label htmlFor="labels">Type your graphic labels</label>
        <input
          name="labels"
          placeholder="dogs, cats, birds..."
          onChange={(e: any) => setGraphicLabels(e.target.value)}
          value={graphicLabels}
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
