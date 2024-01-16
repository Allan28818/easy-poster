import { FontSizesOptions } from "../../../models/ToolbarProps";
import styles from "../../../styles/components/selectors/custom-selector.module.scss";

interface CustomDropDownOnClickParams {
  fontSize?: FontSizesOptions;
  value: string;
  displayValue: string;
}

export interface CustomDropDownTextProps {
  text: string;
  value: string;
  onClick: (props: CustomDropDownOnClickParams) => void;
  fontSize?: FontSizesOptions;
}

const CustomDropDownText = (props: CustomDropDownTextProps) => {
  const { text, fontSize, value, onClick } = props;

  return (
    <p
      className={`${styles.customDropDownText} ${styles[fontSize || ""]}`}
      onClick={() => onClick({ displayValue: text, value, fontSize })}
    >
      {text}
    </p>
  );
};

export { CustomDropDownText };
