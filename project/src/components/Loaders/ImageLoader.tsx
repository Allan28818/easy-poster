import { FaImage } from "react-icons/fa";

import styles from "../../styles/components/loaders/image-loader.module.scss";

const ImageLoader = () => {
  return (
    <div className={styles.imageLoaderWrapper}>
      <FaImage className={styles.loaderIcon} />
    </div>
  );
};

export default ImageLoader;
