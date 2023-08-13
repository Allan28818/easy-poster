import { ReactNode } from "react";

import styles from "../../../styles/components/selectors/custom-selector.module.scss";

interface CustomSelectorRootProps {
  children: ReactNode;
}

const CustomSelectorRoot = (props: CustomSelectorRootProps) => {
  const { children } = props;

  return <div className={styles.selectorWrapper}>{children}</div>;
};

export { CustomSelectorRoot };
