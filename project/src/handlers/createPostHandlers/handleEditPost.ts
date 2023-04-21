import { NextRouter } from "next/router";
import { AuthenticationUser } from "../../contexts/AuthContext";
import { editPostController } from "../../controllers/editPostController";
import { useAuth } from "../../hooks/useAuth";
import BasicMessageProps from "../../models/components/BasicMessageProps";
import docElementsProp from "../../models/DocElementsProp";

export interface handleEditPostProps {
  postTitle: string;
  postId: string | undefined;
  user: AuthenticationUser | null;
  postBody: Element | null;
  docElements: docElementsProp[];
  setBasicMessageConfig: React.Dispatch<
    React.SetStateAction<BasicMessageProps>
  >;
  history: NextRouter;
}

async function handleEditPost(props: handleEditPostProps) {
  const {
    postTitle,
    postBody,
    postId,
    docElements,
    setBasicMessageConfig,
    history,
    user,
  } = props;

  if (postTitle && postId) {
    const creatorData = {
      id: user?.id,
      fullName: user?.displayName,
    };

    const response = await editPostController({
      postName: postTitle,
      elementToMap: postBody,
      creatorData,
      docElements,
      postId,
    });

    if (response.errorCode) {
      setBasicMessageConfig({
        title: "Humm, we have a problem",
        description: response.message,
        onConfirm: () => {
          history.push("/");
          setBasicMessageConfig({
            title: "",
            description: "",
            onConfirm: () => {},
            showMessage: false,
            type: "success",
          });
        },
        showMessage: true,
        type: "error",
      });
    } else {
      setBasicMessageConfig({
        title: "Your post was updated!",
        description: response.message,
        onConfirm: () => {
          history.push("/");
          setBasicMessageConfig({
            title: "",
            description: "",
            onConfirm: () => {},
            showMessage: false,
            type: "success",
          });
        },
        showMessage: true,
        type: "success",
      });
    }

    return;
  }

  setBasicMessageConfig({
    title: "Insuficient data!",
    description: "You must give a title to your post!",
    onConfirm: () => {
      setBasicMessageConfig({
        title: "",
        description: "",
        onConfirm: () => {},
        showMessage: false,
        type: "success",
      });
    },
    showMessage: true,
    type: "error",
  });
  return;
}

export { handleEditPost };
