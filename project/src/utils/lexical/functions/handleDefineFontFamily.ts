import { $patchStyleText } from "@lexical/selection";
import { $getSelection, $isRangeSelection, LexicalEditor } from "lexical";

interface HandleDefineTextNodeModelProps {
  fontFamily: string;
  editor: LexicalEditor;
}

function handleDefineFontFamily(props: HandleDefineTextNodeModelProps) {
  const { fontFamily, editor } = props;

  editor.update(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      $patchStyleText(selection, {
        "font-family": fontFamily,
      });
    }
  });
}

export { handleDefineFontFamily };
