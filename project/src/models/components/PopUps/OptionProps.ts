import { ReactNode } from "react";
import disablePostProps from "../../DisablePostProps";

interface OptionProps {
  optionText: string;
  optionCbFunction: (props: disablePostProps) => Promise<JSX.Element | void>;
  icon?: "link" | "delete" | "edit";
}

export default OptionProps;
