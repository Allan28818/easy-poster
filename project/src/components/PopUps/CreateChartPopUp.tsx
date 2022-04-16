import React from "react";

import { GrFormClose } from "react-icons/gr";
import ChartDataProps from "../../models/components/ChartDataProps";

import BasicChartAddForm from "../Forms/BasicChartAddForm";
import LineChartAddForm from "../Forms/LineChartAddForm";

import styles from "../../styles/components/pop-up.module.scss";

interface CreateChartPopUpProps {
  showGraphicPopUp: boolean;
  setShowGraphicPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  stepsPopUp: boolean;
  setStepsPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  chartTitle: string;
  setChartTitle: React.Dispatch<React.SetStateAction<string>>;
  graphicType: string;
  setGraphicType: React.Dispatch<React.SetStateAction<string>>;
  graphicSeries: string;
  setGraphicSeries: React.Dispatch<React.SetStateAction<string>>;
  graphicColors: string[];
  setGraphicColors: React.Dispatch<React.SetStateAction<string[]>>;
  colorInput: string;
  setColorInput: React.Dispatch<React.SetStateAction<string>>;
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

const CreateChartPopUp = (props: CreateChartPopUpProps) => {
  const {
    showGraphicPopUp,
    setShowGraphicPopUp,
    stepsPopUp,
    setStepsPopUp,
    chartTitle,
    setChartTitle,
    graphicType,
    setGraphicType,
    graphicSeries,
    setGraphicSeries,
    graphicColors,
    setGraphicColors,
    colorInput,
    setColorInput,
    graphicLabels,
    setGraphicLabels,
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
    <div className={showGraphicPopUp ? styles.graphicPopUp : "hidden"}>
      <GrFormClose
        className={styles.close}
        onClick={() => setShowGraphicPopUp(false)}
      />
      <div className={styles.card}>
        <h1>Type your graphic informations</h1>

        {stepsPopUp ? (
          <>
            <div className={styles.formWrapper}>
              <label htmlFor="title">Type your title (optional)</label>
              <input
                name="title"
                placeholder="This is my graphic"
                onChange={(e: any) => setChartTitle(e.target.value)}
                value={chartTitle}
                autoComplete="off"
              />
            </div>

            <div className={styles.formWrapper}>
              <label htmlFor="graphicType">Select your graphic type</label>
              <select
                name="graphicType"
                onChange={(e: any) => setGraphicType(e.target.value)}
              >
                <option value="pie">Pie</option>
                <option value="donut">Donut</option>
                <option value="bar">Bar</option>
                <option value="line">Line</option>
                <option value="radar">Radar</option>
              </select>
            </div>
            <button onClick={() => setStepsPopUp(false)}>Next</button>
          </>
        ) : (
          <>
            {lineTemplateCharts.includes(graphicType) ? (
              <LineChartAddForm
                colorInput={colorInput}
                setColorInput={setColorInput}
                graphicColors={graphicColors}
                setGraphicColors={setGraphicColors}
                graphicLabels={graphicLabels}
                setGraphicLabels={setGraphicLabels}
                graphicSeries={graphicSeries}
                setGraphicSeries={setGraphicSeries}
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
                colorInput={colorInput}
                setColorInput={setColorInput}
                graphicColors={graphicColors}
                setGraphicColors={setGraphicColors}
                graphicLabels={graphicLabels}
                setGraphicLabels={setGraphicLabels}
                graphicSeries={graphicSeries}
                setGraphicSeries={setGraphicSeries}
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
