import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";

import PropsReturn from "../../models/core.response";
import disablePostProps from "../../models/DisablePostProps";

async function disablePost(props: disablePostProps): Promise<PropsReturn> {
  const { id, userId, postCreatorId } = props;

  try {
    const postRef = doc(firestore, "posts", id);

    if (postCreatorId !== userId) {
      return {
        message: "You don't have permission to do this action!",
        errorCode: "403",
        errorMessage: "Id's aren't the same",
      };
    }

    await updateDoc(postRef, { isActive: false });
  } catch (error: any) {
    return {
      message: "I wasn't possbile to remove your post for now!",
      errorCode: error.code,
      errorMessage: error.message,
    };
  }

  return { message: "Your post was successfuly removed!" };
}

export default disablePost;
