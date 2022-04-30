import disablePostProps from "../../DisablePostProps";

interface OptionProps {
  optionText: string;
  optionCbFunction: (props: disablePostProps) => Promise<void>;
  icon?: "link" | "delete" | "edit";
}

export default OptionProps;
