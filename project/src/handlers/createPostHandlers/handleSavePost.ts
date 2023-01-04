import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { AuthenticationUser } from "../../contexts/AuthContext";
import { savePostController } from "../../controllers/savePostController";
import BasicMessageProps from "../../models/components/BasicMessageProps";
import docElementsProp from "../../models/DocElementsProp";

export interface handleSavePostProps {
  postInfo: {
    postTitle: string;
    isAPublicPost: boolean;
    postBody: Element | null;
    docElements: docElementsProp[];
  };
  user: AuthenticationUser | null;
  setBasicMessageConfig: Dispatch<SetStateAction<BasicMessageProps>>;
  history: NextRouter;
}

async function handleSavePost(props: handleSavePostProps) {
  const { user, postInfo, setBasicMessageConfig, history } = props;

  const { postTitle, postBody, docElements, isAPublicPost } = postInfo;

  if (postTitle) {
    const creatorData = {
      id: user?.uid,
      fullName: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
    };

    const response = await savePostController({
      postName: postTitle,
      isPublic: isAPublicPost,
      elementToMap: postBody,
      creatorData,
      docElements,
    });

    if (response.errorCode) {
      setBasicMessageConfig({
        title: "Humm, we had a problem!",
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
        title: "Your post was saved!",
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
}

export { handleSavePost };
