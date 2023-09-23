import { useRef } from "react";

import { $getRoot, $getSelection, EditorState } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

import { AutoFocusPlugin } from "../Plugins/AutoFocusPlugin";

import { LexicalToolbar } from "../Toolbars/LexicalToolbar";

import styles from "../../styles/components/editors/lexical-editor.module.scss";
import { HeadingNode } from "@lexical/rich-text";

interface LexicalEditorProps {
  isFavorite: boolean;
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  isPublicPost: boolean;
  profileImageUrl: string | undefined | null;
}

const LexicalEditor = (props: LexicalEditorProps) => {
  const { isFavorite, setIsFavorite, isPublicPost, profileImageUrl } = props;

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
    nodes: [HeadingNode],
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
        <LexicalToolbar
          isFavorite={isFavorite}
          setIsFavorite={setIsFavorite}
          isPublicPost={isPublicPost}
          profileImageUrl={profileImageUrl}
        />
        <div className={styles.editorWrapper}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable className={styles.contentEditable} />
            }
            placeholder={
              <div className={styles.placeholderDiv}>Enter some text...</div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />

          <OnChangePlugin onChange={onChange} />
          <HistoryPlugin />
          <AutoFocusPlugin />
        </div>
      </LexicalComposer>
    </>
  );
};

export { LexicalEditor };
