import React from "react";

import { FcOk, FcCancel, FcInfo, FcMediumPriority } from "react-icons/fc";
import BasicMessageProps from "../../models/components/BasicMessageProps";

import styles from "../../styles/components/basic-message.module.scss";

const BasicMessage = (props: BasicMessageProps) => {
  const iconsOptions = {
    success: <FcOk className={styles.icon} />,
    warning: <FcMediumPriority className={styles.icon} />,
    error: <FcCancel className={styles.icon} />,
    info: <FcInfo className={styles.icon} />,
  };

  const stylesOptions = {
    success: styles.success,
    warning: styles.warning,
    error: styles.error,
    info: styles.info,
  };
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
