import { Dispatch, SetStateAction, useState } from "react";
import styles from "../../styles/components/menu/select-section-menu.module.scss";

interface SelectSectionMenuProps {
  sectionsText: string[];
  setSelectedIndexTab: Dispatch<SetStateAction<number>>;
  selectedIndexTab: number;
}

const SelectSectionMenu = (props: SelectSectionMenuProps) => {
  const { sectionsText, selectedIndexTab, setSelectedIndexTab } = props;

  const columnWidth = 100 / sectionsText.length;
  const gridTemplateColumnsString = (columnWidth.toString() + "% ").repeat(
    sectionsText.length
  );

  return (
    <div className={styles.container}>
      <div
        className={styles.selectorsWrapper}
        style={{
          display: "grid",
          gridTemplateColumns: gridTemplateColumnsString,
        }}
      >
        {sectionsText.map((currentSection, index) => (
          <div
            key={`${currentSection} - ${index}`}
            className={styles.selector}
            style={{ gridColumnStart: index + 1 }}
            onClick={() => setSelectedIndexTab(index + 1)}
          >
            <h4 className={styles.selectorText}>{currentSection}</h4>
          </div>
        ))}
        <div
          className={styles.indicator}
          style={{ gridColumnStart: selectedIndexTab }}
        />
      </div>
    </div>
  );
};

export { SelectSectionMenu };
