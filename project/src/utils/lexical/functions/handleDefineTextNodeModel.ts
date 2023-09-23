import { $createHeadingNode } from "@lexical/rich-text";
import { $patchStyleText, $setBlocksType } from "@lexical/selection";
import { $getSelection, $isRangeSelection, LexicalEditor } from "lexical";
import { FontSizesClassNames } from "../../../models/FontsProps";

interface HandleDefineTextNodeModelProps {
  nodeModel: FontSizesClassNames;
  editor: LexicalEditor;
}

type FunctionsModelsProps = {
  [key in FontSizesClassNames]: (editor: LexicalEditor) => void;
};

const functionsModels: FunctionsModelsProps = {
  title: defineTitleNodeModel,
  "title-1": defineTitle1NodeModel,
  "title-2": defineTitle2NodeModel,
  "title-3": defineTitle3NodeModel,
  normal: defineNormalNodeModel,
  subtitle: defineSubtitleNodeModel,
};

function handleDefineTextNodeModel(props: HandleDefineTextNodeModelProps) {
  const { nodeModel, editor } = props;

  console.log("nodeModel", nodeModel);
  console.log(" functionsModels[nodeModel]", functionsModels[nodeModel]);

  if (functionsModels[nodeModel]) {
    functionsModels[nodeModel](editor);
  }
}

// TODO: define others models

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
        "font-size": "26px",
      });
      $setBlocksType(selection, () => $createHeadingNode("h1"));
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
        "font-size": "26px",
      });
      $setBlocksType(selection, () => $createHeadingNode("h1"));
    }
  });
}
function defineTitle3NodeModel(editor: LexicalEditor) {
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
function defineSubtitleNodeModel(editor: LexicalEditor) {
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

export { handleDefineTextNodeModel };
