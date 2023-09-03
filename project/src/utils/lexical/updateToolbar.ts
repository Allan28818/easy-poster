import { Dispatch } from "react";

import {
  $getSelection,
  $isRangeSelection,
  ElementNode,
  GridSelection,
  LexicalEditor,
  LexicalNode,
  NodeSelection,
  RangeSelection,
  TextNode,
} from "lexical";

import { $isLinkNode } from "@lexical/link";
import { $isListNode, ListNode } from "@lexical/list";
import { $isCodeNode, CODE_LANGUAGE_MAP } from "@lexical/code";
import { $isHeadingNode } from "@lexical/rich-text";
import { $isTableNode } from "@lexical/table";
import { $findMatchingParent, $getNearestNodeOfType } from "@lexical/utils";
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
  $patchStyleText,
  $setBlocksType,
} from "@lexical/selection";

import { $isRootOrShadowRoot } from "lexical";
import {
  ToolbarDataAction,
  ToolbarDataActionKind,
} from "../../reducers/createAndEditAPost/toolbarDataReducer";
import { blockTypeToBlockName } from "./blockTypeToBlockName";
import { getSelectedNode } from "./getSelectedNode";

interface UpdateToolbarProps {
  dispatchToolbarState: Dispatch<ToolbarDataAction>;
  activeEditor: LexicalEditor;
}

interface UpdateComplexElementsProps {
  node: TextNode | ElementNode;
  dispatchToolbarState: Dispatch<ToolbarDataAction>;
}

interface UpdateDOMProps {
  anchorNode: TextNode | ElementNode;
  elementDOM: HTMLElement | null;
  element: LexicalNode;
  elementKey: string;
  dispatchToolbarState: Dispatch<ToolbarDataAction>;
}

interface UpdateButtonsActionsProps {
  selection: RangeSelection | NodeSelection | GridSelection | null;
  dispatchToolbarState: Dispatch<ToolbarDataAction>;
}

function updateToolbar(props: UpdateToolbarProps) {
  const { dispatchToolbarState, activeEditor } = props;

  const selection = $getSelection();

  if ($isRangeSelection(selection)) {
    const anchorNode = selection.anchor.getNode();

    const element = getElement(anchorNode);

    const elementKey = element.getKey();
    const elementDOM = activeEditor.getElementByKey(elementKey);

    dispatchToolbarState({
      type: ToolbarDataActionKind.SET_ALL,
      bold: selection.hasFormat("bold"),
      italic: selection.hasFormat("italic"),
      underline: selection.hasFormat("underline"),
      strikeLine: selection.hasFormat("strikethrough"),
      subscript: selection.hasFormat("subscript"),
      superscript: selection.hasFormat("superscript"),
      code: selection.hasFormat("code"),
    });

    const node = getSelectedNode(selection);

    updateLinks({ node, dispatchToolbarState });
    updateTables({ node, dispatchToolbarState });
    updateElementDOM({
      anchorNode,
      dispatchToolbarState,
      element,
      elementDOM,
      elementKey,
    });
  }

  updateButtonsActions({ dispatchToolbarState, selection });
}

function getElement(anchorNode: TextNode | ElementNode) {
  let element =
    anchorNode.getKey() === "root"
      ? anchorNode
      : $findMatchingParent(anchorNode, (e) => {
          const parent = e.getParent();
          return parent !== null && $isRootOrShadowRoot(parent);
        });

  if (element === null) {
    return (element = anchorNode.getTopLevelElementOrThrow());
  }

  return element;
}

function updateLinks(props: UpdateComplexElementsProps) {
  const { node, dispatchToolbarState } = props;
  const parent = node.getParent();

  if ($isLinkNode(parent) || $isLinkNode(node)) {
    dispatchToolbarState({ type: ToolbarDataActionKind.LINK, link: true });
  } else {
    dispatchToolbarState({ type: ToolbarDataActionKind.LINK, link: false });
  }
}

function updateTables(props: UpdateComplexElementsProps) {
  const { node, dispatchToolbarState } = props;

  const tableNode = $findMatchingParent(node, $isTableNode);
  if ($isTableNode(tableNode)) {
    dispatchToolbarState({
      type: ToolbarDataActionKind.ROOT_TYPE,
      rootType: "table",
    });
  } else {
    dispatchToolbarState({
      type: ToolbarDataActionKind.ROOT_TYPE,
      rootType: "root",
    });
  }
}

function updateElementDOM(props: UpdateDOMProps) {
  const { anchorNode, element, elementDOM, elementKey, dispatchToolbarState } =
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
      dispatchToolbarState({
        type: ToolbarDataActionKind.BLOCK_TYPE,
        blockType: type,
      });
    } else {
      const type = $isHeadingNode(element)
        ? element.getTag()
        : element.getType();

      if (type in blockTypeToBlockName) {
        dispatchToolbarState({
          type: ToolbarDataActionKind.BLOCK_TYPE,
          blockType: type as keyof typeof blockTypeToBlockName,
        });
      }

      if ($isCodeNode(element)) {
        const language =
          element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
        dispatchToolbarState({
          type: ToolbarDataActionKind.CODE_LANGUAGE,
          codeLanguage: language ? CODE_LANGUAGE_MAP[language] || language : "",
        });
      }

      return;
    }
  }
}

function updateButtonsActions(props: UpdateButtonsActionsProps) {
  const { dispatchToolbarState, selection } = props;
  dispatchToolbarState({
    type: ToolbarDataActionKind.FONT_SIZE,
    fontSize: $getSelectionStyleValueForProperty(
      selection as RangeSelection,
      "font-size",
      "15px"
    ),
  });
  dispatchToolbarState({
    type: ToolbarDataActionKind.FONT_COLOR,
    fontColor: $getSelectionStyleValueForProperty(
      selection as RangeSelection,
      "color",
      "#000"
    ),
  });
  dispatchToolbarState({
    type: ToolbarDataActionKind.FONT_FAMILY,
    fontFamily: $getSelectionStyleValueForProperty(
      selection as RangeSelection,
      "font-family",
      "Arial"
    ),
  });
  dispatchToolbarState({
    type: ToolbarDataActionKind.BACKGROUND_COLOR,
    backgroundColor: $getSelectionStyleValueForProperty(
      selection as RangeSelection,
      "background-color",
      "#fff"
    ),
  });
}

export { updateToolbar };
