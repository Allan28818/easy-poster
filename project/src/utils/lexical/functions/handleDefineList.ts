import {
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { $patchStyleText } from "@lexical/selection";
import { $getSelection, $isRangeSelection, LexicalEditor } from "lexical";
import { ToolbarDataState } from "../../../reducers/createAndEditAPost/toolbarDataReducer";
import { ListOptions } from "../../../models/ToolbarProps";

interface HandleDefineListProps {
  toolbarState: ToolbarDataState;
  editor: LexicalEditor;
  listType: ListOptions;
}

const functionOptions = {
  "bullet-list": handleInsertBulletList,
  "check-list": handleInsertCheckList,
  "numbered-list": handleInsertNumberedList,
};

function handleDefineList(props: HandleDefineListProps) {
  const { listType, toolbarState, editor } = props;

  if (functionOptions[listType]) {
    functionOptions[listType](toolbarState, editor);
  }
}

function handleInsertBulletList(
  toolbarState: ToolbarDataState,
  editor: LexicalEditor
) {
  if (toolbarState.blockType !== "bullet-list") {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    return;
  }
  editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
}
function handleInsertCheckList(
  toolbarState: ToolbarDataState,
  editor: LexicalEditor
) {
  if (toolbarState.blockType !== "check-list") {
    editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
    return;
  }
  editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
}

function handleInsertNumberedList(
  toolbarState: ToolbarDataState,
  editor: LexicalEditor
) {
  if (toolbarState.blockType !== "numbered-list") {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
  } else {
    editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
  }
}

export { handleDefineList };
