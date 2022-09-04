import { editPostProps } from "../../models/PostProps";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";
import PropsReturn from "../../models/core.response";

async function editPost(props: editPostProps): Promise<PropsReturn> {
  const { creatorData, postData, postName } = props;

  try {
    await updateDoc(doc(firestore, "posts", postData.postId), {
      postName,
      postData: [...postData.post],
      creatorData,
      updatedAt: serverTimestamp(),
      isActive: true,
    });
  } catch (error: any) {
    return {
      message: "It wasn't possible to edit your post! Try it later",
      errorCode: error.code,
      errorMessage: error.message,
    };
  }

  return { message: "Your post was successfully edited!" };
}

export { editPost };
