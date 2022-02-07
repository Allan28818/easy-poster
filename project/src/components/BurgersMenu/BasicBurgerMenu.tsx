import React from "react";

import styles from "../../styles/components/basic-burger-menu.module.scss";

interface BasicBurgerMenuProps {
  onClickFunction: () => void;
}

const BasicBurgerMenu = (props: BasicBurgerMenuProps) => {
  const { onClickFunction } = props;
  return (
    <div className={styles.burgerWrapper} onClick={onClickFunction}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default BasicBurgerMenu;
