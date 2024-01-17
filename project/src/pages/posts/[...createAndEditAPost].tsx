import { useEffect, useState } from "react";

import docElementsProp from "../../models/DocElementsProp";

import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";

import BasicMessageProps from "../../models/components/BasicMessageProps";

import { getPosts } from "../../services/posts/getPosts";

import { DocumentData } from "firebase/firestore";

import "react-quill/dist/quill.snow.css";

import { LexicalEditor } from "../../components/Editors/LexicalEditor";

function CreateAndEditAPost() {
  const router = useRouter();
  const routeParams = router.query;

  const postId =
    routeParams?.createAndEditAPost && routeParams?.createAndEditAPost[1];

  const [pageOperation, setPageOperation] = useState<"create" | "edit">(
    "create"
  );
  const [docElements, setDocElements] = useState<docElementsProp[]>([]);

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isPublicPost, setIsPublicPost] = useState<boolean>(true);

  const [postTitle, setPostTitle] = useState<string>("");
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
    <LexicalEditor
      isFavorite={isFavorite}
      setIsFavorite={setIsFavorite}
      isPublicPost={isPublicPost}
      profileImageUrl={user?.photoURL}
    />
  );
}

export default CreateAndEditAPost;
