import { editPostProps } from "../../models/PostProps";
import { updateDoc } from "firebase/firestore";

async function editPost(props: editPostProps) {
  const { creatorData, post, postName } = props;
  try {
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
