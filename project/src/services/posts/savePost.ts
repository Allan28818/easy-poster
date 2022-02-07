import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import PropsReturn from "../../models/core.response";
import savePostProps from "../../models/PostProps";
import { firestore } from "../config/firebase";

async function savePost(props: savePostProps): Promise<PropsReturn> {
  const { creatorData, post, postName } = props;
  try {
    const postId = uuid();
    await setDoc(doc(firestore, "posts", postId), {
      id: postId,
      postName,
      postData: { ...post },
      creatorData,
      createdAt: serverTimestamp(),
    });
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
