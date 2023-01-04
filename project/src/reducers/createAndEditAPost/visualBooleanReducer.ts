enum VisualBooleanActionKind {
  GRAPHIC_STEPS_POP_UP = "GRAPHIC_STEPS_POP_UP",
  GRAPHIC_POP_UP = "GRAPHIC_POP_UP",
  IMAGE_MODAL = "IMAGE_MODAL",
  LINK_MODAL = "LINK_MODAL",
  MENU = "MENU",
}

export interface VisualBooleanAction {
  type: VisualBooleanActionKind;
  isFirstGraphicStep?: boolean;
  isGraphicPopUpVisible?: boolean;
  isImageModalVisible?: boolean;
  isLinkModalVisible?: boolean;
  isMenuVisible?: boolean;
}

export interface VisualBooleanState {
  isFirstGraphicStep: boolean;
  isGraphicPopUpVisible: boolean;
  isImageModalVisible: boolean;
  isLinkModalVisible: boolean;
  isMenuVisible: boolean;
}

const initialVisualBoolean: VisualBooleanState = {
  isFirstGraphicStep: true,
  isGraphicPopUpVisible: false,
  isImageModalVisible: false,
  isLinkModalVisible: false,
  isMenuVisible: false,
};

function visualBooleanReducer(
  state: VisualBooleanState,
  action: VisualBooleanAction
): VisualBooleanState {
  switch (action.type) {
    case "GRAPHIC_STEPS_POP_UP":
      return {
        ...state,
        isFirstGraphicStep: !!action.isFirstGraphicStep,
      };
    case "GRAPHIC_POP_UP":
      return {
        ...state,
        isGraphicPopUpVisible: !!action.isGraphicPopUpVisible,
      };
    case "IMAGE_MODAL":
      return {
        ...state,
        isImageModalVisible: !!action.isImageModalVisible,
      };
    case "LINK_MODAL":
      return {
        ...state,
        isLinkModalVisible: !!action.isLinkModalVisible,
      };
    case "MENU":
      return {
        ...state,
        isMenuVisible: !!action.isMenuVisible,
      };
    default:
      return state;
  }
}

export { visualBooleanReducer, initialVisualBoolean, VisualBooleanActionKind };
