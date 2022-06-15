import React from "react";

import BasicMessageProps from "../../models/components/BasicMessageProps";

import styles from "../../styles/components/messages-model.module.scss";
import {
  iconsOptions,
  stylesOptions,
} from "../../utils/MessagesModelConfiguration";

const BasicMessage = (props: BasicMessageProps) => {
  const { title, description, type, onConfirm, showMessage } = props;

  return (
    <>
      <div className={showMessage ? styles.backgroundElement : "hidden"}>
        <div className={styles.card}>
          {iconsOptions[type]}
          <h1 className={stylesOptions[type]}>{title}</h1>
          <p>{description}</p>
          <button onClick={onConfirm}>Ok</button>
        </div>
      </div>
    </>
  );
};

export default BasicMessage;
