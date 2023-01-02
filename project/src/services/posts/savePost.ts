import { doc, setDoc, serverTimestamp, FieldValue } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import PropsReturn from "../../models/core.response";
import docElementsProp from "../../models/DocElementsProp";
import savePostProps from "../../models/PostProps";
import { firestore } from "../config/firebase";
import { sendNewPostToFeeds } from "./sendNewPostToFeeds";

export interface postInfoProps {
  id: string;
  postName: string;
  postData: docElementsProp[];
  creatorData: {
    id: string | null | undefined;
    fullName: string | null | undefined;
    email: string | null | undefined;
    photoURL: string | null | undefined;
  };
  isPublic: boolean;
  isActive: boolean;
}

async function savePost(props: savePostProps): Promise<PropsReturn> {
  const { creatorData, post, postName, isPublic } = props;
  try {
    const postId = uuid();
    const postInfo: postInfoProps = {
      id: postId,
      postName,
      postData: [...post],
      creatorData,
      isPublic,
      isActive: true,
    };

    await setDoc(doc(firestore, "posts", postId), {
      ...postInfo,
      createdAt: serverTimestamp(),
    });
    console.log(await sendNewPostToFeeds({ postInfo }));
  } catch (error: any) {
    return {
      message: "It wasn't possible to save your post! Try it later...",
      errorCode: error.code,
      errorMessage: error.message,
    };
  }

  return { message: "Your post was successfully saved!" };
}

export { savePost };
