import React from "react";

import ConfirmationPopUpProps from "../../models/components/PopUps/ConfirmationPopUpProps";

import styles from "../../styles/components/messages-model.module.scss";
import {
  iconsOptions,
  stylesOptions,
} from "../../utils/MessagesModelConfiguration";

const ConfirmationPopUp = (props: ConfirmationPopUpProps) => {
  const {
    onConfirm,
    setShowMessage,
    showMessage,
    title,
    type,
    description,
    buttonsText,
  } = props;
  async function handleConfirm() {
    // await onConfirm();
    console.log("hey there");
  }

  return (
    <div className={showMessage ? styles.backgroundElement : "hidden"}>
      <div className={styles.card}>
        {iconsOptions[type]}
        <h1 className={stylesOptions[type]}>{title}</h1>
        <p>{description}</p>
        <div className={styles.buttonsWrapper}>
          <button className={styles.deleteButton} onClick={handleConfirm}>
            {buttonsText.confirmation}
          </button>
          <button onClick={() => setShowMessage(false)}>
            {buttonsText.cancel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopUp;
