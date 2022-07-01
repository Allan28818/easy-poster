import { editPostProps } from "../../models/PostProps";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";

async function editPost(props: editPostProps) {
  const { creatorData, postData, postName } = props;
  console.log("editPost props", props);

  try {
    await updateDoc(doc(firestore, "posts", postData.postId), {
      postName,
      postData: [...postData.post],
      creatorData,
      updatedAt: serverTimestamp(),
      isActive: true,
    });
  } catch (error: any) {
    console.log("error", error);
    return {
      message: "It wasn't possible to edit your post! Try it later",
      errorCode: error.code,
      errorMessage: error.message,
    };
  }

  return { message: "Your post was successfully edited!" };
}

export { editPost };
