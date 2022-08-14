import { AiOutlineLoading3Quarters } from "react-icons/ai";

import styles from "../../styles/components/loaders/default-loader.module.scss";

const DefaultLoader = () => {
  return (
    <div className={styles.loadingWrapper}>
      <AiOutlineLoading3Quarters className={styles.loadingIcon} />
    </div>
  );
};

export default DefaultLoader;
