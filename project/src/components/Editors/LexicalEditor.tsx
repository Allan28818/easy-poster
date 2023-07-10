import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { AutoFocusPlugin } from "../Plugins/AutoFocusPlugin";

import { useRef } from "react";
import styles from "../../styles/components/editors/lexical-editor.module.scss";
import { $getRoot, $getSelection, EditorState } from "lexical";
import { $createImageNode } from "../Nodes/ImageNode";

const LexicalEditor = () => {
  const editorStateRef = useRef<EditorState>();

  const theme = {
    ltr: styles.ltr,
    rtl: styles.rtl,
    placeholder: styles.editorPlaceholder,
    paragraph: styles.editorParagraph,
    quote: styles.editorQuote,
  };

  const initialConfig = {
    editable: true,
    namespace: "Post editor",
    theme,
    onError,
  };

  editorStateRef.current;

  function onError(error: any) {
    console.error("[LEXICAL ERROR]", error);
  }

  function onSubmit() {
    const editorState = JSON.stringify(editorStateRef.current);

    console.log("editorState", editorState);
  }

  function onChange(editorState: EditorState) {
    editorStateRef.current = editorState;

    editorState.read(() => {
      // Read the contents of the EditorState here.
      const root = $getRoot();
      const selection = $getSelection();

      console.log("root text content", root.getTextContent());
    });
  }

  return (
    <>
      <LexicalComposer initialConfig={initialConfig}>
        <PlainTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={<div>Enter some text...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <button onClick={onSubmit}>Save</button>
        <button
          onClick={() => {
            $createImageNode("https://www.github.com/Allan28818.png");
          }}
        >
          Image
        </button>
      </LexicalComposer>
    </>
  );
};

export { LexicalEditor };
