import { doc, DocumentData, getDoc } from "firebase/firestore";
import PropsReturn from "../../models/core.response";
import { firestore } from "../config/firebase";

interface getFeedPostsProps {
  feedId: string;
}

interface getFeedPostsPropsReturn extends PropsReturn {
  feedPosts: DocumentData;
}

async function getFeedPosts(
  props: getFeedPostsProps
): Promise<getFeedPostsPropsReturn> {
  const { feedId } = props;

  let feedPosts: DocumentData = {};

  try {
    const feedRef = doc(firestore, "feeds", feedId);
    const feedSnapshot = await getDoc(feedRef);

    if (!feedSnapshot.exists()) {
      return {
        message: "Sorry, but this feed doesn't exists",
        errorCode: "404",
        errorMessage: "Data doesn't exists",
        feedPosts,
      };
    }

    feedPosts = feedSnapshot.data();
  } catch (error: any) {
    return {
      message: "It wasn't possible to get your feed data!",
      errorCode: error.code,
      errorMessage: error.message,
      feedPosts,
    };
  }

  return { message: "Your feed posts were successfully gotten!", feedPosts };
}

export { getFeedPosts };
