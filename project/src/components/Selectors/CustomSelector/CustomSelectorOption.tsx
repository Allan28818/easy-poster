import { ReactNode } from "react";
import styles from "../../../styles/components/selectors/custom-selector.module.scss";

interface CustomSelectorOptionProps {
  children: ReactNode;
}

const CustomSelectorOption = (props: CustomSelectorOptionProps) => {
  const { children } = props;

  return <div className={styles.customSelectorOption}>{children}</div>;
};

export { CustomSelectorOption };
