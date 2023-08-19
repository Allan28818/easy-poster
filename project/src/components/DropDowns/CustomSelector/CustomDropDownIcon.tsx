import { AiOutlineUnorderedList } from "react-icons/ai";
import { CustomDropDownIcons } from "../../../models/components/DropDowns/CustomDropDown";

import styles from "../../../styles/components/selectors/custom-selector.module.scss";
import { IconType } from "react-icons/lib";

interface CustomDropDownIconProps {
  icon: CustomDropDownIcons;
  className?: string;
}

const CustomDropDownIcon = (props: CustomDropDownIconProps) => {
  const { icon, className } = props;

  const IconsList = {
    bulletList: (
      <AiOutlineUnorderedList className={`${className} ${styles.icon}`} />
    ),
  };

  return <>{IconsList[icon]}</>;
};

export { CustomDropDownIcon };
