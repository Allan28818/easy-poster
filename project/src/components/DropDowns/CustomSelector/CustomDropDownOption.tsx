import { ReactNode, useContext, useEffect, useRef } from "react";
import styles from "../../../styles/components/selectors/custom-selector.module.scss";
import { DropDownContext } from "./CustomDropDownRoot";

interface CustomDropDownOptionProps {
  children: ReactNode;
}

const CustomDropDownOption = (props: CustomDropDownOptionProps) => {
  const { children } = props;

  const ref = useRef<HTMLButtonElement>(null);

  const dropDownContext = useContext(DropDownContext);

  if (dropDownContext === null) {
    throw new Error("CustomDropDownOption must be used within a DropDown");
  }

  const { registerItem } = dropDownContext;

  useEffect(() => {
    if (ref && ref.current) {
      registerItem(ref);
    }
  }, [ref, registerItem]);

  return <button className={styles.customDropDownOption}>{children}</button>;
};

export { CustomDropDownOption };
