import { useEffect, useState } from "react";

import docElementsProp from "../../models/DocElementsProp";

import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";

import BasicMessageProps from "../../models/components/BasicMessageProps";

import { getPosts } from "../../services/posts/getPosts";

import { DocumentData } from "firebase/firestore";
import { useReducer } from "react";
import { ImageDataProps } from "../../models/components/ImageDataProps";
import { LinkDataModel } from "../../models/components/LinkDataModel";
import {
  chartDataReducer,
  initialChartData,
} from "../../reducers/createAndEditAPost/chartDataReducer";
import {
  initialVisualBoolean,
  visualBooleanReducer,
} from "../../reducers/createAndEditAPost/visualBooleanReducer";
import { emptyImageModel, emptyLinkModel } from "../../utils/emptyModels";

import "react-quill/dist/quill.snow.css";
import { QuillEditor } from "../../components/Editors/QuillEditor";

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
  const [editor, setEditor] = useState<string>("");

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

  return (
    <div>
      <QuillEditor editor={editor} setEditor={setEditor} />
    </div>
  );
}

export default CreateAndEditAPost;
