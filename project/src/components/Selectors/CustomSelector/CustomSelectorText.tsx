import styles from "../../../styles/components/selectors/custom-selector.module.scss";

interface CustomSelectorTextProps {
  text: string;
}

const CustomSelectorText = (props: CustomSelectorTextProps) => {
  const { text } = props;

  return <p className={styles.customSelectorText}>{text}</p>;
};

export { CustomSelectorText };
