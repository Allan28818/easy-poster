import {
  ElementNode,
  GridSelection,
  LexicalEditor,
  LexicalNode,
  NodeSelection,
  RangeSelection,
  TextNode,
} from "lexical";

import { $isTableNode } from "@lexical/table";

import { $isListNode, ListNode } from "@lexical/list";

import { $getNearestNodeOfType } from "@lexical/utils";

import { $findMatchingParent, $isRootOrShadowRoot } from "lexical/LexicalUtils";
import {
  ToolbarDataAction,
  ToolbarDataActionKind,
} from "../../reducers/createAndEditAPost/toolbarDataReducer";
import { Dispatch } from "react";
import { getSelectedNode } from "./getSelectedNode";
import { ToolbarEvents } from "../../models/components/Toolbars/LexicalToolbarProps";

interface HandleSetRangeConfigProps {
  selection: RangeSelection;
  activeEditor: LexicalEditor;
  dispatchToolbarState: Dispatch<ToolbarDataAction>;
}

interface HandleSetTableNodeProps {
  dispatchToolbarState: Dispatch<ToolbarDataAction>;
  node: TextNode | ElementNode;
}

interface HandleSetElementDOMProps {
  elementDOM: HTMLElement | null;
  elementKey: string;
  element: LexicalNode | null;
  anchorNode: TextNode | ElementNode;
  dispatchToolbarState: Dispatch<ToolbarDataAction>;
}

function handleSetRangeConfig(props: HandleSetRangeConfigProps) {
  const { activeEditor, selection, dispatchToolbarState } = props;
  const anchorNode = selection.anchor.getNode();

  let element =
    anchorNode.getKey() === "root"
      ? anchorNode
      : $findMatchingParent(anchorNode, (event) => {
          const parent = event.getParent();
          return parent !== null && $isRootOrShadowRoot(parent);
        });

  if (element === null) {
    element = anchorNode.getTopLevelElementOrThrow();
  }

  const elementKey = element.getKey();
  const elementDOM = activeEditor.getElementByKey(elementKey);
  const node = getSelectedNode(selection);

  dispatchToolbarState({
    type: ToolbarDataActionKind.BOLD,
    bold: selection.hasFormat("bold"),
  });
  dispatchToolbarState({
    type: ToolbarDataActionKind.ITALIC,
    bold: selection.hasFormat("italic"),
  });
  dispatchToolbarState({
    type: ToolbarDataActionKind.UNDERLINE,
    bold: selection.hasFormat("underline"),
  });

  handleSetTableNode({ dispatchToolbarState, node });
}

function handleSetTableNode(props: HandleSetTableNodeProps) {
  const { dispatchToolbarState, node } = props;

  const tableNode = $findMatchingParent(node, $isTableNode);

  if ($isTableNode(tableNode)) {
    dispatchToolbarState({
      type: ToolbarDataActionKind.ROOT_TYPE,
      rootType: ToolbarEvents.TABLE,
    });
  } else {
    dispatchToolbarState({
      type: ToolbarDataActionKind.ROOT_TYPE,
      rootType: ToolbarEvents.ROOT,
    });
  }
}

function handleSetElementDOM(props: HandleSetElementDOMProps) {
  const { anchorNode, elementDOM, elementKey, element, dispatchToolbarState } =
    props;

  if (elementDOM !== null) {
    dispatchToolbarState({
      type: ToolbarDataActionKind.ELEMENT_KEY,
      elementKey,
    });

    if ($isListNode(element)) {
      const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode);

      const type = parentList
        ? parentList.getListType()
        : element.getListType();

      // dispatchToolbarState({ type: ToolbarDataActionKind.BLOCK_TYPE, blockType: });
    }
  }
}

export { handleSetRangeConfig };
