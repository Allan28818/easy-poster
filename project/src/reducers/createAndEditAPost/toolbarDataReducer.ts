import { blockTypeToBlockName } from "../../components/Toolbars/LexicalToolbar";
import { CustomDropDownIcons } from "../../models/ToolbarProps";
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
  EDITABLE = "EDITABLE",
  UNDO = "UNDO",
  REDO = "REDO",
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
  blockType?:
    | ToolbarEvents
    | ListType
    | CustomDropDownIcons
    | keyof typeof blockTypeToBlockName;
  fontSize?: string;
  fontColor?: string;
  fontFamily?: string;
  backgroundColor?: string;
  elementKey?: string;
  editable?: boolean;
  undo?: boolean;
  redo?: boolean;
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
  blockType:
    | ToolbarEvents
    | ListType
    | CustomDropDownIcons
    | keyof typeof blockTypeToBlockName;
  fontSize: string;
  fontColor: string;
  fontFamily: string;
  backgroundColor: string;
  elementKey: string | null;
  editable: boolean;
  undo: boolean;
  redo: boolean;
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
  editable: true,
  undo: true,
  redo: true,
};

function toolbarDataReducer(
  state: ToolbarDataState,
  action: ToolbarDataAction
): ToolbarDataState {
  switch (action.type) {
    case "BOLD":
      return {
        ...state,
        bold: !!action.bold,
      };
    case "ITALIC":
      return {
        ...state,
        italic: !!action.italic,
      };
    case "UNDERLINE":
      return {
        ...state,
        underline: !!action.underline,
      };
    case "UNDERLINE":
      return {
        ...state,
        underline: !!action.underline,
      };
    case "STRIKE_LINE":
      return {
        ...state,
        strikeLine: !!action.strikeLine,
      };
    case "SUBSCRIPT":
      return {
        ...state,
        subscript: !!action.subscript,
      };
    case "SUPERSCRIPT":
      return {
        ...state,
        superscript: !!action.superscript,
      };
    case "CODE":
      return {
        ...state,
        code: !!action.code,
      };
    case "SUPERSCRIPT":
      return {
        ...state,
        superscript: !!action.superscript,
      };
    case "LINK":
      return {
        ...state,
        link: !!action.link,
      };
    case "ROOT_TYPE":
      return {
        ...state,
        elementKey: action.elementKey || "",
      };
    case "ROOT_TYPE":
      return {
        ...state,
        blockType: action.blockType || ToolbarEvents.NORMAL_FONT_SIZE,
      };
    case "ELEMENT_KEY":
      return {
        ...state,
        elementKey: action.elementKey || "",
      };
    case "FONT_SIZE":
      return {
        ...state,
        fontSize: action.fontSize || "",
      };
    case "FONT_COLOR":
      return {
        ...state,
        fontColor: action.fontColor || "",
      };
    case "FONT_FAMILY":
      return {
        ...state,
        fontFamily: action.fontFamily || "",
      };
    case "BACKGROUND_COLOR":
      return {
        ...state,
        backgroundColor: action.backgroundColor || "",
      };
    case "EDITABLE":
      return {
        ...state,
        editable: !!action.editable,
      };
    case "UNDO":
      return {
        ...state,
        undo: !!action.undo,
      };
    case "REDO":
      return {
        ...state,
        redo: !!action.redo,
      };
    case "SET_ALL":
      return {
        ...state,
        bold: !!action.bold,
        italic: !!action.italic,
        underline: !!action.underline,
        strikeLine: !!action.strikeLine,
        subscript: !!action.subscript,
        superscript: !!action.superscript,
        code: !!action.code,
      };

    default:
      return state;
  }
}

export { toolbarDataReducer, initialToolbarState, ToolbarDataActionKind };
