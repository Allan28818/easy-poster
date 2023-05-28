import { useEffect, useState } from "react";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import HoverButton from "../../components/Buttons/HoverButton";
import TextComponent from "../../components/TextComponents/TextComponent";
import styles from "../../styles/posts/create-a-post.module.scss";

import docElementsProp from "../../models/DocElementsProp";

import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";

import BasicBurgerMenu from "../../components/BurgersMenu/BasicBurgerMenu";
import BasicMenu from "../../components/Menu/BasicMenu";
import BasicMessage from "../../components/Messages/BasicMessage";
import BasicMessageProps from "../../models/components/BasicMessageProps";

import dynamic from "next/dynamic";

import { getPosts } from "../../services/posts/getPosts";

import PostElementCard from "../../components/Cards/PostElementCard";
import CreateChartPopUp from "../../components/PopUps/CreateChartPopUp";
import CreateImagePopUp from "../../components/PopUps/CreateImagePopUp";
import CreateLinkPopUp from "../../components/PopUps/CreateLinkPopUp";

import { DocumentData } from "firebase/firestore";
import { useReducer } from "react";
import { handleAddElement } from "../../handlers/createPostHandlers/handleAddElement";
import { handleAddGraphic } from "../../handlers/createPostHandlers/handleAddGraphic";
import { handleAddImage } from "../../handlers/createPostHandlers/handleAddImage";
import { handleAddLink } from "../../handlers/createPostHandlers/handleAddLink";
import { handleEditPost } from "../../handlers/createPostHandlers/handleEditPost";
import { handleSavePost } from "../../handlers/createPostHandlers/handleSavePost";
import { ImageDataProps } from "../../models/components/ImageDataProps";
import { LinkDataModel } from "../../models/components/LinkDataModel";
import {
  chartDataReducer,
  initialChartData,
} from "../../reducers/createAndEditAPost/chartDataReducer";
import {
  VisualBooleanActionKind,
  initialVisualBoolean,
  visualBooleanReducer,
} from "../../reducers/createAndEditAPost/visualBooleanReducer";
import { emptyImageModel, emptyLinkModel } from "../../utils/emptyModels";

import { $getRoot, $getSelection } from "lexical";

import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { TRANSFORMERS } from "@lexical/markdown";
import { ListItemNode, ListNode } from "@lexical/list";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import ToolbarPlugin from "../../components/LexicalPlugins/ToolbarPlugin";
import TreeViewPlugin from "../../components/LexicalPlugins/TreeViewPlugin";
import CodeHighlightPlugin from "../../components/LexicalPlugins/CodeHighlightPlugin";
import AutoLinkPlugin from "../../components/LexicalPlugins/AutoLinkPlugin";
import ListMaxIndentLevelPlugin from "../../components/LexicalPlugins/ListMaxIndentLevelPlugin";

const Piechart: any = dynamic(
  () => import("../../components/Graphics/PieChart"),
  {
    ssr: false,
  }
);

const Donut: any = dynamic(() => import("../../components/Graphics/Donut"), {
  ssr: false,
});

const BarChart: any = dynamic(
  () => import("../../components/Graphics/BarChart"),
  {
    ssr: false,
  }
);

const LineChart: any = dynamic(
  () => import("../../components/Graphics/LineChart"),
  {
    ssr: false,
  }
);

const Radar: any = dynamic(() => import("../../components/Graphics/Radar"), {
  ssr: false,
});

function CreateAndEditAPost() {
  const router = useRouter();
  const routeParams = router.query;

  const postId =
    routeParams?.createAndEditAPost && routeParams?.createAndEditAPost[1];

  const [pageOperation, setPageOperation] = useState<"create" | "edit">(
    "create"
  );

  const [docElements, setDocElements] = useState<docElementsProp[]>([]);

  const [visualBooleanState, dispatchVisualBooleanState] = useReducer(
    visualBooleanReducer,
    initialVisualBoolean
  );

  const [chartDataState, dispatchChartData] = useReducer(
    chartDataReducer,
    initialChartData
  );

  const [imageDataStructure, setImageDataStructure] =
    useState<ImageDataProps>(emptyImageModel);

  const [linkDataStructure, setLinkDataStructure] =
    useState<LinkDataModel>(emptyLinkModel);

  const [postTitle, setPostTitle] = useState<string>("");

  const [isAPublicPost, setIsAPublicPost] = useState<boolean>(false);

  const [basicMessageConfig, setBasicMessageConfig] =
    useState<BasicMessageProps>({
      showMessage: false,
      title: "",
      description: "",
      type: "info",
      onConfirm: () => {},
    });

  const { user } = useAuth();
  const history = useRouter();

  const postBody = document.querySelector("#post-body");

  const initialConfig = {
    namespace: "MyEditor",
    onError: (error: Error) => {
      console.log("Lexical error", error);
    },
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
    ],
  };

  useEffect(() => {
    const handleFecthPost = async () => {
      if (!!postId) {
        const postsList = await getPosts({ postId });
        const currentPost: DocumentData =
          postsList.data instanceof Array ? postsList.data[0] : [];

        setPageOperation("edit");

        if (!!currentPost) {
          setPostTitle(currentPost.postName);
          setDocElements(currentPost.postData);
        }
      }
      setPageOperation("create");
    };

    handleFecthPost();
  }, [postId]);

  function onDragEnd(result: any) {
    const items = Array.from(docElements);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setDocElements(items);
  }

  function onChange(editorState: any) {
    editorState.read(() => {
      // Read the contents of the EditorState here.
      const root = $getRoot();
      const selection = $getSelection();

      console.log(root, selection);
    });
  }

  function MyCustomAutoFocusPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
      // Focus the editor when the effect fires!
      editor.focus();
    }, [editor]);

    return null;
  }

  return (
    <>
      <LexicalComposer initialConfig={initialConfig}>
        <div>
          <ToolbarPlugin />
          <div>
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<div>Enter with a text...</div>}
              ErrorBoundary={LexicalErrorBoundary}
            />

            <HistoryPlugin />
            <TreeViewPlugin />
            <CodeHighlightPlugin />
            <AutoLinkPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />

            <AutoFocusPlugin />
            <ListPlugin />
            <LinkPlugin />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          </div>
        </div>
      </LexicalComposer>
    </>
  );
}

export default CreateAndEditAPost;
