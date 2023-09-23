import { CustomDropDownIcons } from "../../models/components/DropDowns/CustomDropDown";

const blockTypeToBlockName: Record<CustomDropDownIcons, string> = {
  bulletList: "Bullet List",
  numberedList: "Numbered List",
  leftAlign: "Left Align",
  centerAlign: "Center Align",
  rightAlign: "Right Align",
  justifyAlign: "Justify Align",
};

export { blockTypeToBlockName };
