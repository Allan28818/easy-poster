import { ReactNode } from "react";
import styles from "../../../styles/components/selectors/custom-selector.module.scss";

interface CustomSelectorRowProps {
  children: ReactNode;
}

const CustomSelectorRow = (props: CustomSelectorRowProps) => {
  const { children } = props;

  return <div className={styles.customSelectorRow}>{children}</div>;
};

export { CustomSelectorRow };
