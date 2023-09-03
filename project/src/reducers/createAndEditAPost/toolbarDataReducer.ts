import { CustomDropDownIcons } from "../../models/components/DropDowns/CustomDropDown";
import { ToolbarEvents } from "../../models/components/Toolbars/LexicalToolbarProps";

import { ListType } from "@lexical/list";

enum ToolbarDataActionKind {
  BOLD = "BOLD",
  ITALIC = "ITALIC",
  UNDERLINE = "UNDERLINE",
  STRIKE_LINE = "STRIKE_LINE",
  SUBSCRIPT = "SUBSCRIPT",
  SUPERSCRIPT = "SUPERSCRIPT",
  CODE = "CODE",
  LINK = "LINK",
  CODE_LANGUAGE = "CODE_LANGUAGE",
  ROOT_TYPE = "ROOT_TYPE",
  BLOCK_TYPE = "BLOCK_TYPE",
  ELEMENT_KEY = "ELEMENT_KEY",
  FONT_SIZE = "FONT_SIZE",
  FONT_COLOR = "FONT_COLOR",
  FONT_FAMILY = "FONT_FAMILY",
  BACKGROUND_COLOR = "BACKGROUND_COLOR",
  SET_ALL = "SET_ALL",
}

export interface ToolbarDataAction {
  type: ToolbarDataActionKind;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikeLine?: boolean;
  subscript?: boolean;
  superscript?: boolean;
  code?: boolean;
  link?: boolean;
  codeLanguage?: string;
  rootType?: "table" | "root";
  blockType?: ToolbarEvents | ListType | CustomDropDownIcons;
  fontSize?: string;
  fontColor?: string;
  fontFamily?: string;
  backgroundColor?: string;
  elementKey?: string;
}

export interface ToolbarDataState {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikeLine: boolean;
  subscript: boolean;
  superscript: boolean;
  code: boolean;
  link: boolean;
  codeLanguage: string;
  rootType: "table" | "root";
  blockType: ToolbarEvents | ListType | CustomDropDownIcons;
  fontSize: string;
  fontColor: string;
  fontFamily: string;
  backgroundColor: string;
  elementKey: string | null;
}

const initialToolbarState: ToolbarDataState = {
  bold: false,
  italic: false,
  underline: false,
  strikeLine: false,
  subscript: false,
  superscript: false,
  code: false,
  link: false,
  codeLanguage: "",
  rootType: "root",
  blockType: ToolbarEvents.NORMAL_FONT_SIZE,
  fontSize: "",
  fontColor: "",
  fontFamily: "",
  backgroundColor: "",
  elementKey: null,
};

function toolbarDataReducer(
  state: ToolbarDataState,
  action: ToolbarDataAction
): ToolbarDataState {
  switch (action.type) {
    case "BOLD":
      return {
        ...state,
        bold: !!state.bold,
      };
    case "ITALIC":
      return {
        ...state,
        italic: !!state.italic,
      };
    case "UNDERLINE":
      return {
        ...state,
        underline: !!state.underline,
      };
    case "UNDERLINE":
      return {
        ...state,
        underline: !!state.underline,
      };
    case "STRIKE_LINE":
      return {
        ...state,
        strikeLine: !!state.strikeLine,
      };
    case "SUBSCRIPT":
      return {
        ...state,
        subscript: !!state.subscript,
      };
    case "SUPERSCRIPT":
      return {
        ...state,
        superscript: !!state.superscript,
      };
    case "CODE":
      return {
        ...state,
        code: !!state.code,
      };
    case "SUPERSCRIPT":
      return {
        ...state,
        superscript: !!state.superscript,
      };
    case "LINK":
      return {
        ...state,
        link: !!state.link,
      };
    case "ROOT_TYPE":
      return {
        ...state,
        elementKey: state.elementKey || "",
      };
    case "ROOT_TYPE":
      return {
        ...state,
        blockType: state.blockType || ToolbarEvents.NORMAL_FONT_SIZE,
      };
    case "ELEMENT_KEY":
      return {
        ...state,
        elementKey: state.elementKey || "",
      };
    case "FONT_SIZE":
      return {
        ...state,
        fontSize: state.fontSize || "",
      };
    case "FONT_COLOR":
      return {
        ...state,
        fontColor: state.fontColor || "",
      };
    case "FONT_FAMILY":
      return {
        ...state,
        fontFamily: state.fontFamily || "",
      };
    case "BACKGROUND_COLOR":
      return {
        ...state,
        backgroundColor: state.backgroundColor || "",
      };

    case "SET_ALL":
      return {
        ...state,
        bold: !!state.bold,
        italic: !!state.italic,
        underline: !!state.underline,
        strikeLine: !!state.strikeLine,
        subscript: !!state.subscript,
        superscript: !!state.superscript,
        code: !!state.code,
      };

    default:
      return state;
  }
}

export { toolbarDataReducer, initialToolbarState, ToolbarDataActionKind };
