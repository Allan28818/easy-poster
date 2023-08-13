import { AiOutlineUnorderedList } from "react-icons/ai";
import { CustomSelectorIcons } from "../../../models/components/Selectors/CustomSelector";

import styles from "../../../styles/components/selectors/custom-selector.module.scss";
import { IconType } from "react-icons/lib";

interface CustomSelectorIconProps extends IconType {
  icon: CustomSelectorIcons;
  args: IconType;
}

const CustomSelectorIcon = (props: CustomSelectorIconProps) => {
  const { icon, args } = props;

  const IconsList = {
    bulletList: <AiOutlineUnorderedList {...args} />,
  };

  return <>{IconsList[icon]}</>;
};

export { CustomSelectorIcon };
