import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ChartUseStateStructure } from "../../models/components/ChartDataProps";
import convertToRGB from "../../utils/convertToRGB";

import styles from "../../styles/components/pop-ups/pop-up.module.scss";

interface SelectColorsProps {
  chartDataStructure: ChartUseStateStructure;
  setChartDataStructure: React.Dispatch<
    React.SetStateAction<ChartUseStateStructure>
  >;
  colorInput: string;
  setColorInput: React.Dispatch<React.SetStateAction<string>>;
}

const SelectColors = (props: SelectColorsProps) => {
  const {
    colorInput,
    setColorInput,
    chartDataStructure,
    setChartDataStructure,
  } = props;

  return (
    <div className={styles.formWrapper}>
      <label htmlFor="colors">Type your graphic colors</label>
      <input
        name="colors"
        type={"color"}
        onChange={(e: any) => {
          const rgbaColor = convertToRGB(e.target.value);
          setColorInput(rgbaColor);
        }}
        className={styles.colorInput}
        autoComplete="off"
      />
      <div className={styles.colorsWrapper}>
        {chartDataStructure.graphicColors!.map((currentColor, currentIndex) => {
          return (
            <div
              key={Math.floor(Math.random() * (10000 - 1)) + 1}
              className={styles.colorCard}
              style={{ backgroundColor: currentColor }}
            >
              <AiOutlineCloseCircle
                className={styles.closeColorCard}
                onClick={(e: any) => {
                  setChartDataStructure((oldValues) => {
                    const filteredColors =
                      chartDataStructure.graphicColors!.filter(
                        (_, colorIndex) => colorIndex !== currentIndex
                      );

                    return { ...oldValues, graphicColors: filteredColors };
                  });
                }}
              />
            </div>
          );
        })}
      </div>

      <button
        className={styles.smallBtn}
        onClick={() =>
          setChartDataStructure((oldValues) => {
            const newGraphicColors = [...oldValues.graphicColors!, colorInput];

            return { ...oldValues, graphicColors: newGraphicColors };
          })
        }
      >
        Add Color
      </button>
    </div>
  );
};

export default SelectColors;
