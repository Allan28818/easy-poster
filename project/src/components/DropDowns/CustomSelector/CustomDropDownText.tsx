import { FontSizesClassNames } from "../../../models/FontsProps";
import styles from "../../../styles/components/selectors/custom-selector.module.scss";

interface CustomDropDownOnClickParams {
  fontSize?: FontSizesClassNames;
  value: string;
  displayValue: string;
}

interface CustomDropDownTextProps {
  text: string;
  value: string;
  onClick: (props: CustomDropDownOnClickParams) => void;
  fontSize?: FontSizesClassNames;
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
