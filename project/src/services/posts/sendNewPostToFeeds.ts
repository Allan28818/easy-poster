import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import PropsReturn from "../../models/core.response";
import { firestore } from "../config/firebase";
import { postInfoProps } from "./savePost";

interface sendNewPostToFeeds {
  postInfo: postInfoProps;
}

async function sendNewPostToFeeds(
  props: sendNewPostToFeeds
): Promise<PropsReturn> {
  const { postInfo } = props;

  try {
    const postOwnerRef = doc(firestore, "users", postInfo.creatorData.id!);
    const postOwnerSnapshot = await getDoc(postOwnerRef);

    if (!postOwnerSnapshot.exists()) {
      return {
        message: "Post owner does not exists!",
        errorCode: "404",
        errorMessage: "Data does not exists",
      };
    }

    const postOwnerData = postOwnerSnapshot.data();
    const feedsToSend = postOwnerData.followers;

    feedsToSend.push(postInfo.creatorData.id);

    for (const feedId of feedsToSend) {
      const feedRef = doc(firestore, "feeds", feedId);
      const feedSnapshot = await getDoc(feedRef);

      if (!feedSnapshot.exists()) {
        continue;
      }

      const feedData = feedSnapshot.data();
      const feedPosts = feedData?.posts || [];
      const updatedAt = serverTimestamp();

      feedPosts.push(postInfo);

      await updateDoc(feedRef, {
        posts: feedPosts,
        updatedAt,
      });
    }
  } catch (error: any) {
    return {
      message: "It wasn't possible to send your post to the feeds",
      errorCode: error.code,
      errorMessage: error.message,
    };
  }

  return { message: "Your post was successfully sent to the fields" };
}

export { sendNewPostToFeeds };
