import React from "react";

import styles from "../../styles/components/buttons/switch-button.module.scss";

interface SwitchButtonProps {
  isSelected: boolean;
  setIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const SwitchButton = (props: SwitchButtonProps) => {
  const { isSelected, setIsSelected } = props;

  return (
    <div className={styles.buttonWrapper}>
      <label className={styles.switch}>
        <input
          type="checkbox"
          className={styles.switchInput}
          onChange={(e) => setIsSelected(e.target.checked)}
          checked={isSelected}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};

export default SwitchButton;
