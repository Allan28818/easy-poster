import { CSSProperties } from "react";

import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import { CustomDropDownIcons } from "../../../models/ToolbarProps";

import styles from "../../../styles/components/selectors/custom-selector.module.scss";

import {
  GrTextAlignCenter,
  GrTextAlignFull,
  GrTextAlignLeft,
  GrTextAlignRight,
} from "react-icons/gr";
import { LuListChecks } from "react-icons/lu";

interface CustomDropDownIconProps {
  icon: CustomDropDownIcons;
  additionalStyles?: CSSProperties;
}

const CustomDropDownIcon = (props: CustomDropDownIconProps) => {
  const { icon, additionalStyles } = props;

  const IconsList = {
    "check-list": (
      <LuListChecks className={styles.icon} style={additionalStyles} />
    ),
    "numbered-list": (
      <AiOutlineOrderedList className={styles.icon} style={additionalStyles} />
    ),
    "bullet-list": (
      <AiOutlineUnorderedList
        className={styles.icon}
        style={additionalStyles}
      />
    ),
    "left-align": (
      <GrTextAlignLeft className={styles.icon} style={additionalStyles} />
    ),
    "right-align": (
      <GrTextAlignRight className={styles.icon} style={additionalStyles} />
    ),
    "center-align": <GrTextAlignCenter className={styles.icon} />,
    "justify-align": (
      <GrTextAlignFull className={styles.icon} style={additionalStyles} />
    ),
  };

  return <>{IconsList[icon]}</>;
};

export { CustomDropDownIcon };
