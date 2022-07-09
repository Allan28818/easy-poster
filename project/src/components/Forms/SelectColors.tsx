import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import convertToRGB from "../../services/convertToRGB";

import styles from "../../styles/components/pop-ups/pop-up.module.scss";

interface SelectColorsProps {
  colorInput: string;
  setColorInput: React.Dispatch<React.SetStateAction<string>>;
  graphicColors: string[];
  setGraphicColors: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectColors = (props: SelectColorsProps) => {
  const { colorInput, setColorInput, graphicColors, setGraphicColors } = props;

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
        {graphicColors.map((currentColor, currentIndex) => {
          return (
            <div
              key={Math.floor(Math.random() * (10000 - 1)) + 1}
              className={styles.colorCard}
              style={{ backgroundColor: currentColor }}
            >
              <AiOutlineCloseCircle
                className={styles.closeColorCard}
                onClick={(e: any) => {
                  setGraphicColors(
                    graphicColors.filter(
                      (_, colorIndex) => colorIndex !== currentIndex
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
        onClick={() =>
          setGraphicColors((oldValues) => [...oldValues, colorInput])
        }
      >
        Add Color
      </button>
    </div>
  );
};

export default SelectColors;
