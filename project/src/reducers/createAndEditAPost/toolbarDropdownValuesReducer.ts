enum ToolbarDropdownValuesActionKind {
  FONT_SIZE = "FONT_SIZE",
  FONT_FAMILY = "FONT_FAMILY",
}

export interface ToolbarDropdownValuesAction {
  type: ToolbarDropdownValuesActionKind;
  fontSize?: string;
  fontFamily?: string;
}

export interface ToolbarDropdownValuesState {
  fontSize: string;
  fontFamily: string;
}

const initialDropdownValuesState: ToolbarDropdownValuesState = {
  fontSize: "Normal",
  fontFamily: "Aria Label",
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
    default:
      return state;
  }
}

export {
  ToolbarDropdownValuesActionKind,
  initialDropdownValuesState,
  toolbarDropdownValuesReducer,
};
