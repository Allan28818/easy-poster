import React from "react";

import styles from "../../styles/components/basic-burger-menu.module.scss";

interface BasicBurgerMenuProps {
  onClickFunction: () => void;
  position: "start" | "end";
}

const BasicBurgerMenu = (props: BasicBurgerMenuProps) => {
  const { onClickFunction, position } = props;
  return (
    <div
      className={`${styles.burgerWrapper} ${
        position === "end" ? styles.end : styles.start
      }`}
      onClick={onClickFunction}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default BasicBurgerMenu;
