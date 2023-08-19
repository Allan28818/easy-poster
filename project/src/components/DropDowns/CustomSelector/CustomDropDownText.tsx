import styles from "../../../styles/components/selectors/custom-selector.module.scss";

interface CustomDropDownTextProps {
  text: string;
  fontSize?:
    | "title"
    | "subtitle"
    | "title-1"
    | "title-2"
    | "title-3"
    | "normal";
}

const CustomDropDownText = (props: CustomDropDownTextProps) => {
  const { text, fontSize } = props;

  return (
    <p className={`${styles.customDropDownText} ${styles[fontSize || ""]}`}>
      {text}
    </p>
  );
};

export { CustomDropDownText };
