import { CSSProperties } from "react";

import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import { CustomDropDownIcons } from "../../../models/components/DropDowns/CustomDropDown";

import styles from "../../../styles/components/selectors/custom-selector.module.scss";

import {
  GrTextAlignCenter,
  GrTextAlignFull,
  GrTextAlignLeft,
  GrTextAlignRight,
} from "react-icons/gr";

interface CustomDropDownIconProps {
  icon: CustomDropDownIcons;
  additionalStyles?: CSSProperties;
}

const CustomDropDownIcon = (props: CustomDropDownIconProps) => {
  const { icon, additionalStyles } = props;

  const IconsList = {
    bulletList: (
      <AiOutlineUnorderedList
        className={styles.icon}
        style={additionalStyles}
      />
    ),
    numberedList: (
      <AiOutlineOrderedList className={styles.icon} style={additionalStyles} />
    ),
    leftAlign: (
      <GrTextAlignLeft className={styles.icon} style={additionalStyles} />
    ),
    rightAlign: (
      <GrTextAlignRight className={styles.icon} style={additionalStyles} />
    ),
    centerAlign: <GrTextAlignCenter className={styles.icon} />,
    justifyAlign: (
      <GrTextAlignFull className={styles.icon} style={additionalStyles} />
    ),
  };

  return <>{IconsList[icon]}</>;
};

export { CustomDropDownIcon };
