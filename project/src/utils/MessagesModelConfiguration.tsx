import {
  FcOk,
  FcCancel,
  FcInfo,
  FcMediumPriority,
  FcFullTrash,
} from "react-icons/fc";

import styles from "../styles/components/messages-model.module.scss";

const iconsOptions = {
  success: <FcOk className={styles.icon} />,
  warning: <FcMediumPriority className={styles.icon} />,
  error: <FcCancel className={styles.icon} />,
  info: <FcInfo className={styles.icon} />,
  delete: <FcFullTrash className={styles.icon} />,
};

const stylesOptions = {
  success: styles.success,
  warning: styles.warning,
  error: styles.error,
  info: styles.info,
};

export { iconsOptions, stylesOptions };
