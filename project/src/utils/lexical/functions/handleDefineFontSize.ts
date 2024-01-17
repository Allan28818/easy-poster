import { $createHeadingNode } from "@lexical/rich-text";
import { $patchStyleText, $setBlocksType } from "@lexical/selection";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  LexicalEditor,
} from "lexical";

import { FontSizesOptions } from "../../../models/ToolbarProps";

interface HandleDefineTextNodeModelProps {
  nodeModel: FontSizesOptions;
  editor: LexicalEditor;
}

type FunctionsModelsProps = {
  [key in FontSizesOptions]: (editor: LexicalEditor) => void;
};

const functionsModels: FunctionsModelsProps = {
  title: defineTitleNodeModel,
  "title-1": defineTitle1NodeModel,
  "title-2": defineTitle2NodeModel,
  "title-3": defineTitle3NodeModel,
  normal: defineNormalNodeModel,
  subtitle: defineSubtitleNodeModel,
};

function handleDefineFontSize(props: HandleDefineTextNodeModelProps) {
  const { nodeModel, editor } = props;

  if (functionsModels[nodeModel]) {
    functionsModels[nodeModel](editor);
  }
}

function defineTitleNodeModel(editor: LexicalEditor) {
  editor.update(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      $patchStyleText(selection, {
        "font-size": "26px",
      });
      $setBlocksType(selection, () => $createHeadingNode("h1"));
    }
  });
}
function defineNormalNodeModel(editor: LexicalEditor) {
  editor.update(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      $patchStyleText(selection, {
        "font-size": "15px",
      });
      $setBlocksType(selection, () => $createParagraphNode());
    }
  });
}
function defineTitle1NodeModel(editor: LexicalEditor) {
  editor.update(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      $patchStyleText(selection, {
        "font-size": "26px",
      });
      $setBlocksType(selection, () => $createHeadingNode("h1"));
    }
  });
}
function defineTitle2NodeModel(editor: LexicalEditor) {
  editor.update(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      $patchStyleText(selection, {
        "font-size": "20px",
      });
      $setBlocksType(selection, () => $createHeadingNode("h2"));
    }
  });
}
function defineTitle3NodeModel(editor: LexicalEditor) {
  editor.update(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      $patchStyleText(selection, {
        "font-size": "18px",
      });
      $setBlocksType(selection, () => $createHeadingNode("h3"));
    }
  });
}
function defineSubtitleNodeModel(editor: LexicalEditor) {
  editor.update(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      $patchStyleText(selection, {
        "font-size": "18px",
      });
      $setBlocksType(selection, () => $createHeadingNode("h1"));
    }
  });
}

export { handleDefineFontSize };
