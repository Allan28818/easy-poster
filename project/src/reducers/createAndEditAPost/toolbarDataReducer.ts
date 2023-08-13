import { ToolbarEvents } from "../../models/components/Toolbars/LexicalToolbarProps";

enum ToolbarDataActionKind {
  BOLD = "BOLD",
  ITALIC = "ITALIC",
  UNDERLINE = "UNDERLINE",
  ROOT_TYPE = "ROOT_TYPE",
  BLOCK_TYPE = "BLOCK_TYPE",
  ELEMENT_KEY = "ELEMENT_KEY",
}

export interface ToolbarDataAction {
  type: ToolbarDataActionKind;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  rootType?: "table" | "root";
  blockType?: ToolbarEvents;
  elementKey?: string;
}

export interface ToolbarDataState {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  rootType: "table" | "root";
  blockType: ToolbarEvents;
  elementKey: string | null;
}

const initialToolbarState: ToolbarDataState = {
  bold: false,
  italic: false,
  underline: false,
  rootType: "root",
  blockType: ToolbarEvents.NORMAL_FONT_SIZE,
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
        rootType: state.rootType || null,
      };

    default:
      return state;
  }
}

export { toolbarDataReducer, initialToolbarState, ToolbarDataActionKind };
