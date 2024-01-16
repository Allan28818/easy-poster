enum ToolbarDropdownValuesActionKind {
  FONT_SIZE = "FONT_SIZE",
  FONT_FAMILY = "FONT_FAMILY",
  LIST = "LIST",
}

export interface ToolbarDropdownValuesAction {
  type: ToolbarDropdownValuesActionKind;
  fontSize?: string;
  fontFamily?: string;
  list?: string;
}

export interface ToolbarDropdownValuesState {
  fontSize: string;
  fontFamily: string;
  list: string;
}

const initialDropdownValuesState: ToolbarDropdownValuesState = {
  fontSize: "Normal",
  fontFamily: "Aria Label",
  list: "Bullet List",
};

function toolbarDropdownValuesReducer(
  state: ToolbarDropdownValuesState,
  action: ToolbarDropdownValuesAction
): ToolbarDropdownValuesState {
  switch (action.type) {
    case "FONT_SIZE":
      return {
        ...state,
        fontSize: action.fontSize || "",
      };
    case "FONT_FAMILY":
      return {
        ...state,
        fontFamily: action.fontFamily || "",
      };
    case "LIST":
      return {
        ...state,
        list: action.list || "",
      };
    default:
      return state;
  }
}

export {
  ToolbarDropdownValuesActionKind,
  initialDropdownValuesState,
  toolbarDropdownValuesReducer,
};
